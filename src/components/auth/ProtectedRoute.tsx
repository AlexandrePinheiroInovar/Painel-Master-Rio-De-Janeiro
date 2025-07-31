"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    console.log('🛡️ [PROTECTED] Estado:', { user: !!user, loading, isChecking });
    
    if (!loading) {
      if (!user) {
        console.log('🛡️ [PROTECTED] Usuário não encontrado, redirecionando...');
        setShouldRedirect(true);
        // Delay para evitar redirect durante hydration
        setTimeout(() => {
          router.replace('/login');
        }, 100);
      } else {
        console.log('🛡️ [PROTECTED] Usuário autenticado, liberando acesso');
        setIsChecking(false);
        setShouldRedirect(false);
      }
    }
  }, [user, loading, router]);

  // Se deve redirecionar, não renderizar nada
  if (shouldRedirect) {
    return null;
  }

  if (loading || isChecking) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Verificando autenticação
              </h3>
              <p className="text-sm text-muted-foreground">
                Aguarde enquanto verificamos suas credenciais...
              </p>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Carregando...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}