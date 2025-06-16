import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: runtimeConfig.firebase.apiKey,
    authDomain: runtimeConfig.firebase.authDomain,
    projectId: runtimeConfig.firebase.projectId,
    storageBucket: runtimeConfig.firebase.storageBucket,
    messagingSenderId: runtimeConfig.firebase.messagingSenderId,
    appId: runtimeConfig.firebase.appId,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const storage = getStorage(app);

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("uploadImage", async (folderName: string, file: File) => {
    // Simple local file reader - converts image to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });
});
