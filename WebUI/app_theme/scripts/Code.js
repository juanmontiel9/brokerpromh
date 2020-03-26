// Define a new component called button-counter
Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">Test Vue.js Integration - click {{ count }} times.</button>',
    services: {
        down: function () {
            console.log("Consume API Service down");
        },
        up: function () {
            console.log("Consume API Service up");
        },
        left: function () {
            console.log("Consume API Service left");
        },
        right: function () {
            console.log("Consume API Service right");
        }
    }
});

new Vue({
    el: '#app',
    data() {
        return {
            info: null,
            loading: true,
            errored: false
        }
    },
    filters: {
        currencydecimal(value) {
            return value.toFixed(2)
        }
    },
    mounted() {
        axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
                this.info = response.data.bpi
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
    }
})