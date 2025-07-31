
"use client";

import { useAuth } from "@/context/AuthContext"; // Importa o hook de autenticação
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VendaMotosTable } from "@/components/venda-motos/venda-motos-table";
import { AnaliseFranqueadoView } from "@/components/venda-motos/analise-franqueado-view";
import { AnaliseProdutoView } from "@/components/venda-motos/analise-produto-view";
import { VendasKpiCards } from "@/components/venda-motos/kpi/vendas-kpi-cards";
import { DollarSign, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { hasVendaMotosAccess, ALLOWED_VENDA_MOTOS_USER_IDS } from '@/lib/utils/permissions';


export default function VendaMotosPage() {
  const { user, loading } = useAuth();

  // DEBUG: Logs de debug para verificar permissões
  console.log('🔍 [VENDA-MOTOS] DEBUG - Estado atual:');
  console.log('🔍 [VENDA-MOTOS] Loading:', loading);
  console.log('🔍 [VENDA-MOTOS] User:', user);
  console.log('🔍 [VENDA-MOTOS] UID do usuário:', user?.uid);
  console.log('🔍 [VENDA-MOTOS] hasVendaMotosAccess result:', user ? hasVendaMotosAccess(user.uid) : 'user null');
  console.log('🔍 [VENDA-MOTOS] UIDs permitidos:', ALLOWED_VENDA_MOTOS_USER_IDS);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <p>Carregando...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Verifica se o ID do usuário está na lista de permitidos
  if (!user || !hasVendaMotosAccess(user.uid)) {
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
                <ShieldAlert className="h-4 w-4"/>
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
      <PageHeader
        title="Venda de Motos"
        description="Analise as vendas, receitas e performance dos compradores."
        icon={DollarSign}
        iconContainerClassName="bg-green-600"
      />
      
      <div className="space-y-4 mb-6">
        <VendasKpiCards />
      </div>

      <Tabs defaultValue="produto" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="produto">Gráficos</TabsTrigger>
          <TabsTrigger value="franqueado">Análise por Franqueado</TabsTrigger>
          <TabsTrigger value="dados">Dados</TabsTrigger>
        </TabsList>
        <TabsContent value="produto">
          <AnaliseProdutoView />
        </TabsContent>
        <TabsContent value="franqueado">
          <AnaliseFranqueadoView />
        </TabsContent>
        <TabsContent value="dados">
          <VendaMotosTable />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
