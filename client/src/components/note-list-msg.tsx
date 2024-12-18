import { LucideProps } from 'lucide-react'

interface NoteListMessageProps {
  title: string
  subtitle: string
  icon: LucideProps
}

export function NoteListMessage({
  title,
  subtitle,
  icon,
}: NoteListMessageProps) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-5 text-center text-muted-foreground/85">
      <>{icon}</>
      <div>
        <p className="font-bold">{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  )
}
