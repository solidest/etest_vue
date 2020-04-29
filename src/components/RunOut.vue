<template>
    <div id="_out_lines" style="overflow-y:auto; height: 100%">
        <div :class="getClass(item)" v-for="(item, idx) in items" :key="idx">
            <span>{{item.text}}</span>
            <span v-html="getSuffix(item)"></span>
        </div>
    </div>
</template>

<script>
    /**
     *  执行输出组件
     */

    export default {
        name: 'run-out',
        props: ['panel_id'],

        computed: {
            items: function () {
                if (this.$store.state.work.panel_id != this.panel_id) {
                    return [];
                }
                if (this.$store.state.work.run_logs) {
                    this.$nextTick(()=>{
                        document.getElementById('_out_lines').scrollTop = 9999;
                    });
                    return this.$store.state.work.run_logs.items;
                }
                return [];
            }
        },

        methods: {
            getClass: function (item) {
                switch (item.type) {
                    case 'step':
                        return "grey-lighten-5--text subtitle-1 pl-0 pt-2 font-weight-medium"
                    case 'action':
                        return "grey--text subtitle-2 pl-4 pt-1"
                    case 'print':
                    case 'info':
                        return "green--text subtitle-2 pl-4 pt-1"
                    case 'error':
                    case 'warn':
                        return "orange--text subtitle-2 pl-4 pt-1"
                    case 'verifyFail':
                    case 'assertFail':
                        return "red--text subtitle-2 pl-4 pt-1"
                    case 'check': {
                        if (item.result === 'ok') {
                            return "green--text subtitle-2 pl-4 pt-1"
                        } else {
                            return "red--text subtitle-2 pl-4 pt-1"
                        }
                    }

                    default:
                        console.log(JSON.stringify(item));
                        return "grey-lighten-5--text subtitle-2 pl-4 pt-1"
                }
            },

            getSuffix: function (item) {
                switch (item.result) {
                    case 'ok':
                        return '<span class="green--text"> &#10004</span>';
                    case 'fail':
                        return ' <span class="red--text"> &#10008</span>';
                    case "error":
                        return ' <span class="orange--text"> &#9888</span>';
                    default:
                        return "";
                }
            },


        }
    }
</script>