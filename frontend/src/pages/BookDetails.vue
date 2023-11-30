<script lang ="ts">
import TopBar from "../components/TopBar.vue";

export default {
    components: { TopBar },
    data(): { book: any } {
        return {
            book: []
        };
    },
    mounted() {
        this.getDataFromElasticsearch();
    },
    methods: {
        async getDataFromElasticsearch() {
            try {
                const response = await fetch('http://127.0.0.1:3000/books/XlR7EYwBl1cDzRpN2gwW');
                if (response.ok) {
                    this.book = await response.json();
                    console.log('Données Elasticsearch :', this.book);
                    // Faites quelque chose avec les données reçues
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
    <TopBar></TopBar>
    <div v-if="book.length === 0">Chargement...</div>
    <ul v-else>
        <li>
            <h3>{{ book._source.title }}</h3>
            <p><strong>Auteur:</strong> {{ book._source.author.fullname }}</p>
            <p><strong>Description:</strong> {{ book._source.description }}</p>
            <hr>
        </li>
    </ul>
</template>