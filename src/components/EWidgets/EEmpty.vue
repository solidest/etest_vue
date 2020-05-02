<template>
    <span>{{`${panel_id} : ${option?JSON.stringify(option):''}`}}</span>
</template>
<script>
    /**
     *  空组件
     */
    export default {
        props: ['panel_id', 'option'],
    }
</script>