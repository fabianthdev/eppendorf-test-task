<script setup lang="ts">
import { PropType } from 'vue'


defineProps({
    style: {
        type: String as PropType<ButtonStyle>,
        required: true,
    },
})

</script>

<script lang="ts">

export enum ButtonStyle {
    Primary = "primary",
    Secondary = "secondary",
    Danger = "danger"
}

</script>

<template>
    <button class="px-4 rounded-lg font-semibold transition-all" :class="style">
        <slot></slot>
    </button>
</template>

<style scoped lang="css">

button.primary {
    @apply text-primary hover:opacity-80;
}

button.secondary {
    @apply text-accent hover:opacity-80;
}

</style>