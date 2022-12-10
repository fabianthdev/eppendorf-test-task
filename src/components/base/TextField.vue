<script setup lang="ts">

defineProps({
    modelValue: [String, Number],
    placeholder: String,
    isSecure: Boolean,
})

const emit = defineEmits([
    'update:modelValue',
])

const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}

</script>

<template>
    <input class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" :type="isSecure ? 'password' : 'text'" :placeholder="placeholder" :value="modelValue" @input="updateValue" />
</template>