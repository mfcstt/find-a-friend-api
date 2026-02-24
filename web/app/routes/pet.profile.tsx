import {
  AlertTriangle,
  Building2,
  Dog,
  House,
  MessageCircle,
  PawPrint,
  TreePine,
  Zap,
} from "lucide-react"
import { useEffect, useState } from "react"
import { redirect, useLoaderData } from "react-router"

import type { Route } from "./+types/pet.profile"

import { BackendApiError } from "~/lib/api/backend-client.server"
import { getAuthenticatedOrg } from "~/lib/api/orgs.server"
import { getPetById } from "~/lib/api/pets.server"
import type { Org, Pet } from "~/lib/api/types"
import { clearAuthCookie, getAuthToken } from "~/lib/auth-session.server"

import { AdminProfileAnchor } from "~/components/admin-profile-anchor"
import { PetsSidebar } from "~/components/pets-sidebar"
import { Button } from "~/components/ui/button"
import { MapCn } from "~/components/map-cn"

export async function loader({ params, request }: Route.LoaderArgs) {
  const petId = params.petId

  if (!petId) {
    throw new Response("Pet não encontrado", { status: 404 })
  }

  const pet = await getPetById(petId)
  const token = getAuthToken(request)

  if (!token) {
    return { pet, org: null }
  }

  try {
    const org = await getAuthenticatedOrg(token)
    return { pet, org }
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return { pet, org: null }
    }

    throw error
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  if (intent === "logout") {
    return redirect("/orgs/login", {
      headers: {
        "Set-Cookie": clearAuthCookie(),
      },
    })
  }

  return null
}

function getEnergyScore(level: Pet["energy_level"]) {
  if (level === "BAIXA") return 2
  if (level === "MEDIA") return 3
  return 5
}

function getEnergyLabel(level: Pet["energy_level"]) {
  if (level === "BAIXA") return "Baixa energia"
  if (level === "MEDIA") return "Energia média"
  return "Muita energia"
}

function getSizeLabel(size: Pet["size"]) {
  if (size === "PEQUENO") return "Pequeno"
  if (size === "MEDIO") return "Médio"
  return "Grande"
}

function getAgeLabel(age: Pet["age"]) {
  if (age === "FILHOTE") return "Filhote"
  if (age === "ADULTO") return "Adulto"
  return "Idoso"
}

function getEnvironmentLabel(environment: Pet["environment"]) {
  if (environment === "AMBIENTE_AMPLO") return "Ambiente amplo"
  if (environment === "AMBIENTE_REDUZIDO") return "Ambiente reduzido"
  return "Apartamento"
}

