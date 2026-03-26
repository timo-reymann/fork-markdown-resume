<template>
  <header class="header hstack justify-between pl-4 pr-1 text-c">
    <nuxt-link
      class="hstack space-x-2 cursor-pointer text-gray-900 dark:text-gray-100"
      :to="localePath('/')"
    >
      <Logo hide-on-mobile text="sm md:base" />
      <h1 text="base md:lg"><BrandName /></h1>
    </nuxt-link>

    <slot name="middle" />

    <div hstack>

      <slot name="tail" />

      <ToggleDark mr-1.5 />
      <a
        class="round-btn"
        href="https://github.com/timo-reymann/fork-markdown-resume"
        target="_blank"
        rel="nofollow noopener"
      >
        <span i-tabler:brand-github md:text-lg />
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
</script>
