
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MotorcycleStatus, MotorcycleColor } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const translateMotorcycleStatus = (status?: MotorcycleStatus): string => {
  if (!status) return 'N/Definido';
  switch (status) {
    case 'active': return 'Disponível';
    case 'alugada': return 'Alugada';
    case 'inadimplente': return 'Inadimplente';
    case 'manutencao': return 'Manutenção';
    case 'recolhida': return 'Recolhida';
    case 'relocada': return 'Relocada';
    case 'indisponivel_rastreador': return 'Indisponível Rastreador';
    case 'indisponivel_emplacamento': return 'Indisponível Emplacamento';
    case 'furto_roubo': return 'Furto/Roubo';
    case 'apropriacao_indebita': return 'Apropriação Indébita';
    default:
      const s = status as string;
      return s.charAt(0).toUpperCase() + s.slice(1);
  }
};

export const translateMotorcycleColor = (color?: MotorcycleColor): string => {
  if (!color) return 'N/Definido';
  switch (color) {
    case 'branca': return 'Branca';
    case 'preta': return 'Preta';
    case 'azul': return 'Azul';
    case 'vermelha': return 'Vermelha';
    case 'cinza': return 'Cinza';
    default:
      const c = color as string;
      return c.charAt(0).toUpperCase() + c.slice(1);
  }
};

export const normalizeHeader = (header: string) => {
  return header.toLowerCase().trim().replace(/\s+/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
