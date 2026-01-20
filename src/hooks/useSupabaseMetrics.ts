import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Metric, type MetricData } from "@/data/dashboardData";
import { Database } from "@/integrations/supabase/types";

// Types for Supabase tables
type Tables = Database['public']['Tables'];
type TableNames = keyof Tables;

// Interface para dados retornados do Supabase
interface SupabaseRow {
  id: number;
  mes?: string | null;
  trimestre?: string | null;
  previsto: number | null;
  realizado: number | null;
  diferenca: number | null;
  percentual_concluido?: number | null;
  "Atualizado-em"?: string | null;
  metrica_desempenho?: string | null;
}

// Mapeamento completo das tabelas do Supabase para categorias e nomes de indicadores
const tableMapping: Record<string, { categoria: string; nome: string; meta: string; inverso?: boolean }> = {
  // Atendimento
  "2025_atendimento_indice_de_satisfacao_com_atendimento_9": {
    categoria: "Atendimento",
    nome: "Índice de Satisfação com Atendimento",
    meta: "> 90%",
  },
  "2025_atendimento_tempo_de_primeira_resposta_2h": {
    categoria: "Atendimento",
    nome: "Tempo de Primeira Resposta",
    meta: "< 2h",
    inverso: true, // Quanto menor, melhor
  },
  "2025_atendimento_reputacao_google_4.5": {
    categoria: "Atendimento",
    nome: "Reputação Google",
    meta: "> 4.5",
  },
  "2025_atendimento_reputacao_reclame_aqui_7.6": {
    categoria: "Atendimento",
    nome: "Reputação Reclame Aqui",
    meta: "> 7.6",
  },

  // B2B
  "2025_b2b_receita": {
    categoria: "B2B",
    nome: "B2B – Receita",
    meta: "R$ 61.622.991",
  },
  "2025_b2b_base_ativa_saudavel_60": {
    categoria: "B2B",
    nome: "B2B – Base Ativa Saudável",
    meta: "60%",
  },
  "2025_b2b_taxa_de_conversão_25": {
    categoria: "B2B",
    nome: "B2B – Taxa de Conversão",
    meta: "25%",
  },
  "2025_b2b_ticket_medio": {
    categoria: "B2B",
    nome: "B2B – Ticket Médio",
    meta: "R$ 50.000",
  },
  "2025_b2b_ciclo_de_vendas_15_dias": {
    categoria: "B2B",
    nome: "B2B – Ciclo de Vendas",
    meta: "< 15 dias",
    inverso: true,
  },
  "2025_b2b_churn_revendedores_1": {
    categoria: "B2B",
    nome: "B2B – Churn Revendedores",
    meta: "< 1%",
    inverso: true,
  },
  "2025_b2b_crescimento_receita_base_ativa": {
    categoria: "B2B",
    nome: "B2B – Crescimento Receita Base Ativa",
    meta: "5%",
  },

  // B2BC
  "2025_b2bc_receita": {
    categoria: "B2BC",
    nome: "B2BC – Receita",
    meta: "R$ 15.815.042",
  },
  "2025_b2bc_numero_de_novos_clientes": {
    categoria: "B2BC",
    nome: "B2BC – Número de Novos Clientes",
    meta: "Crescimento",
  },
  "2025_b2bc_ticket_medio": {
    categoria: "B2BC",
    nome: "B2BC – Ticket Médio",
    meta: "R$ 16.000",
  },
  "2025_b2bc_taxa_de_conversao_25": {
    categoria: "B2BC",
    nome: "B2BC – Taxa de Conversão",
    meta: "25%",
  },
  "2025_b2bc_ciclo_de_vendas_10_dias": {
    categoria: "B2BC",
    nome: "B2BC – Ciclo de Vendas",
    meta: "< 10 dias",
    inverso: true,
  },
  "2025_b2bc_nps_5": {
    categoria: "B2BC",
    nome: "B2BC – NPS",
    meta: "> 5",
  },
  "2025_b2bc_agendas_realizadas": {
    categoria: "B2BC",
    nome: "B2BC – Agendas Realizadas",
    meta: "Crescimento",
  },

  // B2C Digital
  "2025_b2c_receita_liquida": {
    categoria: "B2C | Digital",
    nome: "B2C Digital – Receita Líquida",
    meta: "R$ 10.000.000",
  },
  "2025_b2c_taxa_de_conversao": {
    categoria: "B2C | Digital",
    nome: "B2C Digital – Taxa de Conversão",
    meta: "1%",
  },
  "2025_b2c_lcp_2s": {
    categoria: "B2C | Digital",
    nome: "B2C Digital – LCP",
    meta: "< 2s",
    inverso: true, // Quanto menor o tempo, melhor
  },

  // Marketing Growth
  "2025_marketing_growth_cpl_rs_50": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – CPL",
    meta: "< R$ 50",
    inverso: true,
  },
  "2025_marketing_growth_cpa_rs_200": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – CPA",
    meta: "< R$ 200",
    inverso: true,
  },
  "2025_marketing_growth_roas": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – ROAS",
    meta: "> 4",
  },
  "2025_marketing_growth_taxa_de_conversão_de_lead": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Taxa de Conversão de Lead",
    meta: "> 3%",
  },
  "2025_marketing_growth_crescimento_da_Base_de_clientes": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Crescimento da Base de Clientes",
    meta: "Crescimento",
  },
  "2025_marketing_growth_crescimento_da_receita_de_clientes": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Crescimento Receita Clientes Existentes",
    meta: "5%",
  },
  "2025_marketing_growth_cohort_ltv": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – LTV",
    meta: "Crescimento",
  },
  "2025_marketing_growth_projetos_realizados": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Projetos Realizados",
    meta: "100%",
  },
  "2025_marketing_growth_percentual_de_compras_indicacao": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Compras por Indicação",
    meta: "> 10%",
  },
  "2025_marketing_growth_vendas_por_ia": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Vendas por IA",
    meta: "Crescimento",
  },

  // Marketing Branding
  "2025_marketing_branding_alcance_100": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Alcance",
    meta: "100%",
  },
  "2025_marketing_branding_brand_search_25": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Brand Search",
    meta: "25%",
  },
  "2025_marketing_branding_engajamento_25": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Engajamento",
    meta: "25%",
  },
  "2025_marketing_branding_trafego_organico_20": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Tráfego Orgânico",
    meta: "20%",
  },
  "2025_marketing_branding_share_of_voice_25": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Share of Voice",
    meta: "25%",
  },
  "2025_marketing_branding_experiência_nps_satisfacao": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – NPS Satisfação",
    meta: "> 70",
  },

  // Financeiro e Controladoria
  "2025_financeiro_e_controladoria_margem_bruta_55": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Margem Bruta",
    meta: "> 55%",
  },
  "2025_financeiro_e_controladoria_margem_de_contribuicao": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Margem de Contribuição",
    meta: "> 34%",
  },
  "2025_financeiro_e_controladoria_margem_ebtida": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Margem EBITDA",
    meta: "> 25%",
  },
  "2025_financeiro_e_controladoria_margem_liquida_15": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Margem Líquida",
    meta: "> 15%",
  },
  "2025_financeiro_e_controladoria_crescimento_ebitda": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Crescimento EBITDA",
    meta: "Crescimento",
  },
  "2025_financeiro_e_controladoria_despesas_operacionais": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Despesas Operacionais",
    meta: "< 30%",
    inverso: true,
  },
  "2025_financeiro_controladoria_resultado_financeiro": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Resultado Financeiro",
    meta: "> 6%",
  },
  "2025_financeiro_e_controladoria_compliance_tributário": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Compliance Tributário",
    meta: "100%",
  },
  "2025_financeiro_e_controladoria_carga_tributaria_efetiva": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Carga Tributária Efetiva",
    meta: "Em construção",
  },
  "2025_financeiro_e_controladoria_grau_de_alavancagem": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Grau de Alavancagem Financeira",
    meta: "< 2,5 (em construção)",
    inverso: true,
  },
  "2025_financeiro_e_controladoria_endividamento_sobre_ebitda": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – Endividamento sobre EBITDA",
    meta: "< 3",
    inverso: true,
  },
  "2025_financeiro_e_controladoria_ebtda_sob_juros": {
    categoria: "Financeiro e Controladoria",
    nome: "Financeiro – EBITDA sob Juros",
    meta: "> 6",
  },

  // Logística
  "2025_logistica_performance_de_transp_e_entrega": {
    categoria: "Logística",
    nome: "Logística – Performance Transporte e Entrega",
    meta: "> 95%",
  },
  "2025_logistica_acuracidade_de_estoque_95": {
    categoria: "Logística",
    nome: "Logística – Acuracidade de Estoque",
    meta: "95%",
  },
  "2025_logistica_indice_avaria_0.1": {
    categoria: "Logística",
    nome: "Logística – Índice de Avaria",
    meta: "< 0.1%",
    inverso: true,
  },
  "2025_logistica_reducao_frete_geral": {
    categoria: "Logística",
    nome: "Logística – Redução de Frete Geral",
    meta: "Redução",
  },
  "2025_logistica_meta_frete_sul": {
    categoria: "Logística",
    nome: "Logística – Meta Frete Sul",
    meta: "Meta Regional",
  },
  "2025_logistica_meta_frete_sudeste": {
    categoria: "Logística",
    nome: "Logística – Meta Frete Sudeste",
    meta: "Meta Regional",
  },
  "2025_logistica_meta_frete_centro_oeste": {
    categoria: "Logística",
    nome: "Logística – Meta Frete Centro-Oeste",
    meta: "Meta Regional",
  },
  "2025_logistica_meta_frete_nordeste_": {
    categoria: "Logística",
    nome: "Logística – Meta Frete Nordeste",
    meta: "Meta Regional",
  },
  "2025_logistica_meta_frete_norte_9": {
    categoria: "Logística",
    nome: "Logística – Meta Frete Norte",
    meta: "Meta Regional",
  },
  "2025_logistica_prazo_de_entrega_sul_3_dias": {
    categoria: "Logística",
    nome: "Logística – Prazo Entrega Sul",
    meta: "< 3 dias",
    inverso: true,
  },
  "2025_logistica_prazo_de_entrega_sudeste_4_dias": {
    categoria: "Logística",
    nome: "Logística – Prazo Entrega Sudeste",
    meta: "< 4 dias",
    inverso: true,
  },
  "2025_logistica_prazo_de_entrega_centro_oeste_7_dias": {
    categoria: "Logística",
    nome: "Logística – Prazo Entrega Centro-Oeste",
    meta: "< 7 dias",
    inverso: true,
  },
  "2025_logistica_prazo_de_entrega_padrao_nordeste_12_dia": {
    categoria: "Logística",
    nome: "Logística – Prazo Entrega Nordeste",
    meta: "< 12 dias",
    inverso: true,
  },
  "2025_logistica_prazo_de_entrega_padrao_norte_12_dias": {
    categoria: "Logística",
    nome: "Logística – Prazo Entrega Norte",
    meta: "< 12 dias",
    inverso: true,
  },

  // Compras Internacionais
  "2025_compras_internacionais_giro_estoque": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Giro de Estoque",
    meta: "> 1",
  },
  "2025_compras_internacionais_ruptura_estoque_30": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Ruptura de Estoque",
    meta: "< 30%",
    inverso: true,
  },
  "2025_compras_internacionais_prazo_medio_de_entrega": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Lead Time",
    meta: "< 110 dias",
    inverso: true,
  },
  "2025_compras_internacionais_qualidade_do_fornecedor": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Qualidade do Fornecedor",
    meta: "< 2%",
    inverso: true,
  },
  "2025_compras_internacionais_redução_de_custos_de_aquisi": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Redução de Custos de Aquisição",
    meta: "≤ 3%",
    inverso: true,
  },
  "2025_compras_internacionais_custo_de_frete_por_unidade": {
    categoria: "Compras Internacionais",
    nome: "Compras Int. – Custo de Frete por Unidade",
    meta: "< R$ 75",
    inverso: true,
  },

  // P&D
  "2025_p&d_projetos_realizados": {
    categoria: "P&D",
    nome: "P&D – Projetos Realizados",
    meta: "100%",
  },
  "2025_p&d_produtos_lançados": {
    categoria: "P&D",
    nome: "P&D – Produtos Lançados",
    meta: "Meta Anual",
  },
  "2025_p&d_tempo_de_desenvolvimento_>90_120_dias": {
    categoria: "P&D",
    nome: "P&D – Tempo de Desenvolvimento",
    meta: "90-120 dias",
  },

  // Operações
  "2025_operacoes_monitoramento_cross_funcional": {
    categoria: "Operações",
    nome: "Operações – Monitoramento Cross-Funcional",
    meta: "100%",
  },
  "2025_operacoes_tempo_de_ciclo": {
    categoria: "Operações",
    nome: "Operações – Tempo de Ciclo",
    meta: "< 15%",
    inverso: true,
  },

  // People (antigo RH)
  "2025_people_enps_51": {
    categoria: "People",
    nome: "People – eNPS",
    meta: "> 51",
  },
  "2025_people_turnover": {
    categoria: "People",
    nome: "People – Turnover",
    meta: "< 10%",
    inverso: true,
  },
  "2025_people_headcount_vs_receita": {
    categoria: "People",
    nome: "People – Headcount vs Receita",
    meta: "Otimizado",
  },
  "2025_people_time_to_fill_30_dias": {
    categoria: "People",
    nome: "People – Time to Fill",
    meta: "< 30 dias",
    inverso: true,
  },
  "2025_people_consistencia_de_feedbacks_de_liderança": {
    categoria: "People",
    nome: "People – Consistência Feedbacks Liderança",
    meta: "80%",
  },

  // Legacy
  "2025_legacy_custo_por_lead_1330": {
    categoria: "Legacy",
    nome: "Legacy – Custo por Lead",
    meta: "R$ 1.330",
    inverso: true,
  },
  "2025_legacy_custos_variaveis": {
    categoria: "Legacy",
    nome: "Legacy – Custos Variáveis",
    meta: "Meta Variável",
    inverso: true,
  },
  "2025_legacy_despesa_fixa": {
    categoria: "Legacy",
    nome: "Legacy – Despesa Fixa",
    meta: "Meta Fixa",
    inverso: true,
  },
  "2025_legacy_ebtida_rs_1.599.070": {
    categoria: "Legacy",
    nome: "Legacy – EBITDA",
    meta: "R$ 1.599.070",
  },
  "2025_legacy_faturamento_gerado_pelo_trafego_rs_6.475.000": {
    categoria: "Legacy",
    nome: "Legacy – Faturamento Gerado pelo Tráfego",
    meta: "R$ 6.475.000",
  },
  "2025_legacy_investimento_em_trafego_rs_1.340.000": {
    categoria: "Legacy",
    nome: "Legacy – Investimento em Tráfego",
    meta: "R$ 1.340.000",
    inverso: true,
  },
  "2025_legacy_numero_total_de_oportunidades": {
    categoria: "Legacy",
    nome: "Legacy – Número Total de Oportunidades",
    meta: "Crescimento",
  },
  "2025_legacy_receita_operacional_bruta_rs_7.370.000": {
    categoria: "Legacy",
    nome: "Legacy – Receita Operacional Bruta",
    meta: "R$ 7.370.000",
  },
  "2025_legacy_roas": {
    categoria: "Legacy",
    nome: "Legacy – ROAS",
    meta: "> 4",
  },
  "2025_legacy_ticket_medio": {
    categoria: "Legacy",
    nome: "Legacy – Ticket Médio",
    meta: "Meta Ticket",
  },
};

