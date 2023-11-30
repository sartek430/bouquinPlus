<script lang ="ts">
import { Aggregations } from "../models/Aggregations";

export default {
    props: {
        filters: Object
    },
    data(): { aggregations: Aggregations } {
        return {
            aggregations: {}
        };
    },
    mounted() {
        this.aggregations = this.filters as Aggregations;
    },
}
</script>

<template>
    Sheeessh
</template>