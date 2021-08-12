<template>
    <div id="header">
        <img class="header-image" src="images/header.png" alt="header">
        <div class="header-text">
            <div style="font-size: 28px; line-height: 1.6;">
                评级表说明：<br>
                本表仅收录<u>官标25级</u>及以上曲目，表中为歌曲实际难度排序，<u>存在一定个人差</u>，仅供参考。<br>
            </div>
            <div style="font-size: 26px; line-height: 1.6">
                版本：V6.0<br>
                数据截至：2021.7.20<br>
                更新日期：2021.8.12
            </div>
            <div style="font-size: 30px; line-height: 1.6">
                参与人员（不计先后）：<br>
                原“布谷鸟”评级组 落花 mclean 庭牧 张三 自由酱 蓝亦辰 霜凡 秋葉亜里沙 FereDDo 栗丸 AlphaZeta 凡特西 瓶子<br>
                图像制作者：山本 青芙
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