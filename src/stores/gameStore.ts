import { EventCard } from '@/models/eventCard';
import { GameType } from '@/models/gameType';
import { Players } from '@/models/players';
import { defineStore } from 'pinia';
import { ComputedRef, Ref, computed, ref } from 'vue';

export const useGameStore = defineStore('game',()=>{
    const RULES = {
        "standard": "Events are predetermined to their dice roll.",
        "robber": "Events and dice roll will be random. Sevens are always robbers.",
        "random": "Events and dice rolls are truly random."
    }

    const diceRollDictionary = [
        {number: 2, occurrences: 1},
        {number: 3, occurrences: 2},
        {number: 4, occurrences: 3},
        {number: 5, occurrences: 4},
        {number: 6, occurrences: 5},
        {number: 7, occurrences: 6 },
        {number: 8, occurrences: 5},
        {number: 9, occurrences: 4},
        {number: 10, occurrences: 3},
        {number: 11, occurrences: 2},
        {number: 12, occurrences: 1}
    ];
    const eventsDictionary = [
        {title:"Epidemic", occurrences: 2, description: "Each player receives only 1 resource for each of his cities that produces this turn."},
        {title:"Earthquake", occurrences: 1, description: 'Each player turns 1 of his roads sideways. You may not build roads until your turned road is repaired. The repairs cost is 1 lumber and 1 brick. Roads turned sideways are still counted towards the "longest road".'},
        {title:"Good Neighbours", occurrences: 1, description: "Each player gives the player to his left 1 resource of the giver's choice (if he has one)."},
        {title: "Tournament", occurrences: 1,  description: "The player(s) with the most knight cards revealed takes 1 resources of his choice from the bank."},
        {title: "Trade Advantage", occurrences: 1, description: 'The player with the "Longest Road" card (or the player with the most roads if not claimed) may take one resource from any player.'},
        {title: "Calm Seas", occurrences: 2, description: "The player(s) with the most harbours receives 1 resources card of their choice from the bank."},
        {title: "Robber Flees", occurrences: 2, description: "The robber returns to the desert. Do not draw a card from any player."},
        {title: "Neighbourly Assistance", occurrences: 2, description: "The player(s) with the most victory points give(s) one player with fewer victory points 1 resource card of their choice. If a giver doesn't have a resource card to give, that giver ignores this event."},
        {title: "Conflict", occurrences: 1, description: 'The player with the "Largest Army" (if not claimed, the single player with the most knight cards) takes 1 resource card at random from any one player.'},
        {title: "Plentiful Year", occurrences: 1, description: "Each player may take 1 resource of their choice from the bank."},
        {title: "Catan Prospers", occurrences: 16, description: "The settlers labour. Catan prospers!"},
        {title: "Robber Attacks!", occurrences: 6, description: "Robber attacks<br>1. Each player with more than 7 cards must discard half (rounded down).<br>2. Move the robber. Draw a random resource card from any 1 player with a settlement and/or city next to the robber's new hex."}
    ];

    const isGameInProgress: Ref<Boolean> = ref(false);

    const deck: Ref<Array<EventCard>> = ref([]);

    const gameType: Ref<GameType | null> = ref(null);
    const gamePlayers: Ref<Players> = ref(new Players());

    const numberOfPlayers: ComputedRef<number> = computed(()=>{
        let numPlayers = 0;
        if(!isEmptyOrSpaces(gamePlayers.value.playerOne)){
            numPlayers++;
        }
        if(!isEmptyOrSpaces(gamePlayers.value.playerTwo)){
            numPlayers++;
        }
        if(!isEmptyOrSpaces(gamePlayers.value.playerThree)){
            numPlayers++;
        }
        if(!isEmptyOrSpaces(gamePlayers.value.playerFour)){
            numPlayers++;
        }
        return numPlayers;
    });

    function $reset(){
        isGameInProgress.value = false;
        deck.value = [];
        gameType.value = null;
        gamePlayers.value = new Players();
    }

    function isEmptyOrSpaces(str: string){
        return str === null || str.match(/^ *$/) !== null;
    }

    function setGameType(type:GameType){
        gameType.value = type
    }

    function getRules(): string {
        switch( gameType.value ){
            case GameType.standard:
                return RULES.standard;
            case GameType.robber:
                return RULES.robber;
            case GameType.random:
                return RULES.random
            default:
                return "";
        }
    }

    function shuffle(){
        deck.value = randomiseArray(deck.value);
    }

    function generateDeck(){
        deck.value = [];

        if(gameType.value == GameType.robber){
            const diceRolls: Array<number> = [];
            const noSevenRolls = diceRollDictionary.filter(p=>p.number != 7);
            for(let i in noSevenRolls){
                const diceRoll = noSevenRolls[i];    
            
                for(var j = 0; j < diceRoll.occurrences; j++){
                  diceRolls.push(diceRoll.number);
                }
            }
    
            const events: Array<string> = [];

            const noRobberEvents = eventsDictionary.filter(p=>p.title != "Robber Attacks!");
            for(let k in noRobberEvents){
                const evnt = noRobberEvents[k];
            
                for(let j = 0; j < evnt.occurrences; j++){
                    events.push(evnt.title);
                }
            }
            
            const shuffledDiceRolls: Array<number> = randomiseArray(diceRolls);
            const shuffledEvents: Array<string> = randomiseArray(events);
            
            for(let i = 0; i < shuffledEvents.length; i++){
                deck.value.push({
                    diceRoll: shuffledDiceRolls[i],
                    eventCard: shuffledEvents[i]
                });
            }
        }

        const robberEvent = eventsDictionary.filter(p=>p.title == "Robber Attacks!")[0];
        const sevenRoll = diceRollDictionary.filter(p => p.number == 7)[0];
        for(var k = 0; k < robberEvent.occurrences; k++){
            deck.value.push({diceRoll:sevenRoll.number, eventCard: robberEvent.title});
        }

        deck.value = randomiseArray(deck.value);

        isGameInProgress.value = true;
    }

    function randomiseArray(array: Array<any>) {
        var i,
          r,
          l = array.length;
          
        while (l) {
          i = Math.floor(Math.random() * l--);
          r = array[l];
          array[l] = array[i];
          array[i] = r;
        }
      
        return array;
      }

    return {
        gameType,
        gamePlayers,
        deck,
        isGameInProgress,
        numberOfPlayers,
        $reset,
        setGameType,
        getRules,
        shuffle,
        generateDeck
    }
}, {persist: true});