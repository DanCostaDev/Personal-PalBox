import { Card } from "@/components/ui/card";
import { PalRegister } from "@/components/PalRegister";
import { getPals } from "@/lib/getPals";
import { DataTable } from "@/components/PalDataTable/datatable";
import { columns } from "@/components/PalDataTable/columns";
import { ScrollArea } from "@/components/ui/scrollarea";

export default async function Home() {
  const pals = await getPals();
  return (
    <main className="flex flex-col h-full gap-6 w-screen items-center justify-center">
      <div className="w-full flex items-center justify-center bg-primary h-16">
        <span className="text-3xl text-white py-4">CADASTRO DE PALS</span>
      </div>

      <div className="w-full px-2">
        <Card className="w-full mb-10 p-10 flex flex-col gap-4 items-start justify-start h-full max-h-[85%]">
          <ScrollArea>
            <PalRegister data={pals} />
            <DataTable columns={columns} />
          </ScrollArea>
        </Card>
        
      </div>
    </main>
  );
}
