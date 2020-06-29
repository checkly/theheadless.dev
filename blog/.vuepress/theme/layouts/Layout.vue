<template>
  <div>
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
