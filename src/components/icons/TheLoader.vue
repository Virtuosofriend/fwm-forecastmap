<template>
    <span class="loader"></span>
</template>

<style lang="css" scoped>
.loader {
    --color-1: #fff;
    --size: 0.4px;

    width: calc(48 * var(--size));
    height: calc(48 * var(--size));
    border-radius: 50%;
    display: inline-block;
    border-top: calc(3 * var(--size)) solid var(--color-1);
    border-right: calc(3 * var(--size)) solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
