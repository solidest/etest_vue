<template>
  <div style="overflow-y:auto; height: 100%; width: 100%">
    <report-table :items="cfg" />
  </div>
</template>

<script>
  export default {
    components: {
        'report-table': () => import( /* webpackChunkName: "report-table" */ '../components/Report/ReportTable'),
    },
    created: function () {
      this.cfg = this.$store.getters.getConfig('report');
    },

    data: () => {
      return {
        cfg: null
      }
    }

  }
</script>