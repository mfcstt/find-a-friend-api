import * as React from "react"
import { Dog, Eye, EyeOff } from "lucide-react"
import { Form, Link, redirect, useActionData, useNavigation } from "react-router"
import { z } from "zod"

import type { Route } from "./+types/orgs.new"

import { BackendApiError } from "~/lib/api/backend-client.server"
import { MapCn } from "~/components/map-cn"
import { createOrg } from "~/lib/api/orgs.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

const bannerRegister = "/banner-register.png"

const registerSchema = z
  .object({
    author_name: z.string().min(1, "Informe o nome do responsável"),
    email: z.email("Informe um e-mail válido"),
    cep: z.string().min(1, "Informe o CEP"),
    street: z.string().min(1, "Informe o endereço"),
    neighborhood: z.string().min(1, "Informe o bairro"),
    city: z.string().min(1, "Informe a cidade"),
    state: z.string().min(1, "Informe o estado"),
    whatsapp: z.string().min(1, "Informe o WhatsApp"),
    password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })

type ActionData = {
  error?: string
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()

  const parsed = registerSchema.safeParse({
    author_name: formData.get("author_name"),
    email: formData.get("email"),
    cep: formData.get("cep"),
    street: formData.get("street"),
    neighborhood: formData.get("neighborhood"),
    city: formData.get("city"),
    state: formData.get("state"),
    whatsapp: formData.get("whatsapp"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    } satisfies ActionData
  }

  try {
    await createOrg({
      author_name: parsed.data.author_name,
      email: parsed.data.email,
      cep: parsed.data.cep,
      street: parsed.data.street,
      neighborhood: parsed.data.neighborhood,
      city: parsed.data.city,
      state: parsed.data.state,
      whatsapp: parsed.data.whatsapp,
      password: parsed.data.password,
    })

    return redirect("/orgs/login")
  } catch (error) {
    if (error instanceof BackendApiError) {
      return {
        error: error.message,
      } satisfies ActionData
    }

    return {
      error: "Não foi possível cadastrar agora",
    } satisfies ActionData
  }
}

export function Register() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [streetPreview, setStreetPreview] = React.useState("")
  const [cityPreview, setCityPreview] = React.useState("")
  const [statePreview, setStatePreview] = React.useState("")

  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const mapQuery = `${streetPreview}, ${cityPreview}, ${statePreview}`

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
                <label className="text-sm font-semibold text-[#0d3b66]">Nome do responsável</label>
                <Input
                  name="author_name"
                  placeholder="Antonio Bandeira"
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                />
              </div>

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
                <label className="text-sm font-semibold text-[#0d3b66]">CEP</label>
                <Input
                  name="cep"
                  placeholder="13254-000"
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#0d3b66]">Endereço</label>
                  <Input
                    name="street"
                    placeholder="Rua do meio"
                    onChange={(event) => setStreetPreview(event.currentTarget.value)}
                    className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                  />
                </div>

                <div className="relative h-28 w-full overflow-hidden rounded-3xl border border-dashed border-[#0d3b66]/50 sm:h-32">
                  <MapCn query={mapQuery} className="h-full w-full border-0" />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4d35e] p-2 text-[#0d3b66] shadow-md">
                    <Dog className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1.2fr_0.6fr]">
                <Input
                  name="neighborhood"
                  placeholder="Bairro"
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                />
                <Input
                  name="city"
                  placeholder="Cidade"
                  onChange={(event) => setCityPreview(event.currentTarget.value)}
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14"
                />
                <Input
                  name="state"
                  placeholder="UF"
                  onChange={(event) => setStatePreview(event.currentTarget.value)}
                  className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-base text-[#0d3b66] sm:h-14 sm:col-span-2 lg:col-span-1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">Whatsapp</label>
                <Input
                  name="whatsapp"
                  placeholder="81 91234-5678"
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">Confirmar senha</label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    className="h-12 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 pr-12 text-base text-[#0d3b66] sm:h-14"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0d3b66]/70"
                  >
                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
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
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>

              <Link
                to="/orgs/login"
                className="text-center text-lg font-extrabold text-[#0d3b66] underline"
              >
                Já possui conta?
              </Link>
            </Form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function OrgsNew(_props: Route.ComponentProps) {
  return <Register />
}
