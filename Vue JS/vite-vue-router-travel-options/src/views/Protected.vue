<template>
    <div class="">
        <h1>Greetings, {{ username }}</h1>
        <button @click="logout">Logout</button>
        <RouterLink :to="{name: 'Invoices'}">
            <button>Invoices</button>
        </RouterLink>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: window.user
        }
    }, 
    methods: {
        logout() {
            window.user = null;
            this.$router.push({name: 'Home'})
        }
    }
}
</script>