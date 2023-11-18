<script setup lang="ts">
import {RouterView} from 'vue-router'
import router from './router';
import parchment from '@/assets/images/parchment.png'
import woodenTable from '@/assets/images/wooden-table.jpg'

function goHome(){
  router.push('/');
}
</script>

<template>
  <div class="h-full flex flex-col" :style="{backgroundImage:`url(${woodenTable})`, backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}">
      <div class="flex bg-red-500 text-yellow-500 justify-between h-[50px] items-center p-4">
        <span class="font-semibold text-2xl">Catan Event Cards</span>
        <button @click="goHome"><font-awesome-icon icon="fa-solid fa-house" /></button>
      </div>

      <div :style="{backgroundImage:`url(${parchment})`, backgroundSize: 'auto 106%', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}" class="flex-grow">
        <RouterView class="mt-[5%] ml-auto mr-auto" />
      </div>


  </div>
  </template>

<style lang="scss">
  @import '@/assets/app.scss';
</style>
