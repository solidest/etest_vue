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
            let self = this;
            this.updateData = throttle(200, self.updateData_);
            this.refresh();
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
                this.refresh();
            }
        },
        data: () => {
            return {
                chart_id: shortid.generate(),
                chart: null,
                drawing: false,
            }
        },
        methods: {
            //重新渲染界面
            refresh: function () {
                if (this.chart) {
                    this.chart.clear();
                    this.chart = null;
                }

                let self = this;

                //等待初始动画完毕后再初始化
                setTimeout(() => {
                    self.chart = echarts.init(document.getElementById(self.chart_id));
                    self.chart.setOption(this.option);
                    self.updateData();
                }, 200);
            },

            //更新数据
            updateData_: function () {
                if(!this.chart) {
                    return;
                }
                let self = this;
                this.$nextTick(()=>{
                    self.chart.setOption({dataset: {source: self.rcds}});
                });
            }
        }

    }
</script>