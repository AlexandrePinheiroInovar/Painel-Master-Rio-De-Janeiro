// Centralização das permissões de acesso por módulo

// UIDs permitidos para Gestão de Motos
export const ALLOWED_MOTORCYCLE_USER_IDS = [
  "edsTZ2zG54Ph2ZoNSyFZXoJj74s2",
  "FOHbVCbMyhadO3tm1rVdknwLVPr1",
  "870qQuK1lrcuOnWf1kUDOJOF8cv2", // Novo UID autorizado
  "r9ZPLbtU91QplA5v1PeATPzD1ml2", // Novo UID autorizado
  "D4pBSwBrxhOXK5EMxgxtTJbaoQA2", // Novo UID autorizado
  "LfT39g5KzKOi3neDpAzN8EfltZD2", // Novo UID autorizado
  "wgeE1LsZhuVIMrSMekkNXroppKE3", // Novo UID autorizado
  "ggImtEKZK0MMZeEf6501bIjNra83", // Novo UID autorizado
  "KKoK8S9oA9OkSqqLJcHCCm5dtr23", // Novo UID autorizado
  "SBklsYG1C2f8r1PKkLRHlsVoVHo1", // Novo UID autorizado
  "5wFDOKt1MIO98WghmWObMUBzaKC2", // Novo UID autorizado
  "tt183pvplWXemHLb6GiXYUQNluY2", // Novo UID autorizado
  "18ZVTriu3NS4OQuMeNciyqYpvvu2", // Novo UID autorizado - Admin
  "YlEeKuUR1HRwZBjOk3rWHQBZFC92", // Novo UID autorizado - Admin
  "jd0RQqw67Pc9SkQLHJSXNgvhYaU2", // Novo UID autorizado
  "zwEALgOvjFS2wasf3Ax0kMakc3B3", // Novo UID autorizado
  "lG3RJBdCl4Mady5OUIyzL0ShEpj2", // Novo UID liberado
  "FFBUeFWS4gfEpekmoVEVGPqvVrg2", // Novo UID liberado
  "5qHVBpyArcNlcTsPc32pgeaQXKq2", // Novo UID liberado
  "WmIXuHa9VQXI6gxAo5m4xLj36KF2", // Novo UID liberado
  "5AXjFoJ00HNQ2Iq0PO5BAb2TAB32", // Novo UID liberado
  "SmpaXjabZCYaGAbNMtrXiVBXiRD3", // Novo UID liberado
  "MlbE7cPyL5fJSY0xFJpSM4k1BET2", // Novo UID liberado
  "2Y6dr4qa6fXvoJ4sr7lTND84d4v1", // Novo UID liberado
  "LB723QZYTtXz9GDcLX21LAkj8lh2", // Novo UID liberado
  // Adicione aqui outros UIDs permitidos
];

// UIDs permitidos para Venda de Motos
export const ALLOWED_VENDA_MOTOS_USER_IDS = [
  "edsTZ2zG54Ph2ZoNSyFZXoJj74s2",
  "FOHbVCbMyhadO3tm1rVdknwLVPr1",
  "870qQuK1lrcuOnWf1kUDOJOF8cv2", // Novo UID autorizado
  "r9ZPLbtU91QplA5v1PeATPzD1ml2", // Novo UID autorizado
  "D4pBSwBrxhOXK5EMxgxtTJbaoQA2", // Novo UID autorizado
  "LfT39g5KzKOi3neDpAzN8EfltZD2", // Novo UID autorizado
  "wgeE1LsZhuVIMrSMekkNXroppKE3", // Novo UID autorizado
  "ggImtEKZK0MMZeEf6501bIjNra83", // Novo UID autorizado
  "KKoK8S9oA9OkSqqLJcHCCm5dtr23", // Novo UID autorizado
  "SBklsYG1C2f8r1PKkLRHlsVoVHo1", // Novo UID autorizado
  "5wFDOKt1MIO98WghmWObMUBzaKC2", // Novo UID autorizado
  "tt183pvplWXemHLb6GiXYUQNluY2", // Novo UID autorizado
  "18ZVTriu3NS4OQuMeNciyqYpvvu2", // Novo UID autorizado - Admin
  "YlEeKuUR1HRwZBjOk3rWHQBZFC92", // Novo UID autorizado - Admin
  "jd0RQqw67Pc9SkQLHJSXNgvhYaU2", // Novo UID autorizado
  "zwEALgOvjFS2wasf3Ax0kMakc3B3", // Novo UID autorizado
  "lG3RJBdCl4Mady5OUIyzL0ShEpj2", // Novo UID liberado
  "FFBUeFWS4gfEpekmoVEVGPqvVrg2", // Novo UID liberado
  "5qHVBpyArcNlcTsPc32pgeaQXKq2", // Novo UID liberado
  "WmIXuHa9VQXI6gxAo5m4xLj36KF2", // Novo UID liberado
  "5AXjFoJ00HNQ2Iq0PO5BAb2TAB32", // Novo UID liberado
  "SmpaXjabZCYaGAbNMtrXiVBXiRD3", // Novo UID liberado
  "MlbE7cPyL5fJSY0xFJpSM4k1BET2", // Novo UID liberado
  "2Y6dr4qa6fXvoJ4sr7lTND84d4v1", // Novo UID liberado
  "LB723QZYTtXz9GDcLX21LAkj8lh2", // Novo UID liberado
  // Adicione aqui outros UIDs permitidos
];

