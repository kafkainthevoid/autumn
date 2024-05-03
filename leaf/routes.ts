/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/admin", "/admin/new-verification", "/new-verification", "/search"]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/app", "/login", "/register", "/error", "/reset", "/new-password"]

/**
 * The prefix for API authentication routes
 * Rotues that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api"

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"
