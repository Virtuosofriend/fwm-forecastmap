export const withAsync = async <T, A extends any[]>(
    fn: (...args: A) => Promise<T>,
    ...args: A
): Promise<{ response: T | null; error: any }> => {
    try {
        const response = await fn(...args);
        return {
            response,
            error: null,
        };
    } catch (error) {
        return {
            response: null,
            error,
        };
    }
};