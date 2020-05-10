<template>
    <v-container fluid fill-height>
        <v-row>
            <!-- <div style="width: 500px; height: 460px;" id="_sankey_" /> -->

            <v-card outlined width="80%" height="500px" class="mx-auto pa-4" id="_sankey_">
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import echarts from 'echarts';
    import ecStat from 'echarts-stat';
    export default {

        mounted: function () {

            var data = [
                [0.067732, 3.176513],
               
                [0.033859, 3.156393],
               
                [0.969788, 4.655492],
               
                [0.067154, 3.190612],
               
                [0.541196, 3.891471],
               
                [0.394396, 3.580501],
               
                [0.263727, 3.558448],
                
                [0.493466, 3.900583],
                
                [0.307928, 3.587961],
               
                [0.618286, 4.021445],
                
                [0.254884, 3.491678],
                
                [0.604755, 3.960008],
            ];

            // See https://github.com/ecomfe/echarts-stat
            var myRegression = ecStat.regression('linear', data);

            myRegression.points.sort(function (a, b) {
                return a[0] - b[0];
            });

            let option = {
                title: {
                    text: '线性回归分析',
                    subtext: 'www.kiyun.com',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    min: 3,
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    emphasis: {
                        label: {
                            show: true,
                            position: 'left',
                            color: 'blue',
                            fontSize: 16
                        }
                    },
                    data: data
                }, {
                    name: 'line',
                    type: 'line',
                    showSymbol: false,
                    data: myRegression.points,
                    markPoint: {
                        itemStyle: {
                            color: 'transparent'
                        },
                        label: {
                            show: true,
                            position: 'left',
                            formatter: myRegression.expression,
                            color: '#333',
                            fontSize: 14
                        },
                        data: [{
                            coord: myRegression.points[myRegression.points.length - 1]
                        }]
                    }
                }]
            };

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('_sankey_'));
            // 指定图表的配置项和数据
            myChart.setOption(option);
        },
    }
</script>