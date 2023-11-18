<script setup lang="ts">
import router from '@/router';
import { useGameStore } from '@/stores/gameStore';

    const store = useGameStore();

    function choosePlayers(){
        router.push('/players');
    }
</script>

<template>
    <div class="flex flex-col gap-10 text-center p-2">
        <div class="text-3xl font-bold">Rules upon Arrival</div>
        <p>
            {{ store.getRules() }}
        </p>

        <button @click="choosePlayers" class="text-xl">
            Declare your crew: .............X
        </button>
    </div>
    
</template>

<style>
</style>
