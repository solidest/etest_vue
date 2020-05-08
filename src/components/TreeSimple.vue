

<template>
    <v-treeview return-object :items="items" activatable item-key="id" open-on-click>
        <template v-slot:prepend="{ item, open }">
            <v-icon v-if="item.children">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
                mdi-car
            </v-icon>
        </template>
    </v-treeview>
</template>

<script>
    /**
     * 简单树结构组件，使用文件夹图标
     */
    export default {
        name: 'tree-simple',
        props: ['config'],

        data: () => {
            return {
                items: [],
            }
        },

        created: function () {
            this.items = this.config.items;
        },

        methods: {
            //选中开发文件
            selected: function (item) {
                this.$emit('etl_selected', item);
            },
        },


    }
</script>