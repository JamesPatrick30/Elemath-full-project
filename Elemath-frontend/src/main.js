// main.js
import './assets/fonts.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueApexCharts from 'vue3-apexcharts';

// FontAwesome

import { library } from '@fortawesome/fontawesome-svg-core';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faUserPen, faList, faUpload, faFile, 
  faTrash, faXmark, faSort, faUserPlus,
  faGear,faHouse, faUser
} from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

// Add icons to the library
library.add(
  faUserPen, faList, faUpload, faFile,
  faTrash, faXmark, faSort, faUserPlus,
  faFloppyDisk, faArrowRightFromBracket,
  faGear, faHouse, faUser
);

const app = createApp(App);

// Register plugins/components
app.use(router);
app.use(VueApexCharts);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('apexChart', VueApexCharts);

// Mount the app
app.mount('#app');
