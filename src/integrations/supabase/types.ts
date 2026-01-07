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
      "B2B e B2BC - Crescimento Receita Base Ativa - 5% - 2025": {
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
      "B2B e B2BC - faturamento_leads_mensal - 2025": {
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
      "B2B e B2BC - novos_clientes_b2bc_mensal - 2025": {
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
      "B2B e B2BC - nps_b2bc_mensal - 2025": {
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
      "B2B e B2BC - receita_prevista_b2bc_mensal - 2025": {
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
      "B2B e B2BC - ticket_medio_b2b_mensal - 2025": {
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
      "B2C Digital - receita_liquida_mensal - 2025": {
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
      "B2C Digital - taxa_conversao_mensal - 2025": {
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
      "Compras Internacionais - prazo_entrega_lead_time_mensal - 2025": {
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
      "Compras Internacionais - reducao_custos_aquisicao_mensal - 2025": {
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
      "Financeiro -  compliance_tributario_mensal - 2025": {
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
      "Financeiro -  crescimento_ebitda_mensal - 2025": {
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
      "Financeiro -  despesas_operacionais_mensal - 2025": {
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
      "Financeiro -  ebitda_sob_juros_mensal - 2025": {
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
      "Financeiro -  endividamento_ebitda_mensal - 2025": {
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
      "Financeiro -  grau_alavancagem_mensal - 2025": {
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
      "Financeiro -  margem_bruta_mensal - 2025": {
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
      "Financeiro -  margem_contribuicao_mensal - 2025": {
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
      "Financeiro -  margem_ebitda_mensal - 2025": {
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
      "Financeiro -  margem_liquida_mensal - 2025": {
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
      "Financeiro -  resultado_financeiro_mensal - 2025": {
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
      "Financeiro - carga_tributaria_mensal - 2025": {
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
      "Legacy -  custos_variaveis_mensal - 2025": {
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
      "Legacy -  ebitda_mensal - 2025": {
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
      "Legacy -  investimento_trafego_mensal - 2025": {
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
      "Legacy -  oportunidades_leads_mensal - 2025": {
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
      "Legacy -  receita_operacional_bruta_mensal - 2025": {
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
      "Legacy -  roas_mensal - 2025": {
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
      "Legacy -  ticket_medio_mensal - 2025": {
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
      "Legacy - custo_por_lead_mensal - 2025": {
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
      "Legacy - despesa_fixa_mensal - 2025": {
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
      "Legacy - faturamento_trafego_mensal - 2025": {
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
      "Logistica acuracidade_estoque_mensal 2025": {
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
      "Logistica Meta Frete Regiao - Sul 4%": {
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
      "Logistica performance_transp_entregas_mensal 2025": {
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
      "Marketing Branding - alcance_mensal - 2025": {
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
      "Marketing Branding - brand_search_mensal - 2025": {
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
      "Marketing Branding - engajamento_mensal - 2025": {
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
      "Marketing Branding - nps_satisfacao_mensal - 2025": {
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
      "Marketing Branding - share_of_voice_mensal - 2025": {
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
      "Marketing Branding - trafego_organico_mensal - 2025": {
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
      "Marketing Growth cfa_mensal 2025": {
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
      "Marketing Growth cohort_ltv_mensal 2025": {
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
      "Marketing Growth cpl_mensal 2025": {
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
      "Marketing Growth crescimento_base_clientes_mensal 2025": {
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
      "Marketing Growth crescimento_receita_clientes_existentes_mensal": {
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
      "Marketing Growth percentual_compras_originais_mensal 2025": {
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
      "Marketing Growth projetos_realizados_mensal 2025": {
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
      "Marketing Growth roas_mensal 2025": {
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
      "Marketing Growth taxa_conversao_lead_mensal 2025": {
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
      "Marketing Growth vendas_por_a15_mensal 2025": {
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
      "Operações monitoramento_cross_funcional_mensal 2025": {
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
      "RH headcount_receita_mensal 2025": {
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
      "RH turnover_mensal 2025": {
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
