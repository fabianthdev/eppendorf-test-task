<template>
    <div class="container flex flex-row gap-4 px-4 py-8">

        <!-- <div v-if="$slots['sidebar']">
            <slot name="sidebar"></slot>
        </div> -->

        <div class="w-full flex flex-col gap-8">
            <slot></slot>
        </div>
    </div>
</template>