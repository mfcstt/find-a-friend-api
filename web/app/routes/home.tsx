import * as React from "react"
import { Form, Link, useLoaderData } from "react-router"

import type { Route } from "./+types/home"

import { filterPets } from "~/lib/api/pets.server"
import type {
  PetAge,
  PetEnergyLevel,
  PetEnvironment,
  PetIndependenceLevel,
  PetSize,
} from "~/lib/api/types"
import { SearchIcon, Cat, Dog, SlidersHorizontal, ChevronDown } from "lucide-react"

const cityDefault = "Bragança Paulista"
const filterSelectClass =
  "h-11 w-full appearance-none rounded-xl bg-[#f75f64] px-3 pr-10 text-sm font-extrabold sm:h-12 sm:text-base"

function parseOptionalEnum<T extends string>(value: string | null): T | undefined {
  if (!value) {
    return undefined
  }

  return value as T
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const city = url.searchParams.get("city")?.trim() || cityDefault

  const age = parseOptionalEnum<PetAge>(url.searchParams.get("age"))
  const size = parseOptionalEnum<PetSize>(url.searchParams.get("size"))
  const energy_level = parseOptionalEnum<PetEnergyLevel>(url.searchParams.get("energy_level"))
  const independence_level = parseOptionalEnum<PetIndependenceLevel>(
    url.searchParams.get("independence_level"),
  )
  const environment = parseOptionalEnum<PetEnvironment>(url.searchParams.get("environment"))

  const pets = await filterPets({
    city,
    age,
    size,
    energy_level,
    independence_level,
    environment,
  })

  return {
    city,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    pets,
  }
}

export default function Home(_props: Route.ComponentProps) {
  const data = useLoaderData<typeof loader>()
  const [showFilters, setShowFilters] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full bg-[#f15156] text-white lg:sticky lg:top-0 lg:h-screen lg:w-88 lg:overflow-y-auto">
          <div className="bg-[#e44449] px-4 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-7">
            <div className="flex items-center justify-between gap-3">
              <Link to="/" aria-label="Ir para a home" className="inline-flex">
                <img src="logo.png" className="h-10 w-10" alt="Find A Friend" />
              </Link>

              <button
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#f4d35e] px-3 text-xs font-extrabold text-[#0d3b66] lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {showFilters ? "Fechar filtros" : "Filtros"}
              </button>
            </div>

            <Form method="get" className={`${showFilters ? "mt-4 block" : "mt-4 hidden"} space-y-3 lg:mt-6 lg:block`}>
              <div className="flex items-center gap-3">
                <input
                  name="city"
                  defaultValue={data.city}
                  className="h-11 flex-1 rounded-xl border border-[#f15156] bg-transparent px-3 text-sm font-extrabold text-white placeholder:text-white/70 sm:h-12 sm:text-base"
                  placeholder="Cidade"
                />

                <button
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4d35e] sm:h-12 sm:w-12"
                >
                  <SearchIcon className="h-5 w-5 text-[#0d3b66]" />
                </button>
              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
                <div className="space-y-2">
                  <p className="text-xs font-medium">Idade</p>
                  <div className="relative">
                    <select
                      name="age"
                      defaultValue={data.age ?? ""}
                      className={filterSelectClass}
                    >
                      <option value="">Todas</option>
                      <option value="FILHOTE">Filhote</option>
                      <option value="ADULTO">Adulto</option>
                      <option value="IDOSO">Idoso</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Nível de Energia</p>
                  <div className="relative">
                    <select
                      name="energy_level"
                      defaultValue={data.energy_level ?? ""}
                      className={filterSelectClass}
                    >
                      <option value="">Todos</option>
                      <option value="BAIXA">Baixa</option>
                      <option value="MEDIA">Média</option>
                      <option value="ALTA">Alta</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Porte do animal</p>
                  <div className="relative">
                    <select
                      name="size"
                      defaultValue={data.size ?? ""}
                      className={filterSelectClass}
                    >
                      <option value="">Todos</option>
                      <option value="PEQUENO">Pequeno</option>
                      <option value="MEDIO">Médio</option>
                      <option value="GRANDE">Grande</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Nível de independência</p>
                  <div className="relative">
                    <select
                      name="independence_level"
                      defaultValue={data.independence_level ?? ""}
                      className={filterSelectClass}
                    >
                      <option value="">Todos</option>
                      <option value="BAIXO">Baixo</option>
                      <option value="MEDIO">Médio</option>
                      <option value="ALTO">Alto</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Ambiente</p>
                  <div className="relative">
                    <select
                      name="environment"
                      defaultValue={data.environment ?? ""}
                      className={filterSelectClass}
                    >
                      <option value="">Todos</option>
                      <option value="AMBIENTE_AMPLO">Ambiente amplo</option>
                      <option value="APARTAMENTO">Apartamento</option>
                      <option value="AMBIENTE_REDUZIDO">Ambiente reduzido</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                onClick={() => setShowFilters(false)}
                className="mt-1 flex h-10 w-full items-center justify-center rounded-xl bg-[#f4d35e] text-sm font-extrabold text-[#0d3b66] hover:bg-[#f2cc45] sm:h-11"
              >
                Aplicar filtros
              </button>
            </Form>
          </div>
        </aside>

        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-base font-extrabold sm:text-lg lg:text-xl">
              <span className="font-normal">Encontre</span> {data.pets.length} amigos{" "}
              <span className="font-normal">na sua cidade</span>
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.pets.map((pet, index) => {
              const image = pet.pictures[0]
              const isEven = index % 2 === 0
              const Icon = isEven ? Dog : Cat
              const iconContainerClass = isEven ? "bg-[#f15156]" : "bg-[#f4d35e]"
              const iconClass = isEven ? "text-white" : "text-[#0d3b66]"

              return (
                <Link
                  key={pet.id}
                  to={`/pet/${pet.id}`}
                  className="group overflow-hidden rounded-2xl border border-white bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0d3b66]"
                >
                  <div className="relative">
                    <img
                      alt={pet.name}
                      className="h-36 w-full object-cover sm:h-40"
                      src={image}
                    />
                    <div
                      className={`absolute left-1/2 top-27 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-xl border-2 border-white sm:top-31 sm:h-11 sm:w-11 ${iconContainerClass}`}
                    >
                      <Icon className={`h-5 w-5 ${iconClass}`} />
                    </div>
                  </div>
                  <p className="px-4 pb-4 pt-7 text-center text-base font-bold text-[#0d3b66] transition-colors group-hover:text-white sm:text-lg">
                    {pet.name}
                  </p>
                </Link>
              )
            })}
          </div>

          {data.pets.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-[#d3e2e5] bg-white px-4 py-8 text-center">
              <p className="text-sm font-semibold text-[#5c7480]">Nenhum pet encontrado com os filtros atuais.</p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
