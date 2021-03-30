import { convertToTailwindClassesArray } from "./tailwindClassOrganizer"

export const cache = new Map()
const vueDirective = {
    beforeMount(el, binding) {
        const values = convertToTailwindClassesArray(binding.value)
        cache.set(el, values)
        el.classList.add(...values)
    },
    beforeUpdate(el, binding) {
        if (cache.has(el)) {
            const oldValues = cache.get(el)
            el.classList.remove(...oldValues)
        }
        const newValues = convertToTailwindClassesArray(binding.value)

        el.classList.add(...newValues)
        cache.set(el, newValues)
    },
    unmounted(el) {
        cache.delete(el)
    },
}

export default vueDirective
