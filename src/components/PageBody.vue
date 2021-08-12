<template>
    <div id="body">
        <level-card v-if="level28" :songs="songs" :levels="level28" title="28+"/>
        <level-card v-if="level27" :songs="songs" :levels="level27" title="27"/>
        <level-card v-if="level26" :songs="songs" :levels="level26" title="26"/>
        <level-card v-if="level25" :songs="songs" :levels="level25" title="25"/>
        <level-card v-if="level24" :songs="songs" :levels="level24" title="25-"/>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import LevelCard from './LevelCard.vue';
export default {
    components: { LevelCard },
    setup() {
        const level28 = ref(null);
        const level27 = ref(null);
        const level26 = ref(null);
        const level25 = ref(null);
        const level24 = ref(null);
        const songs = ref(null);
        onMounted(async () => {
            const req1 = await fetch('json/diff.json');
            const diff = await req1.json();
            const req2 = await fetch('json/songs.json');
            const _songs = await req2.json();
            const req3 = await fetch('json/list.json');
            const list = await req3.json();
            songs.value = _songs;
            level28.value = diff.filter(v => v.level >= 28).sort((a, b) => b.level - a.level);
            level27.value = diff.filter(v => v.level >= 27 && v.level < 28).sort((a, b) => b.level - a.level);
            level26.value = diff.filter(v => v.level >= 26 && v.level < 27).sort((a, b) => b.level - a.level);
            level25.value = diff.filter(v => v.level >= 25 && v.level < 26).sort((a, b) => b.level - a.level);
            level24.value = diff.filter(v => v.level < 25).sort((a, b) => b.level - a.level);
        })
        return {
            level28,
            level27,
            level26,
            level25,
            level24,
            songs
        }
    }
}
</script>