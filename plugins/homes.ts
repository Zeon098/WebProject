import algoliasearch from "algoliasearch";
import type { AlgoliaHome } from "~/types/algolia";

export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Homes");
  const config = useRuntimeConfig();
  let id = 0;
  const client = algoliasearch(
    config.public.algolia?.applicationId || '',
    config.public.algolia?.apiKey || ''
  );
  const index = client.initIndex("Homes");

  nuxtApp.provide("getHomes", async () => {
    await search({ query: "" });
    return result.value.hits as AlgoliaHome[];
  });

  nuxtApp.provide("getHomeById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:"${id}"`,
      query: "",
    };
    await search(requestOptions);
    
    // Find the specific home by objectID since Algolia filter might not work as expected
    const foundHome = result.value.hits.find((hit: any) => hit.objectID === id);
    
    return foundHome as AlgoliaHome;
  });

  nuxtApp.provide(
    "getHomesByLocation",
    async (latlng: { lat: number; lng: number }, page = 0) => {
      const requestOptions = {
        hitsPerPage: 6,
        page,
        aroundLatLng: `${latlng.lat}, ${latlng.lng}`,
        aroundRadius: 20000,
        query: "",
      };
      await search(requestOptions);
      return { data: result.value.hits as AlgoliaHome[], nbPages: result.value.nbPages };
    }
  );
  nuxtApp.provide("addHome", (home: any) => {
    index.saveObject({ ...home, objectID: ++id });
    return id;
  });
  nuxtApp.provide(
    "removeHome",
    async (id: string) => await index.deleteObject(id)
  );
});
