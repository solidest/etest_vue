<template>
    <v-container fluid d-flex flex-wrap justify-space-around>
        <v-btn v-for="(opt, idx) in option" :key="idx" class="ma-2" :block="opt.block" :rounded="opt.rounded"
            :dark="opt.dark" :fab="opt.fab" :small="opt.small" :large="opt.large" :color="opt.color||'primary'" @click="onClick(idx)">
            <v-icon v-if="opt.icon" :left="opt.icon && !opt.fab">{{opt.icon}}</v-icon> {{opt.name}}
        </v-btn>
    </v-container>
</template>
<script>
    /**
     *  空组件
     */
    export default {
        props: ['panel_id', 'option'],
        methods: {
            onClick: function(i) {
                let opt = this.option[i];
                if (opt.run_id) {
                    this.$store.commit('cmdRun', {
                        panel_id: this.panel_id,
                        run_id: opt.run_id
                    });
                } else if (opt.command) {
                    this.$store.commit('cmdCommand', {
                        panel_id: this.panel_id,
                        command: opt.command
                    });
                } else {
                    console.log('click :', JSON.stringify(opt));
                }
            }
        }
    }
</script>