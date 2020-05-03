<template>
    <v-container fluid>
        <v-row v-for="(it, i) in keyvs" :key="i" align="center" class="spacer" no-gutters>
            <v-avatar v-if="it.value" :color="option[i].oncolor||'red'" :size="option[i].size"
                :style="option[i].ficker ? { animationDuration: '1s' } : null" class="ma-2 v-avatar--metronome">
                <v-icon :dark="option[i].dark" :large="option[i].size && option[i].size>48"
                    :small="option[i].size && option[i].size<48">
                    {{option[i].onicon}}
                </v-icon>
            </v-avatar>

            <v-avatar v-else :color="option[i].offcolor||'grey'" :size="option[i].size" class="ma-2">
                <v-icon :dark="option[i].dark" :large="option[i].size && option[i].size>48"
                    :small="option[i].size && option[i].size<48">
                    {{option[i].officon}}
                </v-icon>
            </v-avatar>
            <strong class="ml-2" v-html="option[i].name"></strong>
        </v-row>
    </v-container>
</template>
<style>
    @keyframes lamp-ficker {
        from {
            transform: scale(.94);
        }

        to {
            transform: scale(1.06);
        }
    }

    .v-avatar--metronome {
        animation-name: lamp-ficker;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
</style>
<script>
    /**
     *  状态指示
     */
    export default {
        props: ['panel_id', 'option'],

        computed: {
            rcds: function () {
                if(this.$store.state.work.panel_id !== this.panel_id) {
                    return [];
                }
                return this.$store.state.records;
            }
        },
        watch: {
            rcds: function () {
                //console.log('rcds')
                this.updateData();
            },
            panel_id: function() {
                this.initData();
            }
        },
        mounted: function () {
            this.initData();
        },
        data: () => {
            return {
                keyvs: [],
            }
        },
        methods: {
            //初始化数据
            initData: function () {
                this.keyvs.length = 0;
                for (let opt of this.option) {
                    if (opt.key) {
                        this.keyvs.push({
                            key: opt.key
                        });
                    } else {
                        this.keyvs.push({
                            value: false
                        });
                    }
                }
                this.updateData();
            },

            //刷新数据
            updateData: function () {
                let rcds = this.rcds;
                for(let r of rcds) {
                    for (let v of this.keyvs) {
                        if (v.key && (v.key in r)) {
                            v.value = r[v.key] ? true : false;
                        }
                    }
                }
                //console.log(this.keyvs)
                this.$forceUpdate();
            }
        }

    }
</script>