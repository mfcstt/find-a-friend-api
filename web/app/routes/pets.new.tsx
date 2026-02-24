import { Dog, FileText, Plus, UploadCloud, X } from "lucide-react"
import { useRef, useState } from "react"
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router"
import { z } from "zod"

import type { Route } from "./+types/pets.new"

import { BackendApiError } from "~/lib/api/backend-client.server"
import { getAuthenticatedOrg } from "~/lib/api/orgs.server"
import { createPet } from "~/lib/api/pets.server"
import type { Org } from "~/lib/api/types"
import { clearAuthCookie, getAuthToken } from "~/lib/auth-session.server"
import { AdminProfileAnchor } from "~/components/admin-profile-anchor"
import { PetsSidebar } from "~/components/pets-sidebar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"



const formSchema = z.object({
  name: z.string().min(1, "Informe o nome"),
  about: z.string().min(1, "Informe sobre o pet"),
  age: z.enum(["FILHOTE", "ADULTO", "IDOSO"]),
  size: z.enum(["PEQUENO", "MEDIO", "GRANDE"]),
  energy_level: z.enum(["BAIXA", "MEDIA", "ALTA"]),
  independence_level: z.enum(["BAIXO", "MEDIO", "ALTO"]),
  environment: z.enum(["AMBIENTE_AMPLO", "APARTAMENTO", "AMBIENTE_REDUZIDO"]),
  requirements: z.string().optional(),
})

type ActionData = {
  error?: string
  success?: string
}

export async function loader({ request }: Route.LoaderArgs) {
  const token = getAuthToken(request)

  if (!token) {
    return redirect("/orgs/login")
  }

  try {
    const org = await getAuthenticatedOrg(token)
    return { org }
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return redirect("/orgs/login", {
        headers: {
          "Set-Cookie": clearAuthCookie(),
        },
      })
    }

    throw error
  }
}

export async function action({ request }: Route.ActionArgs) {
  const token = getAuthToken(request)
  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "logout") {
    return redirect("/orgs/login", {
      headers: {
        "Set-Cookie": clearAuthCookie(),
      },
    })
  }

  if (!token) {
    return redirect("/orgs/login", {
      headers: {
        "Set-Cookie": clearAuthCookie(),
      },
    })
  }

  const parsed = formSchema.safeParse({
    name: formData.get("name"),
    about: formData.get("about"),
    age: formData.get("age"),
    size: formData.get("size"),
    energy_level: formData.get("energy_level"),
    independence_level: formData.get("independence_level"),
    environment: formData.get("environment"),
    requirements: formData.get("requirements"),
  })

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Dados inválidos",
    } satisfies ActionData
  }

  const pictureFiles = formData
    .getAll("pictures")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)

  const invalidFile = pictureFiles.find((file) => !file.type.startsWith("image/"))

  if (invalidFile) {
    return {
      error: "Envie apenas arquivos de imagem no campo de fotos",
    } satisfies ActionData
  }

  const pictures = await Promise.all(
    pictureFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      let binary = ""

      const chunkSize = 0x8000

      for (let index = 0; index < bytes.length; index += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
      }

      return `data:${file.type};base64,${btoa(binary)}`
    }),
  )

  const requirements = (parsed.data.requirements ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)

  try {
    await createPet(
      {
        name: parsed.data.name,
        about: parsed.data.about,
        age: parsed.data.age,
        size: parsed.data.size,
        energy_level: parsed.data.energy_level,
        independence_level: parsed.data.independence_level,
        environment: parsed.data.environment,
        pictures,
        requirements,
      },
      token,
    )

    return redirect("/pets/mine")
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return redirect("/orgs/login", {
        headers: {
          "Set-Cookie": clearAuthCookie(),
        },
      })
    }

    if (error instanceof BackendApiError) {
      return {
        error: error.message,
      } satisfies ActionData
    }

    return {
      error: "Não foi possível cadastrar o pet",
    } satisfies ActionData
  }
}

