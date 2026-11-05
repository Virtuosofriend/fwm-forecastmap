import { authentication, createDirectus, rest } from "@directus/sdk";
import { configuration } from "@/config";

export const directusClient = createDirectus(configuration.baseURL)
    .with(authentication("session", { credentials: "include" }))
    .with(rest({ credentials: "include" }));
