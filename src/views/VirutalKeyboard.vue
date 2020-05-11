<template>
    <div id="app" class="ma-3">
        <v-text-field :value="input" outlined @change="onInputChange" />
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" />
    </div>
</template>
<script>
    import SimpleKeyboard from "../components/SimpleKeyboard";

    export default {

        components: {
            SimpleKeyboard
        },
        data: () => ({
            input: ""
        }),
        methods: {
            onChange(input) {
                this.input = input;
            },
            onKeyPress(button) {
                if(button==='{enter}')
                console.log("enter");
            },
            onInputChange(v) {
                this.input = v;
            }
        }
    };
</script>