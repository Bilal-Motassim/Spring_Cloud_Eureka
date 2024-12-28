"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { VoitureDialog } from "@/components/voiture-dialog"
import api from "@/lib/axios"

interface Voiture {
  id: number
  brand: string
  matricule: string
  model: string
  client: Client
}

interface Client {
  id: number
  nom: string
  age: number
}

interface VoitureListProps {
  clientId?: number
}

export function VoitureList({ clientId }: VoitureListProps) {
  const [voitures, setVoitures] = useState<Voiture[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVoiture, setEditingVoiture] = useState<Voiture | null>(null)

  const fetchVoitures = useCallback(async () => {
    const url = clientId ? `/SERVICE-VOITURE/api/voiture/voituresClient/${clientId}` : "/SERVICE-VOITURE/api/voiture"
    try {
      const response = await api.get(url)
      if(response.data){
        setVoitures(response.data)
        console.log(response.data)
      }else{
        setVoitures(response.data)
      }
      
    } catch (error) {
      console.error("Error fetching voitures:", error)
    }
  }, [clientId])

  useEffect(() => {
    fetchVoitures()
  }, [fetchVoitures])

  const handleAddEdit = async (voiture: Voiture) => {
    try {
      if (voiture.id) {
        await api.put(`/SERVICE-VOITURE/api/voiture/${voiture.id}`, voiture)
      } else {
        await api.post("/SERVICE-VOITURE/api/voiture", voiture)
      }
      setIsDialogOpen(false)
      setEditingVoiture(null)
      fetchVoitures() // Refresh the list after adding or editing
    } catch (error) {
      console.error("Error saving voiture:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/SERVICE-VOITURE/voitures/${id}`)
      fetchVoitures() // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting voiture:", error)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Voitures</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Add Voiture</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Marque</TableHead>
            <TableHead>Matricule</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Client ID</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voitures.map((voiture) => (
            <TableRow key={voiture.id}>
              <TableCell>{voiture.id}</TableCell>
              <TableCell>{voiture.brand}</TableCell>
              <TableCell>{voiture.matricule}</TableCell>
              <TableCell>{voiture.model}</TableCell>
              <TableCell>{voiture.client.nom}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setEditingVoiture(voiture)
                    setIsDialogOpen(true)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(voiture.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <VoitureDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingVoiture(null)
        }}
        onSave={handleAddEdit}
        voiture={editingVoiture}
        clientId={clientId}
      />
    </div>
  )
}

