import {createRouter, createWebHistory} from 'vue-router';
import HomeVue from '@/views/Home.vue';
import RulesVue from '@/views/Rules.vue';
import PlayersVue from '@/views/Players.vue';
import GameVue from '@/views/Game.vue';
import { useGameStore } from '@/stores/gameStore';
import ReturningVue from '@/views/Returning.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeVue
        },
        {
            path: '/rules',
            name: 'rules',
            component: RulesVue
        },
        {
            path:'/players',
            name:'players',
            component: PlayersVue
        },
        {
            path:'/game',
            name:'game',
            component: GameVue
        },
        {
            path:'/returning',
            name:'returning',
            component: ReturningVue
        }
    ]
});

router.beforeEach((to,from,next)=>{
    if(to.name == 'game' || to.name == 'returning'){
        next();
        return true;
    }

    const store = useGameStore();
    if(!store.isGameInProgress){
        next();
        return true;
    }else{
        next('/returning');
        return true;
    }

})

export default router;