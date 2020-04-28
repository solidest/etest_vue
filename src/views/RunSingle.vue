<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card outlined width="500px" height="80px" class="mx-auto">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>用例xxxx</v-list-item-title>
                        <v-list-item-subtitle>说明：用例xxxx针对部件A的yyy功能进行自动检查</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn color="primary" depressed fab>
                            <v-icon large>
                                mdi-play
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-card>
        </v-row>
        <v-row>
            <v-card outlined width="500px" height="360px" class="mx-auto pa-4">

            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'home',
        created: function () {
            this.items = this.$store.getters.getConfig('lists');
        },

        data: () => {
            return {
                items: []
            }
        }

    }
</script>