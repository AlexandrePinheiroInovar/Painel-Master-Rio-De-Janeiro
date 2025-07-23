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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Limpar dados do Firebase antigos no localStorage (forçar limpeza para Rio de Janeiro)
    if (typeof window !== 'undefined') {
      // Sempre limpar TODOS os dados do Firebase para garantir que não há dados do projeto antigo
      console.log('🧹 Iniciando limpeza completa do cache do Firebase para Rio de Janeiro...');
      
      // Limpar localStorage - remover TODOS os dados do Firebase
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('firebase:') || key.startsWith('firebaseui::') || 
            key.includes('porto-alegre') || key.includes('joinville') || 
            key.includes('locagora') || key.startsWith('_firebase')) {
          console.log(`🗑️ Removendo localStorage: ${key}`);
          localStorage.removeItem(key);
        }
      });
      
      // Limpar sessionStorage também
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('firebase:') || key.startsWith('firebaseui::') || 
            key.includes('porto-alegre') || key.includes('joinville') || 
            key.includes('locagora') || key.startsWith('_firebase')) {
          console.log(`🗑️ Removendo sessionStorage: ${key}`);
          sessionStorage.removeItem(key);
        }
      });
      
      // Limpar dados IndexedDB do Firebase também
      if ('indexedDB' in window) {
        try {
          indexedDB.databases().then(databases => {
            databases.forEach(db => {
              if (db.name && (db.name.includes('firebase') || db.name.includes('locagora'))) {
                console.log(`🗑️ Removendo IndexedDB: ${db.name}`);
                indexedDB.deleteDatabase(db.name);
              }
            });
          });
        } catch (error) {
          console.log('⚠️ Não foi possível limpar IndexedDB:', error);
        }
      }
      
      console.log('✅ Cache do Firebase limpo completamente para Rio de Janeiro - Projeto: locagora-master-rj');
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Timeout de segurança para evitar loading infinito
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [loading]);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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