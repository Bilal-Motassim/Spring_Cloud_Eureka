"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/lib/axios"

interface Voiture {
  id?: number
  marque: string
  matricule: string
  model: string
  client_id: number
}

interface Client {
  id: number
  nom: string
}

interface VoitureDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (voiture: Voiture) => void
  voiture: Voiture | null
  clientId?: number
}

export function VoitureDialog({
  isOpen,
  onClose,
  onSave,
  voiture,
  clientId,
}: VoitureDialogProps) {
  const [marque, setMarque] = useState("")
  const [matricule, setMatricule] = useState("")
  const [model, setModel] = useState("")
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    if (voiture) {
      setMarque(voiture.marque)
      setMatricule(voiture.matricule)
      setModel(voiture.model)
      setSelectedClientId(voiture.client_id.toString())
    } else {
      setMarque("")
      setMatricule("")
      setModel("")
      setSelectedClientId(clientId ? clientId.toString() : "")
    }
    fetchClients()
  }, [voiture, clientId])

  const fetchClients = async () => {
    try {
      const response = await api.get("/SERVICE-CLIENT/clients")
      setClients(response.data._embedded.clients)
    } catch (error) {
      console.error("Error fetching clients:", error)
    }
  }

  const handleSave = async () => {
    const voitureData = {
      id: voiture?.id,
      marque,
      matricule,
      model,
      client_id: parseInt(selectedClientId),
    }

    onSave(voitureData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{voiture ? "Edit Voiture" : "Add Voiture"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marque" className="text-right">
              Marque
            </Label>
            <Input
              id="marque"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="matricule" className="text-right">
              Matricule
            </Label>
            <Input
              id="matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="model" className="text-right">
              Model
            </Label>
            <Input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client_id" className="text-right">
              Client
            </Label>
            <Select
              value={selectedClientId}
              onValueChange={setSelectedClientId}
              disabled={clientId !== undefined}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id.toString()}>
                    {client.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

