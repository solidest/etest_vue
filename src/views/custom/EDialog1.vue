<template>
    <v-container class="fill-height pa-0 ma-0" fluid>
        <v-dialog :value="true" width="860">
            <v-card class="pa-4">
                <v-card-title class="headline">“底盘问题1”故障分析</v-card-title>
                <v-card-text>
                    <v-radio-group v-model="dialogm1" column>
                        <v-radio value="bahamas">
                            <template v-slot:label>
                                <span>
                                    故障原因1
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="bahrain">
                            <template v-slot:label>
                                <span>
                                    故障原因2
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="bangladesh">
                            <template v-slot:label>
                                <span>
                                    故障原因3
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="bangladesh">
                            <template v-slot:label>
                                <span>
                                    故障原因4
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="bangladesh">
                            <template v-slot:label>
                                <span>
                                    故障原因5
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio value="bangladesh">
                            <template v-slot:label>
                                <span>
                                    故障原因6
                                </span>
                                <span class="ml-4 blue--text">
                                    维修指导
                                </span>
                            </template>
                        </v-radio>
                        <v-radio ><template v-slot:label>
                                <span>
                                    其它：
                                </span>
                                <v-text-field placeholder="请输入故障原因">
                                   
                                </v-text-field>
                            </template></v-radio>

                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-2" text @click="dialog = false">
                        关闭
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script>
    export default {
        // components: {
        //     'tree-main': () => import( /* webpackChunkName: "tree-main" */ '../components/TreeMain')
        // },
        created: function () {
            this.cfg = this.$store.getters.getConfig('tree');
        },
        data: () => {
            return {
                cfg: {}
            }
        }
    }
</script>