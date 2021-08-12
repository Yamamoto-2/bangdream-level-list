<template>
    <div class="song-box">
        <div class="song-cover-box">
            <img class="song-cover-image" :src="image" alt="cover">
            <div :class="'song-cover-bg' + (special ? ' song-cover-bg-special' : '')"></div>
            <img v-if="specialIcon" src="images/special.png" alt="special" class="song-special-icon">
            <div class="song-diff">{{ level.toFixed(2) }}</div>
        </div>
        <div :class="'song-title' + (special ? ' song-title-special' : '')">{{ name }}</div>
    </div>
</template>

<script>
export default {
    name: 'SongCard',
    props: {
        special: {
            type: Boolean,
            default: false
        },
        specialIcon: {
            type: Boolean,
            default: false
        },
        name: {
            type: String,
            require: true
        },
        level: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            require: true
        }
    }
}
</script>

<style scoped>
.song-box {
    text-align: center;
    margin-bottom: 40px;
}

.song-cover-box {
    position: relative;
}

.song-cover-image {
    width: 140px;
    background-color: #fff;
    border: 1px solid #fff;
    position: relative;
    z-index: 10;
    box-shadow: -1px 1px 5px 0px rgb(0, 0, 0, .5);
}

.song-cover-bg {
    width: 142px;
    height: 142px;
    background-color: #fd2327;
    position: absolute;
    top: -4px;
    left: 50px;
    box-shadow: 1px -1px 5px 0px rgb(0, 0, 0, .5);
}

.song-cover-bg-special {
    background-color: #ee2299;
}

.song-special-icon {
    position: absolute;
    top: -4px;
    width: 60px;
    right: 43px;
    z-index: 20;
}

.song-diff {
    background-color: #fff;
    color: #505050;
    font-size: 16px;
    width: 60px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    bottom: 6px;
    left: 47px;
    border-radius: 0 8px 0 0;
    z-index: 20;
}

.song-title {
    color: #505050;
    width: 200px;
    padding: 4px 8px;
    margin: 8px auto 0;
    border: 1px solid #505050;
    border-radius: 12px;
    font-size: 18px;
    box-shadow: 1px -1px 3px 0px rgb(0, 0, 0, .5);
}

.song-title-special {
    background-color: #ee2299;
    border: none;
    color: #fff;
}
</style>