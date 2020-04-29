<template>
  <div id="runtree" @mouseleave.stop="outTree">
    
    <v-treeview dense :items="items" :open="open" :active.sync="active" activatable item-key="id" return-object
      hoverable @update:active="onSelected" selectable v-model="selection">

      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item.is_dir">
          {{item.type!=='bpmn' ? (open ? 'mdi-folder-open' : 'mdi-folder'):(open ? 'mdi-folder-open-outline' : 'mdi-folder-table-outline') }}
        </v-icon>
        <v-icon v-else>
          mdi-music-accidental-sharp
        </v-icon>
      </template>

      <template v-slot:label="{ item }">
        <v-list-item-title @mouseover="tool_item=item" style="cursor: pointer; ">
          <span>
            {{item.name}}
          </span>
          <span v-if="item.is_dir" class="caption font-italic font-weight-light">
            {{item.title}}
          </span>
          <span class="pl-3" v-else-if="item.result==='ok'"> &#10004;</span>
          <span class="pl-3" v-else-if="item.result==='fail'"> &#10008;</span>
          <span class="pl-3" v-else-if="item.result==='error'"> &#9888;</span>
        </v-list-item-title>
      </template>

      <template v-slot:append="{ item }" @mouseover="tool_item=item">
        <v-btn v-if="tool_item===item" fab depressed x-small color="primary" :disabled="!(allow_play && hasTest(item))"
          @click.stop="onRun(item)">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </template>
    </v-treeview>

  </div>
</template>
<script>
  export default {
    name: 'run-tree',
    props: ['items', 'allow_play', 'updated_id'],

    data: () => {
      return {
        edit_menu: false,
        tool_item: null,
        active: [],
        run_task: [],
        selection: [],
        open: []
      }
    },

    created: function () {
      this.udpateState(this.items[0]);
      this.open.push(this.items[0]);
    },

    watch: {
      updated_id: function() {
        this.resetState();
      }
    },

    methods: {

      //鼠标移出树控件
      outTree: function () {
        if (!this.edit_menu) {
          this.tool_item = null;
        }
      },

      //是否有选中的用例
      hasTest: function (item) {
        if (item.is_dir) {
          let res = [];
          this.findSelected(item.children, res);
          return res.length > 0;
        }
        return true;
      },


      //选中一项
      onSelected: function (e) {
        if (e && e.length > 0) {
          this.$emit('selected', e[0]);
        }
      },

      //执行某个节点项
      onRun: function (item) {
        let sel = [];
        if (item.is_dir) {
          this.findSelected(item.children, sel);
        } else {
          sel.push(item);
        }
        if (sel.length === 0) {
          return;
        }

        this.$emit('play', sel);
      },


      //收集选中的子节点
      findSelected: function (children, results) {
        for (let it of children) {
          if (it.is_dir) {
            this.findSelected(it.children, results);
          } else {
            if (this.selection.includes(it)) {
              results.push(it);
            }
          }
        }
      },

      //刷新执行状态
      resetState: function () {
        this.clearState(this.items);
        this.udpateState(this.items[0]);

        let old = this.tool_item;
        this.tool_item = old ? null : this.items[0];
        let self = this;
        this.$nextTick(() => {
          self.tool_item = old;
        });
      },

      //清除节点的状态
      clearState: function (children) {
        if (!children) {
          return;
        }
        for (let it of children) {
          if (it.is_dir) {
            it.state = null;
            this.clearState(it.children);
          }
        }
      },

      //计算节点的状态
      udpateState: function (parent) {
        let state = {
          total: 0,
          ok: 0,
          fail: 0,
          error: 0
        };
        parent.state = state;
        if (!parent.children || parent.children.length === 0) {
          return;
        }
        for (let ch of parent.children) {
          if (ch.is_dir) {
            this.udpateState(ch);
            state.total += ch.state.total;
            state.ok += ch.state.ok;
            state.fail += ch.state.fail;
            state.error += ch.state.error;
          } else {
            state.total += 1;
            switch (ch.result) {
              case 'ok':
                state.ok += 1;
                break;
              case 'fail':
                state.fail += 1;
                break;
              case 'error':
                state.error += 1;
            }
          }
        }
        let title = `共${state.total}个 `;
        if (state.ok > 0) {
          title += `通过${state.ok}个 `
        }
        if (state.fail > 0) {
          title += `失败${state.fail}个 `
        }
        if (state.error > 0) {
          title += `错误${state.error}个`
        }
        parent.title = title;
      },

    },

  }
</script>