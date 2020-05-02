<template>
    <v-container fluid>
        <v-row v-for="(v, i) in vals" :key="i" align="center" class="spacer" no-gutters>
            <v-avatar v-if="v" :color="option[i].oncolor||'red'" :size="option[i].size"
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
            //动态值
            vals: function () {
                if (!this.option || this.option.length === 0 || this.$store.state.work.panel_id !== this.panel_id) {
                    return [];
                }
                let vals = [];
                let rcd = this.$store.getters.lastRecord;
                for (let c of this.option) {
                    if (rcd[c.key]) {
                        vals.push(true);
                    } else {
                        vals.push(false);
                    }
                }
                return vals;
            }
        },

    }
</script>