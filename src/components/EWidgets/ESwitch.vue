<template>
    <v-container fluid>
        <v-row v-for="(opt, i) in option" :key="i" align="center" class="spacer" no-gutters>
            <v-switch v-model="ons" :value="i" :color="opt.color" inset :label="opt.name" @change="onChange(i)">
            </v-switch>
        </v-row>
    </v-container>
</template>

<script>
    /**
     *  开关
     */
    export default {
        props: ['panel_id', 'option'],

        data: () => {
            return {
                ons: []
            }
        },

        created: function () {
            if (this.$store.state.work.panel_id !== this.panel_id) {
                return;
            }
            this.initialData();
        },

        watch: {
            panel_id: function() {
                this.initialData();
            }
        },

        methods: {

            initialData: function () {
                this.ons.length = 0;
                for (let i = 0; i < this.option.length; i++) {
                    let opt = this.option[i];
                    if (opt.default) {
                        this.ons.push(i);
                        if (opt.param) {
                            this.$store.commit('setParam', {
                                param: opt.param,
                                value: true
                            });
                        }
                    }
                }
            },

            onChange: function (i) {
                if (this.$store.state.work.panel_id !== this.panel_id) {
                    return;
                }
                let opt = this.option[i];
                if (opt.param) {
                    this.$store.commit('setParam', {
                        param: opt.param,
                        value: this.ons.includes(i)
                    });
                }
                if (opt.run_id) {
                    this.$store.commit('cmdRun', {
                        panel_id: this.panel_id,
                        run_id: opt.run_id
                    });
                } else if (opt.command) {
                    this.$store.commit('cmdCommand', {
                        panel_id: this.panel_id,
                        command: opt.command
                    });
                }
            },

        }
    }
</script>