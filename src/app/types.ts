// src/types.ts

/**
 * Generic PageProps type for dynamic routes in Next.js App Router
 */
export interface PageProps<T extends Record<string, string> = Record<string, string>> {
    params: T;
}
