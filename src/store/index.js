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
      //下位机工作模式
      run_state: 'idle',
      //日志解析器
      run_logs: null,
      //用例id
      run_id: null,
      //面板id
      panel_id: null,
      //run_id的执行结果
      last_result: null,
    },
    //最有一批刷新的数据
    records: [],
    //执行输入参数
    params: {},
    //正在重置中
    resetting: false
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

    //下位机工作状态有变化
    updateWorkState: function (state, work) {
      //console.log('state', work);
      state.work.run_state = work.run_state;
      if(work.run_state==='idle') {
        state.resetting = false;
      }
      if(work.run_uuid){
        state.work.run_logs = new OutParser(work.run_uuid);
        state.work.last_result = null;
      } else if(state.work.run_logs) {
        state.work.last_result = state.work.run_logs.lastResut();
      }
    },

    //下位机输出系统信息
    updateSyslog: function(state, log) {
      if(state.resetting || state.work.run_state==='idle') {
        return;
      }
      let logs = state.work.run_logs;
      if(logs) {
        logs.pushLog(log);
      }
    },

    //下位机上传了新记录
    updateRecord: function(state, rcds) {
      if(state.resetting || state.work.run_state==='idle') {
        //console.error('ignore updateRecord', JSON.stringify(rcds));
        return;
      }
      console.log('updateRecord')
      state.records = rcds;
    },

    //重置
    cmdReset: function(state, panel_id) {
      ipcRenderer.send('cmd-stop');
      state.records.length = 0;
      state.params = {};
      state.work.panel_id = panel_id;
      state.work.run_logs = null;
      state.work.last_result = null;
      state.work.run_id = null;
      if(state.work.run_state!=='idle') {
        state.resetting = true;
      }
    },

    //执行用例
    cmdRun: function(state, run_info) {
      state.records.length = 0;
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