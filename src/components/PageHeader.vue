<template>
    <div id="header">
        <img class="header-image" src="/images/header.png" alt="header">
        <div class="header-text">
            <div style="font-size: 26px; line-height: 1.6;">
                评级表说明：<br>
                本表收录日期内<u>日服已实装曲目</u>，表中为歌曲实际难度排序。<br><br>
            </div>
            <div style="font-size: 26px; line-height: 1.6">
                组长：绀野纯子（鹤丸/水月）<br>
                副组长：源樱（极·冰乱舞/挖矿人）、镜影Bly
            </div>
            <div style="font-size: 26px; line-height: 1.6">
                成员：栗子、幽雨、脆饼、AI黑头子、丹提诺艾、糸見結希、海葵、碳铝、xcw、秋葉亜里沙、霜凡、张三、爱丽丝、soul、遥情幻想、楠木、无名K、XLF笑凌风、麻薯、白井黑子、水野爱（zcwise，已退休）、坏坏（已退休）、庭牧（已退休）
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
#header {
    height: 400px;
    display: flex;
    align-items: flex-start;
    padding-top: 30px;
}

.header-image {
    margin-left: 60px;
    width: 960px;
}

.header-text {
    display: inline-block;
    width: 860px;
    height: 390px;
    margin-left: 40px;
    border: 3px solid #5c5c5c;
    background-color: #fff;
    border-radius: 16px;
    padding: 22px 24px 0;
    font-size: 36px;
    color: #5c5c5c;
    columns: 2 auto;
    column-rule: 1px solid #5c5c5c;
}

</style>