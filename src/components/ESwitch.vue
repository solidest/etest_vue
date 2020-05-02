<template>
    <v-container fluid>
        <v-row v-for="(opt, i) in option" :key="i" align="center" class="spacer" no-gutters>
            <v-switch v-model="ons" :value="i" :color="opt.color" inset :label="opt.name"></v-switch>
        </v-row>
    </v-container>
</template>

<script>
    /**
     *  开关
     */
    export default {
        props: ['panel_id', 'option'],

        data: ()=>{
            return {
                ons: []
            }
        },

        created: function() {
            for(let i=0; i<this.option.length; i++) {
                if(this.option[i].default) {
                    this.ons.push(i);
                }
            }
        },

        watch: {
            //用户选中值
            ons: function(nvs, ovs) {
                for(let i=0; i<this.option.length; i++) {
                    let param = this.option[i].param;
                    if(param) {
                        this.$store.commit('setParam', {param: param, value: nvs.includes(i)});
                    }
                }
                if(nvs.length===ovs.length) {
                    return;
                }
                let idx = this.getDiff(nvs, ovs);
                let self = this;
                self.doRunCommand(idx);
            },

            //下位机绑定值
            // vals: function (nvs) {
            //     this.udpateSwitch(nvs);
            // }
        },

        // computed: {
        //     //下位机值
        //     vals: function () {
        //         if (!this.option || this.option.length === 0) {
        //             return [];
        //         }
        //         let vals = [];
        //         let rcd = this.$store.getters.lastRecord;
        //         for(let i=0; i<this.option.length; i++) {
        //             if(this.option[i].key) {
        //                  vals.push({idx: i, value: rcd[this.option[i].key] ? true: false});
        //             } 
        //         }
        //         return vals;
        //     },
        // },

        methods: {

            //定位被操作的按钮
            getDiff: function(nvs, ovs) {
                let vs = nvs.length > ovs.length ? [nvs, ovs] : [ovs, nvs];
                for(let i of vs[0]) {
                    if(!vs[1].includes(i)) {
                        return i;
                    }
                }
                //console.log('error', JSON.stringify(nvs), JSON.stringify(ovs));
            },

            //执行动作
            doRunCommand: function(idx) {
                let opt = this.option[idx];
                if(opt.run_id) {
                    this.$store.commit('cmdRun', {panel_id: this.panel_id, run_id: opt.run_id});
                } else if(opt.command) {
                    this.$store.commit('cmdCommand', {panel_id: this.panel_id, command: opt.command});
                }
                // let self = this;
                // setTimeout(()=>{
                //     self.udpateSwitch(self.vals);
                // }, 1000);
            },

            //更新状态
            // udpateSwitch: function(nvs) {
            //     for(let nv of nvs) {
            //         if(nv.value) {
            //             if(!this.ons.includes(nv.idx)) {
            //                 this.ons.push(nv.idx);
            //             }
            //         } else {
            //             let index = this.ons.indexOf(nv.idx);
            //             if(index>=0) {
            //                 this.ons.splice(index, 1);
            //             }
            //         }
            //     }
            // }
        }


    }
</script>