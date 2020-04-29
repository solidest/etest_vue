
/**
 * 输出日志解析器
 */


//代码执行器
class OutParser {

    constructor(run_uuid) {
        this.run_uuid = run_uuid;
        this.stack = [];
        this.items = [];
        this.result = null;
    }

    //清空堆栈 到指定级别
    _stackClear(res, ilev) {
        while(this.stack.length>0) {
            let top = this.stack.pop();
            if(top.level>=ilev) {
                if(!top.result) {
                    top.result = res;
                }
            } else {
                this.stack.push(top);
                break;
            }
        }
    }

    //最后的结果
    lastResut() {
        return this.result || 'ok';
    }

    //压堆输出日志
    pushLog(info) {
        //console.log(info.type, this.stack.length);

        switch (info.type) {
            //需要堆栈操作
            case 'assertFail': {
                this._stackClear('fail', 1);
                this.result = this.result || 'fail';
                let log = {level: 1, type: 'assertFail', time: info.time, text: JSON.parse(info.msg).message, result: 'fail'};
                this.items.push(log);
                break;
            }

            case 'verifyFail': {
                this._stackClear('fail', 1);
                this.result = this.result || 'fail';
                let log = {type: 'verifyFail', time: info.time, text: JSON.parse(info.msg).message, result: 'fail'};
                this.items.push(log);
                break;
            }

            case 'log_step':{
                this._stackClear('ok', 2);
                let log = {level: 2, type: 'step', time: info.time, text: JSON.parse(info.msg).message};
                this.items.push(log);
                this.stack.push(log);
                break;
            }

            case 'log_action': {
                this._stackClear('ok', 3);
                let log = {level: 3, type: 'action', time: info.time, text: JSON.parse(info.msg).message};
                this.items.push(log);
                this.stack.push(log);
                break;
            }

            case 'log_error': {
                this._stackClear('error', 3);
                this.result = 'error';
                let log = {type: 'error', time: info.time, text: JSON.parse(info.msg).message, result: 'error'}
                this.items.push(log);
                break; 
            }

            case 'log_check': {
                let res = JSON.parse(info.msg);
                let log = {type: 'check', time: info.time, text: res.message, result:(res.result?'ok':'fail')}
                if(!res.result) {
                    this._stackClear('fail', 1);
                    this.result = this.result || 'fail';
                }
                this.items.push(log);
                break;
            }

            //堆栈无关
            default: {
                let type = '';
                let text = '';
                if(info.type==='log_warn') {
                    type = 'warn';
                    text = JSON.parse(info.msg).message;
                } else if(info.type === 'log_info') {
                    type = 'info';
                    text = JSON.parse(info.msg).message;
                } else if(info.type === 'print') {
                    type = 'print';
                    text = info.msg;
                } else {
                    console.error(info);
                }
                let log = {type: type, time: info.time, text: text}
                this.items.push(log)
                break;
            }
        }
    }

}

export default OutParser