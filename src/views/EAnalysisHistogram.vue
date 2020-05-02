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
    import ecStat from 'echarts-stat';
    export default {

        mounted: function () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('_sankey_'));

            var girth = [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0,
                12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6
            ];

            var bins = ecStat.histogram(girth);

            var option = {
                title: {
                    text: '数值分布区间直方图',
                    left: 'center',
                    top: 20
                },
                tooltip: {},
                xAxis: [{
                    scale: true, //这个一定要设，不然barWidth和bins对应不上
                }],
                yAxis: {},
                series: [{
                    type: 'custom',
                    renderItem: function (params, api) {
                        var yValue = api.value(2);
                        var start = api.coord([api.value(0), yValue]);
                        var size = api.size([api.value(1) - api.value(0), yValue]);
                        return {
                            type: 'rect',
                            shape: {
                                x: start[0],
                                y: start[1],
                                width: size[0] * 0.99,
                                height: size[1]
                            },
                            style: api.style()
                        };
                    },
                    itemStyle: {
                        color: 'rgb(25, 183, 207)'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop'
                        }
                    },
                    dimensions: ['x0', 'x1', 'sampleNum'],
                    encode: {
                        x: [0, 1],
                        y: 2,
                        tooltip: [0, 1, 2]
                    },
                    data: bins.customData
                }]
            };


            // 指定图表的配置项和数据
            myChart.setOption(option);
        },

    }
</script>