"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Lista de UIDs que devem ter acesso forçado (bypass completo)
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [bypassActive, setBypassActive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;
    
    console.log('🔐 [AUTH] Iniciando AuthProvider para Rio de Janeiro');
    console.log('🔐 [AUTH] Firebase Project ID:', auth.app.options.projectId);

    // Verificar dados persistidos no localStorage primeiro
    const checkLocalStorageAuth = () => {
      try {
        const storedUid = localStorage.getItem('auth_user_uid');
        const storedEmail = localStorage.getItem('auth_user_email');
        
        if (storedUid && storedEmail) {
          console.log('🔐 [AUTH] Dados de autenticação encontrados no localStorage:', storedUid);
          
          const bypassFlag = localStorage.getItem('auth_bypass_active');
          const lastLogin = localStorage.getItem('auth_last_login');
          
          // Verificar se é um usuário com bypass e se o login é recente (últimas 24 horas)
          if (BYPASS_UIDS.includes(storedUid) && lastLogin) {
            const isRecentLogin = (Date.now() - parseInt(lastLogin)) < 86400000; // 24 horas
            
            if (isRecentLogin || bypassFlag === 'true') {
              console.log('🚀 [BYPASS] Usuário autorizado para bypass encontrado:', storedUid);
              console.log('🚀 [BYPASS] Login recente detectado, ativando bypass automático');
              setBypassActive(true);
              
              // Criar um usuário mock para bypass completo
              const mockUser = {
                uid: storedUid,
                email: storedEmail,
                displayName: 'Usuário Autorizado (Bypass)',
                providerData: [],
                emailVerified: true,
                isAnonymous: false,
                metadata: {
                  creationTime: new Date().toISOString(),
                  lastSignInTime: new Date().toISOString()
                },
                getIdToken: async () => 'bypass-token-' + storedUid,
                reload: async () => Promise.resolve()
              } as any;
              
              console.log('🚀 [BYPASS] ✅ BYPASS ATIVO - Sessão mantida para usuário:', storedUid);
              if (isMounted) {
                setUser(mockUser);
                setLoading(false);
                setInitialized(true);
              }
              return true;
            }
          }
          
          return true;
        }
        return false;
      } catch (error) {
        console.error('🔐 [AUTH] Erro ao verificar localStorage:', error);
        return false;
      }
    };

    const hasStoredAuth = checkLocalStorageAuth();
    
    // Se bypass está ativo, não prosseguir com Firebase Auth
    if (bypassActive) {
      console.log('🚀 [BYPASS] Bypass ativo, pulando inicialização do Firebase Auth');
      return () => {
        isMounted = false;
      };
    }

    // Função para inicializar a autenticação
    const initializeAuth = async () => {
      try {
        // Primeiro, verificar se já existe usuário autenticado
        await new Promise<void>((resolve) => {
          // Dar tempo para o Firebase carregar o estado persistido
          const checkCurrentUser = () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
              console.log('🔐 [AUTH] Usuário já autenticado encontrado:', currentUser.uid);
              if (isMounted) {
                setUser(currentUser);
                setLoading(false);
                setInitialized(true);
              }
            }
            resolve();
          };

          // Se temos dados no localStorage, aguardar um pouco mais
          if (hasStoredAuth) {
            setTimeout(checkCurrentUser, 500);
          } else {
            checkCurrentUser();
          }
        });

        // Configurar listener para mudanças de estado
        unsubscribe = onAuthStateChanged(auth, (user) => {
          if (!isMounted) return;
          
          console.log('🔐 [AUTH] Estado de autenticação mudou:', user ? `Usuário: ${user.uid}` : 'Nenhum usuário');
          
          // Atualizar estado apenas se realmente mudou
          setUser(prevUser => {
            if (prevUser?.uid !== user?.uid) {
              return user;
            }
            return prevUser;
          });
          
          setLoading(false);
          setInitialized(true);
          
          // Salvar no localStorage para recuperação rápida
          if (user) {
            localStorage.setItem('auth_user_uid', user.uid);
            localStorage.setItem('auth_user_email', user.email || '');
            localStorage.setItem('auth_last_login', Date.now().toString());
          } else {
            // Só limpar se não temos dados válidos persistidos recentemente
            const lastLogin = localStorage.getItem('auth_last_login');
            const isRecentLogin = lastLogin && (Date.now() - parseInt(lastLogin)) < 300000; // 5 minutos
            
            if (!isRecentLogin) {
              localStorage.removeItem('auth_user_uid');
              localStorage.removeItem('auth_user_email');
              localStorage.removeItem('auth_last_login');
            }
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error('🔐 [AUTH] Erro ao inicializar autenticação:', error);
        if (isMounted) {
          setLoading(false);
          setInitialized(true);
        }
        return () => {};
      }
    };

    // Timeout de segurança mais longo para casos com conexão lenta
    const timeout = setTimeout(() => {
      if (isMounted && !initialized) {
        console.log('⏰ [AUTH] Timeout atingido, forçando inicialização');
        
        // Se tínhamos dados no localStorage, não forçar logout
        if (hasStoredAuth) {
          console.log('🔐 [AUTH] Mantendo sessão com base no localStorage');
          // Tentar recarregar o usuário atual
          const currentUser = auth.currentUser;
          if (currentUser) {
            setUser(currentUser);
          }
        }
        
        setLoading(false);
        setInitialized(true);
      }
    }, hasStoredAuth ? 5000 : 3000); // Timeout maior se temos dados persistidos

    // Inicializar
    initializeAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 [SIGNIN] Tentativa de login para:', email);
      
      // Primeiro tentar login normal
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log('✅ [SIGNIN] Login realizado com sucesso para UID:', user.uid);
      
      // Verificar se é usuário autorizado para bypass
      if (BYPASS_UIDS.includes(user.uid)) {
        console.log('🚀 [BYPASS] Usuário autorizado detectado, ativando bypass:', user.uid);
        
        // Salvar dados no localStorage com bypass
        localStorage.setItem('auth_user_uid', user.uid);
        localStorage.setItem('auth_user_email', user.email || '');
        localStorage.setItem('auth_last_login', Date.now().toString());
        localStorage.setItem('auth_bypass_active', 'true');
        
        setBypassActive(true);
      }
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo à LocAgora Master Rio de Janeiro",
      });
    } catch (error: any) {
      let errorMessage = "Erro ao fazer login";
      
      switch (error.code) {
        case 'auth/api-key-not-valid':
          errorMessage = "Chave de API do Firebase inválida. Verifique a configuração.";
          break;
        case 'auth/user-not-found':
          errorMessage = "Usuário não encontrado";
          break;
        case 'auth/wrong-password':
          errorMessage = "Senha incorreta";
          break;
        case 'auth/invalid-email':
          errorMessage = "Email inválido";
          break;
        case 'auth/user-disabled':
          errorMessage = "Usuário desabilitado";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Muitas tentativas. Tente novamente mais tarde";
          break;
        case 'auth/invalid-credential':
          errorMessage = "Credenciais inválidas";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Erro de rede. Verifique sua conexão.";
          break;
        default:
          errorMessage = error.message || "Erro desconhecido";
      }
      
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      console.log('👤 =================================================');
      console.log('👤 INICIANDO CADASTRO DE USUÁRIO - RIO DE JANEIRO');
      console.log('👤 =================================================');
      console.log('👤 Email:', email);
      console.log('👤 Display Name:', displayName);
      console.log('👤 Auth Object Project:', auth.app.options.projectId);
      console.log('👤 =================================================');
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Usuário criado no Firebase Auth - Project ID:', auth.app.options.projectId);
      console.log('✅ UID do usuário:', userCredential.user.uid);
      
      await updateProfile(userCredential.user, { displayName });
      
      console.log('✅ Profile atualizado com sucesso');
      console.log('👤 =================================================');
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo à LocAgora Master Rio de Janeiro",
      });
    } catch (error: any) {
      console.error('❌ Erro no cadastro:', error);
      let errorMessage = "Erro ao criar conta";
      
      switch (error.code) {
        case 'auth/configuration-not-found':
        case 'auth/api-key-not-valid':
          errorMessage = "🚨 FIREBASE AUTHENTICATION NÃO CONFIGURADO! Vá no Firebase Console e ative Authentication > Email/Password";
          break;
        case 'auth/email-already-in-use':
          errorMessage = "Este email já está em uso";
          break;
        case 'auth/invalid-email':
          errorMessage = "Email inválido";
          break;
        case 'auth/weak-password':
          errorMessage = "A senha deve ter pelo menos 6 caracteres";
          break;
        default:
          errorMessage = `${error.code || 'Erro desconhecido'}: ${error.message}`;
          console.error('Detalhes do erro:', {
            code: error.code,
            message: error.message,
            projectId: auth.app.options.projectId
          });
      }
      
      toast({
        title: "Erro ao criar conta",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao fazer logout",
        description: error.message || "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}