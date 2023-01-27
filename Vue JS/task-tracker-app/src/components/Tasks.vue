<template>
    <div>
        <div :key="task.id" v-for="task in tasks">
            <Task @toggle-reminder="$emit('toggle-reminder', task.id)" @delete-task="$emit('delete-task', task.id)" :task="task"></Task>
        </div>
    </div>
</template>

<script>
import Task from './Task.vue'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Tasks',
    props: {
        tasks: Array
    },
    components: {
        Task
    }
}
</script>