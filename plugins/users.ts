import algoliasearch from "algoliasearch";

import type User from "~/types/user";
import type { AlgoliaUser } from "~/types/algolia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const { result, search } = useAlgoliaSearch("Users");
  const config = useRuntimeConfig();

  nuxtApp.provide("getUserByHomeId", async (homeId: string) => {
    const requestOptions = {
      filters: `homeId:${homeId}`,
      attributesToRetrieve: [
        "image",
        "name",
        "joined",
        "reviewCount",
        "description",
      ],
      query: "",
    };
    await search(requestOptions);
    return result.value.hits[0] as AlgoliaUser;
  });

  const client = algoliasearch(
    config.public.algolia?.applicationId || '',
    config.public.algolia?.apiKey || ''
  );
  const index = client.initIndex("Users");
  nuxtApp.provide("addUser", async (user: User) => {
    await index.saveObject(user);
  });

  nuxtApp.provide("getUserById", async (id: string) => {
    const requestOptions = {
      filters: `objectID:${id}`,
      attributesToRetrieve: [
        "image",
        "name",
        "email",
        "joined",
        "homeId",
        "reviewCount",
        "description",
      ],
      query: "",
      refresh: true,
    };
    await search(requestOptions);
    if (!result.value.hits.length) {
      return null;
    }
    return {
      objectID: (result.value.hits[0] as any).objectID,
      name: (result.value.hits[0] as any).name,
      email: (result.value.hits[0] as any).email,
      image: (result.value.hits[0] as any).image,
      joined: (result.value.hits[0] as any).joined,
      homeId: (result.value.hits[0] as any).homeId,
      reviewCount: (result.value.hits[0] as any).reviewCount,
      description: (result.value.hits[0] as any).description,
    };
  });

  nuxtApp.provide("updateUser", async (user: any) => {
    const authStore = useAuthStore();
    const requestOptions = {
      filters: `objectID:${user.objectID}`,
      attributesToRetrieve: [
        "image",
        "name",
        "email",
        "joined",
        "homeId",
        "reviewCount",
        "description",
      ],
    };
    
    // Update in Algolia but don't wait for the response to avoid overwriting local changes
    index.partialUpdateObject(user).then(() => {
      client.clearCache();
      // Don't automatically fetch and overwrite - let the auth store handle local updates
      console.log('User updated in Algolia successfully');
    }).catch((error) => {
      console.warn('Failed to update user in Algolia:', error);
    });
  });
});
