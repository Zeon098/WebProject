import type { AlgoliaReview } from "~/types/algolia";

export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Reviews");
  nuxtApp.provide("getReviewsByHomeId", async (homeId: string) => {
    const requestOptions = {
      filters: `homeId:${homeId}`,
      query: "",
    };
    await search(requestOptions);
    return result.value.hits as AlgoliaReview[];
  });
});
