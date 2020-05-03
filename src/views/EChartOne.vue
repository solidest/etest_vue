<template>
    <v-container fluid fill-height>
        <v-row>
            <!-- <div style="width: 500px; height: 460px;" id="_sankey_" /> -->

            <v-card outlined width="80%" height="800px" class="mx-auto pa-4" id="_sankey_">
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import echarts from 'echarts';
    export default {
        props: ['chart_key'],

        watch: {
            chart_key: function (new_val) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('_sankey_'));

                // 指定图表的配置项和数据
                myChart.setOption(this.$store.getters.getConfig(new_val));
            }
        },

        mounted: function () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('_sankey_'));

            // 指定图表的配置项和数据
            myChart.setOption(this.$store.getters.getConfig(this.chart_key));

            // let opt = 

            // console.log(JSON.stringify(opt))
        },

    }
</script>