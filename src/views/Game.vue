<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';

    const store = useGameStore();

    console.log(store.deck)

</script>

<template>
    <div v-for="card in store.deck">
        Number: {{ card.diceRoll }}. Event: {{ card.eventCard }}
    </div>
</template>

<style>
</style>
