import { convertToTailwindClassesArray } from "./tailwindClassOrganizer"

/**
 *
 * @param {{ delimiter?: string, datasetProperty?: string }} config
 * @returns VueDirective
 */
export default function vueDirective(config = {}) {
    const delimiter = config.delimiter || ","
    const datasetProperty = config.datasetProperty || "previousValues"

    return {
        beforeMount(el, binding) {
            const values = convertToTailwindClassesArray(binding.value)
            el.classList.add(...values)
            el.dataset[datasetProperty] = values.join(delimiter)
        },
        beforeUpdate(el, binding) {
            if (el.dataset[datasetProperty] != null) {
                const oldValues = el.dataset[datasetProperty].split(delimiter)
                el.classList.remove(...oldValues)
            }
            const newValues = convertToTailwindClassesArray(binding.value)

            el.classList.add(...newValues)
            el.dataset[datasetProperty] = newValues.join(delimiter)
        },
    }
}
