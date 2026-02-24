import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

type PetsSidebarProps = {
  backTo?: string
}

export function PetsSidebar({ backTo = "/" }: PetsSidebarProps) {
  return (
    <aside className="flex w-full items-center justify-between bg-[#f15156] px-4 py-3 md:min-h-screen md:w-24 md:flex-col md:px-0 md:py-8">
      <Link to="/" aria-label="Ir para a home" className="inline-flex">
        <img src="/logo.png" className="h-9 w-9 md:h-10 md:w-10" alt="Find A Friend" />
      </Link>
      <Link
        to={backTo}
        className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#f4d35e] text-[#0d3b66] md:h-12 md:w-12 md:rounded-[15px]"
      >
        <ArrowLeft className="size-5" />
      </Link>
    </aside>
  )
}
