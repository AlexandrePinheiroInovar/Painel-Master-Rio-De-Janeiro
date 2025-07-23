
// src/lib/firebase/config.ts
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

// Validação das variáveis de ambiente
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Verificar se todas as variáveis de ambiente estão definidas
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);

if (missingVars.length > 0) {
  throw new Error(
    `Variáveis de ambiente do Firebase não encontradas: ${missingVars.join(', ')}`
  );
}

// Configuração do Firebase
const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey!,
  authDomain: requiredEnvVars.authDomain!,
  projectId: requiredEnvVars.projectId!,
  storageBucket: requiredEnvVars.storageBucket!,
  messagingSenderId: requiredEnvVars.messagingSenderId!,
  appId: requiredEnvVars.appId!,
};

// Inicialização do Firebase
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  if (getApps().length) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }

  db = getFirestore(app);
  auth = getAuth(app);
  
  // Log detalhado para confirmar qual projeto está sendo usado
  console.log('🔥 =================================================');
  console.log('🔥 FIREBASE CONFIGURADO PARA RIO DE JANEIRO');
  console.log('🔥 =================================================');
  console.log('🔥 Project ID:', firebaseConfig.projectId);
  console.log('🔥 Auth Domain:', firebaseConfig.authDomain);
  console.log('🔥 Storage Bucket:', firebaseConfig.storageBucket);
  console.log('🔥 API Key (primeiros 10 chars):', firebaseConfig.apiKey.substring(0, 10) + '...');
  console.log('🔥 =================================================');
  
  // Verificação adicional - garantir que NÃO é Porto Alegre
  if (firebaseConfig.projectId.includes('porto-alegre')) {
    console.error('❌ ERRO: Configuração ainda aponta para Porto Alegre!');
    throw new Error('Configuração Firebase incorreta - ainda aponta para Porto Alegre');
  }
  
  if (firebaseConfig.projectId === 'locagora-master-rj') {
    console.log('✅ CONFIRMADO: Usando projeto correto do Rio de Janeiro');
  } else {
    console.warn('⚠️ ATENÇÃO: Project ID não é o esperado para Rio de Janeiro');
  }
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
  throw error;
}

export { app, db, auth };
