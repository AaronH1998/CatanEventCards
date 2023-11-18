<script setup lang="ts">
    import { useGameStore } from '@/stores/gameStore';
    import router from '@/router/index.ts';

    const store = useGameStore();

    function newGame(){
        store.$reset();
        router.push('/');
    }

    function continueGame(){
        router.push('/game');
    }
</script>

<template>
    <div class="flex flex-col gap-10 text-center p-2 max-w-fit">
        <div class="flex flex-col gap-3">
            <p class="text-3xl font-bold"> Catan Transportation Office</p>
            
            <div>
                <p>
                    Welcome back travellers!
                </p>
                <p>
                    We recognise you! Would you like to continue your journey?
                </p>
            </div>
        </div>
            
        <div class="flex flex-col gap-3">

            <p class="text-2xl">
                State your business!
            </p>

            <button @click="newGame" class="text-left"> New Journey: .............. X</button>
            <button @click="continueGame" class="text-left"> Continue Travels: .............. X </button>
        </div>
            
    </div>
</template>

<style>
</style>
