<template>
    <v-container fluid fill-height>
        <v-row>
            <!-- <div style="width: 500px; height: 460px;" id="_sankey_" /> -->

            <v-card outlined width="90%" height="800px" class="mx-auto pa-4" id="_sankey_">
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import echarts from 'echarts';
    import 'echarts-gl';
    import data3d from '../../public/3ddemo.json'
    export default {

        mounted: function () {

            let sizeValue = '57%';
            let symbolSize = 2.5;
            let data = data3d;
            console.log(data.length)
            let option = {
                tooltip: {},
                grid3D: {
                    width: '55%'
                },
                xAxis3D: {},
                yAxis3D: {},
                zAxis3D: {},
                grid: [{
                        left: '55%',
                        width: '20%',
                        bottom: sizeValue
                    },
                    {
                        left: '80%',
                        width: '20%',
                        bottom: sizeValue
                    },
                    {
                        left: '55%',
                        width: '20%',
                        top: sizeValue
                    },
                    {
                        left: '80%',
                        width: '20%',
                        top: sizeValue
                    }
                ],
                xAxis: [{
                        type: 'value',
                        gridIndex: 0,
                        name: '参数1',
                        axisLabel: {
                            rotate: 50,
                            interval: 0
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        name: '参数4',
                        boundaryGap: false,
                        axisLabel: {
                            rotate: 50,
                            interval: 0
                        }
                    },
                    {
                        type: 'value',
                        gridIndex: 2,
                        name: '参数1',
                        axisLabel: {
                            rotate: 50,
                            interval: 0
                        }
                    },
                    {
                        type: 'value',
                        gridIndex: 3,
                        name: '参数2',
                        axisLabel: {
                            rotate: 50,
                            interval: 0
                        }
                    }
                ],
                yAxis: [{
                        type: 'value',
                        gridIndex: 0,
                        name: '参数2'
                    },
                    {
                        type: 'value',
                        gridIndex: 1,
                        name: '参数1'
                    },
                    {
                        type: 'value',
                        gridIndex: 2,
                        name: '参数3'
                    },
                    {
                        type: 'value',
                        gridIndex: 3,
                        name: '参数3'
                    }
                ],
                dataset: {
                    dimensions: [
                        '参数1',
                        '参数2',
                        '参数3',
                        '参数4',
                        {
                            name: '参数5',
                            type: 'ordinal'
                        }
                    ],
                    source: data
                },
                series: [{
                        type: 'scatter3D',
                        symbolSize: 3,
                        encode: {
                            x: '参数3',
                            y: '参数2',
                            z: '参数1',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },

                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        encode: {
                            x: '参数1',
                            y: '参数2',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        encode: {
                            x: '参数4',
                            y: '参数1',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        encode: {
                            x: '参数1',
                            y: '参数3',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        encode: {
                            x: '参数2',
                            y: '参数3',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    }
                ]
            };

            let myChart = echarts.init(document.getElementById('_sankey_'));
            myChart.setOption(option);
        },



    }
</script>