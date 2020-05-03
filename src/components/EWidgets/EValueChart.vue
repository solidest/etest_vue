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
            this.refresh();
        },
        computed: {
            rcd: function () {
                if(this.$store.state.work.panel_id !== this.panel_id) {
                    return {};
                }
                let len = this.$store.state.records.length;
                if(len===0) {
                    return {};
                }
                return this.$store.state.records[len-1];
            }
        },
        watch: {
            rcd: function () {
                this.updateData();
            },
            panel_id: function () {
                this.refresh();
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
            //重新渲染界面
            refresh: function () {
                if (this.chart) {
                    this.chart.clear();
                    this.chart = null;
                }

                this.data_keys.length = 0;
                for (let s of this.option.series) {
                    this.data_keys.push(s.data[0].key);
                }

                let self = this;
                //等待初始动画完毕后再初始化
                setTimeout(() => {
                    self.chart = echarts.init(document.getElementById(self.chart_id));
                    self.updateData();
                }, 100);
            },

            //更新数据
            updateData: function () {
                if(!this.chart) {
                    return;
                }
                let rcd = this.rcd;
                //console.log('updateData', JSON.stringify(rcd));
                let len = this.data_keys.length
                for (let i = 0; i < len; i++) {
                    if (this.data_keys[i] in rcd) {
                        this.option.series[i].data[0].value = rcd[this.data_keys[i]];
                    }
                }
                this.chart.setOption(this.option);
            }
        }

    }
</script>