<script lang ="ts">
import { Aggregations } from "../models/Aggregations";

export default {
    props: {
        filters: Object
    },
    data(): { aggregations: Aggregations, labels: { [key: string]: string } } {
        return {
            aggregations: {},
            labels: {
                "categories": "Catégories",
                "editionNames": "Éditeurs",
                "subCategories": "Sous-catégories",
            }
        };
    },
    mounted() {
        this.aggregations = this.filters as Aggregations;
        console.log("agg", this.aggregations);
    },
}
</script>

<template>
    <div class="sidebar">
        <h2>Filters</h2>
        <div v-for="(agg, key) in aggregations" :key="key">
            <div v-if="key !== 'prix_moyen' && agg && agg.hasOwnProperty('buckets')">
                <h3>{{ labels[key] ?? key }}</h3>
                <ul>
                    <li v-for="(bucket, index) in agg.buckets" :key="index">
                        <input type="checkbox" :id="bucket.key" :value="bucket.key" />
                        <label :for="bucket.key">{{ bucket.key }} ({{ bucket.doc_count }})</label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>