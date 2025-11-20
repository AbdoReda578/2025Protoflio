import { useCountUp } from '@/lib/hooks'

type AnimatedCounterProps = {
  end: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  isVisible: boolean
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  isVisible,
  className = ''
}: AnimatedCounterProps) {
  const count = useCountUp(end, duration, 0, isVisible)
  
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toString()

  return (
    <span className={className}>
      {prefix}{formattedCount}{suffix}
    </span>
  )
}