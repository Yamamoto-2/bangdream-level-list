import { parse } from 'node-xlsx'
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { download } from "./downloader.js";

var writeJSON = async function (filepath, data) {//写入json文件子程序
    var rawdata = JSON.stringify(data)
    writeFileSync(filepath, rawdata)
}

var readrankxlsx = async function () {
    var list = await parse(resolve("./ap定数表.xlsx"))
    console.log(list)
    // 数据处理 方便粘贴复制
    var data = list[0].data;  // 1.读取json数据到变量暂存
    var len = data.length;
    var diff = []
    var templist = []
    for (var i = 0; i < len; i++) {  // 2.数据处理
        if (i != 0 && data[i][0] * 1 == data[i][0]) {
            if (data[i][2] == "EX") {
                var diffnum = 3
            }
            else if (data[i][2] == "SP") {
                var diffnum = 4
            }
            else {
                continue
            }
            var temp = {
                id: data[i][0],
                diff: diffnum,
                level: data[i][7]
            }
            diff.push(temp)
            templist.push({
                songID: data[i][0],
                difficulty: diffnum
            })
        }
    }
    await writeJSON("./public/json/diff.json", diff)
    await writeJSON("./public/json/list.json", templist)
    await download("https://bestdori.com/api/songs/all.7.json", "./public/json/","songs.json")
    console.log(diff)
    console.log("更新完毕")
    return (diff)
}

readrankxlsx()