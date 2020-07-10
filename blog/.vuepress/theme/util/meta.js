const _ = require('lodash')
const removeMarkdown = require('remove-markdown')
const stripTags = require('striptags')

const defaultMetas = {}

const resolveURL = (base, path) =>
  `${_.trimEnd(base, '/')}/${_.trimStart(path, '/')}`

const getOptionDefaults = () => {
  return {
    enable: true, // enables/disables everything - control per page using frontmatter
    image: true, // regular meta image used by search engines
    twitter: true, // twitter card
    og: true, // open graph: facebook, pinterest, google+
    schema: true, // schema.org for google

    // canonicalBase is the canonical url base - best to set once in config.js
    // if set it will be used to prepend page path and add it to the following:
    // - canonical link
    // - twitter:url
    // - og:url

    canonicalBase: '',

    // @todo
    // canonical_link: true,
    //
    // having only started with vuepress a few days ago,
    // so far, i couldn't figure out a proper way to extend config head
    // and add <link rel="canonical" href="resolveURL( canonicalBase, $page.path )">

    author: {
      name: '',
      twitter: ''
    },

    // @notes:
    //
    // it's more logical to have this one set once in
    // `.vuepress/config.js` or `.vuepress/theme/index.js` `head`

    site: {
      name: '',
      twitter: ''
    },

    // not sure if these should be allowed to be set in frontmatter

    // order of what gets the highest priority:
    //
    // 1. frontmatter
    // 2. page excerpt
    // 3. content markdown paragraph
    // 4. content regular html <p>

    descriptionSources: [
      'frontmatter',
      'excerpt',

      // markdown paragraph regex
      // @todo: needs work
      //
      /^((?:(?!^#)(?!^-|\+)(?!^[0-9]+\.)(?!^!\[.*?\]\((.*?)\))(?!^\[\[.*?\]\])(?!^\{\{.*?\}\})[^\n]|\n(?! *\n))+)(?:\n *)+\n/gim,
      //
      // this excludes blockquotes using `(?!^>)`
      /// ^((?:(?!^#)(?!^\-|\+)(?!^[0-9]+\.)(?!^!\[.*?\]\((.*?)\))(?!^>)(?!^\[\[.*?\]\])(?!^\{\{.*?\}\})[^\n]|\n(?! *\n))+)(?:\n *)+\n/img,

      // html paragraph regex
      /<p(?:.*?)>(.*?)<\/p>/i

      // -

      // @notes: setting as array require escaping `\`

      // ['^((?:(?!^#)(?!^\-|\+)(?!^[0-9]+\.)(?!^\[\[.*?\]\])(?!^\{\{.*?\}\})[^\n]|\n(?! *\n))+)(?:\n *)+\n', 'img'],
      // ['<p(?:.*?)>(.*?)<\/p>', 'i'],
    ],

    // @consider description max words/char

    // order of what gets the highest priority:
    //
    // 1. frontmatter
    // 2. content markdown image such as `![alt text](http://url)`
    // 3. content regular html img

    imageSources: [
      'frontmatter',

      /!\[.*?\]\((.*?)\)/i, // markdown image regex
      /<img.*?src=['"](.*?)['"]/i // html image regex

      // -

      // @notes: setting as array require escaping `\`

      // ['!\[.*?\]\((.*?)\)', 'i'],
      // ['<img.*?src=[\'"](.*?)[\'"]', 'i'],
    ]
  }
}

const getOptions = ($page, pluginOptions) => {
  return _.defaultsDeep(pluginOptions, getOptionDefaults())
}

const stripMarkup = (str) =>
  stripTags(removeMarkdown(str, { useImgAltText: false }))

const getRegex = (re) => (Array.isArray(re) ? new RegExp(...re) : re)

const isUrl = (maybeUrl) => {
  if (!maybeUrl || typeof maybeUrl !== 'string') {
    return false
  }

  const reProtocolAndDomain = /^(?:\w+:)?\/\/(\S+)$/

  const match = maybeUrl.match(reProtocolAndDomain)

  if (!match) {
    return false
  }

  const allAfterProtocol = match[1]

  if (!allAfterProtocol) {
    return false
  }

  const reDomainLocalhost = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/
  const reDomainNonLocalhost = /^[^\s.]+\.\S{2,}$/

  return (
    reDomainLocalhost.test(allAfterProtocol) ||
    reDomainNonLocalhost.test(allAfterProtocol)
  )
}

const getCanonicalUrl = ($page, options) => {
  if (options.canonicalBase && $page.path) {
    return resolveURL(options.canonicalBase, $page.path)
  }
}

const getDefaultDate = ($page, options) => {
  const { frontmatter } = $page

  if (frontmatter.date) {
    return frontmatter.date
  }
}

const getDefaultTitle = ($page, options) => {
  // default to page title

  let out = $page.title || ''

  // special handling for home

  const { frontmatter, _computed } = $page

  if (frontmatter.home) {
    const site = _computed.$site

    // @notes
    // highly unlikely, but i'm falling back to empty string
    // in case it was intentionally set so that no home title is added
    out = site.title || ''
  }

  return out
}

const getDefaultDescription = ($page, options) => {
  // special handling for home

  const { frontmatter, _computed } = $page

  if (frontmatter.home) {
    const site = _computed.$site
    const description = site.description || ''

    return description
  }

  if (_.isEmpty(options.descriptionSources)) {
    return
  }

  let out = ''

  for (const source of options.descriptionSources) {
    let found = ''
    const content = $page._strippedContent || ''

    switch (source) {
      case 'frontmatter':
        if ($page.frontmatter.description) {
          found = $page.frontmatter.description
        }

        break

      case 'excerpt':
        if ($page.excerpt) {
          found = $page.excerpt
        }

        break

      default:
        if (content) {
          const regex = getRegex(source)

          let match

          if ((match = regex.exec(content)) !== null) {
            if (match[1]) {
              found = match[1]
            }
          }
        }

        break
    }

    found = stripMarkup(found.trim())

    if (found) {
      out = found

      break
    }
  }

  return out
}

const getDefaultImageUrl = ($page, options) => {
  if (_.isEmpty(options.imageSources)) {
    return
  }

  let out = ''

  for (const source of options.imageSources) {
    if (source === 'frontmatter') {
      if ($page.frontmatter.image) {
        out = $page.frontmatter.image

        break
      }
    } else {
      // content without frontmatter - used with regex

      const content = $page._strippedContent || ''

      if (!content) {
        break
      }

      // -

      const regex = getRegex(source)

      let match

      if ((match = regex.exec(content)) !== null) {
        if (match[1]) {
          out = match[1]

          break
        }
      }
    }
  }

  out = out.trim()

  if (!out) {
    return
  }

  // support for image url as relative path

  if (isUrl(out)) {
    return out
  } else {
    // only return it if we have a base url,
    // otherwise it's meaningless to add it

    if (options.canonicalBase) {
      out = resolveURL(options.canonicalBase, out)

      return out
    }
  }
}

const getDefaultAuthor = ($page, options) => {
  // @consider
  //
  // if author data is empty to default to git author if it has relevant details

  return options.author
}

const getDefaultSite = ($page, options) => {
  // @consider to default site name to _computed.$site.title

  return options.site
}

defaultMetas.image = ($page, defaultValues) => {
  const out = []
  if (defaultValues.image) {
    out.push({
      name: 'image',
      content: defaultValues.image
    })
  }
  return out
}

defaultMetas.twitter = ($page, defaultValues) => {
  const out = [
    {
      name: 'twitter:title',
      content: defaultValues.title
    },
    {
      name: 'twitter:description',
      content: defaultValues.description
    }
  ]

  if (defaultValues.image) {
    out.push({
      name: 'twitter:card',
      content: 'summary_large_image'
    })

    out.push({
      name: 'twitter:image',
      content: defaultValues.image
    })
  } else {
    out.push({
      name: 'twitter:card',
      content: 'summary'
    })
  }

  if (defaultValues.canonicalUr) {
    out.push({
      name: 'twitter:url',
      content: defaultValues.canonicalUr
    })
  }

  if (defaultValues.author.twitter) {
    out.push({
      name: 'twitter:creator',
      content: `@${defaultValues.author.twitter.replace('@', '')}` // @username
    })
  }

  if (defaultValues.site.twitter) {
    out.push({
      name: 'twitter:site',
      content: `@${defaultValues.site.twitter.replace('@', '')}` // @site_account
    })
  }

  return out
}

defaultMetas.og = ($page, defaultValues) => {
  let type = 'article'

  const { frontmatter } = $page

  if (frontmatter.home) {
    type = 'website'
  }

  const out = [
    {
      property: 'og:type',
      content: type
    },
    {
      property: 'og:title',
      content: defaultValues.title
    },
    {
      property: 'og:description',
      content: defaultValues.description
    }
  ]

  if (defaultValues.image) {
    out.push({
      property: 'og:image',
      content: defaultValues.image
    })
  }

  if (defaultValues.canonicalUr) {
    out.push({
      property: 'og:url',
      content: defaultValues.canonicalUr
    })
  }

  if (defaultValues.site.name) {
    out.push({
      property: 'og:site_name',
      content: defaultValues.site.name
    })
  }

  // og article related

  if (type === 'article') {
    if (defaultValues.author.name) {
      out.push({
        property: 'article:author',
        content: defaultValues.author.name
      })
    }

    if (defaultValues.date) {
      out.push({
        property: 'article:published_time',
        content: defaultValues.date
      })
    }

    // @consider article:modified_time

    if (!_.isEmpty(frontmatter.tags) && Array.isArray(frontmatter.tags)) {
      for (const tag of frontmatter.tags) {
        out.push({
          property: 'article:tag',
          content: tag
        })
      }
    }
  }

  return out
}

defaultMetas.schema = ($page, defaultValues) => {
  const out = [
    {
      itemprop: 'name',
      content: defaultValues.title
    },
    {
      itemprop: 'description',
      content: defaultValues.description
    }
  ]

  if (defaultValues.image) {
    out.push({
      itemprop: 'image',
      content: defaultValues.image
    })
  }

  // @todo:
  // check if these meta tags require the `itemscope` and `itemtype` attributes
  // to be added to <html> tag

  return out
}

const defaultMetaTags = ($page, defaultValues, options) => {
  let out = []

  const keys = Object.keys(defaultMetas)

  for (const key of keys) {
    if (options[key]) {
      out = out.concat(defaultMetas[key]($page, defaultValues))
    }
  }

  return out.filter((e) => e)
}

function addMetaTags ($page, pluginOptions) {
  const { frontmatter } = $page

  const options = getOptions($page, pluginOptions)

  if (!options.enable) {
    return
  }

  frontmatter.description =
    frontmatter.description || getDefaultDescription($page, options)

  const defaultValues = {
    title: getDefaultTitle($page, options),
    date: getDefaultDate($page, options),
    description: frontmatter.description,
    imageUrl: getDefaultImageUrl($page, options),
    canonicalUr: getCanonicalUrl($page, options),
    author: getDefaultAuthor($page, options),
    site: getDefaultSite($page, options)
  }

  defaultValues.image = defaultValues.imageUrl
  defaultValues.canonical = defaultValues.canonicalUr

  const defaultMetas = defaultMetaTags($page, defaultValues, options)

  if (_.isEmpty(defaultMetas)) {
    return
  }

  frontmatter.meta = frontmatter.meta || []

  for (const meta of defaultMetas) {
    // only add it if not already set in frontmatter

    const index = _.findIndex(frontmatter.meta, ['name', meta.name])

    if (index === -1) {
      frontmatter.meta.push(meta)
    }
  }
}

module.exports = { addMetaTags }
