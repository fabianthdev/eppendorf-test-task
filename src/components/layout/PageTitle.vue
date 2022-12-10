<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

defineProps({
    backButtonLink: {
        type: String,
        required: false,
    },
})
</script>

<template>
    <span class="flex flex-row justify-between">
        <div class="flex flex-row gap-4 items-center">
            <RouterLink v-if="backButtonLink" :to="backButtonLink">
                <ArrowLeftIcon class="w-8 h-8 hover:-translate-x-1 text-accent hover:text-primary transition-all" />
            </RouterLink>

            <h1 class="text-4xl font-black">
                <slot></slot>
            </h1>
        </div>

        <div v-if="$slots['actions']">
            <slot name="actions"></slot>
        </div>
    </span>
</template>