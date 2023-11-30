<script lang ="ts">
import TopBar from "../components/TopBar.vue";

export default {
    components: { TopBar },
    data(): { book: any, aggregations: any } {
        return {
            book: [],
            aggregations: {}
        };
    },
    mounted() {
        this.getDataFromElasticsearch();
    },
    methods: {
        async getDataFromElasticsearch() {
            try {
                const response = await fetch(`http://127.0.0.1:3000/books/${this.$route.params.id}`);
                if (response.ok) {
                    const d = await response.json();
                    this.book = d.hits.hits[0];
                    this.aggregations = d.aggregations;
                    console.log('Données Elasticsearch :', this.book);
                    // Faites quelque chose avec les données reçues
                } else {
                    console.error('La requête a échoué :', response.status);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        },
        redirectToBooksList() {
            this.$router.push({ name: 'home' });
        }
    }
}
</script>

<template>
    <TopBar></TopBar>
    <button class="return-button" v-on:click="redirectToBooksList()">Retour</button>
    <div v-if="book.length === 0">Chargement...</div>
    <div class="details-card" v-else>
        <h1>{{ book._source.title }}</h1>
        <p><strong>Auteur:</strong> {{ book._source.author.fullname }}</p>
        <p><strong>Catégorie:</strong> {{ book._source.category }}</p>
        <p><strong>Date:</strong> {{ book._source.releaseDate }}</p>
        <p><strong>Prix:</strong> {{ book._source.price }}€</p>
        <p class="description"><strong>Description:</strong> {{ book._source.description }}</p>
        <p><strong>Moyenne des notes:</strong> {{ aggregations.nested_ratings.note_avg.value.toFixed(2) }} / 5</p>
    </div>
    <div class="details-notes">
        <h2>Notes</h2>
        <div v-for="(note, index) in book._source?.ratings" :key="index">
            <p><strong>Utilisateur:</strong> {{ note?.username ?? 'Inconnu' }}</p>
            <p><strong>Note:</strong> {{ note?.rating ?? "?" }} / 5</p>
            <hr>
        </div>
    </div>
</template>


<style>
.details-card {
    text-align: center;
}

.return-button {
    margin: 15px;
    border: 1px solid #888;
    border-radius: 5px;
    width: 100px;
    height: 30px;
    padding: 5px;
    font-family: 'Courier New', Courier, monospace;
}

.return-button:hover {
    background-color: #888;
    color: #f3f3f3;
    cursor: pointer;
}
</style>