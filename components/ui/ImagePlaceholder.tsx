interface ImagePlaceholderProps {
  width: number
  height: number
  label?: string
  className?: string
}

export function ImagePlaceholder({
  width,
  height,
  label = 'Imagen',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center bg-cream rounded-md ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    >
      <span className="font-body text-xs text-cream-dark text-center px-3 leading-snug">
        {label}
      </span>
    </div>
  )
}
