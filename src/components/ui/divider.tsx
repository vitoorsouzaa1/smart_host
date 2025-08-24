import { Separator } from '@/components/ui/separator'

interface DividerProps {
  text: string
  className?: string
}

export const Divider = ({ text, className = '' }: DividerProps) => (
  <div className={`relative my-6 ${className}`}>
    <Separator className='my-4' />
    <div className='relative flex justify-center text-sm -mt-3'>
      <span className='px-2 bg-white text-gray-500'>{text}</span>
    </div>
  </div>
)