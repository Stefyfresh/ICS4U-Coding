
<template>
    <header>
        <h1>{{title}}</h1>
        <Button @btn-click="$emit('toggle-form')" :text="isActive ? 'Close' : 'Add Task'" :color="isActive ? 'red' : 'green'" v-show="homePage"></Button>
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
    },
    computed: {
        homePage() {
            if (this.$route.path === '/') {
                return true
            } else {
                return false
            }
        }
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