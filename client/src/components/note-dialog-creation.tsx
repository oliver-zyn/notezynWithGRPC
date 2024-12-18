import { Check, LucideProps } from 'lucide-react'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import { NoteProps } from '@/pages/home'

import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'

interface NoteDialogCreationProps {
  buttonVariant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  buttonIcon: LucideProps
  dialogTitle: string
  createNote?: (note: NoteProps) => void
  updateNote?: (note: NoteProps) => void
  noteData?: NoteProps
}

export function NoteDialogCreation({
  buttonVariant,
  buttonIcon,
  dialogTitle,
  createNote,
  updateNote,
  noteData,
}: NoteDialogCreationProps) {
  const [title, setTitle] = useState<string>(noteData?.title || '')
  const [description, setDescription] = useState<string>(
    noteData?.description || '',
  )
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { toast } = useToast()

  function handleSaveNote() {
    if (!title) {
      toast({
        description: 'Insira um título válido!',
        variant: 'destructive',
      })
      setModalOpen(true)
      return
    }

    if (!description) {
      toast({
        description: 'Insira uma descrição válida!',
        variant: 'destructive',
      })
      setModalOpen(true)
      return
    }

    if (noteData) {
      const updatedNote: NoteProps = {
        id: noteData.id,
        title,
        description,
        created_at: noteData.created_at,
        updated_at: new Date(),
      }

      updateNote!(updatedNote)
    } else {
      const newNote: NoteProps = {
        id: uuid(),
        title,
        description,
        created_at: new Date(),
      }

      createNote!(newNote)
      setTitle('')
      setDescription('')
    }

    setModalOpen(false)
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
    setTitle(noteData?.title || '')
    setDescription(noteData?.description || '')
  }

  return (
    <Dialog open={modalOpen} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size="icon">
          <>{buttonIcon}</>
        </Button>
      </DialogTrigger>
      <DialogContent className="h-auto max-w-[650px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Título da nota..."
            maxLength={40}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            className="min-h-[390px] w-full resize-none"
            placeholder="Escreva sua nota..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="default" onClick={handleSaveNote}>
            <Check className="mr-2 h-4 w-4" />
            Salvar nota
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
