import { api } from "@/trpc/server";

export default async function Home() {
  const { greeting } = await api.product.get.query({ text: "Edson" });
  return (
    <div className="container pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
        {greeting}
      </div>
    </div>
  );
}
