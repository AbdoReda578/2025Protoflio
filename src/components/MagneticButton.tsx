import { useRef, type ReactNode } from 'react'
import { useMagneticEffect } from '@/lib/hooks'
import { Button } from '@/components/ui/button'

type MagneticButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  strength?: number
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  strength = 0.3,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const position = useMagneticEffect(buttonRef, strength)

  return (
    <Button
      ref={buttonRef}
      onClick={onClick}
      variant={variant}
      size={size}
      type={type}
      disabled={disabled}
      className={`transition-transform duration-200 ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      {children}
    </Button>
  )
}