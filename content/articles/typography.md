---
title: Typography
description: Site typography
---

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Text

### Paragraph

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, sed _do eiusmod tempor_ incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Code

```javascript
async asyncData({ $content, params }) {
  const article = await $content('articles', params.slug).fetch()

  return {
    article
  }
}
```

### Blockquote

> Lorem ipsum dolor sit amet, **consectetur adipiscing elit**, sed _do eiusmod tempor_ incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
>
> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.