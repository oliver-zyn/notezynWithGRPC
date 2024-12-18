import { NotebookPen } from 'lucide-react'

export function NoteHeader() {
  return (
    <div className="mb-20 flex items-center justify-center gap-2">
      <NotebookPen className="h-10 w-10" />
      <h1 className="text-4xl font-semibold">Notezyn.</h1>
    </div>
  )
}
