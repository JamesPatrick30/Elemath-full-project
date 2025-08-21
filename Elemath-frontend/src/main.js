import './assets/fonts.css';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from "vue3-apexcharts";

// import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faUserPen, faList, faUpload, faFile, 
  faTrash, faXmark, faSort, faUserPlus 
} from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

library.add(
  faUserPen, faList, faUpload, faFile,
  faTrash, faXmark, faSort, faUserPlus,
  faFloppyDisk
);

const app = createApp(App)
app.use(VueApexCharts);
// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

app.component('apexChart', VueApexCharts); // Register globally
app.use(router)

app.mount('#app')
