import './assets/fonts.css';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';


// Add icons to the library
library.add(faUserPen);
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'; // 👈 your icon

library.add(faFloppyDisk);
import {faSort} from '@fortawesome/free-solid-svg-icons';
library.add(faSort);
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faUserPlus);
const app = createApp(App)
app.use(VueApexCharts);
// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('apexChart', VueApexCharts); // Register globally
app.use(router)

app.mount('#app')
