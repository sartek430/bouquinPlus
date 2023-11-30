<script lang ="ts">
import SideBar from "../components/SideBar.vue";
import TopBar from "../components/TopBar.vue";
import { Aggregations } from "../models/Aggregations";

export default {
    components: { TopBar, SideBar },
    data(): { books: any, aggregations: Aggregations } {
        return {
            books: [],
            aggregations: {}
        };
    },
    mounted() {
        this.getDataFromElasticsearch();
    },
    methods: {
        async getDataFromElasticsearch() {
            try {
                const response = await fetch('http://127.0.0.1:3000/books');
                if (response.ok) {
                    const data = await response.json();
                    this.books = data.hits.hits;
                    this.aggregations = data.aggregations;
                } else {
                    console.error('La requête a échoué :', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        }
    }
}
</script>

<template>
    <TopBar />
    <SideBar  :filters="aggregations" />
    <div v-if="books.length === 0">Chargement...</div>
    <ul v-else>
        <li v-for="(book, index) in books" :key="index">
            <h3>{{ book._source?.title ?? 'Titre inconnu' }}</h3>
            <p><strong>Auteur:</strong> {{ book._source?.author?.fullname ?? 'Inconnu' }}</p>
            <p><strong>Description:</strong> {{ book._source?.description }}</p>
            <hr>
        </li>
    </ul>
</template>