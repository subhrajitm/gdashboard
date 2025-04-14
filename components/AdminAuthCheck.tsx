"use client"

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminAuthCheck() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const isAdminRoute = pathname?.startsWith('/admin')
    const isLoginPage = pathname === '/admin/login'
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true'

    if (isAdminRoute && !isLoginPage && !isAuthenticated) {
      router.push('/admin/login')
    }

    if (isLoginPage && isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [pathname, router])

  return null
} 