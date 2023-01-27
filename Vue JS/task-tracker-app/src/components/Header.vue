
<template>
    <header>
        <h1>Task Tracker</h1>
        <Button @btn-click="$emit('toggle-form')" :text="isActive ? 'Close' : 'Add Task'" :color="isActive ? 'red' : 'green'"></Button>
    </header>
</template>

<script>
import Button from '../components/Button.vue'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    props: {
        title: String,
        isActive: Boolean,
    },
    components: {
        Button
    }
    
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>