"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClientDialog } from "@/components/client-dialog"
import { VoitureList } from "@/components/voiture-list"
import api from "@/lib/axios"

interface Client {
  id: number
  nom: string
  age: number
}

export function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    setLoading(true)
    try {
      const response = await api.get("/SERVICE-CLIENT/clients")
      const data = response.data._embedded.clients
      console.log(data)
      setClients(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching clients:", error)
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddEdit = (client: Client) => {
    if (client.id) {
      setClients(clients.map((c) => (c.id === client.id ? client : c)))
    } else {
      setClients([...clients, { ...client, id: Date.now() }])
    }
    setIsDialogOpen(false)
    setEditingClient(null)
  }

  const handleDelete = async (id: number) => {
    await api.delete(`/SERVICE-CLIENT/clients/${id}`)
    setClients(clients.filter((c) => c.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Clients</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add Client</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No clients found</TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.nom}</TableCell>
                  <TableCell>{client.age}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        setEditingClient(client)
                        setIsDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => setSelectedClientId(client.id)}
                    >
                      View Cars
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
      <ClientDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingClient(null)
        }}
        onSave={handleAddEdit}
        client={editingClient}
      />
      {selectedClientId && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Cars for Client ID: {selectedClientId}
          </h3>
          <VoitureList clientId={selectedClientId} />
        </div>
      )}
    </div>
  )
}

