-- Inserir categorias
INSERT INTO public.categorias (nome, ordem) VALUES
  ('Atendimento', 1),
  ('B2B e B2BC', 2),
  ('B2C Digital', 3),
  ('Marketing Growth', 4),
  ('Marketing Branding', 5),
  ('Financeiro', 6),
  ('Operações', 7),
  ('Compras internacionais', 8),
  ('Logística', 9),
  ('RH', 10),
  ('P&D', 11),
  ('Legacy', 12);

-- Inserir métricas de Atendimento
INSERT INTO public.metricas (codigo, nome, meta, categoria_id, ordem) VALUES
  ('satisfacao', 'Índice de Satisfação com Atendimento', '> 90%', (SELECT id FROM public.categorias WHERE nome = 'Atendimento'), 1),
  ('tempo-primeira-resposta', 'Tempo de primeira resposta', '< 2h', (SELECT id FROM public.categorias WHERE nome = 'Atendimento'), 2),
  ('reputacao-google', 'Reputação Google', '> 4.5', (SELECT id FROM public.categorias WHERE nome = 'Atendimento'), 3),
  ('reputacao-reclame-aqui', 'Reputação Reclame Aqui', '> 7.6', (SELECT id FROM public.categorias WHERE nome = 'Atendimento'), 4);

-- Inserir métricas de B2B e B2BC
INSERT INTO public.metricas (codigo, nome, meta, categoria_id, ordem) VALUES
  ('receita-b2b', 'B2B – Receita', 'R$ 61.622.991', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 1),
  ('base-ativa-b2b', 'B2B – Base Ativa Saudável', '60%', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 2),
  ('taxa-conversao-b2b', 'B2B – Taxa de Conversão', '25%', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 3),
  ('receita-b2bc', 'B2BC – Receita', 'R$ 15.815.042', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 4),
  ('novos-clientes-b2bc', 'B2BC – Número de Novos Clientes', 'Crescimento', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 5),
  ('ticket-medio-b2bc', 'B2BC – Ticket Médio', 'R$ 16.000', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 6),
  ('taxa-conversao-b2bc', 'B2BC – Taxa de Conversão', '25%', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 7),
  ('ciclo-vendas-b2bc', 'B2BC – Ciclo de Vendas', '10 dias', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 8),
  ('nps-b2bc', 'B2BC – NPS', '5', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 9),
  ('agendas-realizadas-b2bc', 'B2BC – Agendas realizadas', 'Crescimento', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 10),
  ('ticket-medio-b2b', 'B2B – Ticket Médio', 'R$ 50.000', (SELECT id FROM public.categorias WHERE nome = 'B2B e B2BC'), 11);

-- Inserir dados mensais para satisfação
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Janeiro', 1, 2024, 80, 73, -7, 91.25),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Fevereiro', 2, 2024, 80, 78, -2, 97.5),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Março', 3, 2024, 80, 82, 2, 102.5),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Abril', 4, 2024, 80, 83, 3, 103.75),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Maio', 5, 2024, 80, 81, 1, 101.25),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Junho', 6, 2024, 90, 93, 3, 103.33),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Julho', 7, 2024, 90, 85, -5, 94.44),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Agosto', 8, 2024, 90, 90, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Setembro', 9, 2024, 90, 98, 8, 108.89),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Outubro', 10, 2024, 90, 89.5, -0.5, 99.44),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Novembro', 11, 2024, 90, 90.7, 0.7, 100.78),
  ((SELECT id FROM public.metricas WHERE codigo = 'satisfacao'), 'Dezembro', 12, 2024, 90, 77.1, -12.9, 85.67);

-- Inserir dados mensais para tempo de primeira resposta
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Janeiro', 1, 2024, 4, 4, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Fevereiro', 2, 2024, 4, 3.9, -0.1, 102.56),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Março', 3, 2024, 4, 9, 5, 44.44),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Abril', 4, 2024, 3, 2, -1, 150),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Maio', 5, 2024, 3, 0.44, -2.56, 681.82),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Junho', 6, 2024, 2, 1.13, -0.87, 176.99),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Julho', 7, 2024, 2, 1.45, -0.55, 137.93),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Agosto', 8, 2024, 2, 1.06, -0.94, 188.68),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Setembro', 9, 2024, 2, 1, -1, 200),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Outubro', 10, 2024, 2, 0.54, -1.46, 370.37),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Novembro', 11, 2024, 2, 1.59, -0.41, 125.79),
  ((SELECT id FROM public.metricas WHERE codigo = 'tempo-primeira-resposta'), 'Dezembro', 12, 2024, 2, 6.6, 4.6, 30.3);