export default function PetProfile() {
  const { pet, org } = useLoaderData<typeof loader>() as { pet: Pet; org: Org | null }
  const heroImage = pet.pictures[0] || "https://www.figma.com/api/mcp/asset/e5d275d1-ca83-40f0-a9e3-29d6d8b5e127"
  const thumbnails = pet.pictures.length > 0 ? pet.pictures : [heroImage]
  const [selectedPicture, setSelectedPicture] = useState(heroImage)
  const energyScore = getEnergyScore(pet.energy_level)
  const sizeScore = pet.size === "PEQUENO" ? 1 : pet.size === "MEDIO" ? 2 : 3
  const orgName = org?.author_name ?? "ONG responsável"
  const orgAddress = org ? `${org.street}, ${org.city} - ${org.state}` : "Endereço não disponível"
  const whatsapp = org?.whatsapp
  const whatsappMessage = [
    `Olá, ${orgName}! Tudo bem?`,
    `Tenho interesse em adotar o(a) ${pet.name}.`,
    `Vi no app que ele(a) é ${getAgeLabel(pet.age).toLowerCase()}, de porte ${getSizeLabel(pet.size).toLowerCase()} e com ${getEnergyLabel(pet.energy_level).toLowerCase()}.`,
    "Vocês podem me contar os próximos passos para a adoção?",
  ].join("\n")
  const whatsappLink = whatsapp
    ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`
    : undefined
  const mapQuery = orgAddress === "Endereço não disponível" ? "Recife, Pernambuco" : orgAddress
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`

  useEffect(() => {
    setSelectedPicture(heroImage)
  }, [heroImage])

  return (
    <div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <PetsSidebar />

        <main className="flex-1 px-3 py-3 sm:px-4 sm:py-4 md:h-screen md:overflow-hidden md:px-6 md:py-5">
          <div className="mx-auto w-full max-w-6xl md:flex md:h-full md:flex-col">
            <AdminProfileAnchor orgName={org?.author_name} orgAddress={orgAddress} />

            <section className="mt-3 overflow-hidden rounded-3xl border border-white bg-white shadow-sm md:mt-4 md:flex-1 md:min-h-0">
              <div className="grid gap-0 md:h-full md:grid-cols-[1.1fr_0.9fr]">
                <div className="px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4 md:min-h-0 md:overflow-y-auto md:px-5 md:pb-5">
                  <div className="h-44 w-full overflow-hidden rounded-2xl sm:h-56 md:h-64">
                    <img alt={pet.name} className="h-full w-full object-cover" src={selectedPicture} />
                  </div>

                  <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
                    {thumbnails.map((thumb, index) => (
                      <button
                        type="button"
                        key={`${thumb}-${index}`}
                        onClick={() => setSelectedPicture(thumb)}
                        className={`h-11 w-11 overflow-hidden rounded-xl transition ${selectedPicture === thumb ? "border-2 border-[#0d3b66]" : "opacity-35 hover:opacity-70"}`}
                        aria-label={`Ver foto ${index + 1}`}
                      >
                        <img alt={`Foto ${index + 1}`} className="h-full w-full object-cover" src={thumb} />
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    <h1 className="text-2xl font-extrabold sm:text-3xl">{pet.name}</h1>
                    <p className="text-sm font-semibold leading-5 sm:text-base sm:leading-6">{pet.about}</p>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex min-h-18 w-full flex-col justify-center rounded-2xl border border-[#0d3b66] bg-[#0d3b66]/5 px-3 py-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Zap
                            key={`energy-${index}`}
                            className={`h-4 w-4 ${index < energyScore ? "text-[#0d3b66]" : "text-[#0d3b66]/30"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs font-semibold sm:text-sm">{getEnergyLabel(pet.energy_level)}</p>
                    </div>

                    <div className="flex min-h-18 w-full flex-col justify-center rounded-2xl border border-[#0d3b66] bg-[#0d3b66]/5 px-3 py-2">
                      {pet.environment === "AMBIENTE_AMPLO" ? (
                        <TreePine className="h-4 w-4" />
                      ) : pet.environment === "AMBIENTE_REDUZIDO" ? (
                        <House className="h-4 w-4" />
                      ) : (
                        <Building2 className="h-4 w-4" />
                      )}
                      <p className="mt-2 text-xs font-semibold sm:text-sm">{getEnvironmentLabel(pet.environment)}</p>
                    </div>

                    <div className="flex min-h-18 w-full flex-col justify-center rounded-2xl border border-[#0d3b66] bg-[#0d3b66]/5 px-3 py-2 sm:col-span-2 md:col-span-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 3 }).map((_, index) => (
                          <PawPrint
                            key={`size-${index}`}
                            className={`h-4 w-4 ${index < sizeScore ? "text-[#0d3b66]" : "text-[#0d3b66]/30"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs font-semibold sm:text-sm">{getSizeLabel(pet.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#eef2f7] px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4 md:min-h-0 md:overflow-y-auto md:border-l md:border-t-0 md:px-5 md:pb-5">
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#dde3f0] bg-white px-3 py-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4d35e] text-[#0d3b66]">
                        <Dog className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-base font-bold">{orgName}</p>
                        <p className="text-xs font-semibold text-[#5c7480] sm:text-sm">{orgAddress}</p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full bg-[#0d3b66]/10 px-3 py-1.5 text-xs font-bold text-[#0d3b66]">
                      {whatsapp ?? "WhatsApp indisponível"}
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#dde3f0] bg-white">
                    <div className="relative h-36 overflow-hidden rounded-t-2xl sm:h-40 md:h-44">
                      <MapCn query={mapQuery} className="h-full w-full border-0" />
                      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4d35e] p-2 text-[#0d3b66] shadow-md">
                        <Dog className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex h-10 items-center justify-center rounded-b-2xl bg-[#0d3b66] px-3 text-center sm:h-11">
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-[#f4d35e] underline-offset-4 hover:underline sm:text-sm"
                      >
                        Ver rotas no Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#dde3f0] pt-4">
                    <h3 className="text-lg font-bold">Requisitos para adoção</h3>
                    <div className="mt-3 flex max-h-48 flex-col gap-2 overflow-y-auto pr-1 sm:max-h-56 md:max-h-72">
                      {pet.requirements.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-[10px] border border-[#f15156] px-3 py-2 text-[#f15156]"
                          style={{
                            backgroundImage:
                              "linear-gradient(173.33deg, rgba(247, 95, 96, 0.1) 16.45%, rgba(241, 81, 86, 0) 67.31%)",
                          }}
                        >
                          <AlertTriangle className="h-4 w-4 shrink-0" />
                          <span className="text-xs font-semibold sm:text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-[#dde3f0] pt-4">
                    <Button
                      asChild
                      className="h-11 w-full rounded-xl bg-[#3cdc8c] text-sm font-extrabold text-white hover:bg-[#33c77b] sm:h-12 sm:text-base"
                    >
                      <a
                        href={whatsappLink ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={!whatsappLink}
                        className={!whatsappLink ? "pointer-events-none opacity-60" : undefined}
                      >
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Chamar no WhatsApp
                        </span>
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
