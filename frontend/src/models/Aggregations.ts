export interface BucketAggregation {
    buckets: {
        key: string;
        doc_count: number;
    }[];
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
}

export interface Aggregations {
    categories?: BucketAggregation;
    editionNames?: BucketAggregation;
    subCategories?: BucketAggregation;
    prix_moyen?: number;
}