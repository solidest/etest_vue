<template>
    <div style=" height:100%; width:100%;" :id="chart_id">
    </div>
</template>
<script>
    /**
     *  通用数值监控组件
     */
    import shortid from 'shortid';
    import echarts from 'echarts';

    export default {
        props: ['panel_id', 'option'],

        mounted: function () {
            this.resetChart();
        },
        computed: {
            rcds: function () {
                if(this.$store.state.work.panel_id !== this.panel_id) {
                    return [];
                }
                return this.$store.state.records;
            }
        },
        watch: {
            rcds: function () {
                //console.log('rcds')
                this.updateData();
            },
            panel_id: function () {
                this.resetChart();
            }
        },
        data: () => {
            return {
                chart_id: shortid.generate(),
                data_keys: [],
                chart: null,
            }
        },
        methods: {
            //重新设置界面
            resetChart: function () {
                if (this.chart) {
                    this.chart.clear();
                    this.chart = null;
                }

                this.data_keys.length = 0;
                for (let s of this.option.series) {
                    this.data_keys.push(s.data[0].key);
                }
                //console.log(this.data_keys)

                let self = this;
                //等待初始动画完毕后再初始化
                setTimeout(() => {
                    self.chart = echarts.init(document.getElementById(self.chart_id));
                    self.chart.setOption(self.option);
                    // self.updateData();
                }, 200);
            },

            //更新数据
            updateData: function () {
                if(!this.chart) {
                    return;
                }
                let rcds = this.rcds;
                let len = this.data_keys.length
                for(let r of rcds) {
                    for (let i = 0; i < len; i++) {
                        if (this.data_keys[i] in r) {
                            this.option.series[i].data[0].value = r[this.data_keys[i]];
                        }
                    }
                }
                this.chart.setOption(this.option);
            }
        }

    }
</script>