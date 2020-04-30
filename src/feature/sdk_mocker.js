const shortid = require('shortid');
const lokijs = require('lokijs');
const {
    ipcMain
} = require('electron');
const fs = require('fs');
const path = require('path');

let _db = null;
let _run_uuid = null;
let _timer = null;
let _render = null;

//推送系统错误信息
function send_sys_err(msg) {
    _render.webContents.send('sys-error', msg);
}

//推送系统信息
function send_sys_info(time, msg, msg_type) {
    // assert(!_render)
    _render.webContents.send('sys-info', time, msg, msg_type);
}

//推送系统状态变更
function send_sys_state(state, opt) {
    _render.webContents.send('sys-state', state, opt);
}

//推送数据记录
function send_records(rcds) {
    if (!rcds || rcds.length === 0) {
        return;
    }
    _render.webContents.send('records', rcds);
}

//推送系统记录
function send_syslog(logs) {
    if (!logs) {
        return;
    }
    for (let r of logs) {
        if (r.catalog === 'system') {
            switch (r.kind) {
                case 'stop':
                    _clear();
                    send_sys_state('idle');
                    break;

                case 'error':
                    send_sys_err(r.value ? r.value : JSON.stringify(r));
                    break;

                case 'print':
                case 'verifyFail':
                case 'assertFail':
                    send_sys_info(r.time, r.value, r.kind);
                    break;

                case 'start':
                case 'entry':
                case 'exit':
                    break;

                default:
                    console.error(r);
                    break;
            }
        } else if (r.catalog === 'log') {
            send_sys_info(r.time, r.value, 'log_' + r.kind);
        } else if (r.catalog !== "record") {
            console.error(r);
        }
    }
}


//清除上一次执行的状态
function _clear() {
    if (_timer) {
        clearInterval(_timer);
    }
    _timer = null;
    _db = null;
    _run_uuid = null;
}


//数据库加载完毕开始tick
function _start_tick() {
    let c_syslog = _db.getCollection('output');
    let c_record = _db.getCollection('record');
    let last_t = 0;
    _timer = setInterval(() => {
        let next_t = last_t + (40 * 1000 * 1000);
        let logs = c_syslog.find({
            $and: [{
                time: {
                    $jgte: last_t
                }
            }, {
                time: {
                    $jlt: next_t
                }
            }]
        });
        let rcds = c_record.find({
            $and: [{
                $time: {
                    $jgte: last_t
                }
            }, {
                $time: {
                    $jlt: next_t
                }
            }]
        });
        send_syslog(logs);
        send_records(rcds);
        last_t = next_t;
    }, 40);
}

//初始化数据库
function _loaddb(run_id) {
    let f = path.join(__static, '/logdb/' + run_id + '.json');
    if (!fs.existsSync(f)) {
        send_sys_err('没有找到run_id:' + run_id);
        return null;
    }
    return new lokijs(f, {
        autoloadCallback: () => {
            setTimeout(_start_tick, 40);
        },
        autoload: true,
        autosave: false
    });
}

//停止执行
function stop() {
    if (_run_uuid) {
        _clear();
        send_sys_state('idle');
    }
}

//执行用例
function run(_, run_id) {

    if (_run_uuid) {
        return send_sys_err('ETest正在执行');
    }
    _clear();
    _db = _loaddb(run_id);

    if (_db) {
        _run_uuid = shortid.generate();
        send_sys_state('running', _run_uuid);
    }
}

//查询状态
function state() {
    if (_run_uuid) {
        return send_sys_state('running', _run_uuid);
    } else {
        return send_sys_state('idle');
    }
}

ipcMain.on('cmd-stop', stop);
ipcMain.on('cmd-run', run);

function setup(render) {
    _render = render;
    // assert(!_render)
    state();
}

module.exports = {
    setup
}