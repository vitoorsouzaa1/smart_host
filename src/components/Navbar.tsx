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
    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
      isActive ? 'text-blue-600' : 'text-gray-600'
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
        variant={item.variant}
        size='sm'
        asChild
        className='transition-all duration-200 hover:scale-105'
      >
        <Link href={item.href}>{item.label}</Link>
      </Button>
    ))}
  </div>
)

export function Navbar() {
  const { navItems, authItems } = useNavigation()

  return (
    <nav className='bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-0 z-50 backdrop-blur-sm'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link
          href='/'
          className='text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors'
        >
          SmartHost
        </Link>

        {/* Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <div className='flex items-center gap-6'>
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

        {/* Mobile menu button (for future mobile implementation) */}
        <div className='md:hidden'>
          <Button variant='ghost' size='sm'>
            Menu
          </Button>
        </div>
      </div>
    </nav>
  )
}
