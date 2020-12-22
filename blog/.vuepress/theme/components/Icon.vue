<template>
  <client-only>
    <div
      class="icon"
      v-html="getSvg()"
    />
  </client-only>
</template>

<script>
import octicons from '@primer/octicons'
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 16
    }
  },
  methods: {
    getSvg () {
      const { name, width } = this.$props
      try {
        return octicons[name].toSVG({ width })
      } catch (e) {
        throw new Error(`${name} is not an octicon icon`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline;
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
</style>
