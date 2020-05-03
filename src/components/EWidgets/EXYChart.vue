<template>
    <div style=" height:100%; width:100%;" :id="chart_id">
    </div>
</template>
<script>
    /**
     *  通用直角坐标监控组件
     */
    import shortid from 'shortid';
    import echarts from 'echarts';
    import {
        throttle
    } from 'throttle-debounce';

    export default {
        props: ['panel_id', 'option'],

        mounted: function () {
            this.resetChart();
        },
        computed: {
            newRecordes: function () {
                if(this.$store.state.work.panel_id !== this.panel_id) {
                    return [];
                }
                return this.$store.state.records;
            }
        },
        watch: {
            newRecordes: function () {
                this.updateData();
            },
            panel_id: function () {
                this.resetChart();
            }
        },
        data: () => {
            return {
                chart_id: shortid.generate(),
                chart: null,
                drawing: false,
                keys: [],
                rcds: [],
            }
        },
        methods: {
            //重新设置界面
            resetChart: function () {
                if (this.chart) {
                    this.chart.clear();
                    this.chart = null;
                }

                this.rcds.length = 0;
                this.keys.length = 0;
                this.redrawChart = throttle(this.option.redawTime || 200, this.redrawChart_);
                for(let s of this.option.series) {
                    this.keys.push(s.encode.x);
                    this.keys.push(s.encode.y);
                }

                //等待初始动画完毕后再初始化
                let self = this;
                setTimeout(() => {
                    self.chart = echarts.init(document.getElementById(self.chart_id));
                    self.chart.setOption(this.option);
                    // self.updateData();
                }, 200);
            },

            //有新的数据
            updateData: function () {
                let rs = this.newRecordes;
                for(let r of rs) {
                    let ok = true;
                    for(let k of this.keys) {
                        if(!(k in r)) {
                            ok = false;
                            break;
                        }
                    }
                    if(ok) {
                        this.rcds.push(r);
                    }
                }
                let delc = this.rcds.length - (this.option.maxCount || 500);
                if(delc>0) {
                    this.rcds.splice(0, delc);
                }
                this.redrawChart();
            },

            //更新UI
            redrawChart_: function() {
                if(!this.chart) {
                    return;
                }
                this.chart.setOption({dataset: {source: this.rcds}});
            }
        }

    }
</script>