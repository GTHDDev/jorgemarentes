import { type LucideIcon } from '@/lib/icons'

interface ContactItemProps {
  icon: LucideIcon
  label: string
  value: string
}

export function ContactItem({ icon: Icon, label, value }: ContactItemProps) {
  return (
    <div className="group flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-colors duration-300 group-hover:border-white/10 group-hover:bg-white/10">
        <Icon className="h-5 w-5 text-white/80 transition-colors group-hover:text-white" />
      </div>
      <div>
        <span className="mb-1 block text-sm font-medium uppercase tracking-wide text-white/40">
          {label}
        </span>
        <p className="text-pretty leading-relaxed text-white/90">{value}</p>
      </div>
    </div>
  )
}
