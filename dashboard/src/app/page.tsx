import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientList } from "@/components/client-list"
import { VoitureList } from "@/components/voiture-list"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="voitures">Voitures</TabsTrigger>
        </TabsList>
        <TabsContent value="clients">
          <ClientList />
        </TabsContent>
        <TabsContent value="voitures">
          <VoitureList />
        </TabsContent>
      </Tabs>
    </div>
  )
}

