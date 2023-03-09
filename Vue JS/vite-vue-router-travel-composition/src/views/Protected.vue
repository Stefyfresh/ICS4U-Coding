<template>
    <div class="">
        <h1>Greetings, {{ username }}</h1>
        <button @click="logout">Logout</button>
        <RouterLink :to="{name: 'Invoices'}">
            <button>Invoices</button>
        </RouterLink>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const username = ref(window.user);
const router = useRouter();

function logout() {
    window.user = null;
    router.push({name: 'Home'});
}
</script>