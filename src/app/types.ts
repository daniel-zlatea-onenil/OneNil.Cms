// src/types.ts

/**
 * Generic PageProps type for dynamic routes in Next.js App Router
 */
export interface RouteParams<T extends Record<string, string> = Record<string, string>> {
    params: T;
}
