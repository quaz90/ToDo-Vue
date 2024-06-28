import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue' //importa il componente root dell'applicazione, ovvero il punto d'ingresso del programma

createApp(App).mount('#app') //monta il componente con ID "app" (preso dal file index.html) dentro l'istanza creata di App e poi tramite il mount lo renderizza
