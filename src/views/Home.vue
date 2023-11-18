<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { GameType } from '@/models/gameType';
import router from '@/router';

    const store = useGameStore();

    function setGameType(type:GameType){
        store.setGameType(type);
        router.push('/rules');
    }

</script>

<template>
    <div class="flex flex-col gap-10 text-center p-2 max-w-fit">
        <div class="flex flex-col gap-3">
            <p class="text-3xl font-bold"> Catan Transportation Office</p>
            
            <div>
                <p>
                    Welcome settlers, travellers and traders...
                </p>
                <p>
                    Prepare your journey to Catan!
                </p>
            </div>
        </div>
            
        <div class="flex flex-col gap-3">

            <p class="text-2xl">
                State your business!
            </p>

            <button @click="setGameType(GameType.standard)" disabled class="text-left"> Standard: .............. (Not Available!) </button>
            <button @click="setGameType(GameType.random)" disabled class="text-left"> True Random.: .............. (Not Available!) </button>
            <button @click="setGameType(GameType.robber)" class="text-left">  Ruly Robber: .............. X</button>
        </div>
            
    </div>
</template>

<style>
</style>
