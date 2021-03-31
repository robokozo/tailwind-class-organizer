import { convertToTailwindClassesArray } from "./tailwindClassOrganizer"

const vueDirective = {
    beforeMount(el, binding) {
        const values = convertToTailwindClassesArray(binding.value)
        el.classList.add(...values)
        el.dataset.previousValues = values.join(",")
    },
    beforeUpdate(el, binding) {
        if (el.dataset.previousValues != null) {
            const oldValues = el.dataset.previousValues.split(",")
            el.classList.remove(...oldValues)
        }
        const newValues = convertToTailwindClassesArray(binding.value)

        el.classList.add(...newValues)
        el.dataset.previousValues = newValues.join(",")
    },
}

export default vueDirective
