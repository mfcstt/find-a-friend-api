import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

import type { Route } from "./+types/orgs.new";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const bannerRegister = "/banner-register.png";

export function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="bg-white min-h-screen px-6 py-12 font-['Nunito'] lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        
        {/* Banner */}
        <aside className="flex flex-1 justify-center">
          <div className="flex w-full max-w-[488px] items-end justify-center overflow-hidden rounded-[20px] bg-[#f15156] px-8 py-10 text-white lg:min-h-[661px]">
            <img
              alt="Find A Friend"
              className="w-full max-w-[400px] object-contain"
              src={bannerRegister}
            />
          </div>
        </aside>

        {/* Form */}
        <section className="flex w-full flex-1 flex-col items-center lg:items-start">
          <div className="w-full max-w-lg">
            <h1 className="text-center text-[40px] font-bold leading-tight text-[#0d3b66] lg:text-left lg:text-[54px]">
              Cadastre sua organização
            </h1>

            <form className="mt-10 flex flex-col gap-6">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="nome@email.com"
                  className="h-16 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 text-lg text-[#0d3b66]"
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0d3b66]">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="h-16 rounded-[10px] border-[#d3e2e5] bg-[#f5f8fa] px-4 pr-12 text-lg text-[#0d3b66]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0d3b66]/70"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Botão */}
              <Button
                type="submit"
                className="h-[72px] w-full rounded-[20px] bg-[#0d3b66] text-lg font-extrabold text-white hover:bg-[#0b3156]"
              >
                Cadastrar minha organização
              </Button>

              {/* Link para cadastrar */}
              <p className="text-center text-sm text-[#0d3b66]">
                Não possui conta?{" "}
                <Link to="/orgs/new" className="font-semibold underline">
                  Cadastrar
                </Link>
              </p>

            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function OrgsNew(_props: Route.ComponentProps) {
  return <Register />;
}
