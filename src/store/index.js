import Vue from 'vue';
import Vuex from 'vuex';
import {ipcRenderer, remote, shell} from 'electron';
import fs from 'fs';
import yaml from 'js-yaml';
import OutParser from '../feature/parse_out';
import path from 'path';


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
      run_logs: null,
      run_id: null,
      panel_id: null,
      last_result: null,
    },
    records: [],
    params: {},
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
    setParam: function(state, pv) {
      state.params[pv.param] = pv.value;
    },

    //切换到新的面板上
    updatePanel: function(state, id) {
      if(state.work.panel_id === id) {
        return;
      }
      state.work.panel_id = id;
      state.work.run_id = null;
      state.work.run_logs = null;
      state.work.last_result = null;
      state.params = {};
      state.records = [];
    },

    //更新下位机工作状态
    updateWorkState: function (state, work) {
      state.work.run_state = work.run_state;
      if(work.run_uuid){
        state.work.run_logs = new OutParser(work.run_uuid);
        state.work.last_result = null;
      } else if(state.work.run_logs) {
        state.work.last_result = state.work.run_logs.lastResut();
      }
    },

    //更新下位机系统输出
    updateSyslog: function(state, log) {
      let logs = state.work.run_logs;
      if(logs) {
        logs.pushLog(log);
      }
    },

    //更新下位机上传记录
    updateRecord: function(state, rcds) {
      let _rcds = state.records;
      for(let r of rcds) {
        _rcds.push(r);
      }
      let rmc = _rcds.length-20000;  //最多保留20000条记录
      if(rmc>0) {
        while (rmc-- > 0) {
          _rcds.shift();
        }
      }
    },

    //执行用例
    cmdRun: function(state, run_info) {
      state.records = [];
      if(state.work.panel_id!==run_info.panel_id) {
        state.params = {};
        state.work.panel_id = run_info.panel_id;
      }
      state.work.run_logs = null;
      state.work.last_result = null;
      state.work.run_id = run_info.run_id;
      ipcRenderer.send('cmd-run', run_info.run_id, state.params);
    },

    //执行命令
    cmdCommand: function(state, cmd_info) {
      if(!state.work.run_logs || state.work.panel_id!==cmd_info.panel_id) {
        state.last_tip.tip_msg = '内部错误2';
        state.last_tip.tip_type = 'error';
        state.last_tip.tip = true;
        return;
      }
      ipcRenderer.send('cmd-command', state.work.run_log.run_uuid, cmd_info.command, state.params);
    },

    //停止下位机执行
    cmdStop: function() {
      ipcRenderer.send('cmd-stop');
    },

    //退出应用
    cmdExit: function() {
      remote.app.quit();
    },

    //打开url
    cmdOpen: function(_, url) {
      shell.openExternal(url);
    },
  },
  getters: {
    getConfig: () => (id) => {
      let f = path.join(__static, 'config/' + id + '.yml');
      return yaml.safeLoad(fs.readFileSync(f, 'utf8'));
    },
    lastRecord: state => {
      return state.records.length===0 ? {} : state.records[state.records.length-1];
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
ipcRenderer.on('sys-info', (_, time, msg, msg_type) => {
  _store.commit('updateSyslog', {time: Math.floor(time/1000/1000), type: msg_type, msg: msg});
});

//数据记录输出
ipcRenderer.on('records', (_, rcds) => {
  _store.commit('updateRecord', rcds);
})

export default _store;