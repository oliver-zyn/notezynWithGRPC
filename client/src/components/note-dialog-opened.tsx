import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { saveAs } from 'file-saver'
import {
  ArrowDownToLine,
  ArrowUpRightFromSquare,
  Check,
  Copy,
} from 'lucide-react'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { NoteProps } from '@/pages/home'

import { Button } from './ui/button'
import { toast } from './ui/use-toast'

interface NoteDialogOpenedProps {
  noteData: NoteProps
}

export function NoteDialogOpened({ noteData }: NoteDialogOpenedProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  function handleCopyNote() {
    const noteContent = `${noteData.title}\n\n${noteData.description}`
    navigator.clipboard.writeText(noteContent)
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 2000)
  }

  function handleDownloadNote() {
    try {
      const noteContent = `${noteData.title}\n\n${noteData.description}`
      const blob = new Blob([noteContent], { type: 'text/plain;charset=utf-8' })

      saveAs(blob, `${noteData.title}.txt`)

      toast({
        description: 'Download realizado com sucesso!',
        variant: 'default',
      })
    } catch (err) {
      toast({
        description: 'Ocorreu um erro ao baixar a nota',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <ArrowUpRightFromSquare strokeWidth={2.1} className="mr-2 h-4 w-4" />
          Abrir nota
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[650px] overflow-hidden">
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle>Sua nota</DialogTitle>
            <DialogDescription className="text-sm">
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
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="h-[400px] max-w-[calc(650px-3rem)] overflow-x-auto whitespace-pre-wrap rounded-lg bg-muted p-4">
          <h2 className="text-2xl font-semibold">{noteData.title}</h2>
          <p className="mt-4 text-muted-foreground">{noteData.description}</p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="secondary" onClick={handleCopyNote}>
            <Copy className="mr-2 h-4 w-4" />
            {!copySuccess ? 'Copiar nota' : <Check size={20} />}
          </Button>
          <Button variant="default" onClick={handleDownloadNote}>
            <ArrowDownToLine strokeWidth={2.3} className="mr-2 h-4 w-4" />
            Baixar nota
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
