<template>
    <div style="display:inline-block">
        <div :style="`display:inline-block; width: ${ok}px; height: 15px; background: #4CAF50`">
        </div>
        <div :style="`display:inline-block; width: ${fail}px; height: 15px; background: #FF5252`">
        </div>
        <div :style="`display:inline-block; width: ${error}px; height: 15px; background: #FB8C00`">
        </div>
        <div :style="`display:inline-block; width: ${none}px; height: 15px; background: #E0E0E0`">
        </div>
    </div>
</template>

<script>
export default {
    name: 'run-sate',
    props: ['state'],
    data: ()=> {
        return {
            ok: 0,
            fail: 0,
            error: 0,
            none: 0,
            width: 120,
        }
    },
    mounted: function() {
        if(this.state) {
            let total = this.state.total || 0;
            let ok = this.state.ok || 0;
            let fail = this.state.fail || 0;
            let error = this.state.error || 0;
            if(total<=0) {
                total = 1;
            }
            this.ok = Math.floor(this.width*ok/total);
            this.fail = Math.floor(this.width*fail/total);
            this.error = Math.floor(this.width*error/total);
            if(ok+fail+error<total) {
                this.none = this.width - this.ok - this.fail - this.error;
            }
        }
    }
}
</script>