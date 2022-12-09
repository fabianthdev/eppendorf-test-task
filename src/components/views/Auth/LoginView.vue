<script setup lang="ts">
import { computed, ref } from 'vue'
import { emailRegex, passwordRegex } from '@/utils/utils'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const name = ref("")
const email = ref("")
const password = ref("")

const isNameValid = computed(() => name.value.length >= 2)
const isEmailValid = computed(() => email.value.match(emailRegex) !== null)
const isPasswordValid = computed(() => password.value.match(passwordRegex) !== null)

const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isPasswordValid.value)

const isLoading = ref(false)
const login = async () => {
    isLoading.value = true

    try {
        await authStore.login(name.value, email.value, password.value)
    } catch (error) {
        // TODO: Proper error handling
        console.error(error);
    }

    isLoading.value = false
}

</script>


<template>
    <div class="flex flex-col" :disabled="isLoading">
        <input type="text" v-model.trim="name" placeholder="Name" />
        <input type="text" v-model.trim="email" placeholder="E-Mail" />
        <input type="password" v-model="password" placeholder="Password" />

        <button type="submit" :disabled="!isFormValid" @click="login()">Log in</button>
    </div>
</template>