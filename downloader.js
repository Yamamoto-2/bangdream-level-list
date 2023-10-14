import { existsSync, readFileSync, unlinkSync, writeFileSync, mkdirSync, statSync } from "fs";
import request from "request";
import { join } from "path";
//import { Parser } from 'xml2js';

const MAX_RETRY_COUNT = 5
const RETRY_WAIT_TIME = 500
const DEFAULT_REQUEST_TIMEOUT = 5000

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var lastModifiedCache = undefined;
var cachePath = "./data/lastModifiedCache.json";
(function loadLastModifiedCache() {
    if (existsSync(cachePath)) {
        try {
            var rawdata = readFileSync(cachePath)
            lastModifiedCache = JSON.parse(rawdata)
        }
        catch {
            unlinkSync(cachePath)
            lastModifiedCache = {}
            return
        }
    }
    else {
        lastModifiedCache = {}
    }
    setTimeout(saveLastModifiedCache, 1000 * 60 * 60).unref()
})()

function saveLastModifiedCache() {
    console.log("保存LastModifiedCache")
    writeFileSync(cachePath, JSON.stringify(lastModifiedCache))
}
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, saveLastModifiedCache);
})

async function makeRequest(options, retry = 0) {
    if (retry)
        await sleep(RETRY_WAIT_TIME)
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (err) {
                if (retry >= MAX_RETRY_COUNT) {
                    console.log(`访问${options.url}失败`)
                    reject(`${options.url}: ${err}`)
                    return
                }
                console.log(`${options.url}: ${err}`)
                makeRequest(options, retry + 1).then((body) => {
                    resolve(body)
                })
            }
            else if (res.statusCode == 304) {
                //console.log(`不需更新${options.url}`)
                resolve(null)
                return
            }
            else if (!body) {
                reject(`${options.url}: 返回为空`)
                return
            }
            else if (body.toString().startsWith("<!DOCTYPE html>")) {
                reject(`${options.url}: 不是有效资源`)
                return
            }
            else {
                //console.log(`访问${options.url}成功`)
                var lastModified = res.caseless.get('last-modified')
                if (lastModified)
                    lastModifiedCache[options.url] = lastModified
                resolve(body)
                return
            }
        })
    })
}

function createDirIfNonExist(filepath) {
    if (!existsSync(filepath)) {
        console.log('该路径不存在，正在创建' + filepath);
        try {
            mkdirSync(filepath, { recursive: true })
        }
        catch (err) {
            console.log(`创建目录${filepath}失败`, err)
        }
    }
}

// overwrite: If need to overwrite existing file
// cache:     add If-Modified-Since header to bypass unnessesary download based on file modify date. 
//            Only meaningful if used with overwrite==true
async function download(url, filepath, filename, overwrite = false, cache = true) {
    if (!lastModifiedCache) loadLastModifiedCache()

    createDirIfNonExist(filepath)
    var exists = existsSync(join(filepath, filename))
    if (!exists || overwrite) {
        var promise = new Promise(function (resolve, reject) {
            var options = {}
            options.url = url
            options.timeout = DEFAULT_REQUEST_TIMEOUT
            options.encoding = null
            options.strictSSL = false
            options.gzip = true
            if (exists && cache && (url in lastModifiedCache)) {
                options.headers = { 'If-Modified-Since': lastModifiedCache[url] }
            }
            makeRequest(options).then((body) => {
                if (body) {
                    writeFileSync(join(filepath, filename), body)
                }
                resolve()
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
        })
        return promise
    }
    //console.log(filepath + filename + " 不需下载")
}

async function getJson(url, ifmodifiedsince = null) {
    var options = {}
    options.url = url
    options.json = true
    options.strictSSL = false
    options.gzip = true
    if (ifmodifiedsince) {
        options.headers = { 'If-Modified-Since': ifmodifiedsince }
    }
    return makeRequest(options)
}

// Read from json file if exsits. Use file modified time for If-Modified-Since header
async function getJsonAndSave(url, filepath, filename, timelimit) {
    if (!lastModifiedCache) loadLastModifiedCache()

    createDirIfNonExist(filepath)
    var filefullpath = join(filepath, filename)
    var fileexists = existsSync(filefullpath)
    var limittimestamp = new Date().getTime() - timelimit
    var data = null
    var filetimestamp
    if (fileexists) {
        filetimestamp = statSync(filefullpath).mtime.getTime()
        if (limittimestamp < filetimestamp) {
            data = JSON.parse(readFileSync(filefullpath))
            return data
        }
    }

    if (fileexists && (url in lastModifiedCache)) {
        var lastModifiedStamp = Date.parse(lastModifiedCache[url])
        if (filetimestamp < lastModifiedStamp)
            data = await getJson(url)
        else
            data = await getJson(url, lastModifiedCache[url])
        if (!data)
            data = JSON.parse(readFileSync(filefullpath))
    }
    else
        data = await getJson(url)
    if (data) {
        writeFileSync(filefullpath, JSON.stringify(data))
        return data
    }
    else
        return null
}
/*
var xmlParser = new Parser()

async function getXml(url, ifmodifiedsince = null) {
    var options = {}
    options.url = url
    options.json = true
    options.strictSSL = false
    options.gzip = true
    if (ifmodifiedsince) {
        options.headers = { 'If-Modified-Since': ifmodifiedsince }
    }
    var tempxml = await makeRequest(options)
    var tempjson = xmlParser.parseStringPromise(tempxml)
    return(tempjson)
}

//Read from xml file if exsits. Automatically transform xml format to json format. Use file modified time for If-Modified-Since header

async function getXmlAndSave(url, filepath, filename, timelimit) {
    if (!lastModifiedCache) loadLastModifiedCache()

    createDirIfNonExist(filepath)
    var filefullpath = join(filepath, filename)
    var fileexists = existsSync(filefullpath)
    var limittimestamp = new Date().getTime() - timelimit
    var data = null
    var filetimestamp
    if (fileexists) {
        filetimestamp = statSync(filefullpath).mtime.getTime()
        if (limittimestamp < filetimestamp) {
            data = await xmlParser.parseStringPromise(readFileSync(filefullpath))
            return data
        }
    }

    if (fileexists && (url in lastModifiedCache)) {
        var lastModifiedStamp = Date.parse(lastModifiedCache[url])
        if (limittimestamp > lastModifiedStamp) {
            await download(url, filepath, filename, true)
            data = await xmlParser.parseStringPromise(readFileSync(filefullpath))
        }
        else {
            await download(url, filepath, filename, false)
            data = await xmlParser.parseStringPromise(readFileSync(filefullpath))
        }
        if (!data) {
            data = await xmlParser.parseStringPromise(readFileSync(filefullpath))
        }

    }
    else {
        await download(url, filepath, filename, true)
        data = await xmlParser.parseStringPromise(readFileSync(filefullpath))
    }
    if (data) {
        return data
    }
    else {
        return null
    }

}
*/


export {
    makeRequest, download, getJson, getJsonAndSave
    , createDirIfNonExist
    //, getXml , getXmlAndSave
}
