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
  // Adicione aqui outros UIDs permitidos
];

export function hasMotorcycleAccess(uid?: string) {
  console.log('🔍 [PERMISSIONS] hasMotorcycleAccess called with UID:', uid);
  console.log('🔍 [PERMISSIONS] ALLOWED_MOTORCYCLE_USER_IDS:', ALLOWED_MOTORCYCLE_USER_IDS);
  console.log('🔍 [PERMISSIONS] UID type:', typeof uid);
  console.log('🔍 [PERMISSIONS] UID exists in array:', !!uid && ALLOWED_MOTORCYCLE_USER_IDS.includes(uid));
  console.log('🔍 [PERMISSIONS] Array includes check direct:', ALLOWED_MOTORCYCLE_USER_IDS.includes(uid || ''));
  console.log('🔍 [PERMISSIONS] Specific UIDs check:');
  console.log('🔍 [PERMISSIONS] - zwEALgOvjFS2wasf3Ax0kMakc3B3:', ALLOWED_MOTORCYCLE_USER_IDS.includes('zwEALgOvjFS2wasf3Ax0kMakc3B3'));
  console.log('🔍 [PERMISSIONS] - jd0RQqw67Pc9SkQLHJSXNgvhYaU2:', ALLOWED_MOTORCYCLE_USER_IDS.includes('jd0RQqw67Pc9SkQLHJSXNgvhYaU2'));
  
  if (uid === 'zwEALgOvjFS2wasf3Ax0kMakc3B3' || uid === 'jd0RQqw67Pc9SkQLHJSXNgvhYaU2') {
    console.log('🔍 [PERMISSIONS] FORCE ALLOWING ACCESS for specific UID:', uid);
    return true;
  }
  
  return !!uid && ALLOWED_MOTORCYCLE_USER_IDS.includes(uid);
}

export function hasVendaMotosAccess(uid?: string) {
  console.log('🔍 [PERMISSIONS] hasVendaMotosAccess called with UID:', uid);
  console.log('🔍 [PERMISSIONS] ALLOWED_VENDA_MOTOS_USER_IDS:', ALLOWED_VENDA_MOTOS_USER_IDS);
  console.log('🔍 [PERMISSIONS] UID type:', typeof uid);
  console.log('🔍 [PERMISSIONS] UID exists in array:', !!uid && ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid));
  console.log('🔍 [PERMISSIONS] Array includes check direct:', ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid || ''));
  console.log('🔍 [PERMISSIONS] Specific UIDs check:');
  console.log('🔍 [PERMISSIONS] - zwEALgOvjFS2wasf3Ax0kMakc3B3:', ALLOWED_VENDA_MOTOS_USER_IDS.includes('zwEALgOvjFS2wasf3Ax0kMakc3B3'));
  console.log('🔍 [PERMISSIONS] - jd0RQqw67Pc9SkQLHJSXNgvhYaU2:', ALLOWED_VENDA_MOTOS_USER_IDS.includes('jd0RQqw67Pc9SkQLHJSXNgvhYaU2'));
  
  if (uid === 'zwEALgOvjFS2wasf3Ax0kMakc3B3' || uid === 'jd0RQqw67Pc9SkQLHJSXNgvhYaU2') {
    console.log('🔍 [PERMISSIONS] FORCE ALLOWING ACCESS for specific UID:', uid);
    return true;
  }
  
  return !!uid && ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid);
} 