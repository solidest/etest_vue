
let timer;

function stop() {
    if(timer) {
        clearInterval(timer);
        timer = null;
    }
}

function demo1(params, sender, stopper) {
    stop();
    let res = {
        lamp1: params.switch1,
        lamp2: params.switch2,
        lamp3: params.switch3,
        lamp4: params.switch4,
    }
    setTimeout(()=>{
        sender([res])
    }, 100);
    setTimeout(()=>{
        stopper();
    }, 110);
}

function demo2(params, sender) {
    stop();
    timer = setInterval(()=>{
        let sd = (Math.random()*200).toFixed(2) - 0;
        let zs = (Math.random()*7).toFixed(2) - 0;
        let sw = (Math.random()*2).toFixed(2) - 0;
        let yl = (Math.random()*2).toFixed(2) - 0;
        sender([{v_sd: sd, v_zs: zs, v_yl: yl, v_sw: sw}]);
    }, 1000);
}


function demo3(_, sender) {
    stop();
    let ms = 0;
    let v1 = 0;
    let v2 = 0;
    let v3 = 0;
    let step = 0.005
    timer = setInterval(()=>{
        let vs = [];
        for(let i=0; i<40; i++) {
            let data = {$time: ms};

            //v1
            if(ms%500===0) {
                v1 = v1+Math.random()*21-10;
                data.v1 = v1;               
            }
            
            //v2
            v2 += step;
            let _v2 = Math.sin(v2)*50;
            if(_v2===50 || _v2===-50) {
                step = -step;
            }
            data.v2 = _v2;

            //v3
            let _v3 = v3;
            if(_v2>25) {
                _v3 = 3;
            } else if(_v2>0) {
                _v3 = 2;
            } else if(_v2>-25) {
                _v3 = 1;
            } else {
                _v3 = 0;
            }
            if(_v3!==v3) {
                v3 = _v3;
                data.v3 = v3;
            }
            
            vs.push(data);
            ms += 1;
        }
        sender(vs);
    }, 40);
}


module.exports = {
    stop, demo1, demo2, demo3
}

