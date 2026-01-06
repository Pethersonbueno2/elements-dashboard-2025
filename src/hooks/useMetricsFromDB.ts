import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Metric, MetricData } from "@/data/dashboardData";

interface DBCategoria {
  id: string;
  nome: string;
  ordem: number;
}

interface DBMetrica {
  id: string;
  nome: string;
  meta: string;
  categoria_id: string;
  ordem: number;
}

interface DBDadoMensal {
  id: string;
  metrica_id: string;
  mes: string;
  mes_numero: number;
  previsto: number | null;
  realizado: number | null;
  diferenca: number | null;
  concluido: number | null;
}

export function useMetricsFromDB() {
  return useQuery({
    queryKey: ["metrics-from-db"],
    queryFn: async () => {
      // Fetch categories
      const { data: categorias, error: catError } = await supabase
        .from("categorias")
        .select("*")
        .order("ordem");

      if (catError) throw catError;

      // Fetch metrics
      const { data: metricas, error: metError } = await supabase
        .from("metricas")
        .select("*")
        .order("ordem");

      if (metError) throw metError;

      // Fetch monthly data
      const { data: dadosMensais, error: dadosError } = await supabase
        .from("dados_mensais")
        .select("*")
        .order("mes_numero");

      if (dadosError) throw dadosError;

      // Create category map
      const categoryMap = new Map<string, string>();
      (categorias as DBCategoria[]).forEach((cat) => {
        categoryMap.set(cat.id, cat.nome);
      });

      // Get unique category names in order
      const categoryNames = (categorias as DBCategoria[]).map((c) => c.nome);

      // Group dados by metrica_id
      const dadosByMetrica = new Map<string, MetricData[]>();
      (dadosMensais as DBDadoMensal[]).forEach((dado) => {
        if (!dadosByMetrica.has(dado.metrica_id)) {
          dadosByMetrica.set(dado.metrica_id, []);
        }
        dadosByMetrica.get(dado.metrica_id)!.push({
          mes: dado.mes,
          previsto: dado.previsto,
          realizado: dado.realizado,
          diferenca: dado.diferenca,
          concluido: dado.concluido,
        });
      });

      // Build metrics array
      const metrics: Metric[] = (metricas as DBMetrica[]).map((m) => ({
        id: m.id,
        nome: m.nome,
        meta: m.meta,
        categoria: categoryMap.get(m.categoria_id) || "Sem categoria",
        dados: dadosByMetrica.get(m.id) || [],
      }));

      return { metrics, categories: categoryNames };
    },
  });
}
