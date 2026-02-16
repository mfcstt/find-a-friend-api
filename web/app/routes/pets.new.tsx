import { ArrowLeft, ChevronDown, FileText, UploadCloud, XSquare } from "lucide-react";



import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const orgIcon =
	"https://www.figma.com/api/mcp/asset/93a1ec45-11da-492a-ac1b-56c2d4b93a70";
const settingsIcon =
	"https://www.figma.com/api/mcp/asset/8565f2fd-74bb-497a-a35f-ef80ecb92262";
const sidebarLogo =
	"https://www.figma.com/api/mcp/asset/f8c86698-3af2-4e22-994d-d65c47538c8b";

export default function Pet() {
	return (
		<div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
			<div className="flex">
				<aside className="flex w-24 flex-col items-center justify-between bg-[#f15156] py-8">
					<img alt="Find A Friend" className="h-12 w-12" src={sidebarLogo} />
					<button
						type="button"
						className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#f4d35e] text-[#0d3b66]"
					>
						<ArrowLeft className="size-5" />
					</button>
				</aside>

				<main className="flex-1 px-6 py-10 md:px-12">
					<div className="mx-auto w-full max-w-[708px]">
						<header className="flex items-center justify-between rounded-[20px] border border-white bg-[#0d3b66] px-6 py-5 text-white">
							<div className="flex items-center gap-4">
								<div className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#f27006]">
									<img alt="Org" className="h-7 w-7" src={orgIcon} />
								</div>
								<div>
									<h1 className="text-2xl font-bold">Seu Cãopanheiro</h1>
									<p className="text-sm font-semibold text-white/90">
										Rua do meio, 123 , Boa viagem, Recife - PE
									</p>
								</div>
							</div>
							<button
								type="button"
								className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#114a80]"
							>
								<img alt="Configurações" className="h-6 w-6" src={settingsIcon} />
							</button>
						</header>

						<section className="mt-10 rounded-[20px] border border-[#d3e2e5] bg-white px-10 py-12">
							<div className="space-y-2">
								<h2 className="text-[40px] font-extrabold">Adicione um pet</h2>
								<div className="border-b border-[#d3e2e5]" />
							</div>

							<form className="mt-10 flex flex-col gap-6">
								<div className="space-y-2">
									<label className="text-sm font-semibold">Nome</label>
									<Input
										placeholder="Nome do pet"
										className="h-16 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg text-[#0d3b66]"
									/>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm font-semibold">
										<span>Sobre</span>
										<span className="text-xs font-normal text-[#8fa7b2]">
											Máximo de 300 caracteres
										</span>
									</div>
									<textarea
										rows={4}
										placeholder="Conte a historia do pet"
										className="w-full resize-none rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 py-3 text-base text-[#0d3b66] outline-none focus-visible:border-[#0d3b66]/40"
									/>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-semibold">Idade</label>
									<div className="flex h-16 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg">
										<span>Filhote</span>
										<ChevronDown className="size-5 text-[#0d3b66]/70" />
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-semibold">Porte</label>
									<div className="flex h-16 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg">
										<span>Pequenino</span>
										<ChevronDown className="size-5 text-[#0d3b66]/70" />
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-semibold">Nivel de energia</label>
									<div className="flex h-16 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg">
										<span>Baixa</span>
										<ChevronDown className="size-5 text-[#0d3b66]/70" />
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-semibold">Nivel de independencia</label>
									<div className="flex h-16 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg">
										<span>Baixo (precisa de companhia sempre)</span>
										<ChevronDown className="size-5 text-[#0d3b66]/70" />
									</div>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-semibold">Ambiente</label>
									<div className="flex h-16 items-center justify-between rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg">
										<span>Ambiente amplo</span>
										<ChevronDown className="size-5 text-[#0d3b66]/70" />
									</div>
								</div>

								<div className="space-y-4">
									<label className="text-sm font-semibold">Fotos</label>
									<div className="flex h-40 flex-col items-center justify-center gap-2 rounded-[10px] border border-[#d3e2e5] bg-[#f5f8fa]">
										<UploadCloud className="size-6 text-[#0d3b66]" />
										<p className="text-base font-semibold">Arraste e solte o arquivo</p>
									</div>
									<div className="flex h-12 items-center justify-between rounded-[10px] border border-[#d3e2e5] px-4 text-sm">
										<div className="flex items-center gap-2">
											<FileText className="size-4 text-[#0d3b66]" />
											<span>pictureexemplo.png</span>
										</div>
										<XSquare className="size-5 text-[#f15156]" />
									</div>
									<button
										type="button"
										className="flex h-14 items-center justify-center rounded-[10px] border border-dashed border-[#f15156]/50 text-[#f15156]"
									>
										+
									</button>
								</div>

								<div className="space-y-4 pt-2">
									<div className="space-y-2">
										<h3 className="text-[32px] font-extrabold">Requesitos para adoção</h3>
										<div className="border-b border-[#d3e2e5]" />
									</div>

									<div className="space-y-2">
										<label className="text-sm font-semibold">Requisito</label>
										<Input
											placeholder="Defina um requisito"
											className="h-16 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg text-[#0d3b66]"
										/>
									</div>

									<button
										type="button"
										className="flex h-14 items-center justify-center rounded-[10px] border border-dashed border-[#f15156]/50 text-[#f15156]"
									>
										+
									</button>
								</div>

								<Button
									type="submit"
									className="mt-4 h-16 w-full rounded-[20px] bg-[#f4d35e] text-lg font-extrabold text-[#0d3b66] hover:bg-[#f2cc45]"
								>
									Confirmar
								</Button>
							</form>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}
