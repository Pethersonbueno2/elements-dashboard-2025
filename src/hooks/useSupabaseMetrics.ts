import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Metric, type MetricData } from "@/data/dashboardData";

// Mapeamento das tabelas do Supabase para categorias e nomes de indicadores
const tableMapping: Record<string, { categoria: string; nome: string; meta: string }> = {
  "Atendimento - Índique de Satisfacao com Atendimento  >90% - 20": {
    categoria: "Atendimento",
    nome: "Índice de Satisfação com Atendimento",
    meta: "> 90%",
  },
  "Atendimento - Tempo de Primeira Resposta <2h - 2025": {
    categoria: "Atendimento",
    nome: "Tempo de Primeira Resposta",
    meta: "< 2h",
  },
  "Atendimento - Reputacao Google  >4.5  - 2025": {
    categoria: "Atendimento",
    nome: "Reputação Google",
    meta: "> 4.5",
  },
  "Atendimento - Reputacao Reclame Aqui > 7..6 %  - 2025": {
    categoria: "Atendimento",
    nome: "Reputação Reclame Aqui",
    meta: "> 7.6",
  },
  "B2B - Receita - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Receita",
    meta: "R$ 61.622.991",
  },
  "B2B - Base Ativa Saudavel - 60% - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Base Ativa Saudável",
    meta: "60%",
  },
  "B2B - Taxa de Conversão - 25% - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Taxa de Conversão",
    meta: "25%",
  },
  "B2B - Ticket Médio - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Ticket Médio",
    meta: "R$ 50.000",
  },
  "B2B  - Ciclo de Vendas - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Ciclo de Vendas",
    meta: "< 30 dias",
  },
  "B2B - Churn Revendedores -1 % - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Churn Revendedores",
    meta: "< 1%",
  },
  "B2B - Crescimento Receita Base Ativa - 5% - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2B – Crescimento Receita Base Ativa",
    meta: "5%",
  },
  "B2BC - Receita - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Receita",
    meta: "R$ 15.815.042",
  },
  "B2BC - Número de Novos Clientes": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Número de Novos Clientes",
    meta: "Crescimento",
  },
  "B2BC - Ticket Medio - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Ticket Médio",
    meta: "R$ 16.000",
  },
  "B2BC - Taxa de Conversao - 25% - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Taxa de Conversão",
    meta: "25%",
  },
  "B2BC - Ciclo de Vendas - 10 dias - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Ciclo de Vendas",
    meta: "10 dias",
  },
  "B2BC - NPS - 5": {
    categoria: "B2B e B2BC",
    nome: "B2BC – NPS",
    meta: "5",
  },
  "B2BC - Agendas Realizadas - 2025": {
    categoria: "B2B e B2BC",
    nome: "B2BC – Agendas Realizadas",
    meta: "Crescimento",
  },
  "B2C Digital - Receita Liquida - 2025": {
    categoria: "B2C Digital",
    nome: "B2C Digital – Receita Líquida",
    meta: "R$ 10.000.000",
  },
  "B2C Digital - Taxa de Conversão - 1%": {
    categoria: "B2C Digital",
    nome: "B2C Digital – Taxa de Conversão",
    meta: "1%",
  },
  "B2C Digital - LCP 2s - 2025": {
    categoria: "B2C Digital",
    nome: "B2C Digital – LCP",
    meta: "< 2s",
  },
  "Marketing Growth CPL - R$50 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – CPL",
    meta: "R$ 50",
  },
  "Marketing Growth cpa R$200 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – CPA",
    meta: "R$ 200",
  },
  "Marketing Growth ROAS 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – ROAS",
    meta: "> 4",
  },
  "Marketing Growth Taxa de Conversão de Lead 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Taxa de Conversão de Lead",
    meta: "> 3%",
  },
  "Marketing Growth Crescimento da Base de Clientes (novos cliente": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Crescimento da Base de Clientes",
    meta: "Crescimento",
  },
  "Marketing Growth Crescimento da Receita de Clientes Existentes": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Crescimento Receita Clientes Existentes",
    meta: "5%",
  },
  "Marketing Growth Cohort - LTV(validar dashboard) 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – LTV",
    meta: "Crescimento",
  },
  "Marketing Growth Projetos Realizados 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Projetos Realizados",
    meta: "100%",
  },
  "Marketing Growth Percentual de Compras originadas por indicaç": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Compras por Indicação",
    meta: "> 10%",
  },
  "Marketing Growth Vendas por IA 2025": {
    categoria: "Marketing Growth",
    nome: "Marketing Growth – Vendas por IA",
    meta: "Crescimento",
  },
  "Marketing Branding - Alcance - 100%": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Alcance",
    meta: "100%",
  },
  "Marketing Branding - Brand Search - 25%": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Brand Search",
    meta: "25%",
  },
  "Marketing Branding - Engajamento - 25%": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Engajamento",
    meta: "25%",
  },
  "Marketing Branding - Trafego Organico - 20%": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Tráfego Orgânico",
    meta: "20%",
  },
  "Marketing Branding - Share of Voice - 25% - 2025": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – Share of Voice",
    meta: "25%",
  },
  "Marketing Branding - Experiência - NPS Satisfação (Indicaç": {
    categoria: "Marketing Branding",
    nome: "Marketing Branding – NPS Satisfação",
    meta: "> 70",
  },
  "Financeiro -  Margem Bruta - 55%": {
    categoria: "Financeiro",
    nome: "Financeiro – Margem Bruta",
    meta: "55%",
  },
  "Financeiro -  Margem de Contribuição - 34%": {
    categoria: "Financeiro",
    nome: "Financeiro – Margem de Contribuição",
    meta: "34%",
  },
  "Financeiro -  Margem EBITDA - 25%": {
    categoria: "Financeiro",
    nome: "Financeiro – Margem EBITDA",
    meta: "25%",
  },
  "Financeiro -  Margem Liquida - 15% - 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – Margem Líquida",
    meta: "15%",
  },
  "Financeiro -  Crescimento EBITDA ? 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – Crescimento EBITDA",
    meta: "Crescimento",
  },
  "Financeiro -  Despesas Operacionais - 30%": {
    categoria: "Financeiro",
    nome: "Financeiro – Despesas Operacionais",
    meta: "< 30%",
  },
  "Financeiro -  Resultado Financeiro - 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – Resultado Financeiro",
    meta: "Positivo",
  },
  "Financeiro -  Compliance Tributário - 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – Compliance Tributário",
    meta: "100%",
  },
  "Financeiro - Carga Tributaria Efetiva": {
    categoria: "Financeiro",
    nome: "Financeiro – Carga Tributária Efetiva",
    meta: "< 25%",
  },
  "Financeiro -  Grau de Alavancagem Financeira <2,5": {
    categoria: "Financeiro",
    nome: "Financeiro – Grau de Alavancagem Financeira",
    meta: "< 2.5",
  },
  "Financeiro - Endividamento sobre EBITDA <3 - 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – Endividamento sobre EBITDA",
    meta: "< 3",
  },
  "Financeiro -  EBITDA sob Juros - >6 - 2025": {
    categoria: "Financeiro",
    nome: "Financeiro – EBITDA sob Juros",
    meta: "> 6",
  },
  "Logistica - Performance de Transp e Entrega - 2025": {
    categoria: "Logística",
    nome: "Logística – Performance Transporte e Entrega",
    meta: "> 95%",
  },
  "Logistica - Acuracidade de Estoque - 95%": {
    categoria: "Logística",
    nome: "Logística – Acuracidade de Estoque",
    meta: "95%",
  },
  "Logistica indice_avaria_mensal 2025": {
    categoria: "Logística",
    nome: "Logística – Índice de Avaria",
    meta: "< 1%",
  },
  "Logistica reducao_frete_geral_mensal 2025": {
    categoria: "Logística",
    nome: "Logística – Redução de Frete Geral",
    meta: "< 5%",
  },
  "Compras Internacionais - giro_estoque_mensal - 2025": {
    categoria: "Compras internacionais",
    nome: "Compras Int. – Giro de Estoque",
    meta: "> 4",
  },
  "Compras Internacionais - indice_ruptura_estoque_mensal - 2025": {
    categoria: "Compras internacionais",
    nome: "Compras Int. – Índice Ruptura Estoque",
    meta: "< 5%",
  },
  "Compras Internacionais - Prazo Médio de Entrega (Lead Time) - ": {
    categoria: "Compras internacionais",
    nome: "Compras Int. – Lead Time",
    meta: "< 60 dias",
  },
  "Compras Internacionais - Qualidade do Fornecedor - 2025": {
    categoria: "Compras internacionais",
    nome: "Compras Int. – Qualidade do Fornecedor",
    meta: "> 95%",
  },
  "Compras Internacionais - Redução de Custos de Aquisição - 3": {
    categoria: "Compras internacionais",
    nome: "Compras Int. – Redução de Custos de Aquisição",
    meta: "3%",
  },
  "P&D - Projetos Realizados - 2025": {
    categoria: "P&D",
    nome: "P&D – Projetos Realizados",
    meta: "100%",
  },
  "Operações Monitoramento Cross-Funcional 2025": {
    categoria: "Operações",
    nome: "Operações – Monitoramento Cross-Funcional",
    meta: "100%",
  },
  "Operações tempo de ciclo 15%": {
    categoria: "Operações",
    nome: "Operações – Tempo de Ciclo",
    meta: "< 15%",
  },
  "RH eNPS >51": {
    categoria: "People",
    nome: "People – eNPS",
    meta: "> 51",
  },
  "RH Turnover 2025": {
    categoria: "People",
    nome: "People – Turnover",
    meta: "< 10%",
  },
  "RH Headcount vs Receita 2025": {
    categoria: "People",
    nome: "People – Headcount vs Receita",
    meta: "Otimizado",
  },
  "RH time to Fill - 30 dias": {
    categoria: "People",
    nome: "People – Time to Fill",
    meta: "< 30 dias",
  },
  "RH consistencia de feedbacks de liderança - 80%": {
    categoria: "People",
    nome: "People – Consistência Feedbacks Liderança",
    meta: "80%",
  },
};

