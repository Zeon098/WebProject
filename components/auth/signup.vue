<template>
  <div
    class="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex justify-center items-start pt-20 overflow-y-auto"
    @click="handleClick()"
  >
    <div
      class="w-1/3 max-w-md px-8 pt-8 pb-14 bg-white rounded-2xl shadow-2xl mx-4 my-8"
      @click="(e) => e.stopPropagation()"
    >
      <div class="flex justify-end mb-4">
        <span class="cursor-pointer p-2 hover:bg-athens-gray rounded-full" @click="handleClick()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#2D2B2B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#2D2B2B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>
      <h1>Create an account</h1>
      <p class="text-neutral-400">
        Already have an account?
        <span class="gradient-text cursor-pointer" @click="swap()"
          >Sign in</span
        >
      </p>
      <form
        class="flex flex-col w-full h-full gap-6 pt-16"
        @submit.prevent="submit()"
      >
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="First name"
            class="w-1/2"
            required
            v-model="user.firstname"
          />
          <input
            type="text"
            placeholder="Last name"
            class="w-1/2"
            v-model="user.lastname"
          />
        </div>
        <input type="text" placeholder="Email" required v-model="user.email" />
        <input
          type="password"
          placeholder="Password"
          required
          v-model="user.password"
        />
        <input
          type="password"
          placeholder="Confirm password"
          required
          v-model="user.confirmPassword"
        />
        <input type="submit" value="Sign up" class="gradient" />
        <div class="pt-2 flex flex-col items-center gap-2 font-medium">
          <span class="text-neutral-400 mb-3">or</span>
          <div
            class="w-full flex gap-20 bg-athens-gray border-1 border-mischka px-2 py-3 rounded-lg cursor-pointer"
            @click="signinWithGoogle()"
          >
            <span
              ><svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_876_12603)">
                  <path
                    d="M23.9875 13.2297C23.9875 12.2235 23.9059 11.4892 23.7292 10.7278H12.2393V15.2693H18.9836C18.8477 16.3979 18.1134 18.0976 16.4817 19.2398L16.4588 19.3918L20.0917 22.2062L20.3434 22.2313C22.6549 20.0965 23.9875 16.9554 23.9875 13.2297Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2391 25.1956C15.5433 25.1956 18.3171 24.1077 20.3432 22.2313L16.4815 19.2398C15.4481 19.9605 14.0611 20.4636 12.2391 20.4636C9.00291 20.4636 6.25622 18.3288 5.27711 15.3782L5.13359 15.3904L1.35604 18.3138L1.30664 18.4512C3.31906 22.4488 7.45273 25.1956 12.2391 25.1956Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.27726 15.3781C5.01892 14.6167 4.8694 13.8008 4.8694 12.9578C4.8694 12.1147 5.01892 11.2989 5.26367 10.5374L5.25683 10.3752L1.43194 7.40479L1.3068 7.46431C0.477385 9.12323 0.00146484 10.9861 0.00146484 12.9578C0.00146484 14.9294 0.477385 16.7922 1.3068 18.4511L5.27726 15.3781Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.2391 5.45189C14.5371 5.45189 16.0871 6.44451 16.971 7.27401L20.4248 3.9018C18.3036 1.93016 15.5433 0.719971 12.2391 0.719971C7.45273 0.719971 3.31906 3.46666 1.30664 7.46431L5.26351 10.5374C6.25622 7.58673 9.00291 5.45189 12.2391 5.45189Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_876_12603">
                    <rect
                      width="24"
                      height="24.56"
                      fill="white"
                      transform="translate(0 0.719971)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Continue with Google
          </div>
          <div
            class="w-full flex gap-20 bg-athens-gray border-1 border-mischka px-2 py-3 rounded-lg cursor-pointer"
            @click="signinWithFacebook()"
          >
            <span>
              <svg
                width="24"
                height="26"
                viewBox="0 0 16 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3847 31.4054V17.3511H15.1019L15.809 11.8745H10.3863V8.3775C10.3863 6.79075 10.8253 5.71083 13.0992 5.71083L16 5.70929V0.81039C14.5964 0.661835 13.1857 0.589836 11.7743 0.594715C7.59176 0.594715 4.72944 3.14738 4.72944 7.83523V11.8745H0V17.3511H4.72944V31.4054H10.3847Z"
                  fill="#319CFF"
                />
              </svg>
            </span>
            Continue with Facebook
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
  const { validateName, validateEmail, validatePassword } = useFormValidation();

  const user = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function submit() {
    const { firstname, lastname, email, password, confirmPassword } = user;
    if (
      !validateName(firstname) ||
      !validateName(lastname) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validatePassword(confirmPassword)
    ) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }

    const successful = await authStore.signup(
      firstname,
      lastname,
      email,
      password
    );

    if (successful) {
      handleClick();
    }
  }

  async function signinWithGoogle() {
    const successful = await authStore.signinWithGoogle();
    if (successful) {
      handleClick();
    }
  }

  async function signinWithFacebook() {
    const successful = await authStore.signinWithFacebook();
    if (successful) {
      handleClick();
    }
  }

  const emits = defineEmits<{
    (e: "close"): void;
    (e: "swap"): void;
  }>();

  function handleClick() {
    emits("close");
  }
  function swap() {
    emits("swap");
  }
</script>

<style lang="postcss" scoped>
  input {
    @apply bg-athens-gray border-1 border-mischka rounded-lg h-12 px-4;
  }
  input[type="submit"] {
    @apply rounded-lg font-bold text-xl cursor-pointer text-white h-12 px-4;
  }
</style>
