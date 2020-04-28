import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer, remote, shell} from 'electron'
const fs = require('fs');
import yaml from 'js-yaml';

Vue.use(Vuex);

const _store = new  Vuex.Store({
  state: {
    last_tip: {
      tip: false,
      tip_msg: '',
      tip_type: 'info'
    },
    work: {
      run_state: 'idle',
      run_uuid: null,
      run_prog_id: null,
      run_panel_id: null
    },
    syslogs: [],
    records: [],
  },
  mutations: {
    setMsgInfo: function (state, msg) {
      state.last_tip.tip_msg = msg
      state.last_tip.tip_type = 'info'
      state.last_tip.tip = true
    },
    setMsgSuccess: function (state, msg) {
      state.last_tip.tip_msg = msg
      state.last_tip.tip_type = 'success'
      state.last_tip.tip = true
    },
    setMsgError: function (state, msg) {
      state.last_tip.tip_msg = msg
      state.last_tip.tip_type = 'error'
      state.last_tip.tip = true
    },
    clearMsg: function (state) {
      state.last_tip.tip_msg = '$'
      state.last_tip.tip = false
    },
    updateWorkState: function (state, work) {
      state.work.run_state = work.run_state;
      state.work.run_uuid = work.run_uuid;
    },
    updateSyslog: function(state, log) {
      state.syslogs.push(log);
    },
    updateRecord: function(state, rcds) {
      let _rcds = state.records;
      for(let r of rcds) {
        _rcds.push(r);
      }
      let rmc = _rcds.length-5000;  //最多保留5000条记录
      if(rmc>0) {
        while (rmc-- > 0) {
          _rcds.shift();
        }
      }
    },
    cmdRun: function(state, run_info) {
      state.syslogs = [];
      state.records = [];
      state.work.run_panel_id = run_info.ui_id;
      state.work.run_id = run_info.run_id;
      ipcRenderer.send('cmd-run', run_info.run_id);
    },
    cmdStop: function() {
      ipcRenderer.send('cmd-stop');
    },
    cmdExit: function() {
      remote.app.quit();
    },
    cmdOpen: function(_, url) {
      shell.openExternal(url);
    },
  },
  getters: {
    getConfig: () => (id) => {
      let f = 'static/config/' + id + '.yml';
      return yaml.safeLoad(fs.readFileSync(f, 'utf8'));
    }
  },
  actions: {
  },
  modules: {
  }
});

//更新执行机状态
ipcRenderer.on('sys-state', (_, work_state, run_uuid) => {
  _store.commit('updateWorkState', {run_state: work_state, run_uuid: run_uuid});
});

//系统错误信息
ipcRenderer.on('sys-error', (_, msg) => {
  _store.commit('setMsgError', msg);
});

//系统输出信息
ipcRenderer.on('sys-info', (_, msg, msg_type) => {
  _store.commit('udpateSyslog', {type: msg_type, msg: msg});
});

//数据记录输出
ipcRenderer.on('records', (_, rcds) => {
  _store.commit('updateRecord', rcds);
})

export default _store;