export default function Pet() {
  const { org } = useLoaderData<typeof loader>() as { org: Org }
  const actionData = useActionData<ActionData>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  const orgAddress = `${org.street}, ${org.city} - ${org.state}`
  const picturesInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedPictures, setSelectedPictures] = useState<File[]>([])
  const [requirements, setRequirements] = useState<string[]>([])
  const [requirementDraft, setRequirementDraft] = useState("")

  function handlePicturesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files ? Array.from(event.currentTarget.files) : []
    setSelectedPictures(files)
  }

  function handleRemovePicture(indexToRemove: number) {
    if (!picturesInputRef.current) {
      return
    }

    const dataTransfer = new DataTransfer()

    selectedPictures.forEach((file, index) => {
      if (index !== indexToRemove) {
        dataTransfer.items.add(file)
      }
    })

    picturesInputRef.current.files = dataTransfer.files
    setSelectedPictures(Array.from(dataTransfer.files))
  }

  function handleAddRequirement() {
    const value = requirementDraft.trim()

    if (!value) {
      return
    }

    setRequirements((prev) => [...prev, value])
    setRequirementDraft("")
  }

  function handleRemoveRequirement(indexToRemove: number) {
    setRequirements((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  return (
    <div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <PetsSidebar />

        <main className="flex-1 px-3 py-3 sm:px-4 sm:py-4 md:h-screen md:overflow-hidden md:px-6 md:py-5">
          <div className="mx-auto w-full max-w-6xl md:flex md:h-full md:flex-col">
            <AdminProfileAnchor orgName={org.author_name} orgAddress={orgAddress} />

            <section className="mt-4 rounded-3xl border border-[#d3e2e5] bg-white px-3 py-4 sm:px-4 sm:py-5 md:mt-5 md:flex-1 md:min-h-0 md:px-5 md:py-5">
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold sm:text-2xl md:text-3xl">Adicione um pet</h2>
                <div className="border-b border-[#d3e2e5]" />
              </div>

              <Form method="post" encType="multipart/form-data" className="mt-4 md:h-[calc(100%-52px)] md:min-h-0">
                <div className="grid gap-4 md:h-full md:min-h-0 md:grid-cols-[1fr_0.95fr]">
                  <div className="space-y-4 md:min-h-0 md:overflow-y-auto md:pr-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Nome</label>
                      <Input
                        name="name"
                        placeholder="Nome do pet"
                        className="h-11 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm text-[#0d3b66] sm:h-12 sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-semibold">
                        <span>Sobre</span>
                        <span className="text-xs font-normal text-[#8fa7b2]">Máximo de 300 caracteres</span>
                      </div>
                      <textarea
                        name="about"
                        rows={3}
                        placeholder="Conte a história do pet"
                        className="w-full resize-none rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 py-3 text-sm text-[#0d3b66] outline-none focus-visible:border-[#0d3b66]/40 sm:text-base"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Idade</label>
                        <select
                          name="age"
                          defaultValue="FILHOTE"
                          className="h-11 w-full rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm sm:h-12 sm:text-base"
                        >
                          <option value="FILHOTE">Filhote</option>
                          <option value="ADULTO">Adulto</option>
                          <option value="IDOSO">Idoso</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Porte</label>
                        <select
                          name="size"
                          defaultValue="PEQUENO"
                          className="h-11 w-full rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm sm:h-12 sm:text-base"
                        >
                          <option value="PEQUENO">Pequeno</option>
                          <option value="MEDIO">Médio</option>
                          <option value="GRANDE">Grande</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Nível de energia</label>
                        <select
                          name="energy_level"
                          defaultValue="BAIXA"
                          className="h-11 w-full rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm sm:h-12 sm:text-base"
                        >
                          <option value="BAIXA">Baixa</option>
                          <option value="MEDIA">Média</option>
                          <option value="ALTA">Alta</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Nível de independência</label>
                        <select
                          name="independence_level"
                          defaultValue="BAIXO"
                          className="h-11 w-full rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm sm:h-12 sm:text-base"
                        >
                          <option value="BAIXO">Baixo</option>
                          <option value="MEDIO">Médio</option>
                          <option value="ALTO">Alto</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Ambiente</label>
                      <select
                        name="environment"
                        defaultValue="AMBIENTE_AMPLO"
                        className="h-11 w-full rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm sm:h-12 sm:text-base"
                      >
                        <option value="AMBIENTE_AMPLO">Ambiente amplo</option>
                        <option value="APARTAMENTO">Apartamento</option>
                        <option value="AMBIENTE_REDUZIDO">Ambiente reduzido</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 md:min-h-0 md:overflow-y-auto md:border-l md:border-[#eef2f7] md:pl-4">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold">Fotos</label>

                      <label className="relative flex h-24 cursor-pointer flex-col items-center justify-center rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] text-[#0d3b66] sm:h-28">
                        <UploadCloud className="h-5 w-5" />
                        <span className="mt-1 text-center text-sm font-semibold sm:text-base">Arraste e solte o arquivo</span>
                        <input
                          ref={picturesInputRef}
                          name="pictures"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePicturesChange}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </label>

                      {selectedPictures.length > 0 ? (
                        <div className="max-h-32 space-y-2 overflow-y-auto pr-1 sm:max-h-40">
                          {selectedPictures.map((file, index) => (
                            <div
                              key={`${file.name}-${index}`}
                              className="flex h-10 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-3"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <FileText className="h-4 w-4 shrink-0 text-[#c7d7dc]" />
                                <span className="truncate text-sm text-[#0d3b66]">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemovePicture(index)}
                                className="flex h-5 w-5 items-center justify-center rounded-lg border border-[#f15156] text-[#f15156]"
                                aria-label={`Remover ${file.name}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => picturesInputRef.current?.click()}
                        className="flex h-10 w-full items-center justify-center rounded-[10px] border border-dashed border-[#f15156] text-[#f15156]"
                        aria-label="Adicionar mais fotos"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-3 border-t border-[#d3e2e5] pt-3">
                      <h3 className="text-lg font-bold">Requisitos para adoção</h3>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Requisito</label>
                        <Input
                          value={requirementDraft}
                          onChange={(event) => setRequirementDraft(event.currentTarget.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault()
                              handleAddRequirement()
                            }
                          }}
                          placeholder="Defina um requisito"
                          className="h-11 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-sm text-[#0d3b66] sm:h-12 sm:text-base"
                        />
                      </div>

                      {requirements.length > 0 ? (
                        <div className="max-h-40 space-y-2 overflow-y-auto pr-1 sm:max-h-48">
                          {requirements.map((item, index) => (
                            <div
                              key={`${item}-${index}`}
                              className="flex h-10 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-3"
                            >
                              <span className="truncate text-sm text-[#0d3b66]">{item}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="flex h-5 w-5 items-center justify-center rounded-lg border border-[#f15156] text-[#f15156]"
                                aria-label={`Remover requisito ${index + 1}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      <input type="hidden" name="requirements" value={requirements.join("\n")} readOnly />

                      <button
                        type="button"
                        onClick={handleAddRequirement}
                        className="flex h-10 w-full items-center justify-center rounded-[10px] border border-dashed border-[#f15156] text-[#f15156]"
                        aria-label="Adicionar requisito"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>

                    {actionData?.error ? (
                      <p className="text-sm font-semibold text-[#f15156]">{actionData.error}</p>
                    ) : null}

                    {actionData?.success ? (
                      <p className="text-sm font-semibold text-[#0d3b66]">{actionData.success}</p>
                    ) : null}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-11 w-full rounded-xl bg-[#f4d35e] text-sm font-extrabold text-[#0d3b66] hover:bg-[#f2cc45] sm:h-12 sm:text-base"
                    >
                      {isSubmitting ? "Salvando..." : "Confirmar"}
                    </Button>
                  </div>
                </div>
              </Form>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
