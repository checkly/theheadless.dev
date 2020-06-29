<template>
  <SimpleNewsletter v-slot="{ slotProps }">
    <div class="newsletter__wrap">
      <div class="newsletter__title">{{ slotProps.title }}</div>
      <div class="newsletter__content">{{ slotProps.content }}</div>
      <div class="newsletter__fields">
        <input
          v-model="slotProps.mail"
          class="newsletter__input"
          type="email"
          name="email"
          aria-label="Email"
          placeholder="Email"
          required
          autocapitalize="off"
          autocorrect="off"
          data-cy="email"
        />
        <button type="submit" class="newsletter__button" data-cy="submit">
          {{ slotProps.submitText }}
        </button>
      </div>
    </div>
  </SimpleNewsletter>
</template>

<script>
import SimpleNewsletter from 'vuepress-plugin-mailchimp/src/components/SimpleNewsletter'
export default {
  components: { SimpleNewsletter },
}
</script>

<style lang="stylus">
.newsletter
  .newsletter &__wrap
    background-color $newsletterBgColor
    max-width none

  .newsletter &__fields
    display grid
    grid-template-columns 1fr 1fr
    grid-gap 10px

  .newsletter &__input
    margin-bottom 0

  .newsletter &__button
    transition box-shadow 0.2s ease, transform 0.2s ease

    &:hover
      box-shadow 1px 1px 5px rgba(0, 0, 0, 0.6)
      transform translateY(-2px)

@media (max-width: $MQMobile)
  .newsletter
    .newsletter &__fields
      display block

    .newsletter &__input
      margin-bottom 10px
</style>
