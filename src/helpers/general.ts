/* eslint-disable @typescript-eslint/no-explicit-any */
export const detectObjectNullValues = (obj: any, seen = new WeakSet<object>()): boolean => {
    // Treat null/undefined/NaN at the current level as a hit
    if (obj === null || obj === undefined) return true;
    if (typeof obj === "number" && Number.isNaN(obj)) return true;

    // Only recurse into objects/arrays
    if (typeof obj !== "object") return false;

    // Guard against circular references
    if (seen.has(obj)) return false;
    seen.add(obj);

    // Arrays: check each element
    if (Array.isArray(obj)) {
        for (const item of obj) {
            if (detectObjectNullValues(item, seen)) return true;
        }
        return false;
    }

    // Plain objects: check each property value
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (detectObjectNullValues(obj[key], seen)) return true;
        }
    }
    return false;
};
