import { parseCookie } from "~/lib/cookies.server"

const AUTH_COOKIE_NAME = "findafriend_token"

export function getAuthToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie")
  const cookies = parseCookie(cookieHeader)

  return cookies[AUTH_COOKIE_NAME]
}

export function buildAuthCookie(token: string) {
  return `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
}

export function clearAuthCookie() {
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}