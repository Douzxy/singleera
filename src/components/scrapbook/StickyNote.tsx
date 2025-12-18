'use client'

interface StickyNoteProps {
  text: string
  color?: string
  rotation?: number
}

export default function StickyNote({ 
  text, 
  color = 'var(--butter)',
  rotation = -2 
}: StickyNoteProps) {
  // Check if color is a pink shade
  const isPinkColor = color.includes('C54B6C') || color.includes('E8A0BF') || color.includes('FFB6C1') || color.includes('DCD6F7')
  
  return (
    <div 
      className="sticky-note max-w-xs"
      style={{ 
        background: isPinkColor 
          ? 'linear-gradient(135deg, #FFFFFF 0%, #FFF8F5 100%)'
          : `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        transform: `rotate(${rotation}deg)`
      }}
    >
      {/* Pin */}
      <div className="pin absolute -top-2 left-1/2 -translate-x-1/2" />
      
      {/* Text - gray-700 for better readability */}
      <p className="font-handwriting text-xl md:text-2xl text-white leading-relaxed">
        {text}
      </p>
    </div>
  )
}
