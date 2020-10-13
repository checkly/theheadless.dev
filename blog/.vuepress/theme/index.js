const removeMd = require('remove-markdown')
const { addMetaTags } = require('./util/meta')

module.exports = themeConfig => {
  const config = {
    extendPageData (pageCtx) {
      const strippedContent = pageCtx._strippedContent
      if (!strippedContent) {
        return
      }

      if (themeConfig.summary) {
        pageCtx.summary = removeMd(strippedContent.trim()).slice(0, themeConfig.summaryLength) + '...'
        pageCtx.frontmatter.description = pageCtx.summary
      }

      if (pageCtx.frontmatter.summary) {
        pageCtx.frontmatter.description = pageCtx.frontmatter.summary
      }

      // META
      const metaTagOptions = {
        canonicalBase: 'https://theheadless.dev'
      }

      addMetaTags(pageCtx, metaTagOptions)
    }
  }

  return config
}
