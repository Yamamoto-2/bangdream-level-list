<template>
    <div class="level-box" v-if="show">
        <div class="level-text-box" @click="show = false">
            {{ title }}
        </div>
        <div class="level-deco"></div>
        <div class="level-content">
            <div class="level-song-card" v-for="(level, index) in levels" :key="index">
                <song-card :level="level.level" :name="getSongName(level.id)" :special="level.diff === 4"
                    :image="getSongImage(level.id)" :specialIcon="level.diff === 4 && isNewSpecial(level.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import SongCard from './SongCard.vue';

export default {
    components: { SongCard },
    props:{
        title: {
            type: String,
            required: true
        },
        songs: {
            type: Object,
            required: true
        },
        levels: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        return {
            show: ref (true),
            getSongName (id) {
                return props.songs[id].musicTitle[0];
            },
            getSongImage (id) {
                if (id === 13) return 'https://bestdori.com/assets/jp/musicjacket_tutorial/miracle_rip/jacket.png';
                if (id === 40) return 'https://bestdori.com/assets/jp/musicjacket_tutorial/kirayume_rip/assets-star-forassetbundle-tutorial-musicjacket-kirayume-jacket.png';
                const jacket = props.songs[id].jacketImage[0].toLowerCase();
                const tenId = Math.ceil(id / 10) * 10;
                return `https://bestdori.com/assets/jp/musicjacket/musicjacket${tenId}_rip/assets-star-forassetbundle-startapp-musicjacket-musicjacket${tenId}-${jacket}-jacket.png`
            },
            isNewSpecial (id) {
                const publishedAt = props.songs[id].difficulty[4].publishedAt?.[0] || props.songs[id].publishedAt[0];
                return parseInt(publishedAt) >= 1615795200000;
            }
        }
    }
}
</script>

<style scoped>
.level-box {
    margin: 100px 60px 0;
    border: 3px solid #505050;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    padding-top: 60px;
}

.level-text-box{
    width: 284px;
    height: 68px;
    background-image: url(/images/diff_number.png);
    background-repeat: no-repeat;
    background-size: 284px;
    color: #fff;
    position: absolute;
    top: -38px;
    left: -28.5px;
    font-size: 44px;
    line-height: 78px;
    padding-left: 88px;
}

.level-deco {
    width: 1540px;
    height: 40px;
    background-color: #505050;
    border-radius: 21px;
    position: absolute;
    top: -22px;
    right: 40px;
}

.level-song-card {
    width: 12.5%;
    display: inline-block;
    vertical-align: text-top;
}

</style>