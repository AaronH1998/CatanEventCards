<script setup lang="ts">
import HelloWorld from '../components/HelloWorld.vue';

    const msg="Hello World";

</script>

<template>
    <div class="flex border-b bg-red-700 text-white justify-between h-[50px] items-center p-2">
        <span class="font-semibold text-2xl">Catan Event Cards</span>
        <button @click="$router.go(0)"><font-awesome-icon icon="fa-solid fa-house" /></button>
    </div>

    <HelloWorld :msg="msg"/>
</template>

<style>
</style>
