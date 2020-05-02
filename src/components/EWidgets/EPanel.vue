<template>
    <grid-layout :layout.sync="config.layout" :col-num="12" :row-height="10" :is-draggable="false" :is-resizable="false"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="false">
        <grid-item v-for="item in config.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
            :key="item.i">
            <div v-bind:style="{border: config.debug?'1px solid lightgray':'0', height:'100%', width:'100%'}">
                <component v-bind:is="(config[item.i] ? config[item.i].type : null) || 'e-empty'" :panel_id="panel_id"
                    :option="config[item.i] ? config[item.i].option : null"></component>
            </div>
        </grid-item>
    </grid-layout>
</template>

<script>
    /**
     *  控制面板
     */
    import VueGridLayout from 'vue-grid-layout';
    export default {
        props: ['panel_id', 'config'],
        created: function() {
            this.$store.commit('updatePanel', this.panel_id)
        },
        mounted: function() {
            if(this.config.autorun) {
                let self = this;
                this.$store.commit('cmdStop');
                
                setTimeout(()=>{
                    this.$store.commit('cmdRun', {panel_id: self.panel_id, run_id: self.config.autorun});
                }, 300);
            }
        },
        components: {
            'GridLayout': VueGridLayout.GridLayout,
            'GridItem': VueGridLayout.GridItem,
            'e-empty': () => import( /* webpackChunkName: "eemtpy" */ './EEmpty'),
            'e-lamp': () => import( /* webpackChunkName: "elamp" */ './ELamp'),
            'e-switch': () => import( /* webpackChunkName: "eswitch" */ './ESwitch'),
            'e-button': () => import( /* webpackChunkName: "eswitch" */ './EButton'),
        },
    }
</script>