<script setup lang="ts">
import { PropType } from 'vue'


defineProps({
    style: {
        type: String as PropType<ButtonStyle>,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
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
    <button class="px-6 py-2 rounded-lg text-white font-semibold transition-all" :class="style" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<style scoped lang="css">

button.primary {
    @apply bg-primary hover:bg-opacity-80;
}

button.secondary {
    @apply bg-accent hover:bg-opacity-80;
}

button.danger {
    @apply bg-red-600 hover:bg-red-800;
}

button:disabled {
    @apply hover:bg-opacity-100 opacity-60;
}

</style>