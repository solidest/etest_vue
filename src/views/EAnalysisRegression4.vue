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
            var data = [
                [96.24, 11.35],
                [33.09, 85.11],
                [57.60, 36.61],
                [36.77, 27.26],
                [20.10, 6.72],
                [45.53, 36.37],
                [110.07, 80.13],
                [72.05, 20.88],
                [39.82, 37.15],
                [48.05, 70.50],
                [0.85, 2.57],
                [51.66, 63.70],
                [61.07, 127.13],
                [64.54, 33.59],
                [35.50, 25.01],
                [226.55, 664.02],
                [188.60, 175.31],
                [81.31, 108.68]
            ];

            // See https://github.com/ecomfe/echarts-stat
            var myRegression = ecStat.regression('polynomial', data, 3);

            myRegression.points.sort(function (a, b) {
                return a[0] - b[0];
            });

            let option = {

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                title: {
                    text: '多项式回归分析',
                    subtext: 'www.kiyun.com',
                    left: 'center',
                    top: 16
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    splitNumber: 20
                },
                yAxis: {
                    type: 'value',
                    min: -40,
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                grid: {
                    top: 90
                },
                series: [{
                    name: 'scatter',
                    type: 'scatter',
                    emphasis: {
                        label: {
                            show: true,
                            position: 'right',
                            color: 'blue',
                            fontSize: 16
                        }
                    },
                    data: data
                }, {
                    name: 'line',
                    type: 'line',
                    smooth: true,
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