import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DropdownSelect({
  label,
  options,
  value,
  onChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)
  const selectedOption = options.find((option) => option.value === value)
  const menuOptions = options.filter((option) => option.value !== value)

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <div ref={rootRef} className={cn('relative w-[178px]', className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={label}
        className="flex h-[48px] w-full items-center justify-between rounded-[8px] border border-[#1f323a] bg-white px-[13px] text-left text-[18px] font-medium leading-normal text-[#1f323a] shadow-[0_2px_5px_rgba(18,22,25,0.18)]"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          className={cn(
            'size-5 text-[#1f323a] transition-transform duration-150',
            isOpen && 'rotate-180'
          )}
          fill="#1f323a"
          strokeWidth={2.5}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[55px] z-20 w-full overflow-hidden rounded-[8px] border border-[#1f323a] bg-white py-2 shadow-[0_3px_7px_rgba(18,22,25,0.28)]">
          {menuOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className="block w-full px-3 py-[11px] text-left text-[16px] font-medium text-[#121619] hover:bg-[#dfe8ec]"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