// Ordem dos meses para ordenação
const monthOrder = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Tipo base para dados retornados
interface SupabaseRow {
  id: number;
  mes: string;
  previsto: number | null;
  realizado: number | null;
  diferenca: number | null;
  percentual_concluido?: number | null;
}

// Função para buscar dados de uma tabela específica
async function fetchTableData(tableName: string): Promise<SupabaseRow[]> {
  const { data, error } = await supabase
    .from(tableName as any)
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return [];
  }

  return (data || []) as unknown as SupabaseRow[];
}

// Hook principal para buscar métricas do Supabase
export function useSupabaseMetrics() {
  return useQuery({
    queryKey: ['supabase-metrics'],
    queryFn: async (): Promise<Metric[]> => {
      const metrics: Metric[] = [];

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

        // Ordena os dados por mês
        const sortedData = [...data].sort((a, b) => {
          const aIndex = monthOrder.indexOf(a.mes);
          const bIndex = monthOrder.indexOf(b.mes);
          return aIndex - bIndex;
        });

        // Converte para o formato MetricData
        const metricData: MetricData[] = sortedData.map((row) => ({
          mes: row.mes,
          previsto: row.previsto,
          realizado: row.realizado,
          diferenca: row.diferenca,
          concluido: row.percentual_concluido || null,
        }));

        // Cria o objeto Metric
        const metric: Metric = {
          id: tableName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          nome: mapping.nome,
          meta: mapping.meta,
          categoria: mapping.categoria,
          dados: metricData,
        };

        metrics.push(metric);
      });

      return metrics;
    },
    refetchInterval: 30000, // Refetch a cada 30 segundos
    staleTime: 10000, // Dados considerados frescos por 10 segundos
  });
}
