<template>
  <TheNavigation></TheNavigation>
  <div class="container">
    <RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </Transition>
    </RouterView>

  </div>
</template>

<script setup>
import TheNavigation from "@/components/TheNavigation.vue";
</script>

<style>
.fade-enter-active, 
.fade-leave-active{
  transition: opacity .4s, transform .4s;
}
.fade-enter-from,
.fade-leave-to{
  opacity: 0;
  transform: translateX(-5%);
}
</style>
