<template>
    <div class="container flex flex-row gap-4 px-4">

        <!-- <div v-if="$slots['sidebar']">
            <slot name="sidebar"></slot>
        </div> -->

        <div class="w-full flex flex-col">
            <slot></slot>
        </div>
    </div>
</template>