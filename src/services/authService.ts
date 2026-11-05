import { readMe } from "@directus/sdk";
import { directusClient } from "./httpClient/directusClient.mts";
import { withAsync } from "./httpClient/helpers/withAsync.mts";
import type { AuthUser } from "@/types";

const getCurrentUser = async (): Promise<AuthUser | null> => {
    const { response, error } = await withAsync(() =>
        directusClient.request(readMe({ fields: ["id", "email", "first_name", "last_name"] })),
    );
    if (error || !response) {
        return null;
    }
    return {
        id: response.id,
        email: response.email ?? null,
        first_name: response.first_name ?? null,
        last_name: response.last_name ?? null,
    };
};

// Resolves to the user, or null for any failure, so callers can't tell a wrong email from a
// wrong password.
export const loginUser = async (email: string, password: string): Promise<AuthUser | null> => {
    const { error } = await withAsync(() => directusClient.login({ email, password }));
    if (error) {
        return null;
    }
    return getCurrentUser();
};

// Looks for an existing session cookie; also re-arms the SDK's automatic session refresh.
export const restoreUserSession = async (): Promise<AuthUser | null> => {
    const { error } = await withAsync(() => directusClient.refresh());
    if (error) {
        return null;
    }
    return getCurrentUser();
};

// Best effort: the session may already be invalid on the server.
export const logoutUser = async (): Promise<void> => {
    await withAsync(() => directusClient.logout());
};