export function hasMotorcycleAccess(uid?: string) {
  // 🚀 FORÇA ACESSO TOTAL PARA USUÁRIOS ESPECÍFICOS - BYPASS COMPLETO
  if (uid === 'zwEALgOvjFS2wasf3Ax0kMakc3B3' || uid === 'jd0RQqw67Pc9SkQLHJSXNgvhYaU2') {
    console.log('🚀 [SUPER-ACCESS] ACESSO TOTAL GARANTIDO para UID:', uid);
    console.log('🚀 [SUPER-ACCESS] Usuário com privilégios máximos - BYPASS ATIVO');
    return true;
  }
  
  // 🚨 BYPASS ESPECIAL PARA UID DE TESTE
  if (uid === 'lG3RJBdCl4Mady5OUIyzL0ShEpj2') {
    console.log('🚨 [TESTE-UID] ACESSO DIRETO PARA UID DE TESTE:', uid);
    return true;
  }
  
  console.log('🔍 [PERMISSIONS] hasMotorcycleAccess called with UID:', uid);
  console.log('🔍 [PERMISSIONS] ALLOWED_MOTORCYCLE_USER_IDS:', ALLOWED_MOTORCYCLE_USER_IDS);
  console.log('🔍 [PERMISSIONS] UID type:', typeof uid);
  console.log('🔍 [PERMISSIONS] UID exists in array:', !!uid && ALLOWED_MOTORCYCLE_USER_IDS.includes(uid));
  console.log('🔍 [PERMISSIONS] Array includes check direct:', ALLOWED_MOTORCYCLE_USER_IDS.includes(uid || ''));
  console.log('🔍 [PERMISSIONS] Specific UIDs check:');
  console.log('🔍 [PERMISSIONS] - zwEALgOvjFS2wasf3Ax0kMakc3B3:', ALLOWED_MOTORCYCLE_USER_IDS.includes('zwEALgOvjFS2wasf3Ax0kMakc3B3'));
  console.log('🔍 [PERMISSIONS] - jd0RQqw67Pc9SkQLHJSXNgvhYaU2:', ALLOWED_MOTORCYCLE_USER_IDS.includes('jd0RQqw67Pc9SkQLHJSXNgvhYaU2'));
  console.log('🔍 [PERMISSIONS] - lG3RJBdCl4Mady5OUIyzL0ShEpj2:', ALLOWED_MOTORCYCLE_USER_IDS.includes('lG3RJBdCl4Mady5OUIyzL0ShEpj2'));
  
  return !!uid && ALLOWED_MOTORCYCLE_USER_IDS.includes(uid);
}

export function hasVendaMotosAccess(uid?: string) {
  // 🚀 FORÇA ACESSO TOTAL PARA USUÁRIOS ESPECÍFICOS - BYPASS COMPLETO
  if (uid === 'zwEALgOvjFS2wasf3Ax0kMakc3B3' || uid === 'jd0RQqw67Pc9SkQLHJSXNgvhYaU2') {
    console.log('🚀 [SUPER-ACCESS] ACESSO TOTAL GARANTIDO para UID:', uid);
    console.log('🚀 [SUPER-ACCESS] Usuário com privilégios máximos - BYPASS ATIVO');
    return true;
  }
  
  // 🚨 BYPASS ESPECIAL PARA UID DE TESTE
  if (uid === 'lG3RJBdCl4Mady5OUIyzL0ShEpj2') {
    console.log('🚨 [TESTE-UID] ACESSO DIRETO PARA UID DE TESTE:', uid);
    return true;
  }
  
  console.log('🔍 [PERMISSIONS] hasVendaMotosAccess called with UID:', uid);
  console.log('🔍 [PERMISSIONS] ALLOWED_VENDA_MOTOS_USER_IDS:', ALLOWED_VENDA_MOTOS_USER_IDS);
  console.log('🔍 [PERMISSIONS] UID type:', typeof uid);
  console.log('🔍 [PERMISSIONS] UID exists in array:', !!uid && ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid));
  console.log('🔍 [PERMISSIONS] Array includes check direct:', ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid || ''));
  console.log('🔍 [PERMISSIONS] Specific UIDs check:');
  console.log('🔍 [PERMISSIONS] - zwEALgOvjFS2wasf3Ax0kMakc3B3:', ALLOWED_VENDA_MOTOS_USER_IDS.includes('zwEALgOvjFS2wasf3Ax0kMakc3B3'));
  console.log('🔍 [PERMISSIONS] - jd0RQqw67Pc9SkQLHJSXNgvhYaU2:', ALLOWED_VENDA_MOTOS_USER_IDS.includes('jd0RQqw67Pc9SkQLHJSXNgvhYaU2'));
  console.log('🔍 [PERMISSIONS] - lG3RJBdCl4Mady5OUIyzL0ShEpj2:', ALLOWED_VENDA_MOTOS_USER_IDS.includes('lG3RJBdCl4Mady5OUIyzL0ShEpj2'));
  
  return !!uid && ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid);
}

// 🚀 FUNÇÃO PARA VERIFICAR SE É SUPER USUÁRIO
export function isSuperUser(uid?: string): boolean {
  const superUsers = ['zwEALgOvjFS2wasf3Ax0kMakc3B3', 'jd0RQqw67Pc9SkQLHJSXNgvhYaU2'];
  const isSuper = !!uid && superUsers.includes(uid);
  
  if (isSuper) {
    console.log('👑 [SUPER-USER] Super usuário identificado:', uid);
  }
  
  return isSuper;
}

// 🚀 FUNÇÃO GERAL DE ACESSO (para futuras extensões)
export function hasFullAccess(uid?: string): boolean {
  return isSuperUser(uid);
} 