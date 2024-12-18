import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NoteProps } from '@/pages/home'

import { NoteAlertDelete } from './note-alert-delete'
import { NoteDialogCreation } from './note-dialog-creation'
import { NoteDialogOpened } from './note-dialog-opened'

interface NoteCardProps {
  noteData: NoteProps
  updateNote: (note: NoteProps) => void
  deleteNote: (id: string) => void
}

export function NoteCard({ noteData, updateNote, deleteNote }: NoteCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle>{noteData.title}</CardTitle>
            <CardDescription>
              {noteData.updated_at ? 'Atualizada ' : 'Criada '}
              {formatDistanceToNow(
                noteData.updated_at
                  ? new Date(noteData.updated_at)
                  : new Date(noteData.created_at!),
                {
                  addSuffix: true,
                  locale: ptBR,
                },
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <NoteDialogCreation
              buttonVariant="outline"
              dialogTitle="Editar nota"
              buttonIcon={<Pencil className="h-4 w-4" />}
              updateNote={updateNote}
              noteData={noteData}
            />
            <NoteAlertDelete id={noteData.id} deleteNote={deleteNote} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="max-h-32 max-w-3xl overflow-hidden truncate">
          {noteData.description}
        </p>
      </CardContent>
      <CardFooter>
        <NoteDialogOpened noteData={noteData} />
      </CardFooter>
    </Card>
  )
}
