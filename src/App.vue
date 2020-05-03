<template>
  <v-app id="etest-vue">
    <v-app-bar dark app height="80" color="primary">
      <v-tabs icons-and-text v-model="sel" @change="onChange" show-arrows>
        <v-tab v-for="tab in tabs" :key="tab.id">
          {{ tab.title }}
          <v-icon>{{tab.icon}}</v-icon>
        </v-tab>
      </v-tabs>
      <v-spacer />

      <v-menu offset-x bottom left>
        <template v-slot:activator="{ on }">
          <v-fab-transition>
            <v-btn color="cyan darken-1" absolute bottom right fab v-on="on" v-show="subs.length>0">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>

        <v-list>
          <v-list-item v-for="(item) in subs" :key="item.id" @click="gotoSub(item)"
            :disabled="item.router===$route.name">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-snackbar bottom :timeout="touts" :color="tip_color" v-model="tip">
      {{ tip_msg }}
      <v-btn icon small @click="tip=false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app color="accent">
      <span v-if="tab && tab.readme">{{tab.readme}} </span>
      <span class="ml-2"> &copy; 凯云科技 &copy; 2020</span>
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
      this.loadSub();
    },

    data: () => {
      return {
        sel: 0,
        tabs: null,
        tab: null,
        subs: []
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

      //切换子模块
      gotoSub: function (item) {
        if (item.router) {
          this.$router.push({
            name: item.router
          });
        }
      },

      //加载子模块
      loadSub: function () {
        let tab = this.tab;
        this.subs.length = 0;
        if (!tab || !tab.children) {
          return;
        }
        for (let c of tab.children) {
          this.subs.push(c);
        }
        if (this.subs.length > 0) {
          this.gotoSub(this.subs[0]);
        }

      },

      //切换主模块
      onChange: function (idx) {
        this.tab = this.tabs[idx];
        if (!this.tab) {
          return;
        }
        if (this.tab.id === 'exit') {
          this.$store.commit('cmdStop');
          setTimeout(()=>{
            this.$store.commit('cmdExit');
          }, 500);
          return;
        }

        if (this.tab.id === 'help') {
          let self = this;
          this.$nextTick(() => {
            self.sel = 0;
            self.tab = self.tabs[0];
          });
          this.$store.commit('cmdOpen', 'https://solidest.github.io/etest_sdk/#/');
        } else {
          let rt = this.tab.router;
          if (rt) {
            this.subs.length = 0;
            this.$router.push({
              name: rt
            });
          }
        }
        this.loadSub();
      },
    }
  }
</script>