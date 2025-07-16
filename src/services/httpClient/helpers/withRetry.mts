interface RetryOptions {
    retries?: number;
    delay?: number;
}

export async function withRetry<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const { retries = 3, delay = 1000 } = options;

    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        return withRetry(fn, { retries: retries - 1, delay: delay * 2 });
    }
}