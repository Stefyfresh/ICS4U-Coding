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

<script>
import {RouterLink} from 'vue-router';
export default {
    props: { ...RouterLink.props },
    components: { RouterLink },
    computed: {
        isExternal() {
            return typeof this.to === 'string'&& this.to.startsWith('http')
        }
    }
}
</script>

