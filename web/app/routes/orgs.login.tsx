import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Form, Link, redirect, useActionData, useNavigation } from "react-router"
import { z } from "zod"

import type { Route } from "./+types/orgs.login"

import { authenticateOrg } from "~/lib/api/orgs.server"
import { BackendApiError } from "~/lib/api/backend-client.server"
import { buildAuthCookie } from "~/lib/auth-session.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const bannerRegister = "/banner-register.png"

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(1, "Informe a senha"),
})

type ActionData = {
  error?: string
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    } satisfies ActionData
  }

  try {
    const { token } = await authenticateOrg(parsed.data)

    return redirect("/pets/new", {
      headers: {
        "Set-Cookie": buildAuthCookie(token),
      },
    })
  } catch (error) {
    if (error instanceof BackendApiError) {
      return {
        error: error.message,
      } satisfies ActionData
    }

    return {
      error: "Não foi possível autenticar agora",
    } satisfies ActionData
  }
}

export function Register() {
  const [showPassword, setShowPassword] = React.useState(false)
  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="min-h-screen bg-white px-4 py-6 font-['Nunito'] sm:px-6 sm:py-8 lg:px-12 lg:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
        <aside className="hidden flex-1 justify-center lg:flex">
          <div className="flex w-full max-w-122 items-end justify-center overflow-hidden rounded-4xl bg-[#f15156] px-8 py-10 text-white lg:min-h-165.25">
            <img
              alt="Find A Friend"
              className="w-full max-w-100 object-contain"
              src={bannerRegister}
            />
          </div>
        </aside>

        <section className="flex w-full flex-1 flex-col items-center lg:items-start">
          <div className="w-full max-w-md lg:max-w-lg">
            <h1 className="text-center text-3xl font-bold leading-tight text-[#0d3b66] sm:text-4xl lg:text-left lg:text-5xl">
              Cadastre sua organização
            </h1>

            <Form method="post" className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">Email</label>
                <Input
                  name="email"
                  type="email"
                  placeholder="nome@email.com"
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">Senha</label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 pr-12 text-base text-[#0d3b66] sm:h-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0d3b66]/70"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              {actionData?.error ? (
                <p className="text-sm font-semibold text-[#f15156]">{actionData.error}</p>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-[14px] bg-[#0d3b66] text-base font-extrabold text-white hover:bg-[#0b3156] sm:h-14"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <p className="text-center text-sm text-[#0d3b66]">
                Não possui conta?{" "}
                <Link to="/orgs/new" className="font-semibold underline">
                  Cadastrar
                </Link>
              </p>
            </Form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function OrgsLogin(_props: Route.ComponentProps) {
  return <Register />
}
