'use client'

import { useI18n } from '@/lib/i18n'
import { LanguageSelector } from '@/components/ui/language-selector'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { AuthModal } from '@/components/auth/auth-modal'
import { UserMenu } from '@/components/auth/user-menu'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { t, language } = useI18n()
  const { user, loading, isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login')

  const handleLoginClick = () => {
    setAuthModalView('login')
    setIsAuthModalOpen(true)
  }

  const handleRegisterClick = () => {
    setAuthModalView('register')
    setIsAuthModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-muted-foreground">{t('common.loading')}...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSelector />
        {isAuthenticated && <UserMenu />}
      </div>
      
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <img
          src="/logo.svg"
          alt="Z.ai Logo"
          className="w-full h-full object-contain"
        />
      </div>
      
      {isAuthenticated ? (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {t('messages.welcome', { appName: 'Z.ai Code Scaffold' })}
            </CardTitle>
            <CardDescription>
              {user?.name ? `Welcome back, ${user.name}!` : 'Welcome back!'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                You are successfully logged in as {user?.email}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {t('messages.welcome', { appName: 'Z.ai Code Scaffold' })}
            </CardTitle>
            <CardDescription>
              {t('messages.thankYou', { appName: 'Z.ai Code Scaffold' })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleLoginClick}>
                {t('common.login')}
              </Button>
              <Button onClick={handleRegisterClick}>
                {t('common.register')}
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t('common.loading')}...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Current language: {language}</p>
        {isAuthenticated && <p>Authenticated: Yes</p>}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </div>
  )
}