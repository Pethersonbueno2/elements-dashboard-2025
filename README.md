# Elements Dashboard 2025

Dashboard de indicadores de performance corporativo desenvolvido para a Elements, empresa de mobiliário tecnológico sediada em Santa Catarina.

## 📊 Resumo do Projeto

Este projeto é um **painel de indicadores (KPIs)** que permite visualizar, filtrar e acompanhar métricas de desempenho de diferentes áreas da empresa, incluindo:

- **Atendimento**: Satisfação, tempo de resposta, reputação em plataformas
- **B2B e B2BC**: Receita, taxa de conversão, ticket médio, ciclo de vendas
- **B2C Digital**: Receita líquida, taxa de conversão, LCP
- **Marketing Growth**: ROAS, CPL, CPA, taxa de conversão de leads
- **Marketing Branding**: Alcance, engajamento, share of voice
- **Financeiro**: EBITDA, margens, despesas operacionais
- **Logística**: Prazos de entrega, fretes por região, acuracidade de estoque
- **Compras Internacionais**: Lead time, qualidade do fornecedor, giro de estoque
- **Operações**: Tempo de ciclo, monitoramento cross-funcional
- **P&D**: Produtos lançados, projetos realizados
- **RH**: Turnover, eNPS, time to fill
- **Legacy**: Métricas históricas de tráfego e performance

### Funcionalidades Principais

- ✅ Filtro por categoria/setor
- ✅ Filtro por período (Todos, 30, 60, 90 dias)
- ✅ Seleção de indicador específico
- ✅ Cards de KPI com percentual de conclusão
- ✅ Gráfico comparativo mensal (Previsto vs Realizado)
- ✅ Gráfico de evolução agregada
- ✅ Tabela de detalhamento mensal
- ✅ Modo TV para apresentações
- ✅ Modo Fullscreen
- ✅ Design responsivo para mobile, tablet e desktop

---

## 📁 Estrutura de Pastas

