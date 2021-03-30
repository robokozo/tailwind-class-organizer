function isString(s) {
    return typeof s === "string"
}

function isObject(o) {
    return typeof o === "object" && o !== null
}

function getClasses(key, value, parentKeys) {
    if (isString(value)) {
        if (key === "default") {
            if (parentKeys.length === 0) {
                //this is the special exception for the root default
                return value.split(" ")
            }
            const fullKeyPath = [...parentKeys].join(":")
            return [`${fullKeyPath}:${value}`]
        } else {
            const split = value.split(" ")
            const fullKeyPath = [...parentKeys, key].join(":")
            return split.map((x) => `${fullKeyPath}:${x}`)
        }
    } else if (isObject(value)) {
        return processConfig(value, [...parentKeys, key])
    } else {
        throw new Error("Invalid Configuration")
    }
}

function processConfig(config, parentKeys = []) {
    if (!isObject(config)) {
        return config
    }

    let combinedClasses = []

    for (const key in config) {
        const value = config[key]
        const classes = getClasses(key, value, parentKeys)
        combinedClasses = [...combinedClasses, ...classes]
    }

    return combinedClasses
}

export function convertToTailwindClassesArray(config) {
    return processConfig(config)
}
