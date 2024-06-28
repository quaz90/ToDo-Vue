<script setup>//setup lo posso mettere come attributo. se non lo utilizzo non posso usare il composition API
    import { ref } from 'vue'; //importo la funzione ref, rendo lo stato reattivo ai cambiamenti - crea uno stato reattivo in una variabile
    import Home from './Home.vue'; //devo sempre importare un componente
    import ProductsToBuy from './ProductsToBuy.vue';

    let tab = ref(1); //rendo lo stato della variabile tab reattivo e inizializzato a 1

</script>



<template>
    <div class="w-full">

        <div class="flex justify-center p-5">
            <button @click="tab = 1" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                v-bind:class="{ 'btn-neutral': tab === 1 }">
                Home
            </button>
            <button @click="tab = 2" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                v-bind:class="{ 'btn-neutral': tab === 2 }">
                Prodotti da comprare
            </button>
        </div>

        <!-- Contenuto -->
        <div>
            <div v-if="tab === 1" class="py-10 px-6">
                <Home />
            </div>
            <div v-if="tab === 2" class="py-10 px-6">
                <ProductsToBuy />
            </div>
        </div>

    </div>
</template>