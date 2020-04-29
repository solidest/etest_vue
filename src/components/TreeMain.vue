<template>
    <v-treeview return-object expand-icon="" :items="items" activatable item-key="id" open-on-click>
        <template v-slot:append="{ item, open, leaf }">
            <v-icon>
                {{ get_icon_after(item, open, leaf) }}
            </v-icon>
        </template>
        <template v-slot:prepend="{ item, open, leaf }">
            <v-icon>
                {{ get_icon_before(item, open, leaf) }}
            </v-icon>
        </template>
    </v-treeview>
</template>
<script>
    /**
     * 主树结构组件，可定制图标
     */
    export default {
        name: 'tree-main',
        props: ['config'],

        data: () => {
            return {
                items: [],
                icons: {}
            }
        },

        created: function () {
            this.items = this.config.items;
            this.icons = this.config.icons;
        },

        methods: {
            //选中节点
            selected: function (item) {
                this.$emit('etl_selected', item);
            },

            //查询图标
            get_icon_before: function(item, opened, leaf) {
                let icon_id = item.catalog + '_' + item.kind;
                let icon = this.icons[icon_id];
                if(!icon) {
                    icon = this.icons[item.catalog];
                }
                if(!icon) {
                    icon = this.icons[item.kind];
                }
                if(!icon) {
                    if(!leaf) {
                        return opened ? 'mdi-menu-up' : 'mdi-menu-down';
                    } else {
                        return '';
                    }
                }
                return icon;
            },

            //查询图标
            get_icon_after: function(item, opened, leaf) {

                let icon_id = item.catalog + '_' + item.kind;
                let icon = this.icons[icon_id];
                if(!icon) {
                    icon = this.icons[item.catalog];
                }
                if(!icon) {
                    icon = this.icons[item.kind];
                }
                if(icon && !leaf) {
                    return opened ? "mdi-chevron-up": "mdi-chevron-down";
                }
                return "";
            }
        },


    }
</script>