<template>
    <RouterView />
</template>

<style lang="css">

#app {
    @apply bg-white dark:bg-neutral-900 dark:text-white -z-40;
}

@media (prefers-color-scheme: dark) {
    .text-gray-500 {
        @apply text-neutral-400;
    }
}

</style>