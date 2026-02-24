import { API_URL } from "~/lib/env.server"

export class BackendApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = "BackendApiError"
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH"
  body?: unknown
  token?: string
}

function getBaseUrl() {
  return API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL
}

export async function backendRequest<T>(
  path: string,
  { method = "GET", body, token }: RequestOptions = {},
): Promise<T> {
  const headers = new Headers()

  if (body !== undefined) {
    headers.set("Content-Type", "application/json")
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  let response: Response

  try {
    response = await fetch(`${getBaseUrl()}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new BackendApiError(
      "Não foi possível conectar ao backend. Verifique se a API está rodando.",
      503,
    )
  }

  const responseBody = await response
    .json()
    .catch(() => undefined)

  if (!response.ok) {
    const message =
      (responseBody as { message?: string; error?: string } | undefined)?.message ??
      (responseBody as { message?: string; error?: string } | undefined)?.error ??
      "Erro ao comunicar com o backend"

    throw new BackendApiError(message, response.status, responseBody)
  }

  return responseBody as T
}