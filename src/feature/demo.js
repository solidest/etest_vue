
function demo1(params, sender) {
    let res = {
        lamp1: params.switch1,
        lamp2: params.switch2,
        lamp3: params.switch3,
        lamp4: params.switch4,
    }
    setTimeout(()=>{
        sender([res]), 100
    })
}

module.exports = {
    demo1
}

