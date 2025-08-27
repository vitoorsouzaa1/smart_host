'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { useNavigation } from '@/hooks/useNavigation'

// Separate navigation link component
interface NavLinkProps {
  href: string
  label: string
  isActive?: boolean
}

const NavLink = ({ href, label, isActive }: NavLinkProps) => (
  <Link
    href={href}
    className={`text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-lg hover:bg-blue-50 ${
      isActive 
        ? 'text-blue-600 bg-blue-50' 
        : 'text-gray-700 hover:text-blue-600'
    }`}
  >
    {label}
  </Link>
)

// Separate auth buttons component
interface AuthButtonsProps {
  items: Array<{
    href: string
    label: string
    variant: 'outline' | 'default'
  }>
}

const AuthButtons = ({ items }: AuthButtonsProps) => (
  <div className='flex items-center gap-3'>
    {items.map((item) => (
      <Button
        key={item.href}
        variant={item.variant === 'outline' ? 'outline' : 'gradient'}
        size='sm'
        asChild
        className='font-semibold'
      >
        <Link href={item.href}>{item.label}</Link>
      </Button>
    ))}
  </div>
)

export function Navbar() {
  const { navItems, authItems } = useNavigation()

  return (
    <nav className='bg-white/95 backdrop-blur-md border-b-2 border-gray-100 py-4 px-6 shadow-sm sticky top-0 z-50'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center space-x-2 text-xl font-bold text-gradient-brand hover:scale-105 transition-transform duration-200'
        >
          <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg'>
            <span className='text-white font-bold text-lg'>S</span>
          </div>
          <span>SmartHost</span>
        </Link>

        {/* Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={item.isActive}
              />
            ))}
          </div>

          <AuthButtons items={authItems} />
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <Button variant='ghost' size='sm'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  )
}
