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

```
 <input
    ref="inputRef"
    type="checkbox"
    :id="checkboxId"
    :class="[($slots.trueIcon || $slots.falseIcon) && 'hidden']"
    :checked="internalChecked"
    :data-indeterminate="indeterminate ? 'yes' : undefined"
    v-bind="{ disabled, trueValue, falseValue, value }"
    @change="onChange"
  />
```

## CSS

### 規則

- class 使用 [BEM](http://getbem.com/naming/) 規則命名
- 在 style tag 裡使用 tailwindcss class

```
.apple{
  @apply flex justify-center items-center;
}
```

- style tag 裡的 class 順序按照 BEM 方式

```
.task {
  @apply relative rounded-lg w-full;
}

.task__wrapper {
  @apply flex justify-start items-center gap-1;
}
.task__input {
  @apply h-8;
}
.task__input:not(:focus) {
  @apply cursor-default;
}
.task__input--done {
  @apply line-through text-gray-400;
}
```

## Script

### 規則

- 統一使用 typescript 開發
- 優先使用 setup attribute `<script setup lang="ts">`
- import 順序

```
// 空一格分隔不同import來源
// 第三方套件優先
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
// 專案內function
import { useTodoStore } from '@/stores'
import { transformToUTC } from '@/utils'
// components
import TaskList from './components/TaskList.vue'
import TaskDrawer from './components/TaskDrawer.vue'
```

- composables function 使用 use-\* 開頭
- 使用 index.ts 統一輸出資料夾下 script
- services directory 裡面 api 需要先在 types/api/\* 定義
  - 使用 namespace 定義不同 service

## File structure

```
- components //global component
- composables // global composables function
- layouts
- routes
- services // api
- stores // global state manage
- styles // global style
- types // all types
- utils // global utils function
- views // view use in route
  - *
    - components // component only use in view
```
