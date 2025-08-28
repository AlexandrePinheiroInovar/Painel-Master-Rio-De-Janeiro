// Utilitário para normalizar nomes de modelos de motocicletas
// Usado para unificar variações de nomes de modelos na interface

/**
 * Normaliza nomes de modelos SHI para unificar variações
 * @param model - Nome do modelo original
 * @returns Nome do modelo normalizado
 */
export function normalizeSHIModel(model: string): string {
  const trimmedModel = model.trim();
  
  // Unificar modelos SHI 175 Carburada
  if (trimmedModel === 'SHI 175 CARBURADA' ||
      trimmedModel === 'SHI 175 Carburada' ||
      trimmedModel === 'SHINERAY SHI 175 CARBURADA' ||
      trimmedModel === 'SHI175 CARBURADA') {
    return 'SHI 175 Carburada';
  }
  
  // Unificar modelos SHI 175 Injetada
  if (trimmedModel === 'SHI 175 INJETADA' ||
      trimmedModel === 'SHI 175 Injetada' ||
      trimmedModel === 'SHINERAY SHI 175 INJETADA' ||
      trimmedModel === 'SHI175 INJETADA' ||
      trimmedModel === 'SHI 175s EFI') {
    return 'SHI 175 Injetada';
  }
  
  return trimmedModel;
}

/**
 * Normaliza nomes de modelos JEF para unificar variações
 * @param model - Nome do modelo original
 * @returns Nome do modelo normalizado
 */
export function normalizeJEFModel(model: string): string {
  const trimmedModel = model.trim();
  
  // Unificar modelos JEF 150
  if (trimmedModel === 'JEF 150' ||
      trimmedModel === 'JEF150' ||
      trimmedModel === 'JIALING JEF 150') {
    return 'JEF 150';
  }
  
  return trimmedModel;
}

/**
 * Normaliza nomes de modelos DK para unificar variações
 * @param model - Nome do modelo original
 * @returns Nome do modelo normalizado
 */
export function normalizeDKModel(model: string): string {
  const trimmedModel = model.trim();
  
  // Unificar modelos DK 150
  if (trimmedModel === 'DK 150' ||
      trimmedModel === 'DK150' ||
      trimmedModel === 'HAOJUE DK 150') {
    return 'DK 150';
  }
  
  // Unificar modelos DK 160
  if (trimmedModel === 'DK 160' ||
      trimmedModel === 'DK160' ||
      trimmedModel === 'HAOJUE DK 160' ||
      trimmedModel === 'HAOJUE DK160') {
    return 'DK 160';
  }
  
  return trimmedModel;
}

/**
 * Normaliza nomes de modelos NK e Factor para unificar variações
 * @param model - Nome do modelo original
 * @returns Nome do modelo normalizado
 */
export function normalizeOtherModels(model: string): string {
  const trimmedModel = model.trim();
  
  // Unificar modelos NK 150
  if (trimmedModel === 'NK 150' ||
      trimmedModel === 'NK150' ||
      trimmedModel === 'CFMOTO NK 150') {
    return 'NK 150';
  }
  
  // Unificar modelos Factor ED
  if (trimmedModel === 'Factor ED' ||
      trimmedModel === 'FACTOR ED' ||
      trimmedModel === 'YAMAHA Factor ED') {
    return 'Factor ED';
  }
  
  // Unificar modelos Factor DX
  if (trimmedModel === 'Factor DX' ||
      trimmedModel === 'FACTOR DX' ||
      trimmedModel === 'YAMAHA Factor DX') {
    return 'Factor DX';
  }
  
  return trimmedModel;
}

/**
 * Normaliza qualquer nome de modelo (função principal)
 * @param model - Nome do modelo original
 * @returns Nome do modelo normalizado
 */
export function normalizeMotorcycleModel(model: string): string {
  if (!model) return '';
  
  // Aplicar normalizações específicas
  let normalizedModel = normalizeSHIModel(model);
  normalizedModel = normalizeJEFModel(normalizedModel);
  normalizedModel = normalizeDKModel(normalizedModel);
  normalizedModel = normalizeOtherModels(normalizedModel);
  
  return normalizedModel;
}