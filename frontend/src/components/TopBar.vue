<script lang="ts">
export default {
    data() {
    return {
        searchText: '',
        searchResult: null
    };
  },
  methods: {
    async search() {
      try {
        // Faites votre requête fetch ici
        const response = await fetch('http://127.0.0.1/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            search: this.searchText
          })
        });

        const data = await response.json();
        this.searchResult = data;
        this.searchText = '';
      } catch (error) {
        console.error('Erreur lors de la recherche : ', error);
      }
    }
    },

}
</script>

<template>
    <div class="topBarBody" >
        <h1 class="topBarTitle">TopBar</h1>

        <form action="search" @submit.prevent="search">
            <input class="searchInput" type="text" placeholder="Search..." v-model="searchText" />
            <button class="searchButton" type="submit">Search</button>
        </form>
        
    </div>
</template>

<style scoped>
    .topBarBody {
        display: flex;
        align-items: center;
        background-color: #f3f3f3;
        border-radius: 10px;
        border: 1px solid #888;
    }
    .topBarTitle {
        margin: 0;
        padding: 5px;
        color: #888;
        margin-left: 10px;
        font-family: 'Courier New', Courier, monospace;
    }

    .searchInput{
        margin-left: 20px;
        border: 1px solid #888;
        border-radius: 5px;
        width: 300px;
        height: 20px;
        padding-left: 10px;
        padding: 5px;
        font-family: 'Courier New', Courier, monospace;
    }

    .searchButton {
        margin-left: 10px;
        border: 1px solid #888;
        border-radius: 5px;
        width: 100px;
        height: 30px;
        padding: 5px;
        font-family: 'Courier New', Courier, monospace;
    }

    .searchButton:hover {
        background-color: #888;
        color: #f3f3f3;
        cursor: pointer;
    }
</style>