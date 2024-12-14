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
import { VoitureDialog } from "@/components/voiture-dialog"
import api from "@/lib/axios"

interface Voiture {
  id: number
  marque: string
  matricule: string
  model: string
  client_id: number
}

interface VoitureListProps {
  clientId?: number
}

export function VoitureList({ clientId }: VoitureListProps) {
  const [voitures, setVoitures] = useState<Voiture[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVoiture, setEditingVoiture] = useState<Voiture | null>(null)

  useEffect(() => {
    fetchVoitures()
  }, [clientId])

  const fetchVoitures = async () => {
    const url = clientId ? `/SERVICE-VOITURE/voituresClient/${clientId}` : "/SERVICE-VOITURE/voitures"
    const response = await api.get(url)
    if(response.data._embedded){
      setVoitures(response.data._embedded.voitures)
    }else{
      setVoitures(response.data)
    }
    
  }

  const handleAddEdit = (voiture: Voiture) => {
    if (voiture.id) {
      setVoitures(voitures.map((v) => (v.id === voiture.id ? voiture : v)))
    } else {
      setVoitures([...voitures, { ...voiture, id: Date.now() }])
    }
    setIsDialogOpen(false)
    setEditingVoiture(null)
  }

  const handleDelete = async (id: number) => {
    await api.delete(`/SERVICE-VOITURE/voitures/${id}`)
    setVoitures(voitures.filter((v) => v.id !== id))
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
              <TableCell>{voiture.marque}</TableCell>
              <TableCell>{voiture.matricule}</TableCell>
              <TableCell>{voiture.model}</TableCell>
              <TableCell>{voiture.client_id}</TableCell>
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

