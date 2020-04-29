<template>
    <v-card width="100%" flat>
        <v-data-table :items="views" disable-pagination disable-sort hide-default-footer no-data-text="<暂无数据>"
            :headers="headers" style="width:100%" show-expand :expanded.sync="expanded">

            <template v-slot:item.name="{ item }">
                <div @click="onclick(item)" :class="`pl-${item.$level*3}`"
                    :style="{cursor:item.deleted?'default':'pointer', display:'inline-block'}">
                    <v-icon v-if="item.$folder && item.$open" color="primary">mdi-menu-down</v-icon>
                    <v-icon v-else-if="item.$folder && !item.$open" color="primary">mdi-menu-right</v-icon>
                    <span v-else class="pl-8"></span>
                    <span class="pl-1 primary--text">
                        {{item.name}}
                    </span>
                    <v-icon v-if="!item.$folder && !item.$expand" color="primary">mdi-chevron-down</v-icon>
                    <v-icon v-else-if="!item.$folder && item.$expand" color="primary">mdi-chevron-up</v-icon>
                </div>
            </template>

            <template v-slot:item.state="{ item }">
                <run-state style="display:inline-block" class="pl-2" :state="item.state" />
            </template>

            <template v-slot:item.data-table-expand>

            </template>

            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <div :class="`pl-${item.$level*3} ml-8`">
                        <run-detail :runs="item.$detail" />
                    </div>
                </td>
            </template>

            <template v-slot:item.total="{ item }">
                <span v-if="item.state && item.state.total">
                    {{item.state.total}}
                </span>
            </template>
            <template v-slot:item.ok="{ item }">
                <span v-if="item.state && item.state.ok">
                    {{item.state.ok}}
                </span>
            </template>
            <template v-slot:item.fail="{ item }">
                <span v-if="item.state && item.state.fail">
                    {{item.state.fail}}
                </span>
            </template>
            <template v-slot:item.error="{ item }">
                <span v-if="item.state && item.state.error">
                    {{item.state.error}}
                </span>
            </template>

        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        props: ['items'],
        components: {
            'run-detail': () => import( /* webpackChunkName: "rundetail" */ './RunDetail'),
            'run-state': () => import( /* webpackChunkName: "rundestate" */ './RunState'),
        },

        data: () => {
            return {
                views: [],
                expanded: [],
                headers: [{
                        text: '名称',
                        align: 'left',
                        value: 'name',
                    },
                    {
                        text: '',
                        align: 'right',
                        value: 'state'
                    },
                    {
                        text: '用例总数',
                        value: 'total'
                    },
                    {
                        text: '通过',
                        value: 'ok'
                    },
                    {
                        text: '失败',
                        value: 'fail'
                    },
                    {
                        text: '错误',
                        value: 'error'
                    }, {
                        align: 'left',
                        value: 'data-table-expand'
                    }
                ]
            }
        },

        mounted: function () {
            this.udpateState({children: this.items})
            this.updateItems(null, this.items, 0, 1);
            this.udpateViews();
        },

        watch: {
            items: function (v) {
                this.updateItems(null, v, 0, 1);
                this.udpateViews();
            }
        },

        methods: {
            //计算节点的状态
            udpateState: function (parent) {
                let state = {
                    total: 0,
                    ok: 0,
                    fail: 0,
                    error: 0
                };
                parent.state = state;
                if (!parent.children || parent.children.length === 0) {
                    return;
                }
                for (let ch of parent.children) {
                    if (ch.is_dir) {
                        this.udpateState(ch);
                        state.total += ch.state.total;
                        state.ok += ch.state.ok;
                        state.fail += ch.state.fail;
                        state.error += ch.state.error;
                    } else {
                        state.total += 1;
                        switch (ch.result) {
                            case 'ok':
                                state.ok += 1;
                                break;
                            case 'fail':
                                state.fail += 1;
                                break;
                            case 'error':
                                state.error += 1;
                        }
                    }
                }
                // let title = `共${state.total}个 `;
                // if (state.ok > 0) {
                //     title += `通过${state.ok}个 `
                // }
                // if (state.fail > 0) {
                //     title += `失败${state.fail}个 `
                // }
                // if (state.error > 0) {
                //     title += `错误${state.error}个`
                // }
                // parent.title = title;
            },

            //设置level和open
            updateItems: function (parent, items, level, openlevel) {
                if (!items) {
                    return;
                }
                for (let it of items) {
                    if (it.is_dir) {
                        it.$level = level;
                        it.$open = (level < openlevel);
                        this.updateItems(it, it.children, level + 1, openlevel);
                        if (parent) {
                            parent.$folder = true;
                        }
                    } else if (parent) {
                        if (!parent.$detail) {
                            parent.$detail = [];
                            parent.$expand = false;
                        }
                        parent.$detail.push(it);
                    }
                }
            },

            //更新数据视图
            udpateViews: function () {
                let len = this.views.length;
                if (len > 0) {
                    this.views.splice(0, len);
                }
                this.appendNode(this.items)
            },

            //添加节点
            appendNode: function (items) {
                if (!items) {
                    return;
                }

                for (let it of items) {
                    if (it.is_dir) {
                        this.views.push(it);
                        if (it.$open) {
                            this.appendNode(it.children);
                        }
                    }
                }

            },

            //选中某行
            onclick: function (item) {
                if (item.$folder) {
                    item.$open = !item.$open;
                    this.udpateViews();
                } else if (item.$detail) {
                    item.$expand = !item.$expand;
                    if (item.$expand) {
                        this.expanded.push(item);
                    } else {
                        let idx = this.expanded.findIndex(it => it === item);
                        if (idx >= 0) {
                            this.expanded.splice(idx, 1);
                        }
                    }
                }
            },

        },



    }
</script>