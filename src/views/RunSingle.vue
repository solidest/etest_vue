<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card outlined width="500px" height="100px" class="mx-auto">
                <button-run :run_id="cfg.run_id" :panel_id="panel_id" :run_title="cfg.title" :run_memo="cfg.memo" />
            </v-card>
        </v-row>
        <v-row>
            <v-card outlined width="500px" height="460px" class="mx-auto pa-4">
                <run-out :panel_id="panel_id"/>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        components: {
            'button-run': () => import( /* webpackChunkName: "button-run" */ '../components/ButtonRun'),
            'run-out': () => import( /* webpackChunkName: "run-out" */ '../components/RunOut'),
        },
        created: function () {
            this.cfg = this.$store.getters.getConfig('panel_out');
        },

        data: () => {
            return {
                cfg: {},
                panel_id: 'out'
            }
        }

    }
</script>