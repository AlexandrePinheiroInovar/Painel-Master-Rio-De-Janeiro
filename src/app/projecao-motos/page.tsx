"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MotorcycleProjectionChart } from "@/components/charts/motorcycle-projection-chart"
import { PageHeader } from "@/components/shared/page-header"
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { hasMotorcycleAccess, ALLOWED_MOTORCYCLE_USER_IDS } from '@/lib/utils/permissions';

export default function ProjecaoMotosPage() {
  const { user, loading } = useAuth();

  // DEBUG: Logs de debug para verificar permissões
  console.log('🔍 [PROJECAO-MOTOS] DEBUG - Estado atual:');
  console.log('🔍 [PROJECAO-MOTOS] Loading:', loading);
  console.log('🔍 [PROJECAO-MOTOS] User:', user);
  console.log('🔍 [PROJECAO-MOTOS] UID do usuário:', user?.uid);
  console.log('🔍 [PROJECAO-MOTOS] hasMotorcycleAccess result:', user ? hasMotorcycleAccess(user.uid) : 'user null');
  console.log('🔍 [PROJECAO-MOTOS] UIDs permitidos:', ALLOWED_MOTORCYCLE_USER_IDS);

  if (loading || !user) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasMotorcycleAccess(user.uid)) {
    return (
      <DashboardLayout>
        <PageHeader
          title="Acesso Restrito"
          description="Você não tem permissão para visualizar esta página."
          icon={ShieldAlert}
          iconContainerClassName="bg-red-600"
        />
        <div className="p-4">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Acesso Negado</AlertTitle>
            <AlertDescription>
              Esta área é restrita e requer permissões especiais. Por favor, entre em contato com o administrador se você acredita que isso é um erro.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Projeção de Crescimento da Base"
          description="Análise e projeção para atingir 1.000 motos até dezembro de 2025"
        />
        
        <MotorcycleProjectionChart />
      </div>
    </DashboardLayout>
  )
}