export function parseCookie(cookieHeader: string | null) {
  if (!cookieHeader) {
    return {}
  }

  return cookieHeader.split(";").reduce<Record<string, string>>((acc, part) => {
    const [rawName, ...rawValue] = part.trim().split("=")

    if (!rawName) {
      return acc
    }

    acc[rawName] = decodeURIComponent(rawValue.join("="))
    return acc
  }, {})
}