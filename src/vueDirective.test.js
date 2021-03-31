import vueDirective from "./vueDirective"

describe("vueDirective", () => {
    it("should work through the lifecycles", () => {
        //Arrange
        const el = {
            dataset: {
                previousValues: null,
            },
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

        expect(el.dataset.previousValues).toEqual("md:p-1,lg:p-2")
        expect(el.classList.add).toHaveBeenCalledWith("md:p-1", "lg:p-2")
        expect(el.classList.remove).not.toHaveBeenCalled()

        //beforeUpdate
        const bindingUpdate = {
            value: { md: "p-3", lg: "p-4" },
        }
        vueDirective.beforeUpdate(el, bindingUpdate)

        expect(el.dataset.previousValues).toEqual("md:p-3,lg:p-4")
        expect(el.classList.add).toHaveBeenCalledWith("md:p-3", "lg:p-4")
        expect(el.classList.remove).toHaveBeenCalledWith("md:p-1", "lg:p-2")
    })
})
