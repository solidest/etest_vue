<template>
  <v-container fluid fill-height>
    <v-card flat width="100%">
      <img alt="ETestDev" src="../assets/logo.svg">
      <v-card-title v-for="(memo, index) in cfg.memos" :key="index">
        {{memo}}
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    created: function () {
      this.cfg = this.$store.getters.getConfig('home');
    },

    data: () => {
      return {
        cfg: null
      }
    }

  }
</script>