-- Inserir dados mensais para reputação Google
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Janeiro', 1, 2024, 4.3, 4.2, -0.1, 97.67),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Fevereiro', 2, 2024, 4.3, 4.1, -0.2, 95.35),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Março', 3, 2024, 4.3, 4.2, -0.1, 97.67),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Abril', 4, 2024, 4.3, 4.3, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Maio', 5, 2024, 4.3, 4.3, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Junho', 6, 2024, 4.5, 4.3, -0.2, 95.56),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Julho', 7, 2024, 4.5, 4.4, -0.1, 97.78),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Agosto', 8, 2024, 4.5, 4.4, -0.1, 97.78),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Setembro', 9, 2024, 4.5, 4.5, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Outubro', 10, 2024, 4.5, 4.6, 0.1, 102.22),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Novembro', 11, 2024, 4.6, 4.6, 0, 100),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-google'), 'Dezembro', 12, 2024, 4.6, 4.5, -0.1, 97.83);

-- Inserir dados mensais para reputação Reclame Aqui
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Janeiro', 1, 2024, 7, 6.6, -0.4, 94.29),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Fevereiro', 2, 2024, 7, 6.6, -0.4, 94.29),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Março', 3, 2024, 7, 6.7, -0.3, 95.71),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Abril', 4, 2024, 7, 6.8, -0.2, 97.14),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Maio', 5, 2024, 7, 6.7, -0.3, 95.71),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Junho', 6, 2024, 7.6, 6.8, -0.8, 89.47),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Julho', 7, 2024, 7.6, 7.1, -0.5, 93.42),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Agosto', 8, 2024, 7.6, 7.3, -0.3, 96.05),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Setembro', 9, 2024, 7.6, 7.5, -0.1, 98.68),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Outubro', 10, 2024, 7.6, 7.9, 0.3, 103.95),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Novembro', 11, 2024, 8, 7.9, -0.1, 98.75),
  ((SELECT id FROM public.metricas WHERE codigo = 'reputacao-reclame-aqui'), 'Dezembro', 12, 2024, 8, 8, 0, 100);

-- Inserir dados mensais para receita B2B
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Janeiro', 1, 2024, 4700000, 5515629, 815629, 117.35),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Fevereiro', 2, 2024, 4650000, 4316361, -333639, 92.82),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Março', 3, 2024, 5445000, 5926532, 481532, 108.84),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Abril', 4, 2024, 4370000, 4998791, 628791, 114.39),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Maio', 5, 2024, 4200000, 4307264, 107264, 102.55),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Junho', 6, 2024, 6450000, 3414906, -3035094, 52.94),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Julho', 7, 2024, 7359991, 4952056, -2407935, 67.28),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Agosto', 8, 2024, 3000000, 2494676, -505324, 83.16),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Setembro', 9, 2024, 3441000, 3427101, -13899, 99.6),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Outubro', 10, 2024, 12248000, 6329557, -5918443, 51.68),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Novembro', 11, 2024, 9770000, 6650000, -3120000, 68.07),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2b'), 'Dezembro', 12, 2024, 2069000, NULL, NULL, NULL);

-- Inserir dados mensais para receita B2BC
INSERT INTO public.dados_mensais (metrica_id, mes, mes_numero, ano, previsto, realizado, diferenca, concluido) VALUES
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Janeiro', 1, 2024, 700000, 725682, 25682, 103.67),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Fevereiro', 2, 2024, 710000, 455626, -254374, 64.17),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Março', 3, 2024, 800000, 986951, 186951, 123.37),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Abril', 4, 2024, 1310000, 602469, -707531, 45.99),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Maio', 5, 2024, 1499999, 888160, -611839, 59.21),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Junho', 6, 2024, 1225000, 1285917, 60917, 104.97),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Julho', 7, 2024, 1316320, 1413292, 96972, 107.37),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Agosto', 8, 2024, 1500000, 1036034, -463966, 69.07),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Setembro', 9, 2024, 1364763, 1276831, -87932, 93.56),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Outubro', 10, 2024, 2366000, 1504100, -861900, 63.57),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Novembro', 11, 2024, 3000000, 2693991, -306009, 89.8),
  ((SELECT id FROM public.metricas WHERE codigo = 'receita-b2bc'), 'Dezembro', 12, 2024, 1008272, 0, -1008272, 0);