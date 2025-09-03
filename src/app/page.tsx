'use client'

import { useI18n } from '@/lib/i18n'
import { LanguageSelector } from '@/components/ui/language-selector'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const { t, language } = useI18n()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <img
          src="/logo.svg"
          alt="Z.ai Logo"
          className="w-full h-full object-contain"
        />
      </div>
      
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
            <Button variant="outline">
              {t('common.login')}
            </Button>
            <Button>
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
      
      <div className="text-center text-sm text-muted-foreground">
        <p>Current language: {language}</p>
      </div>
    </div>
  )
}