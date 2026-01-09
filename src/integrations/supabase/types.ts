export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      "Atendimento - Índique de Satisfacao com Atendimento  >90% - 20": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Atendimento - Reputacao Google  >4.5  - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Atendimento - Reputacao Reclame Aqui > 7..6 %  - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Atendimento - Tempo de Primeira Resposta <2h - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B  - Ciclo de Vendas - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Base Ativa Saudavel - 60% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Churn Revendedores -1 % - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Crescimento Receita Base Ativa - 5% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Receita - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Taxa de Conversão - 25% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2B - Ticket Médio - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Agendas Realizadas - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Ciclo de Vendas - 10 dias - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - NPS - 5": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Número de Novos Clientes": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Receita - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Taxa de Conversao - 25% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2BC - Ticket Medio - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2C Digital - LCP 2s - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2C Digital - Receita Liquida - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "B2C Digital - Taxa de Conversão - 1%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Compras Internacionais - giro_estoque_mensal - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Compras Internacionais - indice_ruptura_estoque_mensal - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Compras Internacionais - Prazo Médio de Entrega (Lead Time) - ": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Compras Internacionais - Qualidade do Fornecedor - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          metrica_desempenho: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          metrica_desempenho?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          metrica_desempenho?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Compras Internacionais - Redução de Custos de Aquisição - 3": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Compliance Tributário - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Crescimento EBITDA ? 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Despesas Operacionais - 30%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  EBITDA sob Juros - >6 - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Grau de Alavancagem Financeira <2,5": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Margem Bruta - 55%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Margem de Contribuição - 34%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Margem EBITDA - 25%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Margem Liquida - 15% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro -  Resultado Financeiro - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro - Carga Tributaria Efetiva": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Financeiro - Endividamento sobre EBITDA <3 - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  Custos Variaveis - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  EBITDA - R$ 1.599.070 - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  investimento em Trafego - R$ 1.340.000": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  Número total de Oportunidades (Leads) - 15740": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  receita Operacional Bruta - R$7.370.000": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  ROAS (Retorno sobre o investimento em Publicidade) - ": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy -  Ticket Médio": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy - Custo por Lead (CPL Médio) - 1330": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy - Despesa Fixa - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Legacy - Faturamento Gerado pelo Tráfego R$6.475.000": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Logistica - Acuracidade de Estoque - 95%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Logistica - Meta Frete - Centro Oeste": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Meta Frete Nordeste 9%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Meta Frete Norte - 9%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Meta Frete Regiao - Sul 4%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          regiao: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          regiao: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          regiao?: string
        }
        Relationships: []
      }
      "Logistica - Meta Frete Sudeste 5%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Performance de Transp e Entrega - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Logistica - Prazo de Entrega - Centro Oeste - 7 dias -": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Prazo de Entrega - Sudeste - 4 dias": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Prazo de Entrega - Sul - 3 dias": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Prazo de Entrega Padrão - Nordeste - 12 dias": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica - Prazo de Entrega Padrão - Norte 12 dias": {
        Row: {
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          Região: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          Região?: string
        }
        Relationships: []
      }
      "Logistica indice_avaria_mensal 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Logistica prazo_entrega_regiao_mensal 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          regiao: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          regiao: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          regiao?: string
        }
        Relationships: []
      }
      "Logistica reducao_frete_geral_mensal 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Alcance - 100%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Brand Search - 25%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Engajamento - 25%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Experiência - NPS Satisfação (Indicaç": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Share of Voice - 25% - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Branding - Trafego Organico - 20%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Cohort - LTV(validar dashboard) 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth cpa R$200 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth CPL - R$50 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Crescimento da Base de Clientes (novos cliente": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Crescimento da Receita de Clientes Existentes": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Percentual de Compras originadas por indicaç": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Projetos Realizados 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth ROAS 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Taxa de Conversão de Lead 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Marketing Growth Vendas por IA 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Operações Monitoramento Cross-Funcional 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          observacao: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "Operações tempo de ciclo 15%": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          observacao: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "P&D - produtos Lançados - 2025": {
        Row: {
          diferenca: number | null
          id: number
          percentual_acima: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          percentual_acima?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          percentual_acima?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "P&D - Projetos Realizados - 2025": {
        Row: {
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "P&D tempo de desenvolvimento >90 - 120 dias": {
        Row: {
          diferenca: number | null
          id: number
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          trimestre: string
        }
        Insert: {
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          trimestre: string
        }
        Update: {
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          trimestre?: string
        }
        Relationships: []
      }
      "RD SUMMIT": {
        Row: {
          diferenca: number | null
          id: number
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "RH consistencia de feedbacks de liderança - 80%": {
        Row: {
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "RH eNPS >51": {
        Row: {
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "RH Headcount vs Receita 2025": {
        Row: {
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "RH time to Fill - 30 dias": {
        Row: {
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "RH Turnover 2025": {
        Row: {
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
