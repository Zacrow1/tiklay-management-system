'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { useI18n } from '@/lib/i18n'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const { t } = useI18n()
  const [currentView, setCurrentView] = useState<'login' | 'register'>(initialView)

  const handleAuthSuccess = () => {
    onClose()
  }

  const switchToLogin = () => setCurrentView('login')
  const switchToRegister = () => setCurrentView('register')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentView === 'login' ? t('common.login') : t('common.register')}
          </DialogTitle>
        </DialogHeader>
        
        {currentView === 'login' ? (
          <LoginForm 
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm 
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}