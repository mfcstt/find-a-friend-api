import {
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router";


import type { Route } from "./+types/orgs.new";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const API_URL = process.env.API_URL ?? "http://localhost:3333";

type ActionResponse = {
  error?: string;
  success?: boolean;
};

const createJsonResponse = (data: ActionResponse, init?: ResponseInit) => {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
};

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = {
    author_name: String(formData.get("author_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").trim(),
    cep: String(formData.get("cep") ?? "").trim(),
    state: String(formData.get("state") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    neighborhood: String(formData.get("neighborhood") ?? "").trim(),
    street: String(formData.get("street") ?? "").trim(),
  };





  try {
    const response = await fetch(`${API_URL}/orgs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = "Nao foi possivel criar a org.";
      try {
        const data = (await response.json()) as { message?: string };
        if (data?.message) {
          message = data.message;
        }
      } catch {
        // Ignore JSON parsing errors from non-JSON responses.
      }

      return createJsonResponse(
        { error: message },
        { status: response.status || 400 }
      );
    }

    return redirect("/welcome");
  } catch (error) {
    return createJsonResponse(
      {
        error: "Nao foi possivel conectar ao servidor.",
      },
      { status: 500 }
    );
  }
}

export default function NewOrg() {
  const actionData = useActionData<ActionResponse>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Cadastro
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">
            Cadastre sua org
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Preencha os dados para habilitar sua org a cadastrar pets.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da org</CardTitle>
            <CardDescription>
              As informacoes serao usadas para contato e localizacao.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author_name">Nome do responsavel</Label>
                  <Input
                    id="author_name"
                    name="author_name"
                    placeholder="Maria Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="org@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="(11) 99999-0000"
                    required
                  />
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    placeholder="00000-000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="SP"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" name="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" name="neighborhood" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" name="street" required />
                </div>
              </section>

              {actionData?.error ? (
                <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {actionData.error}
                </div>
              ) : null}
              {actionData?.success ? (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Org criada com sucesso.
                </div>
              ) : null}

              <CardFooter className="px-0">
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-slate-500">
                    Use os mesmos dados para autenticar depois.
                  </span>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Criar org"}
                  </Button>
                </div>
              </CardFooter>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
