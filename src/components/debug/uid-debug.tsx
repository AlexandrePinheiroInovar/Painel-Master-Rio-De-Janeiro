"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export function UidDebug() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      console.log('🆔 [UID-DEBUG] Current user UID:', user.uid);
      console.log('🆔 [UID-DEBUG] User object:', user);
      
      // Adicionar ao localStorage para facilitar debug
      localStorage.setItem('current_user_uid', user.uid);
      localStorage.setItem('current_user_info', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }));
    }
  }, [user, loading]);

  if (!user) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'black',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>UID: {user.uid}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}