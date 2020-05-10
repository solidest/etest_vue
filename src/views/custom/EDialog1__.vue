<template>
    <v-container class="fill-height pa-0 ma-0" fluid>
        <v-dialog :value="true" width="400">
            <v-card class="pa-4">
                <v-card-title class="headline">输入后继续</v-card-title>
               
                <v-text-field label="请输入仪表x上观察到的值：" hint="单位：MP" class="mx-6 my-3" />
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-2" text @click="dialog = false">
                        确定
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