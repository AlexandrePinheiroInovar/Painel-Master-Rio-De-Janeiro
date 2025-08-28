"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield } from 'lucide-react';

// Lista de UIDs autorizados para bypass (mesma do AuthContext)
const BYPASS_UIDS = [
  'edsTZ2zG54Ph2ZoNSyFZXoJj74s2',
  'FOHbVCbMyhadO3tm1rVdknwLVPr1',
  '870qQuK1lrcuOnWf1kUDOJOF8cv2',
  'r9ZPLbtU91QplA5v1PeATPzD1ml2',
  'D4pBSwBrxhOXK5EMxgxtTJbaoQA2',
  'LfT39g5KzKOi3neDpAzN8EfltZD2',
  'wgeE1LsZhuVIMrSMekkNXroppKE3',
  'ggImtEKZK0MMZeEf6501bIjNra83',
  'KKoK8S9oA9OkSqqLJcHCCm5dtr23',
  'SBklsYG1C2f8r1PKkLRHlsVoVHo1',
  '5wFDOKt1MIO98WghmWObMUBzaKC2',
  'tt183pvplWXemHLb6GiXYUQNluY2',
  '18ZVTriu3NS4OQuMeNciyqYpvvu2',
  'YlEeKuUR1HRwZBjOk3rWHQBZFC92',
  'jd0RQqw67Pc9SkQLHJSXNgvhYaU2',
  'zwEALgOvjFS2wasf3Ax0kMakc3B3',
  'lG3RJBdCl4Mady5OUIyzL0ShEpj2',
  'FFBUeFWS4gfEpekmoVEVGPqvVrg2',
  '5qHVBpyArcNlcTsPc32pgeaQXKq2',
  'WmIXuHa9VQXI6gxAo5m4xLj36KF2',
  '5AXjFoJ00HNQ2Iq0PO5BAb2TAB32',
  'SmpaXjabZCYaGAbNMtrXiVBXiRD3',
  'MlbE7cPyL5fJSY0xFJpSM4k1BET2',
  '2Y6dr4qa6fXvoJ4sr7lTND84d4v1',
  'LB723QZYTtXz9GDcLX21LAkj8lh2'
];

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [hasTriedLocalStorage, setHasTriedLocalStorage] = useState(false);

  useEffect(() => {
    console.log('🛡️ [PROTECTED] Estado:', { user: !!user, loading, isChecking });
    
    // 🚀 VERIFICAÇÃO PRIORITÁRIA - SUPER USUÁRIOS SEMPRE PASSAM
    const checkSuperUserAccess = () => {
      const currentUid = user?.uid || localStorage.getItem('auth_user_uid');
      const isSuperUser = currentUid && BYPASS_UIDS.includes(currentUid);
      
      if (isSuperUser) {
        console.log('🚀 [PROTECTED] 👑 SUPER USUÁRIO DETECTADO - ACESSO TOTAL:', currentUid);
        setIsChecking(false);
        setShouldRedirect(false);
        return true;
      }
      return false;
    };
    
    // Se é super usuário, liberar acesso IMEDIATAMENTE
    if (checkSuperUserAccess()) {
      return;
    }
    
    // Verificar bypass para outros usuários autorizados
    const checkBypassAccess = () => {
      const storedUid = localStorage.getItem('auth_user_uid');
      const bypassFlag = localStorage.getItem('auth_bypass_active');
      const lastLogin = localStorage.getItem('auth_last_login');
      
      if (storedUid && BYPASS_UIDS.includes(storedUid) && lastLogin) {
        const isRecentLogin = (Date.now() - parseInt(lastLogin)) < 86400000; // 24 horas
        
        if (isRecentLogin || bypassFlag === 'true') {
          console.log('🚀 [PROTECTED] 🔓 BYPASS ATIVO - Forçando acesso para UID:', storedUid);
          setIsChecking(false);
          setShouldRedirect(false);
          return true;
        }
      }
      return false;
    };
    
    // Se bypass está ativo, liberar acesso imediatamente
    if (checkBypassAccess()) {
      return;
    }
    
    // Verificar localStorage primeiro se ainda não foi feito
    if (!hasTriedLocalStorage && !user && !loading) {
      const storedUid = localStorage.getItem('auth_user_uid');
      const lastLogin = localStorage.getItem('auth_last_login');
      
      if (storedUid && lastLogin) {
        const isRecentLogin = (Date.now() - parseInt(lastLogin)) < 300000; // 5 minutos
        
        if (isRecentLogin) {
          console.log('🛡️ [PROTECTED] Encontrados dados de autenticação recentes, aguardando Firebase...');
          setHasTriedLocalStorage(true);
          // Dar mais tempo para o Firebase carregar
          setTimeout(() => {
            if (!user && !checkBypassAccess()) {
              console.log('🛡️ [PROTECTED] Timeout aguardando Firebase, redirecionando...');
              setShouldRedirect(true);
              router.replace('/login');
            }
          }, 2000);
          return;
        }
      }
      setHasTriedLocalStorage(true);
    }
    
    if (!loading) {
      if (!user) {
        // Verificar bypass antes de redirecionar
        if (checkBypassAccess()) {
          console.log('🚀 [PROTECTED] Bypass detectado, não redirecionando');
          return;
        }
        
        // Dar uma chance extra se temos dados no localStorage
        const storedUid = localStorage.getItem('auth_user_uid');
        if (storedUid && !hasTriedLocalStorage) {
          console.log('🛡️ [PROTECTED] Aguardando verificação de dados locais...');
          return;
        }
        
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
  }, [user, loading, router, hasTriedLocalStorage]);

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

  // 🚀 VERIFICAÇÃO FINAL - SUPER USUÁRIOS SEMPRE PASSAM
  const finalSuperUserCheck = () => {
    const currentUid = user?.uid || localStorage.getItem('auth_user_uid');
    return currentUid && BYPASS_UIDS.includes(currentUid);
  };

  // 🚀 SUPER USUÁRIOS PASSAM SEMPRE, INDEPENDENTE DE QUALQUER VERIFICAÇÃO
  if (finalSuperUserCheck()) {
    console.log('🚀 [PROTECTED] 👑 ACESSO FINAL GARANTIDO - SUPER USUÁRIO');
    return <>{children}</>;
  }

  // Verificar bypass final para outros usuários
  const finalBypassCheck = () => {
    const storedUid = localStorage.getItem('auth_user_uid');
    const bypassFlag = localStorage.getItem('auth_bypass_active');
    const lastLogin = localStorage.getItem('auth_last_login');
    
    if (storedUid && BYPASS_UIDS.includes(storedUid) && lastLogin) {
      const isRecentLogin = (Date.now() - parseInt(lastLogin)) < 86400000; // 24 horas
      return isRecentLogin || bypassFlag === 'true';
    }
    return false;
  };

  // Se não há usuário, mas bypass está ativo, permitir acesso
  if (!user && finalBypassCheck()) {
    console.log('🚀 [PROTECTED] 🔓 BYPASS FINAL - Permitindo acesso sem usuário Firebase');
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}