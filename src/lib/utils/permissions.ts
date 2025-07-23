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
  // Adicione aqui outros UIDs permitidos
];

export function hasMotorcycleAccess(uid?: string) {
  return !!uid && ALLOWED_MOTORCYCLE_USER_IDS.includes(uid);
}

export function hasVendaMotosAccess(uid?: string) {
  return !!uid && ALLOWED_VENDA_MOTOS_USER_IDS.includes(uid);
} 