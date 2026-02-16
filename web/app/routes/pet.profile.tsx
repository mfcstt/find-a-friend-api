

import { Button } from "~/components/ui/button";

const heroImage =
	"https://www.figma.com/api/mcp/asset/e5d275d1-ca83-40f0-a9e3-29d6d8b5e127";
const thumbActive =
	"https://www.figma.com/api/mcp/asset/9f8afbe8-abf2-4449-a917-f9200a546edb";
const thumb1 = "https://www.figma.com/api/mcp/asset/fa1b45fb-0b1f-4b4e-8a67-cb471889e0b4";
const thumb2 = "https://www.figma.com/api/mcp/asset/7251857d-5039-4c5e-892c-87e4fe24a878";
const thumb3 = "https://www.figma.com/api/mcp/asset/fa39c11f-43da-472f-978f-c0bba4c8b098";
const thumb4 = "https://www.figma.com/api/mcp/asset/380b4edb-3154-43d2-a5d2-54c0efc3ad32";
const thumb5 = "https://www.figma.com/api/mcp/asset/bd8951b8-d215-4a86-98a3-ce6464c0d1f9";
const mapImage =
	"https://www.figma.com/api/mcp/asset/14fc17b1-91ca-4292-a37e-7f895010dd99";
const mapPin = "https://www.figma.com/api/mcp/asset/a487558b-e051-4159-9cf7-0f5bef031569";
const mapPinIcon =
	"https://www.figma.com/api/mcp/asset/60a8b79d-70d7-4705-b5d7-24531a595de3";
const alertIcon =
	"https://www.figma.com/api/mcp/asset/6e9811b8-f247-423b-83c5-28d9583f2029";
const whatsappIcon =
	"https://www.figma.com/api/mcp/asset/2efef70b-2625-43cd-b5d6-7462a98c3d44";
const whatsappMini =
	"https://www.figma.com/api/mcp/asset/3376d4b1-0cf6-43d6-81da-104ae820136c";
const orgIcon =
	"https://www.figma.com/api/mcp/asset/92332c49-eb56-41b0-8dd5-441a06172987";
const sidebarLogo =
	"https://www.figma.com/api/mcp/asset/fa87dd80-a107-454c-9b6f-09705306eaf6";
const energyDot =
	"https://www.figma.com/api/mcp/asset/9e6fbd66-1f2d-46ad-b20e-f20fa64396d1";
const energyDotActive =
	"https://www.figma.com/api/mcp/asset/8ca487b2-3c3f-4002-86c8-e9230392bb0f";
const sizeDotActive =
	"https://www.figma.com/api/mcp/asset/5ce7b63b-8990-4a9f-b283-2ee970aed589";
const sizeDot =
	"https://www.figma.com/api/mcp/asset/fc20d2f3-b3b1-454d-a323-cd8972b3173a";

const requirements = [
	"Local grande para o animal correr e brincar.",
	"Proibido apartamento",
	"Ambiente frio, pois possui muito pelo.",
	"Cao com intolerancia a lactose.",
];

const thumbnails = [thumbActive, thumb1, thumb2, thumb3, thumb4, thumb5];

