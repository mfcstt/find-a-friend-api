import { Dog, LogOut, PawPrint, PlusCircle, House, UserCircle2 } from "lucide-react"
import * as React from "react"
import { Form, Link } from "react-router"

type AdminProfileMenuProps = {
  orgName: string
  orgAddress: string
}

export function AdminProfileMenu({ orgName, orgAddress }: AdminProfileMenuProps) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) {
        return
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Abrir menu da organização"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#114a80] text-white sm:h-11 sm:w-11"
      >
        <UserCircle2 className="h-5 w-5" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Menu da organização"
          className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-[#d3e2e5] bg-white p-3 text-[#0d3b66] shadow-lg"
        >
          <div className="flex items-start gap-3 rounded-xl bg-[#f5f8fa] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4d35e] text-[#0d3b66]">
              <Dog className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold">{orgName}</p>
              <p className="mt-0.5 line-clamp-2 text-xs font-semibold text-[#5c7480]">{orgAddress}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold hover:bg-[#f5f8fa]"
            >
              <House className="h-4 w-4" />
              Home
            </Link>

            <Link
              to="/pets/new"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold hover:bg-[#f5f8fa]"
            >
              <PlusCircle className="h-4 w-4" />
              Cadastrar pets
            </Link>

            <Link
              to="/pets/mine"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold hover:bg-[#f5f8fa]"
            >
              <PawPrint className="h-4 w-4" />
              Meus pets
            </Link>

            <Form method="post" onSubmit={() => setOpen(false)}>
              <button
                type="submit"
                name="intent"
                value="logout"
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-[#f15156] hover:bg-[#fff2f2]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </Form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
