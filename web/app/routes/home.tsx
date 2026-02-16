import type { Route } from "./+types/home";

const logo =
	"https://www.figma.com/api/mcp/asset/15a5b70a-e03a-464d-b261-510a8d46c6b7";
const searchIcon =
	"https://www.figma.com/api/mcp/asset/83b42542-8d93-4809-a709-26092c7cfe3c";
const chevronDown =
	"https://www.figma.com/api/mcp/asset/fad3c0f5-027f-4f41-a271-c74e43ef5b2e";
const chevronDownSmall =
	"https://www.figma.com/api/mcp/asset/5de05170-8e2f-4423-ae2c-7588b46ee924";
const chevronDownAlt =
	"https://www.figma.com/api/mcp/asset/3494a865-5bc6-4b84-92e3-be0b005b7dfe";
const catIcon =
	"https://www.figma.com/api/mcp/asset/97a23d7a-65e5-4eef-ba8e-fbe25c49246b";
const dogIcon =
	"https://www.figma.com/api/mcp/asset/4cc26ba1-a335-48f2-8769-5f550ba6a6b8";
const petIcon =
	"https://www.figma.com/api/mcp/asset/bff26cc3-a68c-4ba2-816d-718b33ce00c5";

const petImages = {
	alfredo: "https://www.figma.com/api/mcp/asset/acdafa06-7d3a-4a61-a236-b6a17a8c9a28",
	juscelino: "https://www.figma.com/api/mcp/asset/acf417ae-d5d0-463d-9ec3-fbfdb3742b2e",
	getulio: "https://www.figma.com/api/mcp/asset/558fab29-dc79-4baf-8577-138293c41673",
	alfredo2: "https://www.figma.com/api/mcp/asset/c3b4c9ca-75f0-454c-8352-42f3dbb47779",
	getulio2: "https://www.figma.com/api/mcp/asset/5b23ac8f-8700-411f-8123-893cdb0f60a0",
	juscelino2: "https://www.figma.com/api/mcp/asset/01be91f4-aceb-4c84-ba3a-87a8ac7dca27",
};

const pets = [
	{ name: "Alfredo", image: petImages.alfredo, icon: petIcon, active: true },
	{ name: "Juscelino", image: petImages.juscelino2, icon: petIcon },
	{ name: "Getulio", image: petImages.getulio, icon: petIcon, danger: true },
	{ name: "Juscelino", image: petImages.juscelino, icon: catIcon },
	{ name: "Getulio", image: petImages.getulio2, icon: dogIcon, danger: true },
	{ name: "Alfredo", image: petImages.alfredo2, icon: catIcon },
	{ name: "Alfredo", image: petImages.alfredo2, icon: catIcon },
	{ name: "Juscelino", image: petImages.juscelino, icon: petIcon },
	{ name: "Getulio", image: petImages.getulio2, icon: dogIcon, danger: true },
];

export default function Home(_props: Route.ComponentProps) {
	return (
		<div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
			<div className="flex">
				<aside className="w-[392px] bg-[#f15156] text-white">
					<div className="bg-[#e44449] px-12 py-10">
						<img alt="Find A Friend" className="h-12 w-12" src={logo} />

						<div className="mt-8 flex items-center gap-3">
							<button
								type="button"
								className="flex h-[60px] w-[67px] items-center justify-center rounded-[15px] border border-[#f15156]"
							>
								<div className="flex items-center gap-1 text-base font-extrabold">
									PE
									<img alt="Selecionar" className="h-4 w-4" src={chevronDownSmall} />
								</div>
							</button>

							<button
								type="button"
								className="flex h-[60px] flex-1 items-center justify-between rounded-[15px] border border-[#f15156] px-4"
							>
								<span className="text-base font-extrabold">Recife</span>
								<img alt="Selecionar" className="h-6 w-6" src={chevronDown} />
							</button>

							<button
								type="button"
								className="flex h-[60px] w-[60px] items-center justify-center rounded-[20px] bg-[#f4d35e]"
							>
								<img alt="Buscar" className="h-5 w-5" src={searchIcon} />
							</button>
						</div>
					</div>

					<div className="px-12 py-8">
						<h2 className="text-xl font-extrabold">Filtros</h2>

						<div className="mt-6 space-y-5 text-sm">
							<div className="space-y-2">
								<p className="text-xs font-medium">Idade</p>
								<div className="flex h-[60px] items-center justify-between rounded-[15px] bg-[#f75f64] px-5 text-base font-extrabold">
									Filhote
									<img alt="Selecionar" className="h-6 w-6" src={chevronDown} />
								</div>
							</div>

							<div className="space-y-2">
								<p className="text-xs font-medium">Nivel de Energia</p>
								<div className="flex h-[60px] items-center justify-between rounded-[15px] bg-[#f75f64] px-5 text-base font-extrabold">
									03
									<img alt="Selecionar" className="h-6 w-6" src={chevronDown} />
								</div>
							</div>

							<div className="space-y-2">
								<p className="text-xs font-medium">Porte do animal</p>
								<div className="flex h-[60px] items-center justify-between rounded-[15px] bg-[#f75f64] px-5 text-base font-extrabold">
									Pequenino
									<img alt="Selecionar" className="h-6 w-6" src={chevronDown} />
								</div>
							</div>

							<div className="space-y-2">
								<p className="text-xs font-medium">Nivel de independencia</p>
								<div className="flex h-[60px] items-center justify-between rounded-[15px] bg-[#f75f64] px-5 text-base font-extrabold">
									Medio
									<img alt="Selecionar" className="h-6 w-6" src={chevronDown} />
								</div>
							</div>
						</div>
					</div>
				</aside>

				<main className="flex-1 px-8 py-12">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<p className="text-xl font-extrabold">
							<span className="font-normal">Encontre</span> 324 amigos {" "}
							<span className="font-normal">na sua cidade</span>
						</p>

					</div>

					<div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
						{pets.map((pet) => (
							<div
								key={`${pet.name}-${pet.image}`}
								className={`rounded-[20px] shadow-[0px_4px_4px_-6px_rgba(0,0,0,0.25)] ${
									pet.active ? "bg-[#0d3b66] text-white" : "bg-white"
								}`}
							>
								<div className="relative">
									<img
										alt={pet.name}
										className="h-[135px] w-full rounded-[20px] object-cover"
										src={pet.image}
									/>
									<div
										className={`absolute left-1/2 top-[94px] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-[10px] border-2 border-white ${
											pet.danger ? "bg-[#f15156]" : "bg-[#f4d35e]"
										} ${pet.active ? "border-[#0d3b66]" : "border-white"}`}
									>
										<img alt="Pet" className="h-4 w-4" src={pet.icon} />
									</div>
								</div>
								<p className="px-6 pb-4 pt-8 text-center text-lg font-bold">
									{pet.name}
								</p>
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	);
}
