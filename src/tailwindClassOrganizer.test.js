import { convertToTailwindClassesArray } from "./tailwindClassOrganizer.js"

describe("tailwindClassOrganizer", () => {
    describe("convertToTailwindClassesArray", () => {
        it("default paths return an array of classes", () => {
            const response = convertToTailwindClassesArray({
                default: "h-10 w-10",
            })

            expect(response).toEqual(["h-10", "w-10"])
        })

        it("nested default paths return an array of classes with correct prefix", () => {
            const response = convertToTailwindClassesArray({
                lg: { default: "h-10 w-10" },
            })

            expect(response).toEqual(["lg:h-10", "lg:w-10"])
        })

        it("nested paths return an array of classes with correct prefix", () => {
            const response = convertToTailwindClassesArray({
                lg: "h-10 w-10",
            })

            expect(response).toEqual(["lg:h-10", "lg:w-10"])
        })

        it("deep nested paths return an array of classes with correct prefix", () => {
            const response = convertToTailwindClassesArray({
                lg: {
                    hover: "h-10 w-10 bg-red-500",
                },
            })

            expect(response).toEqual(["lg:hover:h-10", "lg:hover:w-10", "lg:hover:bg-red-500"])
        })

        it("passing a string should return an array of classes", () => {
            const response = convertToTailwindClassesArray("p-2 text-white")

            expect(response).toEqual(["p-2", "text-white"])
        })

        it("passing a string with lots of whitespacing issues should return an array of classes", () => {
            const response = convertToTailwindClassesArray("      p-2       text-white      ")

            expect(response).toEqual(["p-2", "text-white"])
        })

        it("object payload with lots of whitespacing issues should return an array of classes", () => {
            const response = convertToTailwindClassesArray({
                lg: "     h-10      w-12          ",
            })

            expect(response).toEqual(["lg:h-10", "lg:w-12"])
        })

        it("default object payload with lots of whitespacing issues should return an array of classes", () => {
            const response = convertToTailwindClassesArray({
                default: "     h-10      w-12          ",
            })

            expect(response).toEqual(["h-10", "w-12"])
        })
    })
})
