<template>
    <div id="body">
        <level-card v-if="level29 && level29.length > 0" :songs="songs" :levels="level29" title="29"/>
        <level-card v-if="level28u && level28u.length > 0" :songs="songs" :levels="level28u" title="28+"/>
        <level-card v-if="level28 && level28.length > 0" :songs="songs" :levels="level28" title="28"/>
        <level-card v-if="level27u && level27u.length > 0" :songs="songs" :levels="level27u" title="27+"/>
        <level-card v-if="level27 && level27.length > 0" :songs="songs" :levels="level27" title="27"/>
        <level-card v-if="level26u && level26u.length > 0" :songs="songs" :levels="level26u" title="26+"/>
        <level-card v-if="level26 && level26.length > 0" :songs="songs" :levels="level26" title="26"/>
        <level-card v-if="level25u && level25u.length > 0" :songs="songs" :levels="level25u" title="25+"/>
        <level-card v-if="level25 && level25.length > 0" :songs="songs" :levels="level25" title="25"/>
        <level-card v-if="level25d && level25d.length > 0" :songs="songs" :levels="level25d" title="25-"/>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import LevelCard from './LevelCard.vue';
export default {
    components: { LevelCard },
    setup() {
        const level29 = ref(null);
        const level28u = ref(null);
        const level28 = ref(null);
        const level27u = ref(null);
        const level27 = ref(null);
        const level26u = ref(null);
        const level26 = ref(null);
        const level25u = ref(null);
        const level25 = ref(null);
        const level25d = ref(null);
        const songs = ref(null);

        onMounted(async () => {
            const req1 = await fetch('json/diff.json');
            let diff = await req1.json();
            const req2 = await fetch('json/songs.json');
            const _songs = await req2.json();
            const req3 = await fetch('json/list.json');
            const list = await req3.json();
            const hasSong = (song) => {
                return list.some(v => v.songID === song.id && v.difficulty === song.diff);
            };
            songs.value = _songs;
            diff = diff.map(v => ({
                ...v,
                level: parseFloat(v.level.toFixed(1))
            }));
            level29.value = diff.filter(v => hasSong(v) && v.level >= 29).sort((a, b) => b.level - a.level);
            level28u.value = diff.filter(v => hasSong(v) && v.level >= 28.6 && v.level < 29).sort((a, b) => b.level - a.level);
            level28.value = diff.filter(v => hasSong(v) && v.level >= 28 && v.level < 28.6).sort((a, b) => b.level - a.level);
            level27u.value = diff.filter(v => hasSong(v) && v.level >= 27.6 && v.level < 28).sort((a, b) => b.level - a.level);
            level27.value = diff.filter(v => hasSong(v) && v.level >= 27 && v.level < 27.6).sort((a, b) => b.level - a.level);
            level26u.value = diff.filter(v => hasSong(v) && v.level >= 26.6 && v.level < 27).sort((a, b) => b.level - a.level);
            level26.value = diff.filter(v => hasSong(v) && v.level >= 26 && v.level < 26.6).sort((a, b) => b.level - a.level);
            level25u.value = diff.filter(v => hasSong(v) && v.level >= 25.6 && v.level < 26).sort((a, b) => b.level - a.level);
            level25.value = diff.filter(v => hasSong(v) && v.level >= 25 && v.level < 25.6).sort((a, b) => b.level - a.level);
            level25d.value = diff.filter(v => hasSong(v) && v.level < 25).sort((a, b) => b.level - a.level);
        })
        return {
            level29,
            level28u,
            level28,
            level27u,
            level27,
            level26u,
            level26,
            level25u,
            level25,
            level25d,
            songs
        }
    }
}
</script>