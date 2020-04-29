<template>
    <p v-html="html"> </p>
</template>
<style>

</style>
<script>
    export default {
        // 使用时请使用 :url.sync=""传值
        props: ['html'],
    }
</script>