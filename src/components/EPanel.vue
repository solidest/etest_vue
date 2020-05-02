<template>
    <grid-layout :layout.sync="config.layout" :col-num="12" :row-height="10" :is-draggable="true" :is-resizable="true"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
        <grid-item v-for="item in config.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i">
            {{item.i}}
        </grid-item>
    </grid-layout>
</template>
<style>

</style>
<script>
    /**
     *  控制面板
     */
    import VueGridLayout from 'vue-grid-layout';
    export default {
        props: ['panel_id', 'config'],
        components: {
            'GridLayout': VueGridLayout.GridLayout,
            'GridItem': VueGridLayout.GridItem,
        },
    }
</script>