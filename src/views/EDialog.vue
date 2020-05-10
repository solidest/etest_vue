<template>
    <v-container class="fill-height pa-0 ma-0" fluid>
        <v-dialog :value="true" width="500" max-height="300">
            <v-card class="pa-4">
                <v-sheet class="pa-4 primary lighten-2">
                    <v-text-field v-model="search" label="模糊查询" dark flat solo-inverted hide-details
                        clearable clear-icon="mdi-close-circle-outline"></v-text-field>
                </v-sheet>
                <div style="border: 1px solid lightgrey">
                 <v-card-text style="height: 460px;">
                    <tree-main :config="{items: cfg.items2, icons: cfg.icons}" />
                 </v-card-text>
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black darken-2" text @click="dialog = false">
                        取消
                    </v-btn>
                    <v-btn color="black darken-2" text @click="dialog = false">
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script>
    export default {
        components: {
            'tree-main': () => import( /* webpackChunkName: "tree-main" */ '../components/TreeMain')
        },
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