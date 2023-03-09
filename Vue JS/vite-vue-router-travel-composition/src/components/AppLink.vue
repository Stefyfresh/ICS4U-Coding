<template>
    <a 
        v-if="isExternal" 
        :href="to"
        target="_blank"
        rel="noopener"
        class="external-link"
    ><slot></slot></a>
    <RouterLink v-else v-bind="$props" class="internal-link"><slot></slot></RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import {RouterLink} from 'vue-router';

const props = defineProps(RouterLink.props);

const isExternal = computed(() => typeof props.to === 'string' && props.to.startsWith('http'));

</script>
