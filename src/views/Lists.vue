<template>
    <v-container fluid fill-height>
        <v-breadcrumbs :items="catalogs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-row>
            <v-col cols="1" />
            <v-col cols="5">
                <v-card outlined width="380px" height="500px" class="mx-auto">
                    <v-list two-line subheader>
                        <v-subheader inset>检测项选择</v-subheader>
                        <v-list-item v-for="item in items" :key="item.id" @click=";">
                            <v-list-item-avatar>
                                <v-icon>{{item.icon}}</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="item.memo"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                </v-card>
            </v-col>
            <v-col cols="5">
                <v-card outlined width="380px" height="500px" class="mx-auto pa-4">
                    <h2 class="title mb-2">检测项选择1：</h2>
                    <v-chip-group column multiple>
                        <v-chip filter outlined v-for="item in items" :key="item.id">
                            {{item.name}}
                        </v-chip>
                    </v-chip-group>
                    <h2 class="title mb-2">检测项选择2：</h2>
                    <v-chip-group column multiple>
                        <v-chip filter outlined v-for="item in items" :key="item.id">
                            {{item.name}}
                        </v-chip>
                    </v-chip-group>
                    <h2 class="title mb-2">检测项选择3：</h2>
                    <v-chip-group column multiple>
                        <v-chip filter outlined v-for="item in items" :key="item.id">
                            {{item.name}}
                        </v-chip>
                    </v-chip-group>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        created: function () {
            this.items = this.$store.getters.getConfig('lists');

        },

        data: () => {
            return {
                items: [],
                catalogs: [{
                        text: '炮兵',
                        disabled: false,
                        href: 'breadcrumbs_dashboard',
                    },
                    {
                        text: '89A',
                        disabled: false,
                        href: 'breadcrumbs_link_1',
                    },
                    {
                        text: 'ZSD89A',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                    {
                        text: '灭火系统',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                    {
                        text: '灭火盒',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                    {
                        text: 'XXX型号',
                        disabled: false,
                        href: 'breadcrumbs_link_2',
                    },
                ],
            }
        }

    }
</script>