<template>
    <v-container>
        <v-list-item v-if="run_title">
            <v-list-item-content>
                <v-list-item-title :class="resultColor">{{run_title}}</v-list-item-title>
                <v-list-item-subtitle v-if="run_memo">{{run_memo}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn color="primary" depressed fab :loading="loading" @click="onClick" :disabled="disabled">
                    <v-icon large>
                        {{running ? 'mdi-stop':'mdi-play'}}
                    </v-icon>
                </v-btn>
            </v-list-item-action>
        </v-list-item>
        <v-btn v-else color="primary" depressed fab :loading="loading" @click="onClick" :disabled="disabled">
            <v-icon large>
                {{running ? 'mdi-stop':'mdi-play'}}
            </v-icon>
        </v-btn>
        <v-progress-linear v-if="run_title && running" indeterminate></v-progress-linear>
    </v-container>
</template>
<script>
    /**
     * 用例执行按钮组件
     */
    export default {
        name: 'button-run',
        props: ['run_id', 'panel_id', 'run_title', 'run_memo'],

        data: () => {
            return {
                loading: false,
            }
        },

        computed: {
            running: function () {
                return this.$store.state.work.run_state === 'running';
            },
            disabled: function() {
                if((this.$store.state.work.run_state !== 'running') && !(this.run_id && this.panel_id)) {
                    return true;
                }
                return false;
            },
            resultColor: function() {
                let res = this.$store.state.work.last_result;
                if(!res) {
                    return '';
                } else {
                    if(res === 'fail') {
                        return 'red--text';
                    } else if (res === 'error') {
                        return 'orange--text';
                    } else if (res === 'ok') {
                        return 'green--text';
                    }
                }
                return '';
            }
        },

        methods: {
            tickLoading_: function () {
                this.loading = true;
                let self = this;
                setTimeout(() => {
                    self.loading = false;
                }, 300);
            },

            onClick: function () {
                if (this.running) {
                    //停止执行
                    this.$store.commit("cmdStop");
                    this.tickLoading_();
                } else {
                    //开始执行
                    if (!this.run_id || !this.panel_id) {
                        return;
                    }
                    this.$store.commit("cmdRun", {
                        run_id: this.run_id,
                        panel_id: this.panel_id
                    });
                    this.tickLoading_();
                }
            }
        },


    }
</script>