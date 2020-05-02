<template>
  <v-container fluid fill-height>
    <div style="width:30%">
    </div>
    <v-card outlined width="50%" height="100%">
      <run-tree :items="run_tree" :allow_play="!running" :updated_id="updated_id" @selected="onSelected" />
    </v-card>

  </v-container>
</template>

<script>
  import tman from '../feature/TreeMan';

  export default {
    components: {
      'run-tree': () => import( /* webpackChunkName: "runtree" */ '../components/RunTree'),
    },

    data: () => ({
      proj_id: -1,
      proj_name: '',
      show_tree: true,

      making: false,
      run_tree: [],
      runtree_id: null,

      updated_id: null,
      watch_item: null,
      outlines: null,
      run_tasks: [],
      run_task: null,

    }),

    computed: {
      running: function () {
        return this.$store.state.running;
      },
      title: function () {
        if (this.run_task) {
          let p = tman.findParentItem({
            children: this.run_tree
          }, this.run_task.id);
          return `正在执行：${p.fullpath}#${this.run_task.name}`
        } else {
          return ''
        }
      }
    },

    created: function () {
      this.run_tree = this.$store.getters.getConfig('report');
    },

    methods: {

      //生成结束
      onMaked(run_tree) {
        this.run_tree = [run_tree];
        let self = this;
        //console.log(run_tree)

        //TODO save run_tree
        setTimeout(() => {
          self.making = false;
          self.runtree_id = "abc"
        }, 1000)
      },

      //加载执行文件树
      loadRunTree() {
        let self = this;

        if (!this.maked_id) {
          this.run_tree = [];
        } else {
          this.$store.dispatch('getRunTree', this.maked_id)
            .then(res => {
              self.run_tree = res.tree;
            })
        }
      },

      //节点被选中
      onSelected(e) {
        this.watch_item = e;
        //console.log('selected',e)
      },


    }

  }
</script>