import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router';

library.add(faHouse);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(router);
app.use(pinia);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
