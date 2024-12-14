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
import api from "@/lib/axios"

interface Voiture {
  id?: number
  marque: string
  matricule: string
  model: string
  client_id: number
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
  const [client_id, setClientId] = useState("")

  useEffect(() => {
    if (voiture) {
      setMarque(voiture.marque)
      setMatricule(voiture.matricule)
      setModel(voiture.model)
      setClientId(voiture.client_id.toString())
    } else {
      setMarque("")
      setMatricule("")
      setModel("")
      setClientId(clientId ? clientId.toString() : "")
    }
  }, [voiture, clientId])

  const handleSave = async () => {
    const voitureData = {
      id: voiture?.id,
      marque,
      matricule,
      model,
      client_id: parseInt(client_id),
    }

    try {
      let response
      if (voiture?.id) {
        response = await api.put(`/SERVICE-VOITURE/voitures/${voiture.id}`, voitureData)
      } else {
        response = await api.post("/SERVICE-VOITURE/voitures", voitureData)
      }
      console.log(response.data)
      onSave(response.data)
    } catch (error) {
      console.error("Error saving voiture:", error)
    }
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
              Client ID
            </Label>
            <Input
              id="client_id"
              type="number"
              value={client_id}
              onChange={(e) => setClientId(e.target.value)}
              className="col-span-3"
              disabled={clientId !== undefined}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