// Ordem dos meses para ordenação
const monthOrder = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Função para buscar dados de uma tabela específica
async function fetchTableData(tableName: string): Promise<SupabaseRow[]> {
  try {
    const { data, error } = await supabase
      .from(tableName as TableNames)
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      return [];
    }

    return (data || []) as unknown as SupabaseRow[];
  } catch (err) {
    console.error(`Exception fetching ${tableName}:`, err);
    return [];
  }
}

// Interface estendida para Metric com informação de atualização
export interface MetricWithUpdate extends Metric {
  ultimaAtualizacao?: string | null;
  inverso?: boolean;
}

// Interface estendida para MetricData com data de atualização
export interface MetricDataWithUpdate extends MetricData {
  atualizadoEm?: string | null;
}

// Hook principal para buscar métricas do Supabase
export function useSupabaseMetrics() {
  return useQuery({
    queryKey: ['supabase-metrics'],
    queryFn: async (): Promise<MetricWithUpdate[]> => {
      const metrics: MetricWithUpdate[] = [];

      // Busca dados de todas as tabelas mapeadas em paralelo
      const tableNames = Object.keys(tableMapping);
      const results = await Promise.all(
        tableNames.map(async (tableName) => {
          const data = await fetchTableData(tableName);
          return { tableName, data };
        })
      );

      // Processa os resultados
      results.forEach(({ tableName, data }) => {
        const mapping = tableMapping[tableName];
        if (!mapping || data.length === 0) return;

        // Agrupa dados por mês para evitar duplicatas (mantém previsto e atualiza realizado)
        const monthDataMap: Map<string, {
          previsto: number | null;
          realizado: number | null;
          diferenca: number | null;
          concluido: number | null;
          atualizadoEm: string | null;
        }> = new Map();

        // Primeiro, cria entradas para todos os 12 meses com valores nulos
        monthOrder.forEach((mes) => {
          monthDataMap.set(mes, {
            previsto: null,
            realizado: null,
            diferenca: null,
            concluido: null,
            atualizadoEm: null,
          });
        });

        // Depois, popula com os dados do Supabase (consolidando por mês)
        data.forEach((row) => {
          const mes = row.mes || row.trimestre || '';
          if (!mes || !monthOrder.includes(mes)) return;

          const existing = monthDataMap.get(mes);
          if (existing) {
            // Se já existe um previsto, mantém; senão, usa o novo
            if (existing.previsto === null && row.previsto !== null) {
              existing.previsto = row.previsto;
            }
            // Sempre atualiza o realizado com o valor mais recente
            if (row.realizado !== null) {
              existing.realizado = row.realizado;
            }
            // Atualiza diferença e concluído
            if (row.diferenca !== null) {
              existing.diferenca = row.diferenca;
            }
            if (row.percentual_concluido !== null) {
              existing.concluido = row.percentual_concluido;
            }
            // Atualiza data de atualização se for mais recente
            if (row["Atualizado-em"]) {
              if (!existing.atualizadoEm || row["Atualizado-em"] > existing.atualizadoEm) {
                existing.atualizadoEm = row["Atualizado-em"];
              }
            }
          }
        });

        // Encontra a data de atualização mais recente
        let ultimaAtualizacao: string | null = null;
        monthDataMap.forEach((value) => {
          if (value.atualizadoEm) {
            if (!ultimaAtualizacao || value.atualizadoEm > ultimaAtualizacao) {
              ultimaAtualizacao = value.atualizadoEm;
            }
          }
        });

        // Converte para o formato MetricData (sempre 12 meses ordenados)
        const metricData: MetricDataWithUpdate[] = monthOrder.map((mes) => {
          const monthData = monthDataMap.get(mes)!;
          return {
            mes,
            previsto: monthData.previsto,
            realizado: monthData.realizado,
            diferenca: monthData.diferenca,
            concluido: monthData.concluido,
            atualizadoEm: monthData.atualizadoEm,
          };
        });

        // Cria o objeto Metric
        const metric: MetricWithUpdate = {
          id: tableName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          nome: mapping.nome,
          meta: mapping.meta,
          categoria: mapping.categoria,
          dados: metricData,
          ultimaAtualizacao,
          inverso: mapping.inverso || false,
        };

        metrics.push(metric);
      });

      return metrics;
    },
    refetchInterval: 30000, // Refetch a cada 30 segundos
    staleTime: 10000, // Dados considerados frescos por 10 segundos
  });
}
