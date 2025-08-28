
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MotorcycleStatus, MotorcycleColor } from '@/lib/types';
import { Search, SlidersHorizontal, QrCode } from 'lucide-react';
import type { MotorcyclePageFilters } from '@/app/motorcycles/page';

interface MotorcycleFiltersProps {
  onFilterChange: (filters: MotorcyclePageFilters) => void;
  initialFilters: MotorcyclePageFilters;
}

const statusOptions: { value: MotorcycleStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'active', label: 'Ativa' },
  { value: 'alugada', label: 'Alugada' },
  { value: 'inadimplente', label: 'Inadimplente' },
  { value: 'recolhida', label: 'Recolhida' },
  { value: 'relocada', label: 'Relocada' },
  { value: 'manutencao', label: 'Manutenção' },
  { value: 'indisponivel_rastreador', label: 'Indisponível Rastreador' },
  { value: 'indisponivel_emplacamento', label: 'Indisponível Emplacamento' },
  { value: 'furto_roubo', label: 'Furto/Roubo' },
  { value: 'apropriacao_indebita', label: 'Apropriação Indébita' },
];

// Modelos de motos atualizados
const modelOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'Todos os Modelos' },
  { value: 'SHI 175 Carburada', label: 'SHI 175 Carburada' },
  { value: 'SHI 175 Injetada', label: 'SHI 175 Injetada' },
  { value: 'JEF 150', label: 'JEF 150' },
  { value: 'DK 150', label: 'DK 150' },
  { value: 'DK 160', label: 'DK 160' },
  { value: 'NK 150', label: 'NK 150' },
  { value: 'Factor ED', label: 'Factor ED' },
  { value: 'Factor DX', label: 'Factor DX' },
];

const colorOptions: { value: MotorcycleColor | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas as Cores' },
  { value: 'branca', label: 'Branca' },
  { value: 'preta', label: 'Preta' },
  { value: 'azul', label: 'Azul' },
  { value: 'vermelha', label: 'Vermelha' },
  { value: 'cinza', label: 'Cinza' },
];

export function MotorcycleFilters({ onFilterChange, initialFilters }: MotorcycleFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [status, setStatus] = useState<MotorcycleStatus | 'all'>(initialFilters.status);
  const [model, setModel] = useState<string | 'all'>(initialFilters.model);
  const [color, setColor] = useState<MotorcycleColor | 'all'>(initialFilters.color);

  useEffect(() => {
    onFilterChange({ searchTerm, status, model, color });
  }, [searchTerm, status, model, color, onFilterChange]);

  const handleStatusChange = useCallback((value: string) => {
    setStatus(value as MotorcycleStatus | 'all');
  }, []); 

  const handleModelChange = useCallback((value: string) => {
    setModel(value);
  }, []);

  const handleColorChange = useCallback((value: string) => {
    setColor(value as MotorcycleColor | 'all');
  }, []);

  return (
    <div className="mb-6 p-6 border rounded-lg bg-card shadow-lg">
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Filtros</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-filter"
            placeholder="Buscar por placa, modelo ou franqueado"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div>
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder="Todos os Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={model} onValueChange={handleModelChange}>
            <SelectTrigger id="model-filter" className="w-full">
              <SelectValue placeholder="Todos os Modelos" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select value={color} onValueChange={handleColorChange}>
            <SelectTrigger id="color-filter" className="w-full">
              <SelectValue placeholder="Todas as Cores" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full lg:w-auto justify-center">
          <QrCode className="mr-2 h-4 w-4" />
          Escanear QR
        </Button>
      </div>
    </div>
  );
}
