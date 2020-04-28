<template>
  <v-container class="fill-height pa-0 ma-0" fluid>
    <v-navigation-drawer absolute permanent left width="380px">
      <tree-main :config="{items: cfg.items2, icons: cfg.icons}" />
    </v-navigation-drawer>

    <v-navigation-drawer absolute permanent right width="380px">
      <tree-simple :config="{items: cfg.items1, icons: cfg.icons}" />
    </v-navigation-drawer>
  </v-container>
</template>


<script>
  export default {
    components: {
      'tree-simple': () => import( /* webpackChunkName: "tree-simple" */ '../components/TreeSimple'),
      'tree-main': () => import( /* webpackChunkName: "tree-main" */ '../components/TreeMain')
    },
    created: function () {
      this.cfg = this.$store.getters.getConfig('tree');
    },
    data: () => {
      return {
        cfg: {}
      }
    }
  }
</script>