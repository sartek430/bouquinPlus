<script lang="ts">
export default {
  data(): { searchText: string; searchResult: any[] } {
    return {
      searchText: "",
      searchResult: [],
    };
  },
  methods: {
    async search() {
      if (!this.searchText || this.searchText == "") {
        this.searchResult = [];
        return;
      }
      try {
        // Faites votre requête fetch ici
        const response = await fetch("http://127.0.0.1:3000/books/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: this.searchText,
          }),
        });

        const data = await response.json();
        this.searchResult = data.hits.hits;
        console.log("Résultat de la recherche : ", this.searchResult);
      } catch (error) {
        console.error("Erreur lors de la recherche : ", error);
      }
    },
  },
};
</script>

<template>
  <div class="topBarBody">
    <h1 class="topBarTitle">Bouquin+</h1>
    <form action="search">
      <input
        class="searchInput"
        type="text"
        placeholder="Search..."
        v-model="searchText"
        @input="search"
      />
    </form>
    <ul v-if="searchResult && searchResult.length > 0">
      <li v-for="(result, index) in searchResult" :key="index">
        <span v-if="result?.highlight?.['author.fullname']?.[0]" v-html="result.highlight['author.fullname'][0]"></span>
        <span v-else>{{ result._source.author.fullname }}</span>
        -
        <span v-if="result?.highlight?.['title']?.[0]" v-html="result.highlight['title'][0]"></span>
        <span v-else>{{ result._source.title }}</span>
      </li>
    </ul>
    <p v-else>Aucun résultat trouvé.</p>
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
  font-family: "Courier New", Courier, monospace;
}

.searchInput {
  margin-left: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 300px;
  height: 20px;
  padding-left: 10px;
  padding: 5px;
  font-family: "Courier New", Courier, monospace;
}
</style>
