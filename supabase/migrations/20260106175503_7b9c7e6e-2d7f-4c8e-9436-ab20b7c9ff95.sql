-- Criar tabela de categorias
CREATE TABLE public.categorias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública (dashboard público)
CREATE POLICY "Categorias são públicas para leitura" 
ON public.categorias 
FOR SELECT 
USING (true);

-- Criar tabela de métricas (indicadores)
CREATE TABLE public.metricas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  meta TEXT NOT NULL,
  categoria_id UUID NOT NULL REFERENCES public.categorias(id) ON DELETE CASCADE,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.metricas ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública
CREATE POLICY "Metricas são públicas para leitura" 
ON public.metricas 
FOR SELECT 
USING (true);

-- Criar tabela de dados mensais
CREATE TABLE public.dados_mensais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metrica_id UUID NOT NULL REFERENCES public.metricas(id) ON DELETE CASCADE,
  mes TEXT NOT NULL,
  mes_numero INT NOT NULL,
  ano INT NOT NULL DEFAULT 2024,
  previsto DECIMAL,
  realizado DECIMAL,
  diferenca DECIMAL,
  concluido DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metrica_id, mes, ano)
);

-- Habilitar RLS
ALTER TABLE public.dados_mensais ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública
CREATE POLICY "Dados mensais são públicos para leitura" 
ON public.dados_mensais 
FOR SELECT 
USING (true);

-- Criar índices para melhor performance
CREATE INDEX idx_metricas_categoria ON public.metricas(categoria_id);
CREATE INDEX idx_dados_mensais_metrica ON public.dados_mensais(metrica_id);
CREATE INDEX idx_dados_mensais_mes ON public.dados_mensais(mes_numero, ano);

-- Criar função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_metricas_updated_at
BEFORE UPDATE ON public.metricas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dados_mensais_updated_at
BEFORE UPDATE ON public.dados_mensais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();