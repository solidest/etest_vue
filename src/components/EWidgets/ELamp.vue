<template>
    <v-container fluid>
        <v-row v-for="(it, i) in vals" :key="i" align="center" class="spacer" no-gutters>
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
            rcd: function () {
                if(this.$store.state.work.panel_id !== this.panel_id) {
                    return {};
                }
                let len = this.$store.state.records.length;
                if(len===0) {
                    return {};
                }
                return this.$store.state.records[len-1];
            }
        },
        watch: {
            rcd: function () {
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
                vals: null
            }
        },
        methods: {
            initData: function () {
                let rcd = this.rcd;
                this.vals = [];
                for (let opt of this.option) {
                    if (opt.key) {
                        this.vals.push({
                            key: opt.key,
                            value: (rcd[opt.key] ? true : false)
                        });
                    } else {
                        this.vals.push({
                            value: false
                        });
                    }
                }
                this.updateData();
            },
            updateData: function () {
                let rcd = this.rcd;
                //console.log('lamp rcd', JSON.stringify(rcd));
                for (let v of this.vals) {
                    if (v.key && (v.key in rcd)) {
                        v.value = rcd[v.key] ? true : false;
                    }
                }
            }
        }

    }
</script>