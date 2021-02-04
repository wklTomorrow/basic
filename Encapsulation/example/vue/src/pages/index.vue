<template>
    <div>
        parent
        <Child @create="create"/>
    </div>
</template>

<script>
import Child from './child'
import event from '../../../../eventBus/event'

export default {
    components: {
        Child
    },
    data() {
        return {

        }
    },
    created() {
        event.on('test', (e) => {
            console.log(e)
        })
        event.on('test', (e) => {
            console.log(e + 'hello wolrd')
        })
    },
    methods: {
        create(...e) {
            // console.log(e)
        }
    }
}
</script>

<style scoped>

</style>
