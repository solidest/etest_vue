<template>
    <grid-layout :layout.sync="config.layout" :col-num="12" :row-height="10" :is-draggable="false" :is-resizable="false"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="false">
        <grid-item v-for="item in config.layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
            :key="item.i">
            <div v-if="!loading"  v-bind:style="{border: config.debug?'1px solid lightgray':'0', height:'100%', width:'100%'}">
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
    import EValueChart from './EValueChart';
    import EXYChart from './EXYChart';

    export default {
        props: ['panel_id', 'config'],

        created: function() {
            this.refresh(); //在子部件的mouted之前重置panel_id
        },

        beforeDestroy: function() {
            this.$store.commit('cmdStop');
        },

        data: ()=>{
            return {
                loading: false
            }
        },

        watch: {
            panel_id: function() {
                this.loading = true;
                let self = this;
                self.$nextTick(()=>{
                    self.loading = false;
                    self.refresh();
                })
            }
        },

        components: {
            'GridLayout': VueGridLayout.GridLayout,
            'GridItem': VueGridLayout.GridItem,
            'e-empty': () => import( /* webpackChunkName: "eemtpy" */ './EEmpty'),
            'e-lamp': () => import( /* webpackChunkName: "elamp" */ './ELamp'),
            'e-switch': () => import( /* webpackChunkName: "eswitch" */ './ESwitch'),
            'e-button': () => import( /* webpackChunkName: "eswitch" */ './EButton'),
            // 'e-value-chart': () => import( /* webpackChunkName: "evaluechart" */ './EValueChart'),
            // 'e-xy-chart': () => import( /* webpackChunkName: "exychart" */ './EXYChart'),
            'e-value-chart': EValueChart,
            'e-xy-chart': EXYChart,
        },

        methods: {
            refresh: function() {
                //console.log('reset')
                this.$store.commit('cmdReset', this.panel_id);
                if(this.config.autorun) {
                    this.autoRun(this.panel_id, this.config.autorun);
                }
            },

            autoRun: function(panel_id, run_id) {
                let self = this;
                setTimeout(()=>{
                    //console.log('cmd', run_id)
                    if(self.$store.state.work.run_state==='idle') {
                        self.$store.commit('cmdRun', {panel_id: panel_id, run_id: run_id});
                    } else {
                        self.autoRun();
                    }
                }, 300);
            }
        }
    }
</script>