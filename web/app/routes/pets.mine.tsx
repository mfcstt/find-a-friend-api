import { Dog, PawPrint, PlusCircle } from "lucide-react"
import { Link, redirect, useLoaderData } from "react-router"

import type { Route } from "./+types/pets.mine"

import { BackendApiError } from "~/lib/api/backend-client.server"
import { getAuthenticatedOrg } from "~/lib/api/orgs.server"
import { filterPets } from "~/lib/api/pets.server"
import type { Org, Pet } from "~/lib/api/types"
import { clearAuthCookie, getAuthToken } from "~/lib/auth-session.server"
import { AdminProfileAnchor } from "~/components/admin-profile-anchor"
import { PetsSidebar } from "~/components/pets-sidebar"

export async function loader({ request }: Route.LoaderArgs) {
  const token = getAuthToken(request)

  if (!token) {
    return redirect("/orgs/login")
  }

  try {
    const org = await getAuthenticatedOrg(token)
    const petsFromCity = await filterPets({ city: org.city })
    const pets = petsFromCity.filter((pet) => pet.org_id === org.id)

    return { org, pets }
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

function getAgeLabel(age: Pet["age"]) {
  if (age === "FILHOTE") return "Filhote"
  if (age === "ADULTO") return "Adulto"
  return "Idoso"
}

function getSizeLabel(size: Pet["size"]) {
  if (size === "PEQUENO") return "Pequeno"
  if (size === "MEDIO") return "Médio"
  return "Grande"
}

export default function MyPets() {
  const { org, pets } = useLoaderData<typeof loader>() as { org: Org; pets: Pet[] }
  const orgAddress = `${org.street}, ${org.city} - ${org.state}`

  return (
    <div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <PetsSidebar />

        <main className="flex-1 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
          <div className="mx-auto w-full max-w-6xl">
            <AdminProfileAnchor orgName={org.author_name} orgAddress={orgAddress} />

            <section className="mt-4 rounded-3xl border border-[#d3e2e5] bg-white px-3 py-4 sm:px-4 sm:py-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#eef2f7] pb-4">
                <div>
                  <h1 className="text-lg font-extrabold sm:text-2xl">Meus pets</h1>
                  <p className="mt-0.5 text-xs font-semibold text-[#5c7480] sm:text-sm">{org.author_name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#0d3b66]/10 px-3 py-1.5 text-xs font-extrabold text-[#0d3b66] sm:text-sm">
                    {pets.length} cadastrados
                  </span>
                  <Link
                    to="/pets/new"
                    className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#0d3b66] px-3 text-xs font-extrabold text-white hover:bg-[#0b3156] sm:h-10 sm:text-sm"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Novo pet
                  </Link>
                </div>
              </div>

              {pets.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d3e2e5] bg-[#f5f8fa] px-4 py-10 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4d35e] text-[#0d3b66]">
                    <PawPrint className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#5c7480]">Você ainda não cadastrou pets.</p>
                  <Link to="/pets/new" className="mt-3 inline-block text-sm font-extrabold text-[#0d3b66] underline">
                    Cadastrar primeiro pet
                  </Link>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {pets.map((pet) => {
                    const image = pet.pictures[0]

                    return (
                      <Link
                        key={pet.id}
                        to={`/pet/${pet.id}`}
                        className="group overflow-hidden rounded-2xl border border-[#d3e2e5] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-white hover:bg-[#0d3b66]"
                      >
                        <div className="relative h-30 w-full bg-[#f5f8fa]">
                          {image ? (
                            <img alt={pet.name} src={image} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[#8fa7b2]">
                              <Dog className="h-5 w-5" />
                            </div>
                          )}

                          <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-[#0d3b66]">
                            {getAgeLabel(pet.age)}
                          </div>
                        </div>
                        <div className="px-3 py-3">
                          <p className="truncate text-sm font-extrabold text-[#0d3b66] transition-colors group-hover:text-white">
                            {pet.name}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-[#5c7480] transition-colors group-hover:text-white/80">
                            Porte {getSizeLabel(pet.size)}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
