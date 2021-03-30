import vueDirective, { cache } from "./vueDirective"

describe("vueDirective", () => {
    beforeEach(() => {
        cache.clear()
    })

    it("should work through the lifecycles", () => {
        //Arrange
        const el = {
            classList: {
                add: jest.fn(),
                has: jest.fn(() => true),
                remove: jest.fn(),
            },
        }

        const bindingAdd = {
            value: { md: "p-1", lg: "p-2" },
        }

        //beforeMount
        vueDirective.beforeMount(el, bindingAdd)
        const cacheStateAdd = cache.get(el)

        expect(cacheStateAdd).toEqual(["md:p-1", "lg:p-2"])
        expect(el.classList.add).toHaveBeenCalledWith("md:p-1", "lg:p-2")
        expect(el.classList.remove).not.toHaveBeenCalled()

        //beforeUpdate
        const bindingUpdate = {
            value: { md: "p-3", lg: "p-4" },
        }
        vueDirective.beforeUpdate(el, bindingUpdate)
        const cacheStateUpdate = cache.get(el)

        expect(cacheStateUpdate).toEqual(["md:p-3", "lg:p-4"])
        expect(el.classList.add).toHaveBeenCalledWith("md:p-3", "lg:p-4")
        expect(el.classList.remove).toHaveBeenCalledWith("md:p-1", "lg:p-2")

        //unmounted
        vueDirective.unmounted(el)
        const isCached = cache.has(el)

        expect(isCached).toEqual(false)
    })
})
