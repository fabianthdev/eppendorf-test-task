<script setup lang="ts">
import { computed, ref } from 'vue'
import { emailRegex, passwordRegex } from '@/utils/utils'
import { useAuthStore } from '@/stores/auth';
import CenteredPageLayout from '@/components/layout/CenteredPageLayout.vue';
import TextField from '@/components/base/TextField.vue';
import FilledButton, { ButtonStyle } from '@/components/base/FilledButton.vue';

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
    <CenteredPageLayout>
        <div class="flex flex-col gap-8" :disabled="isLoading">
            <span class="text-3xl text-center font-bold">Eppendorf Test Task Login</span>

            <div class="flex flex-col gap-4">
                <TextField v-model.trim="name" placeholder="Name" />
                <TextField v-model.trim="email" placeholder="E-Mail" />
                <TextField v-model.trim="password" placeholder="Password" :is-secure="true" />

                <span class="text-neutral-500">
                    Password requirements:
                    <ul>
                        <li>At least eight characters</li>
                        <li>At least one uppercase character</li>
                        <li>At least one special character (@, $, !, %, *, #, ?, &)</li>
                        <li>At least one digit</li>
                    </ul>
                </span>
            </div>

            <FilledButton :style="ButtonStyle.Primary" :disabled="!isFormValid" @click="login()">Log in</FilledButton>
        </div>
    </CenteredPageLayout>
</template>

<style scoped lang="css">

ul {
    margin: 0;
    list-style-type: none;
    list-style-position: inside;
}
ul > li:before {
  content: "- ";
}
</style>