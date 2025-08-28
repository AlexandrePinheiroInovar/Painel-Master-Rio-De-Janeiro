# 🔐 RELAÇÃO DETALHADA - USUÁRIOS x PERMISSÕES

## 📋 **TABELA DE PERMISSÕES POR USUÁRIO**

| UID | Nível | 🏍️ Gestão Motos | 💰 Venda Motos | 📊 Dashboard | 📈 Projeção | 📡 Rastreadores | 👥 Franqueados | 💸 Financeiro | 🤖 IA Ociosidade | 🚗 Frota | 📊 Indicadores |
|-----|-------|:---------------:|:---------------:|:------------:|:------------:|:--------------:|:--------------:|:-------------:|:----------------:|:----------:|:--------------:|
| `edsTZ2zG54Ph2ZoNSyFZXoJj74s2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `FOHbVCbMyhadO3tm1rVdknwLVPr1` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `870qQuK1lrcuOnWf1kUDOJOF8cv2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `r9ZPLbtU91QplA5v1PeATPzD1ml2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `D4pBSwBrxhOXK5EMxgxtTJbaoQA2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `LfT39g5KzKOi3neDpAzN8EfltZD2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `wgeE1LsZhuVIMrSMekkNXroppKE3` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `ggImtEKZK0MMZeEf6501bIjNra83` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `KKoK8S9oA9OkSqqLJcHCCm5dtr23` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `SBklsYG1C2f8r1PKkLRHlsVoVHo1` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `5wFDOKt1MIO98WghmWObMUBzaKC2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `tt183pvplWXemHLb6GiXYUQNluY2` | FULL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `18ZVTriu3NS4OQuMeNciyqYpvvu2` | **ADMIN** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `YlEeKuUR1HRwZBjOk3rWHQBZFC92` | **ADMIN** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `jd0RQqw67Pc9SkQLHJSXNgvhYaU2` | **SUPER** | 🚀 | 🚀 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `zwEALgOvjFS2wasf3Ax0kMakc3B3` | **SUPER** | 🚀 | 🚀 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 🏷️ **LEGENDA DE NÍVEIS**

| Símbolo | Nível | Descrição |
|---------|-------|-----------|
| ✅ | **Acesso Normal** | Permissão padrão para área |
| 🚀 | **Acesso Forçado** | Bypass completo de verificações |
| **SUPER** | **Super Usuário** | Acesso forçado a áreas restritas |
| **ADMIN** | **Administrador** | Permissões administrativas |
| **FULL** | **Usuário Completo** | Acesso total às áreas restritas |

---

## 📊 **ESTATÍSTICAS**

### **Por Nível de Acesso:**
- 🚀 **Super Usuários**: 2 (12.5%)
- 👑 **Administradores**: 2 (12.5%) 
- 🔓 **Usuários Completos**: 12 (75%)
- **Total**: 16 usuários

### **Por Área:**
- 🏍️ **Gestão de Motos**: 16 usuários (100% dos autorizados)
- 💰 **Venda de Motos**: 16 usuários (100% dos autorizados)
- 📊 **Áreas Públicas**: Todos os usuários autenticados

---

## 🔐 **DETALHES TÉCNICOS**

### **Áreas Restritas (2):**
1. **🏍️ Gestão de Motos** (`/motorcycles`)
   - Controle: `hasMotorcycleAccess(uid)`
   - Arquivo: `src/lib/utils/permissions.ts:45`

2. **💰 Venda de Motos** (`/venda-motos`) 
   - Controle: `hasVendaMotosAccess(uid)`
   - Arquivo: `src/lib/utils/permissions.ts:64`

### **Áreas Públicas (8):**
- Dashboard, Projeção, Rastreadores, Franqueados, Financeiro, IA Ociosidade, Frota, Indicadores
- **Requisito**: Apenas autenticação Firebase

### **Super Usuários com Bypass:**
- `jd0RQqw67Pc9SkQLHJSXNgvhYaU2`
- `zwEALgOvjFS2wasf3Ax0kMakc3B3`
- **Função**: Verificação forçada antes da lista de permissões
- **Código**: `src/lib/utils/permissions.ts:47` e `src/lib/utils/permissions.ts:66`

---

## ⚠️ **OBSERVAÇÕES IMPORTANTES**

1. **Todos os 16 usuários** têm acesso idêntico às áreas restritas
2. **Super usuários** têm bypass que ignora qualquer verificação
3. **Usuários não listados** são bloqueados nas áreas restritas
4. **Sessão mantida** por 24h com sistema de bypass automático
5. **Logs detalhados** para auditoria de todas as verificações