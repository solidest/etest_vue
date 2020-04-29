<template>
    <div>
        <v-chip-group column v-if="runs">
            <v-chip class="ma-2 pa-3" v-for="run in runs" v-bind:key="run.id" :color="getColor(run)"
                @click.native="onSelect(run)">
                {{run.name}}
            </v-chip>
        </v-chip-group>
    </div>
</template>

<script>
    export default {
        name: 'run-detail',
        props: ['runs'],
        data: ()=> {
            return {
                logs: null,
                show_logs: false
            }
        },
        methods: {
            getColor: function (item) {
                switch (item.result) {
                    case 'ok':
                        return 'success';
                    case 'fail':
                        return 'error';
                    case 'error':
                        return 'warning';
                    default:
                        return null;
                }
            },

            onSelect: function (item) {
                //console.log(item)
                if (item.logs) {
                    this.$emit('show_logs', item.logs);
                }

            }
        }
    }
</script>