export default function PetProfile() {
	return (
		<div className="min-h-screen bg-[#fdeced] font-['Nunito'] text-[#0d3b66]">
			<div className="flex">
				<aside className="flex w-24 flex-col items-center justify-between bg-[#f15156] py-8">
					<img alt="Find A Friend" className="h-12 w-12" src={sidebarLogo} />
					<button
						type="button"
						className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#f4d35e] text-[#0d3b66]"
					>
						<span className="text-xl">&#8592;</span>
					</button>
				</aside>

				<main className="flex-1 px-6 py-10 md:px-12">
					<div className="mx-auto w-full max-w-[704px]">
						<p className="text-center text-lg font-semibold text-[#8fa7b2]">
							Seu novo amigo
						</p>

						<section className="mt-6 overflow-hidden rounded-[20px] border border-white bg-white shadow-sm">
							<div className="h-[336px] w-full">
								<img
									alt="Alfredo"
									className="h-full w-full object-cover"
									src={heroImage}
								/>
							</div>

							<div className="px-8 pb-10 pt-6">
								<div className="flex flex-wrap gap-3">
									{thumbnails.map((thumb, index) => (
										<div
											key={thumb}
											className={`h-20 w-20 overflow-hidden rounded-[15px] ${
												index === 0
													? "border-4 border-[#0d3b66]"
													: "opacity-30"
											}`}
										>
											<img
												alt={`Foto ${index + 1}`}
												className="h-full w-full object-cover"
												src={thumb}
											/>
										</div>
									))}
								</div>

								<div className="mt-10 space-y-3">
									<h1 className="text-[54px] font-extrabold tracking-[-1.08px]">
										Alfredo
									</h1>
									<p className="text-lg font-semibold leading-7">
										Eu sou um lindo doguinho de 3 anos, um jovem bricalhao que
										adora fazer companhia, uma bagunca mas tambem ama uma
										soneca.
									</p>
								</div>

								<div className="mt-8 flex flex-wrap gap-4">
									<div className="flex h-[106px] w-[174px] flex-col justify-center rounded-[20px] border-2 border-[#0d3b66] bg-[#0d3b66]/5 px-6">
										<div className="flex items-center gap-1">
											<img alt="Energia" className="h-3 w-3" src={energyDot} />
											<img alt="Energia" className="h-3 w-3" src={energyDot} />
											<img alt="Energia" className="h-3 w-3" src={energyDot} />
											<img alt="Energia" className="h-3 w-3" src={energyDot} />
											<img
												alt="Energia" 
												className="h-3 w-3"
												src={energyDotActive}
											/>
										</div>
										<p className="mt-4 text-lg font-semibold">Muita energia</p>
									</div>

									<div className="flex h-[106px] w-[189px] flex-col justify-center rounded-[20px] border-2 border-[#0d3b66] bg-[#0d3b66]/5 px-6">
										<div className="text-lg">&#x26F6;</div>
										<p className="mt-4 text-lg font-semibold">Ambiente amplo</p>
									</div>

									<div className="flex h-[106px] w-[170px] flex-col justify-center rounded-[20px] border-2 border-[#0d3b66] bg-[#0d3b66]/5 px-6">
										<div className="flex items-center gap-1">
											<img alt="Porte" className="h-3 w-3" src={sizeDotActive} />
											<img alt="Porte" className="h-3 w-3" src={sizeDot} />
											<img alt="Porte" className="h-3 w-3" src={sizeDot} />
										</div>
										<p className="mt-4 text-lg font-semibold">Pequenino</p>
									</div>
								</div>

								<div className="mt-10 rounded-[20px] border border-[#dde3f0] bg-white">
									<div className="relative h-[227px] overflow-hidden rounded-[20px]">
										<img
											alt="Mapa"
											className="h-full w-full object-cover"
											src={mapImage}
										/>
										<div className="absolute left-1/2 top-14 -translate-x-1/2">
											<div className="relative">
												<img alt="Pin" className="h-[72px] w-[65px]" src={mapPin} />
												<img
													alt="Local"
													className="absolute left-1/2 top-4 h-8 w-8 -translate-x-1/2"
													src={mapPinIcon}
												/>
											</div>
										</div>
									</div>
									<div className="flex h-[54px] items-center justify-center rounded-b-[20px] bg-[#0d3b66]">
										<span className="text-lg font-bold text-[#f4d35e]">
											Ver rotas no Google Maps
										</span>
									</div>
								</div>

								<div className="mt-8 border-t border-[#dde3f0] pt-8">
									<div className="flex items-center gap-4">
										<div className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#f27006]">
											<img alt="Organizacao" className="h-7 w-7" src={orgIcon} />
										</div>
										<div>
											<h2 className="text-2xl font-bold">Seu Cãopanheiro</h2>
											<p className="text-sm font-semibold">
												Rua do meio, 123 , Boa viagem, Recife - PE
											</p>
											<div className="mt-3 inline-flex items-center gap-2 rounded-[10px] bg-[#0d3b66]/5 px-4 py-2 text-sm font-semibold">
												<img
													alt="Whatsapp"
													className="h-4 w-4"
													src={whatsappMini}
												/>
												81 1234.4567
											</div>
										</div>
									</div>
								</div>

								<div className="mt-8 border-t border-[#dde3f0] pt-8">
									<h3 className="text-[30px] font-bold">Requesitos para adoção</h3>
									<div className="mt-6 flex flex-col gap-3">
										{requirements.map((item) => (
											<div
												key={item}
												className="flex items-center gap-3 rounded-[10px] border border-[#f15156] px-4 py-3 text-[#f15156]"
												style={{
													backgroundImage:
														"linear-gradient(173.33deg, rgba(247, 95, 96, 0.1) 16.45%, rgba(241, 81, 86, 0) 67.31%)",
												}}
											>
												<img alt="Alerta" className="h-5 w-5" src={alertIcon} />
												<span className="text-sm font-semibold md:text-base">
													{item}
												</span>
											</div>
										))}
									</div>
								</div>

								<div className="mt-10 border-t border-[#dde3f0] pt-8">
									<Button
										type="button"
										className="h-16 w-full rounded-[20px] bg-[#3cdc8c] text-lg font-extrabold text-white hover:bg-[#33c77b]"
									>
										<span className="flex items-center gap-3">
											<img alt="Whatsapp" className="h-5 w-5" src={whatsappIcon} />
											Entrar em contato
										</span>
									</Button>
								</div>
							</div>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}
