# tailwind-class-organizer

## Installation

```
npm install @robokozo/tailwind-class-organizer
```

## Setup

```
import { createApp } from "vue"
import App from "./App.vue"
import "./assets/tailwind.css"

import { vueDirective } from "@robokozo/tailwind-class-organizer"

const app = createApp(App)

app.directive("tw", vueDirective)

app.mount("#app")
```

## Usage

```
<div
    class="w-10 h-10 bg-white"
    v-tw="{
        md: 'h-40 w-40 bg-red-500',
        lg: {
          default: 'h-20 w-20 bg-yellow-200',
          hover: 'bg-yellow-900'
        }
    }">
</div>

```

---

**Note:** `v-tw` is configured when adding the directive to the app instance in setup `app.directive("tw", vueDirective)`

---

### Produces

```
<div class="w-10 h-10 bg-white md:h-40 md:w-40 md:bg-red-500 lg:h-20 lg:w-20 lg:bg-yellow-200 lg:hover:bg-yellow-900"></div>
```
