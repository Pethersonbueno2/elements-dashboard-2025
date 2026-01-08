import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ClickUpTask {
  id: string;
  name: string;
  status: {
    status: string;
    color: string;
  };
  custom_fields?: Array<{
    id: string;
    name: string;
    value?: number | string;
  }>;
  due_date?: string;
  date_created: string;
  date_updated: string;
}

interface DashboardMetric {
  id: string;
  nome: string;
  categoria: string;
  previsto: number;
  realizado: number;
  percentualConcluido: number;
  diferenca: number;
  mes: string;
}

const CLICKUP_ACCESS_TOKEN_KEY = 'clickup_access_token';
const CLICKUP_LIST_ID_KEY = 'clickup_list_id';

export function useClickUp() {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(CLICKUP_ACCESS_TOKEN_KEY)
  );
  const [listId, setListId] = useState<string | null>(
    localStorage.getItem(CLICKUP_LIST_ID_KEY)
  );
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const saveAccessToken = useCallback((token: string) => {
    localStorage.setItem(CLICKUP_ACCESS_TOKEN_KEY, token);
    setAccessToken(token);
  }, []);

  const saveListId = useCallback((id: string) => {
    localStorage.setItem(CLICKUP_LIST_ID_KEY, id);
    setListId(id);
  }, []);

  const clearConfig = useCallback(() => {
    localStorage.removeItem(CLICKUP_ACCESS_TOKEN_KEY);
    localStorage.removeItem(CLICKUP_LIST_ID_KEY);
    setAccessToken(null);
    setListId(null);
    setMetrics([]);
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!accessToken || !listId) {
      setError('Token de acesso ou ID da lista não configurado');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('clickup-data', {
        body: {
          action: 'getTasks',
          listId,
          accessToken,
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const tasks: ClickUpTask[] = data.tasks || [];
      
      // Transform tasks into dashboard metrics
      const transformedMetrics: DashboardMetric[] = tasks.map((task, index) => {
        // Try to extract values from custom fields
        let previsto = 0;
        let realizado = 0;
        let percentualConcluido = 0;
        let categoria = 'Geral';
        let mes = new Date().toLocaleString('pt-BR', { month: 'long' });

        if (task.custom_fields) {
          task.custom_fields.forEach(field => {
            const fieldName = field.name.toLowerCase();
            if (fieldName.includes('previst') && typeof field.value === 'number') {
              previsto = field.value;
            }
            if (fieldName.includes('realiz') && typeof field.value === 'number') {
              realizado = field.value;
            }
            if (fieldName.includes('percent') || fieldName.includes('conclu')) {
              if (typeof field.value === 'number') {
                percentualConcluido = field.value;
              }
            }
            if (fieldName.includes('categor') || fieldName.includes('área') || fieldName.includes('area')) {
              if (typeof field.value === 'string') {
                categoria = field.value;
              }
            }
            if (fieldName.includes('mês') || fieldName.includes('mes')) {
              if (typeof field.value === 'string') {
                mes = field.value;
              }
            }
          });
        }

        // Calculate percentage if not provided but we have previsto and realizado
        if (percentualConcluido === 0 && previsto > 0) {
          percentualConcluido = Math.round((realizado / previsto) * 100);
        }

        return {
          id: task.id,
          nome: task.name,
          categoria,
          previsto,
          realizado,
          percentualConcluido,
          diferenca: realizado - previsto,
          mes,
        };
      });

      setMetrics(transformedMetrics);
      toast({
        title: 'Dados atualizados',
        description: `${transformedMetrics.length} métricas carregadas do ClickUp`,
      });

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao buscar dados do ClickUp';
      setError(message);
      toast({
        title: 'Erro',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, listId, toast]);

  const isConfigured = Boolean(accessToken && listId);

  return {
    accessToken,
    listId,
    metrics,
    isLoading,
    error,
    isConfigured,
    saveAccessToken,
    saveListId,
    clearConfig,
    fetchTasks,
  };
}
