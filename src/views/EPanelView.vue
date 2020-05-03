<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card flat width="90%" height="800px" class="mx-auto pa-4" id="_sankey_">
                <epanel :panel_id="panel_id" :config="config" />
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        props: ['panel_id'],

        components: {
            'epanel': () => import( /* webpackChunkName: "epanel" */ '../components/EWidgets/EPanel'),
        },

        data: () => {
            return {
                config: null
            }
        },

        watch: {
            panel_id: function (new_val) {
                this.loadPanel(new_val);
            }
        },

        created: function () {
            this.loadPanel(this.panel_id);
        },

        methods: {
            loadPanel: function(pid){
                this.config = this.$store.getters.getConfig(pid);
            }
        }
    }
</script>