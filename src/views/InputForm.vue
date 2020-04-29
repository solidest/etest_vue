<template>
    <v-container fluid fill-height>
        <div style="width:30%">
        </div>
        <v-card width="40%" class="pa-6" >
            <vue-form-generator :schema="cfg.schema" :model="cfg.model" :options="cfg.formOptions">
            </vue-form-generator>
        </v-card>
    </v-container>
</template>

<script>
    import Vue from 'vue'
    import VueFormGenerator from 'vue-form-generator'
    import '../assets/vfg/vfg-core.css'

    Vue.use(VueFormGenerator)

    export default {
        created: function () {
            this.cfg = this.$store.getters.getConfig('inputform');
        },
        data() {
            return {
                cfg: {}
            }
        }
    }
</script>