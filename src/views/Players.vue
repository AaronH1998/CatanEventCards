<script setup lang="ts">
import router from '@/router';
import { useGameStore } from '@/stores/gameStore';

    const store = useGameStore();

    function startGame(){
        if(store.numberOfPlayers < 2){
            return;
        }
        store.generateDeck(); 
        router.push('/game');
    }

</script>

<template>
    <div class="flex flex-col gap-5 text-center p-2">
        <div class="text-3xl font-bold">Crew</div>
        <p>
            Fill in the names of your crew. IN ORDER!
        </p>
        <div class="">
            <span>Member One:</span> <input v-model="store.gamePlayers.playerOne" class="bg-transparent border-b border-dashed border-black" />
        </div>
        <div class="">
            <span>Member Two:</span> <input v-model="store.gamePlayers.playerTwo" class="bg-transparent border-b border-dashed border-black" />
        </div>
        <div class="">
            <span>Member Three:</span> <input v-model="store.gamePlayers.playerThree" class="bg-transparent border-b border-dashed border-black" />
        </div>
        <div class="">
            <span>Member Four:</span> <input v-model="store.gamePlayers.playerFour" class="bg-transparent border-b border-dashed border-black" />
        </div>

        <button @click="startGame" :class="(store.numberOfPlayers < 2 ? 'text-red-600 ': '') + 'text-xl'" :disabled="store.numberOfPlayers < 2">
            {{ store.numberOfPlayers < 2 ? "No lonely travellers!":
                "Set Sail with a crew of: " + store.numberOfPlayers + " .......X" }}
            
        </button>
    </div>
    
</template>

<style>
</style>
