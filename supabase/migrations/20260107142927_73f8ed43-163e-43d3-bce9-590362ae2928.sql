-- Primeiro, limpar tabelas existentes se necessário
DROP TABLE IF EXISTS public.dados_mensais CASCADE;
DROP TABLE IF EXISTS public.metricas CASCADE;
DROP TABLE IF EXISTS public.categorias CASCADE;
DROP TABLE IF EXISTS public."Clickup" CASCADE;

-- Criar tabela de setores
CREATE TABLE public.setores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de métricas (ligada aos setores)
CREATE TABLE public.metricas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setor_id UUID NOT NULL REFERENCES public.setores(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  meta TEXT,
  unidade TEXT,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de dados mensais
CREATE TABLE public.dados_mensais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metrica_id UUID NOT NULL REFERENCES public.metricas(id) ON DELETE CASCADE,
  mes TEXT NOT NULL,
  ano INTEGER NOT NULL DEFAULT 2024,
  previsto DECIMAL,
  realizado DECIMAL,
  status TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metrica_id, mes, ano)
);

-- Habilitar RLS
ALTER TABLE public.setores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metricas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dados_mensais ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública (dashboard)
CREATE POLICY "Setores são públicos para leitura" ON public.setores FOR SELECT USING (true);
CREATE POLICY "Métricas são públicas para leitura" ON public.metricas FOR SELECT USING (true);
CREATE POLICY "Dados mensais são públicos para leitura" ON public.dados_mensais FOR SELECT USING (true);

-- Inserir os setores
INSERT INTO public.setores (nome, ordem) VALUES
  ('RH', 1),
  ('Financeiro', 2),
  ('Marketing Growth', 3),
  ('Marketing Branding', 4),
  ('Operações', 5),
  ('Logística', 6),
  ('P&D', 7),
  ('B2B e B2BC', 8),
  ('B2C Digital', 9),
  ('Atendimento', 10);

-- Inserir métricas do RH (do arquivo CSV)
INSERT INTO public.metricas (setor_id, nome, meta, unidade, ordem)
SELECT s.id, 'Turnover', '<10%', '%', 1 FROM public.setores s WHERE s.nome = 'RH'
UNION ALL
SELECT s.id, 'eNPS', '>51', 'pontos', 2 FROM public.setores s WHERE s.nome = 'RH'
UNION ALL
SELECT s.id, 'Time to Fill', '30 dias', 'dias', 3 FROM public.setores s WHERE s.nome = 'RH'
UNION ALL
SELECT s.id, 'Headcount vs Receita', '>1', 'ratio', 4 FROM public.setores s WHERE s.nome = 'RH'
UNION ALL
SELECT s.id, 'Consistência de Feedbacks de Liderança', '80%', '%', 5 FROM public.setores s WHERE s.nome = 'RH';

-- Inserir dados mensais do Turnover
INSERT INTO public.dados_mensais (metrica_id, mes, ano, previsto, realizado, status)
SELECT m.id, 'Julho', 2024, 10, 1, 'Atingido' FROM public.metricas m WHERE m.nome = 'Turnover'
UNION ALL SELECT m.id, 'Agosto', 2024, 10, 2, 'Atingido' FROM public.metricas m WHERE m.nome = 'Turnover'
UNION ALL SELECT m.id, 'Setembro', 2024, 10, 5.88, 'Atingido' FROM public.metricas m WHERE m.nome = 'Turnover'
UNION ALL SELECT m.id, 'Outubro', 2024, 10, 10, 'Atingido' FROM public.metricas m WHERE m.nome = 'Turnover'
UNION ALL SELECT m.id, 'Novembro', 2024, 10, 4.46, 'Atingido' FROM public.metricas m WHERE m.nome = 'Turnover';

-- Inserir dados mensais do eNPS
INSERT INTO public.dados_mensais (metrica_id, mes, ano, previsto, realizado, status)
SELECT m.id, 'Julho', 2024, 51, 56, 'Atingido' FROM public.metricas m WHERE m.nome = 'eNPS'
UNION ALL SELECT m.id, 'Agosto', 2024, 51, 52, 'Atingido' FROM public.metricas m WHERE m.nome = 'eNPS'
UNION ALL SELECT m.id, 'Setembro', 2024, 51, 65.2, 'Atingido' FROM public.metricas m WHERE m.nome = 'eNPS'
UNION ALL SELECT m.id, 'Outubro', 2024, 51, 52.8, 'Atingido' FROM public.metricas m WHERE m.nome = 'eNPS'
UNION ALL SELECT m.id, 'Novembro', 2024, 51, 54.9, NULL FROM public.metricas m WHERE m.nome = 'eNPS';

-- Inserir dados mensais do Time to Fill
INSERT INTO public.dados_mensais (metrica_id, mes, ano, previsto, realizado, status)
SELECT m.id, 'Julho', 2024, 30, 38, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Time to Fill'
UNION ALL SELECT m.id, 'Agosto', 2024, 30, 18, 'Atingido' FROM public.metricas m WHERE m.nome = 'Time to Fill'
UNION ALL SELECT m.id, 'Setembro', 2024, 30, 26, 'Atingido' FROM public.metricas m WHERE m.nome = 'Time to Fill'
UNION ALL SELECT m.id, 'Outubro', 2024, 30, 28, 'Atingido' FROM public.metricas m WHERE m.nome = 'Time to Fill'
UNION ALL SELECT m.id, 'Novembro', 2024, 30, 37, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Time to Fill';

-- Inserir dados mensais do Headcount vs Receita
INSERT INTO public.dados_mensais (metrica_id, mes, ano, previsto, realizado, status)
SELECT m.id, 'Julho', 2024, 1, 0.32, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Headcount vs Receita'
UNION ALL SELECT m.id, 'Agosto', 2024, 1, 5.02, 'Atingido' FROM public.metricas m WHERE m.nome = 'Headcount vs Receita'
UNION ALL SELECT m.id, 'Setembro', 2024, 1, -2.65, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Headcount vs Receita'
UNION ALL SELECT m.id, 'Outubro', 2024, 1, 3.96, 'Atingido' FROM public.metricas m WHERE m.nome = 'Headcount vs Receita'
UNION ALL SELECT m.id, 'Novembro', 2024, 1, 12.97, NULL FROM public.metricas m WHERE m.nome = 'Headcount vs Receita';

-- Inserir dados mensais da Consistência de Feedbacks
INSERT INTO public.dados_mensais (metrica_id, mes, ano, previsto, realizado, status)
SELECT m.id, 'Setembro', 2024, 80, 1, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Consistência de Feedbacks de Liderança'
UNION ALL SELECT m.id, 'Outubro', 2024, 80, 8, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Consistência de Feedbacks de Liderança'
UNION ALL SELECT m.id, 'Novembro', 2024, 80, 15, 'Não atingido' FROM public.metricas m WHERE m.nome = 'Consistência de Feedbacks de Liderança';

-- Triggers para updated_at
CREATE TRIGGER update_setores_updated_at BEFORE UPDATE ON public.setores FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_metricas_updated_at BEFORE UPDATE ON public.metricas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dados_mensais_updated_at BEFORE UPDATE ON public.dados_mensais FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para performance
CREATE INDEX idx_metricas_setor ON public.metricas(setor_id);
CREATE INDEX idx_dados_mensais_metrica ON public.dados_mensais(metrica_id);
CREATE INDEX idx_dados_mensais_mes_ano ON public.dados_mensais(mes, ano);