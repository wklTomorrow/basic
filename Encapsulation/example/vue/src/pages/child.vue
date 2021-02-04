<template>
    <div>
        child
        <button @click="onClick">点击</button>
    </div>
</template>

<script>
import event from '../../../../eventBus/event'
// const event = require('../../../../eventBus/event.js');
export default {
    data() {
        return {

        }
    },
    methods: {
        onClick() {
            this.$emit('create', true, 1, 444)
            event.emit('test', 'hello world', true, 10)
        }
    }
}
</script>

<style scoped>

</style>
