import { Plus, Search } from 'lucide-react'

import { NoteProps } from '@/pages/home'

import { ModeToggle } from './mode-toggle'
import { NoteDialogCreation } from './note-dialog-creation'
import { Input } from './ui/input'

interface NoteToolbarProps {
  notes: NoteProps[]
  createNote: (note: NoteProps) => void
  onFilterChange: (filterText: string) => void
}

export function NoteToolbar({ createNote, onFilterChange }: NoteToolbarProps) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <div className="relative flex items-center justify-end">
        <Input
          placeholder="Buscar nota..."
          className="w-full pr-9"
          onChange={(e) => onFilterChange(e.target.value)}
        />
        <Search className="absolute mr-3 h-4 w-4" />
      </div>
      <div className="flex items-center gap-5">
        <ModeToggle />
        <NoteDialogCreation
          buttonVariant="default"
          dialogTitle="Nova nota"
          buttonIcon={<Plus className="h-4 w-4" strokeWidth={2.6} />}
          createNote={createNote}
        />
      </div>
    </div>
  )
}
