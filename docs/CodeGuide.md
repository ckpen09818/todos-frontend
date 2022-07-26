# Code Guide

## 命名規則

- vue component 使用 **Pascal Case** 方式命名
  - &#x2705; Apple.vue
  - &#x274C; apple.vue
- js,ts,css,html 使用 **camel case** 方式命名
  - &#x2705; apple.ts
  - &#x274C; Apple.ts
  - &#x274C; apple_xxx.ts
  - &#x274C; apple-xxx.ts

---

## Vue Template

### 語法

- Component tag 使用大寫
  - &#x2705; `<Apple> apple </Apple>`
- 如果 Component 沒有 children 使用 self-closing
  - &#x2705; `<Apple /> `
- attribute 如果是固定字串,不要使用 bind
  - &#x2705; `<Apple attr="123" /> `
  - &#x274C; `<Apple :attr="'123'" /> `
- attribute 順序
  - v-if,v-else,v-for
  - unbound attribute
  - class
  - style
  - binding attribute
  - v-model
  - event