```
src/
├── assets/                    # Arquivos estáticos (imagens, fontes)
│
├── components/                # Componentes React reutilizáveis
│   ├── dashboard/             # Componentes específicos do dashboard
│   │   ├── AggregatedEvolutionChart.tsx  # Gráfico de área com evolução agregada
│   │   ├── CategoryFilter.tsx            # Filtro de categorias (chips)
│   │   ├── ComparativeChart.tsx          # Gráfico de barras comparativo
│   │   ├── CompactMetricRow.tsx          # Linha compacta de métrica
│   │   ├── DataTable.tsx                 # Tabela genérica de dados
│   │   ├── DonutChart.tsx                # Gráfico de rosca
│   │   ├── EditableKPICard.tsx           # Card KPI editável
│   │   ├── EditableTable.tsx             # Tabela editável
│   │   ├── ExecutivePanel.tsx            # Painel executivo com resumo
│   │   ├── FloatingControls.tsx          # Controles flutuantes
│   │   ├── GaugeChart.tsx                # Gráfico de gauge/velocímetro
│   │   ├── Header.tsx                    # Cabeçalho do dashboard
│   │   ├── HorizontalBarChart.tsx        # Gráfico de barras horizontais
│   │   ├── IndicatorKPICard.tsx          # Card de KPI com indicador
│   │   ├── IndicatorSelect.tsx           # Dropdown de seleção de indicador
│   │   ├── KPICard.tsx                   # Card básico de KPI
│   │   ├── KPICardNew.tsx                # Card de KPI modernizado
│   │   ├── MainChart.tsx                 # Gráfico principal (linha)
│   │   ├── MetricCard.tsx                # Card de métrica individual
│   │   ├── MetricCardGradient.tsx        # Card com gradiente
│   │   ├── MetricChart.tsx               # Gráfico de área para métricas
│   │   ├── MetricListCard.tsx            # Lista de métricas em card
│   │   ├── MonthlyChart.tsx              # Gráfico mensal
│   │   ├── MonthlyChartCarousel.tsx      # Carrossel de gráficos mensais
│   │   ├── MonthlyDetailTable.tsx        # Tabela detalhada por mês
│   │   ├── PeriodFilter.tsx              # Filtro de período (Todos, 30, 60, 90 dias)
│   │   ├── Sidebar.tsx                   # Menu lateral de navegação
│   │   └── TVCarousel.tsx                # Modo TV com carrossel automático
│   │
│   ├── ui/                    # Componentes UI base (shadcn/ui)
│   │   ├── accordion.tsx      # Acordeão expansível
│   │   ├── alert-dialog.tsx   # Diálogo de alerta
│   │   ├── avatar.tsx         # Avatar de usuário
│   │   ├── badge.tsx          # Badge/etiqueta
│   │   ├── button.tsx         # Botão
│   │   ├── card.tsx           # Card container
│   │   ├── chart.tsx          # Wrapper para charts
│   │   ├── dialog.tsx         # Modal/diálogo
│   │   ├── dropdown-menu.tsx  # Menu dropdown
│   │   ├── input.tsx          # Campo de entrada
│   │   ├── label.tsx          # Label de formulário
│   │   ├── popover.tsx        # Popover/tooltip
│   │   ├── progress.tsx       # Barra de progresso
│   │   ├── scroll-area.tsx    # Área com scroll
│   │   ├── select.tsx         # Select/combobox
│   │   ├── separator.tsx      # Separador visual
│   │   ├── sheet.tsx          # Painel lateral
│   │   ├── skeleton.tsx       # Placeholder de loading
│   │   ├── switch.tsx         # Toggle switch
│   │   ├── table.tsx          # Tabela
│   │   ├── tabs.tsx           # Abas
│   │   ├── toast.tsx          # Notificação toast
│   │   └── tooltip.tsx        # Tooltip
│   │
│   └── NavLink.tsx            # Link de navegação
│
├── data/                      # Dados e constantes
│   └── dashboardData.ts       # Dados das métricas e categorias
│
├── hooks/                     # React hooks customizados
│   ├── use-mobile.tsx         # Detecta se é dispositivo móvel
│   └── use-toast.ts           # Hook para notificações toast
│
├── integrations/              # Integrações externas
│   └── supabase/              # Integração com Supabase
│       ├── client.ts          # Cliente Supabase configurado
│       └── types.ts           # Tipos gerados do banco de dados
│
├── lib/                       # Utilitários
│   └── utils.ts               # Funções utilitárias (cn, formatters)
│
├── pages/                     # Páginas da aplicação
│   ├── Index.tsx              # Página principal do dashboard
│   ├── AreaIndicadores.tsx    # Página de área de indicadores
│   └── NotFound.tsx           # Página 404
│
├── App.css                    # Estilos globais do App
├── App.tsx                    # Componente raiz com rotas
├── index.css                  # Estilos base e tema (Tailwind)
├── main.tsx                   # Entry point da aplicação
└── vite-env.d.ts              # Tipos do Vite

public/
├── favicon.ico                # Ícone da aba do navegador
├── placeholder.svg            # Imagem placeholder
└── robots.txt                 # Configuração para crawlers

supabase/
├── config.toml                # Configuração do Supabase local
└── migrations/                # Migrações do banco de dados
```

---

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Componentes UI acessíveis
- **Recharts** - Biblioteca de gráficos
- **React Router** - Navegação SPA
- **Supabase** - Backend as a Service (banco de dados)
- **Lucide React** - Ícones

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 🎨 Design System

O projeto utiliza um tema escuro customizado com as seguintes cores principais:

- **Background**: Navy escuro (`hsl(220, 45%, 8%)`)
- **Primary**: Roxo vibrante (`hsl(259, 100%, 60%)`) - #6734FF
- **Success**: Verde (`hsl(142, 76%, 45%)`)
- **Warning**: Laranja (`hsl(38, 92%, 55%)`)
- **Destructive**: Vermelho (`hsl(0, 72%, 51%)`)

A tipografia usa a fonte **Outfit** em todos os pesos.

---

## 📱 Responsividade

O dashboard é totalmente responsivo:
- **Mobile**: Layout em coluna única, sidebar colapsável
- **Tablet**: Grid de 2 colunas
- **Desktop**: Grid completo com sidebar fixa

---

## 🔗 Links

- **Preview**: [https://id-preview--3a829e98-64f3-456c-8a1e-6f18951cb6a2.lovable.app](https://id-preview--3a829e98-64f3-456c-8a1e-6f18951cb6a2.lovable.app)
- **Publicado**: [https://elements-dashboard-2025.lovable.app](https://elements-dashboard-2025.lovable.app)

---

## 📄 Licença

Projeto privado - Elements © 2025
