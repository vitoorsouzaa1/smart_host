import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export interface NavItem {
  href: string
  label: string
  isActive?: boolean
}

export const useNavigation = () => {
  const pathname = usePathname()

  const navItems: NavItem[] = useMemo(
    () => [
      {
        href: '/properties',
        label: 'Properties',
        isActive: pathname === '/properties',
      },
      {
        href: '/bookings',
        label: 'My Bookings',
        isActive: pathname === '/bookings',
      },
    ],
    [pathname]
  )

  const authItems = useMemo(
    () => [
      {
        href: '/login',
        label: 'Sign In',
        variant: 'outline' as const,
      },
      {
        href: '/register',
        label: 'Sign Up',
        variant: 'default' as const,
      },
    ],
    []
  )

  return {
    navItems,
    authItems,
    isHomePage: pathname === '/',
  }
}
