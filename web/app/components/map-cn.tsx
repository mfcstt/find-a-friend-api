type MapCnProps = {
  query: string
  className?: string
  zoom?: number
}

export function MapCn({ query, className, zoom = 15 }: MapCnProps) {
  const normalizedQuery = query.trim() || "Brasil"
  const src = `https://www.google.com/maps?q=${encodeURIComponent(normalizedQuery)}&z=${zoom}&output=embed`

  return (
    <iframe
      title="Mapa interativo"
      src={src}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
