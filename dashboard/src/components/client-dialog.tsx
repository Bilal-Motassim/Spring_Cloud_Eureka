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

interface Client {
  id?: number
  nom: string
  age: number
}

interface ClientDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (client: Client) => void
  client: Client | null
}

export function ClientDialog({
  isOpen,
  onClose,
  onSave,
  client,
}: ClientDialogProps) {
  const [nom, setNom] = useState("")
  const [age, setAge] = useState("")

  useEffect(() => {
    if (client) {
      setNom(client.nom)
      setAge(client.age.toString())
    } else {
      setNom("")
      setAge("")
    }
  }, [client])

  const handleSave = async () => {
    const clientData = {
      id: client?.id,
      nom,
      age: parseFloat(age),
    }

    try {
      let response
      console.log(clientData)
      if (client?.id) {
        response = await api.put(`/SERVICE-CLIENT/clients/${client.id}`, clientData)
      } else {
        response = await api.post("/SERVICE-CLIENT/clients", clientData)
      }
      console.log(response.data)
      onSave(response.data)
    } catch (error) {
      console.error("Error saving client:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Edit Client" : "Add Client"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nom" className="text-right">
              Name
            </Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="col-span-3"
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

