<script setup>
import axios from 'axios'; //importo il gestore di richieste http dopo averlo installato
import { onMounted, ref, computed } from 'vue'; //ref crea uno stato reattivo, onMounted registra una funzione quando i componenti sono renderizzati nel DOM

const url = "http://localhost:3000/products"; //è l'endopoint del json-server
const products = ref([]); //array che contiene i prodotti, reattivo, che andrò a visualizzare nella pagina

onMounted(() => { //nel momento in cui viene renderizzata la pagina:
    axios.get(url).then(resp => { //faccio una richiesta all'url dell'endpoint del json server per ricevere i dati (GET)
        //console.log(resp.data); //stampo i dati contenuti nella risposta del server
        products.value = resp.data; //metto i dati ritornati dalla richiesta nella proprietà value di products (i valori vengono salvati in value)
    })
})

function onAddProduct($event) {
    // console.log($event);
    const nameProduct = $event.target.value; //è il nome del prodotto che inserisco nel campo input
    const newProduct = { //E' l'oggetto che passo al json. il tipo di dato che passo al file json deve essere uguale. Non metto l'id perchè viene generato in automatico
        name: nameProduct,
        completed: false
    }

    //^ invio i dati al file json
    axios.post(url, newProduct).then(resp => { //nel metodo post passo come parametro l'endpoin e l'oggetto che invio
        //   console.log(resp);  
        products.value = [...products.value, resp.data]; //accedo all'array di prodotti, tramite lo "spread operator ..." per inserire i dati della risposta
    })
}

function toggleCompleted(product) {
    axios.patch(`${url}/${product.id}`, product).then(resp => {  //il metodo patch consente di modificare solo una proprietà dell'oggetto ottimizzando le performance
        // console.log(resp);
    })
}

function deleteProduct(id) {

}

</script>

<template>

    <!-- Sezione per aggiungere nuovo prodotto -->
    <div class="w-full md:w-2/5 mx-auto my-4">
        <label class="input input-bordered flex items-center gap-2">
            <input type="text" @keyup.enter="onAddProduct($event)" class="grow" placeholder="Aggiungi prodotto" />
            <kbd class="kbd kbd-sm">Premi "Invio" per salvare</kbd>
        </label>
    </div>

    <!-- Sezione contatori -->
    <!-- {{todoProducts }} -->
    <!-- {{completedProducts }} -->



    <!-- Lista prodotti -->
    <div class="w-full md:w-2/5 mx-auto border border-neutral rounded-lg ">

        <!-- Start List -->
        <div v-for="product in products" :key="product.id" class="flex justify-between">

            <!-- icona e nome prodotto -->
            <div class="flex items-center">
                <button class="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6 text-error">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <span class="label-text" :class="{ 'line-through text-accent': product.completed }">{{ product.name }}</span>
            </div>

            <!-- checkbox -->
            <label class="label cursor-pointer mr-4">
                <input type="checkbox" class="checkbox" @change="toggleCompleted(product)"
                    v-model="product.completed" />
            </label>

        </div>
        <!-- End List -->

    </div>







</template>