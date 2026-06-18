interface FestivalOptionProps {
  label:    string
  selected: boolean
  onClick:  () => void
}

export function FestivalOption({ label, selected, onClick }: FestivalOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full cursor-pointer rounded-[14px] border-2 px-5 py-4 text-left text-[15px] font-medium transition-all ${
        selected
          ? 'border-[#e23b2e] bg-[#e23b2e]/[0.06] text-[#163a52]'
          : 'border-[#163a52]/15 bg-white text-[#163a52] hover:border-[#e23b2e]/50'
      }`}
    >
      {label}
    </button>
  )
}
