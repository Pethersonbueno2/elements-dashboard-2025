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
      "2025_atendimento_indice_de_satisfacao_com_atendimento_9": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_atendimento_reputacao_google_4.5": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_atendimento_reputacao_reclame_aqui_7.6": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_atendimento_tempo_de_primeira_resposta_2h": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_base_ativa_saudavel_60": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_ciclo_de_vendas_15_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_crescimento_receita_base_ativa": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_receita": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_taxa_de_conversão_25": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2b_ticket_medio": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_agendas_realizadas": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_ciclo_de_vendas_10_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_nps_5": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_numero_de_novos_clientes": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_receita": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_taxa_de_conversao_25": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2bc_ticket_medio": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2c_lcp_2s": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2c_receita_liquida": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_b2c_taxa_de_conversao": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_compras_internacionais_custo_de_frete_por_unidade": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_compras_internacionais_giro_estoque": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_compras_internacionais_prazo_medio_de_entrega": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_compras_internacionais_qualidade_do_fornecedor": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          metrica_desempenho: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          metrica_desempenho?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
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
      "2025_compras_internacionais_redução_de_custos_de_aquisi": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_compras_internacionais_ruptura_estoque_30": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_controladoria_resultado_financeiro": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_carga_tributaria_efetiva": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_compliance_tributário": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_crescimento_ebitda": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_despesas_operacionais": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_ebtda_sob_juros": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_endividamento_sobre_ebitda": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_grau_de_alavancagem": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_margem_bruta_55": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_margem_de_contribuicao": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_margem_ebtida": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_financeiro_e_controladoria_margem_liquida_15": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_custo_por_lead_1330": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_custos_variaveis": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_despesa_fixa": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_ebtida_rs_1.599.070": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_faturamento_gerado_pelo_trafego_rs_6.475.000": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_investimento_em_trafego_rs_1.340.000": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_numero_total_de_oportunidades": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_receita_operacional_bruta_rs_7.370.000": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_roas": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_legacy_ticket_medio": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_acuracidade_de_estoque_95": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_indice_avaria_0.1": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_meta_frete_centro_oeste": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_meta_frete_nordeste_": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_meta_frete_norte_9": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_meta_frete_sudeste": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_meta_frete_sul": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_performance_de_transp_e_entrega": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_prazo_de_entrega_centro_oeste_7_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_prazo_de_entrega_padrao_nordeste_12_dia": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_prazo_de_entrega_padrao_norte_12_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_prazo_de_entrega_sudeste_4_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_prazo_de_entrega_sul_3_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_logistica_reducao_frete_geral": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_alcance_100": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_brand_search_25": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_engajamento_25": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_experiência_nps_satisfacao": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_share_of_voice_25": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_branding_trafego_organico_20": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_cohort_ltv": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_cpa_rs_200": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_cpl_rs_50": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_crescimento_da_Base_de_clientes": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_crescimento_da_receita_de_clientes": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_percentual_de_compras_indicacao": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_roas": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_taxa_de_conversão_de_lead": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_marketing_growth_vendas_por_ia": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_operacoes_monitoramento_cross_funcional": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          observacao: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
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
      "2025_operacoes_tempo_de_ciclo": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          observacao: string | null
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          observacao?: string | null
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
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
      "2025_p&d_produtos_lançados": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          percentual_acima: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          percentual_acima?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          percentual_acima?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_p&d_projetos_realizados": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_p&d_tempo_de_desenvolvimento_>90_120_dias": {
        Row: {
          "Atualizado-em": string | null
          diferenca: number | null
          id: number
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
          trimestre: string
        }
        Insert: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          trimestre: string
        }
        Update: {
          "Atualizado-em"?: string | null
          diferenca?: number | null
          id?: number
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
          trimestre?: string
        }
        Relationships: []
      }
      "2025_people_consistencia_de_feedbacks_de_liderança": {
        Row: {
          "Atualizado-em": string | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_people_enps_51": {
        Row: {
          "Atualizado-em": string | null
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_people_headcount_vs_receita": {
        Row: {
          "Atualizado-em": string | null
          id: number
          mes: string
          percentual_concluido: number | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          id?: number
          mes: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          id?: number
          mes?: string
          percentual_concluido?: number | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_people_time_to_fill_30_dias": {
        Row: {
          "Atualizado-em": string | null
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
          id?: number
          mes?: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Relationships: []
      }
      "2025_people_turnover": {
        Row: {
          "Atualizado-em": string | null
          id: number
          mes: string
          metrica_desempenho: string | null
          previsto: number | null
          realizado: number | null
        }
        Insert: {
          "Atualizado-em"?: string | null
          id?: number
          mes: string
          metrica_desempenho?: string | null
          previsto?: number | null
          realizado?: number | null
        }
        Update: {
          "Atualizado-em"?: string | null
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
