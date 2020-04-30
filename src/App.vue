<template>
  <v-app id="etest-vue">

    <v-snackbar bottom :timeout="touts" :color="tip_color" v-model="tip">
      {{ tip_msg }}
      <v-btn icon small @click="tip=false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-app-bar dark app height="80" color="primary">

      <v-tabs icons-and-text v-model="sel" @change="onChange">
        <v-tab v-for="tab in tabs" :key="tab.id">
          {{ tab.title }}
          <v-icon>{{tab.icon}}</v-icon>
        </v-tab>
      </v-tabs>
      <v-spacer />

      <v-btn icon @click="onClose" class="mr-2">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app color="accent">

      <span>凯云科技 &copy; 2020</span>

    </v-footer>

  </v-app>
</template>
<style>
  ::-webkit-scrollbar {
    display: none;
  }
</style>

<script>
  export default {
    errorCaptured(err /*, vm, info*/ ) {
      this.$store.commit("setMsgError", err.message);
      return true;
    },

    created: function () {
      let cfg = this.$store.getters.getConfig('app');
      this.tabs = cfg.tabs;
      this.tab = this.tabs[0];
    },

    mounted: function () {
      if (this.$route.path !== '/') {
        this.$router.push({
          name: 'Home'
        });
      }
    },

    data: () => {
      return {
        sel: 0,
        tabs: null,
        tab: null
      }
    },

    computed: {
      tip: {
        get: function () {
          return this.$store.state.last_tip.tip;
        },
        set: function (newValue) {
          if (!newValue) this.$store.commit('clearMsg');
        }
      },
      tip_msg: function () {
        return this.$store.state.last_tip.tip_msg;
      },
      tip_color: function () {
        let c = this.$store.state.last_tip.tip_type;
        if (c === 'info') {
          return 'grey darken-1';
        } else {
          return c;
        }
      },
      touts: function () {
        let t = this.tip_color;
        if (t === 'error') {
          return 100000;
        } else {
          return 10000;
        }
      }
    },

    methods: {
      onClose: function () {
        this.$store.commit('cmdExit');
      },
      onChange: function (idx) {
        this.tab = this.tabs[idx];
        if (!this.tab) {
          return;
        }
        if (this.tab && this.tab.id === 'help') {
          let self = this;
          this.$nextTick(() => {
            self.sel = 0;
            self.tab = self.tabs[0];
          });
          this.$store.commit('cmdOpen', 'https://solidest.github.io/etest_sdk/#/');
        } else {
          let rt = this.tab.router;
          if (!rt) {
            return;
          }
          this.$router.push({
            name: rt
          });
        }
        let self = this;
        this.$nextTick(() => {
          self.$store.commit('setMsgInfo', this.tab.readme);
        });
      },
    }
  }
</script>