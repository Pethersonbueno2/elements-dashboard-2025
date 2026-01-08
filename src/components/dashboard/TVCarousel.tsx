import { useState, useEffect, memo, useMemo } from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line, AreaChart, Area, RadialBarChart, RadialBar, Legend
} from "recharts";
import { 
  Flag, TrendingUp, TrendingDown, Target, Users, DollarSign, 
  Star, Clock, Package, Truck, Brain, Megaphone, Settings, 
  HeadphonesIcon, ShoppingCart, Globe, BarChart3, Percent,
  Award, AlertTriangle, CheckCircle2, Zap, X
} from "lucide-react";
import { type Metric } from "@/data/dashboardData";
import { Button } from "@/components/ui/button";

interface TVCarouselProps {
  metrics: Metric[];
  slideIntervalMs?: number;
  summaryIntervalMs?: number;
  categoria?: string;
  onExitTVMode?: () => void;
}

// Category icon mapping
const getCategoryIcon = (categoria: string, size = "w-10 h-10") => {
  const icons: Record<string, React.ReactNode> = {
    "Atendimento": <HeadphonesIcon className={size} />,
    "B2B e B2BC": <ShoppingCart className={size} />,
    "B2C Digital": <Globe className={size} />,
    "Marketing Growth": <TrendingUp className={size} />,
    "Marketing Branding": <Megaphone className={size} />,
    "Financeiro": <DollarSign className={size} />,
    "Operações": <Settings className={size} />,
    "Compras internacionais": <Package className={size} />,
    "Logística": <Truck className={size} />,
    "RH": <Users className={size} />,
    "P&D": <Brain className={size} />,
    "Legacy": <BarChart3 className={size} />,
  };
  return icons[categoria] || <Target className={size} />;
};

// Metric specific icon
const getMetricIcon = (metricId: string, categoria: string) => {
  const size = "w-10 h-10";
  if (metricId.includes("satisfacao") || metricId.includes("nps")) return <Star className={size} />;
  if (metricId.includes("tempo") || metricId.includes("ciclo") || metricId.includes("prazo")) return <Clock className={size} />;
  if (metricId.includes("receita") || metricId.includes("faturamento") || metricId.includes("ticket")) return <DollarSign className={size} />;
  if (metricId.includes("taxa") || metricId.includes("conversao")) return <Percent className={size} />;
  if (metricId.includes("reputacao")) return <Award className={size} />;
  if (metricId.includes("churn") || metricId.includes("ruptura")) return <AlertTriangle className={size} />;
  if (metricId.includes("cliente") || metricId.includes("base")) return <Users className={size} />;
  return getCategoryIcon(categoria, size);
};

// Helper to get metric data
const getMetricData = (metric: Metric) => {
  const lastWithData = [...metric.dados].reverse().find((d) => d.realizado !== null);
  const previsto = lastWithData?.previsto || 0;
  const realizado = lastWithData?.realizado || 0;
  const concluido = lastWithData?.concluido || 0;
  const diferenca = lastWithData?.diferenca || 0;
  const mes = lastWithData?.mes || "—";
  const isBelowTarget = realizado === 0 || concluido < 100;
  
  return { previsto, realizado, concluido, diferenca, mes, isBelowTarget };
};

// Format value based on metric type
const formatValue = (value: number, metricId: string) => {
  if (metricId.includes("receita") || metricId.includes("faturamento")) {
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `R$ ${(value / 1000).toFixed(1)}K`;
    return `R$ ${value.toFixed(0)}`;
  }
  if (metricId.includes("taxa") || metricId.includes("margem") || metricId.includes("base") || metricId.includes("satisfacao") || metricId.includes("conversao") || metricId.includes("churn")) {
    return `${value.toFixed(1)}%`;
  }
  if (metricId.includes("ticket")) {
    return `R$ ${(value / 1000).toFixed(1)}K`;
  }
  if (metricId.includes("reputacao") || metricId.includes("nps")) {
    return value.toFixed(1);
  }
  if (metricId.includes("tempo") || metricId.includes("prazo") || metricId.includes("ciclo")) {
    return `${value.toFixed(1)} dias`;
  }
  return value.toLocaleString("pt-BR");
};

// ==============================
// GAUGE CHART - For satisfaction, NPS, reputation
// ==============================
const GaugeSlide = memo(({ metric }: { metric: Metric }) => {
  const { previsto, realizado, concluido, mes, isBelowTarget } = getMetricData(metric);
  const percentage = Math.min(Math.max(concluido, 0), 150);
  
  const gaugeData = [
    { name: "value", value: percentage, fill: isBelowTarget ? "#EF4444" : "#22C55E" },
    { name: "empty", value: Math.max(0, 150 - percentage), fill: "#1E293B" }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white">
        {getMetricIcon(metric.id, metric.categoria)}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center leading-tight">{metric.nome}</h1>
      </div>
      
      <p className="text-slate-400 text-xl lg:text-2xl xl:text-3xl">{metric.categoria} • {mes}</p>
      
      <div className="relative w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="60%" 
            outerRadius="100%" 
            data={gaugeData} 
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
          <span className={`text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {formatValue(realizado, metric.id)}
          </span>
          <span className="text-slate-400 text-xl lg:text-2xl xl:text-3xl mt-4">de {formatValue(previsto, metric.id)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-3xl lg:text-4xl xl:text-5xl font-bold">
        {isBelowTarget ? (
          <>
            <TrendingDown className="w-12 h-12 lg:w-16 lg:h-16 text-red-500" />
            <span className="text-red-500">{concluido.toFixed(1)}% da meta</span>
          </>
        ) : (
          <>
            <TrendingUp className="w-12 h-12 lg:w-16 lg:h-16 text-green-500" />
            <span className="text-green-500">{concluido.toFixed(1)}% da meta</span>
          </>
        )}
      </div>
    </div>
  );
});
GaugeSlide.displayName = "GaugeSlide";

// ==============================
// BAR COMPARISON - For revenue, targets
// ==============================
const BarComparisonSlide = memo(({ metric }: { metric: Metric }) => {
  const chartData = metric.dados
    .filter(d => d.previsto !== null)
    .map(d => ({
      mes: d.mes.substring(0, 3),
      previsto: d.previsto || 0,
      realizado: d.realizado || 0,
    }));

  const { realizado, previsto, concluido, mes, isBelowTarget } = getMetricData(metric);

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white">
        {getMetricIcon(metric.id, metric.categoria)}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center leading-tight">{metric.nome}</h1>
      </div>
      
      <div className="flex gap-12 lg:gap-16 text-center">
        <div>
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl">Meta</p>
          <p className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold">{formatValue(previsto, metric.id)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl">Realizado</p>
          <p className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {formatValue(realizado, metric.id)}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl">% Concluído</p>
          <p className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {concluido.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="w-full h-[45vh] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="mes" stroke="#94A3B8" fontSize={18} tick={{ fontSize: 18 }} />
            <YAxis stroke="#94A3B8" fontSize={18} tick={{ fontSize: 18 }} tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(0)}M` : v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1E293B", border: "none", borderRadius: "8px", fontSize: 18 }}
              labelStyle={{ color: "#F1F5F9" }}
              formatter={(value: number) => [formatValue(value, metric.id), ""]}
            />
            <Bar dataKey="previsto" name="Meta" fill="#6366F1" radius={[8, 8, 0, 0]} />
            <Bar dataKey="realizado" name="Realizado" fill="#22C55E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-12 text-xl lg:text-2xl">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
          <span className="text-slate-300">Meta</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 rounded-full bg-green-500"></div>
          <span className="text-slate-300">Realizado</span>
        </div>
      </div>
    </div>
  );
});
BarComparisonSlide.displayName = "BarComparisonSlide";

// ==============================
// TREND LINE - For growth metrics
// ==============================
const TrendLineSlide = memo(({ metric }: { metric: Metric }) => {
  const chartData = metric.dados.map(d => ({
    mes: d.mes.substring(0, 3),
    valor: d.realizado || 0,
    meta: d.previsto || 0,
    concluido: d.concluido || 0,
  }));

  const { realizado, concluido, mes, isBelowTarget } = getMetricData(metric);
  const trend = chartData.length > 1 
    ? chartData[chartData.length - 1].valor - chartData[chartData.length - 2].valor 
    : 0;

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white">
        {getMetricIcon(metric.id, metric.categoria)}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center leading-tight">{metric.nome}</h1>
      </div>
      
      <div className="flex items-center gap-5 mt-4">
        <span className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white">{formatValue(realizado, metric.id)}</span>
        {trend >= 0 ? (
          <div className="flex items-center gap-3 text-green-500 bg-green-500/20 px-6 py-3 rounded-full">
            <TrendingUp className="w-10 h-10" />
            <span className="font-semibold text-2xl lg:text-3xl">+{formatValue(Math.abs(trend), metric.id)}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-red-500 bg-red-500/20 px-6 py-3 rounded-full">
            <TrendingDown className="w-10 h-10" />
            <span className="font-semibold text-2xl lg:text-3xl">{formatValue(Math.abs(trend), metric.id)}</span>
          </div>
        )}
      </div>

      <div className="w-full h-[40vh] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6734FF" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#6734FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="mes" stroke="#94A3B8" fontSize={18} tick={{ fontSize: 18 }} />
            <YAxis stroke="#94A3B8" fontSize={18} tick={{ fontSize: 18 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1E293B", border: "none", borderRadius: "8px", fontSize: 18 }}
              labelStyle={{ color: "#F1F5F9" }}
            />
            <Area 
              type="monotone" 
              dataKey="valor" 
              stroke="#6734FF" 
              strokeWidth={4}
              fill="url(#colorValor)" 
            />
            <Line 
              type="monotone" 
              dataKey="meta" 
              stroke="#94A3B8" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className={`text-2xl lg:text-3xl xl:text-4xl font-semibold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
        {concluido.toFixed(1)}% da meta • {mes}
      </div>
    </div>
  );
});
TrendLineSlide.displayName = "TrendLineSlide";

// ==============================
// BIG NUMBER - For simple KPIs
// ==============================
const BigNumberSlide = memo(({ metric }: { metric: Metric }) => {
  const { previsto, realizado, concluido, diferenca, mes, isBelowTarget } = getMetricData(metric);
  
  const percentage = Math.min(concluido, 100);
  
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white">
        {getMetricIcon(metric.id, metric.categoria)}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center leading-tight">{metric.nome}</h1>
      </div>
      
      <p className="text-slate-400 text-xl lg:text-2xl xl:text-3xl">{metric.categoria} • {mes}</p>
      
      <div className="relative">
        <div className={`text-[100px] lg:text-[140px] xl:text-[180px] 2xl:text-[220px] font-black leading-none ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
          {formatValue(realizado, metric.id)}
        </div>
        {isBelowTarget ? (
          <TrendingDown className="absolute -right-16 top-1/2 -translate-y-1/2 w-20 h-20 lg:w-28 lg:h-28 text-red-500 animate-bounce" />
        ) : (
          <TrendingUp className="absolute -right-16 top-1/2 -translate-y-1/2 w-20 h-20 lg:w-28 lg:h-28 text-green-500 animate-bounce" />
        )}
      </div>
      
      <div className="w-full max-w-3xl h-6 lg:h-8 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 rounded-full ${isBelowTarget ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-green-600 to-emerald-400"}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="flex gap-16 lg:gap-24 mt-6">
        <div className="text-center">
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl uppercase">Meta</p>
          <p className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold">{formatValue(previsto, metric.id)}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl uppercase">Diferença</p>
          <p className={`text-4xl lg:text-5xl xl:text-6xl font-bold ${diferenca >= 0 ? "text-green-500" : "text-red-500"}`}>
            {diferenca >= 0 ? "+" : ""}{formatValue(diferenca, metric.id)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl uppercase">Concluído</p>
          <p className={`text-4xl lg:text-5xl xl:text-6xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {concluido.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
});
BigNumberSlide.displayName = "BigNumberSlide";

// ==============================
// DONUT PROGRESS - General purpose
// ==============================
const DonutProgressSlide = memo(({ metric }: { metric: Metric }) => {
  const { previsto, realizado, concluido, mes, isBelowTarget } = getMetricData(metric);
  
  const percentage = Math.min(concluido, 100);
  const remaining = Math.max(0, 100 - percentage);
  const pieData = [
    { name: "Realizado", value: percentage },
    { name: "Restante", value: remaining },
  ];
  
  const mainColor = isBelowTarget ? "#EF4444" : "#22C55E";

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white">
        {getMetricIcon(metric.id, metric.categoria)}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center leading-tight">{metric.nome}</h1>
      </div>
      
      <p className="text-slate-400 text-xl lg:text-2xl xl:text-3xl">{metric.categoria} • {mes}</p>

      <div className="relative">
        <PieChart width={500} height={500}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={150}
            outerRadius={230}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
            isAnimationActive={true}
          >
            <Cell fill={mainColor} />
            <Cell fill="#334155" />
          </Pie>
        </PieChart>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-7xl lg:text-8xl xl:text-9xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {concluido.toFixed(0)}%
          </span>
          <span className="text-slate-400 text-xl lg:text-2xl xl:text-3xl mt-2">concluído</span>
        </div>
      </div>

      <div className="flex gap-16 lg:gap-24 mt-6">
        <div className="text-center">
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl uppercase tracking-wide">Meta</p>
          <p className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold">{formatValue(previsto, metric.id)}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-lg lg:text-xl xl:text-2xl uppercase tracking-wide">Realizado</p>
          <p className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
            {formatValue(realizado, metric.id)}
          </p>
        </div>
      </div>
    </div>
  );
});
DonutProgressSlide.displayName = "DonutProgressSlide";

// ==============================
// SUMMARY GRID - Category overview
// ==============================
const SummarySlide = memo(({ metrics, categoria }: { metrics: Metric[]; categoria?: string }) => {
  const achievedCount = metrics.filter(m => {
    const data = getMetricData(m);
    return !data.isBelowTarget;
  }).length;
  
  const avgCompletion = metrics.reduce((acc, m) => {
    return acc + (getMetricData(m).concluido || 0);
  }, 0) / (metrics.length || 1);

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 p-12 lg:p-16">
      <div className="flex items-center gap-6 text-white mb-4">
        {categoria && getCategoryIcon(categoria, "w-14 h-14")}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-center">
          {categoria || "Resumo Geral"}
        </h1>
      </div>
      
      <div className="flex gap-8 lg:gap-12 mb-6">
        <div className="bg-slate-800/50 rounded-2xl px-8 py-5 text-center">
          <p className="text-slate-400 text-lg lg:text-xl">Total</p>
          <p className="text-white text-4xl lg:text-5xl font-bold">{metrics.length}</p>
        </div>
        <div className="bg-green-500/20 rounded-2xl px-8 py-5 text-center">
          <p className="text-green-400 text-lg lg:text-xl">Atingidas</p>
          <p className="text-green-500 text-4xl lg:text-5xl font-bold">{achievedCount}</p>
        </div>
        <div className="bg-red-500/20 rounded-2xl px-8 py-5 text-center">
          <p className="text-red-400 text-lg lg:text-xl">Pendentes</p>
          <p className="text-red-500 text-4xl lg:text-5xl font-bold">{metrics.length - achievedCount}</p>
        </div>
        <div className="bg-purple-500/20 rounded-2xl px-8 py-5 text-center">
          <p className="text-purple-400 text-lg lg:text-xl">Média</p>
          <p className="text-purple-500 text-4xl lg:text-5xl font-bold">{avgCompletion.toFixed(0)}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-7xl overflow-auto max-h-[45vh]">
        {metrics.map((metric) => {
          const { concluido, isBelowTarget } = getMetricData(metric);
          
          return (
            <div 
              key={metric.id} 
              className={`rounded-xl p-5 flex items-center gap-4 ${isBelowTarget ? "bg-red-500/10 border border-red-500/30" : "bg-green-500/10 border border-green-500/30"}`}
            >
              <div className={`p-3 rounded-lg ${isBelowTarget ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}>
                {isBelowTarget ? <AlertTriangle className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-base lg:text-lg font-medium truncate">{metric.nome}</h3>
                <p className={`text-2xl lg:text-3xl font-bold ${isBelowTarget ? "text-red-500" : "text-green-500"}`}>
                  {concluido.toFixed(0)}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
SummarySlide.displayName = "SummarySlide";

// ==============================
// Determine slide type based on metric
// ==============================
const getSlideType = (metric: Metric): "gauge" | "bar" | "trend" | "number" | "donut" => {
  const id = metric.id.toLowerCase();
  const cat = metric.categoria.toLowerCase();
  
  // Satisfaction, NPS, reputation -> Gauge
  if (id.includes("satisfacao") || id.includes("nps") || id.includes("reputacao") || id.includes("enps")) {
    return "gauge";
  }
  
  // Revenue, billing -> Bar comparison
  if (id.includes("receita") || id.includes("faturamento") || id.includes("ebitda")) {
    return "bar";
  }
  
  // Growth, trends -> Area/Line
  if (id.includes("crescimento") || id.includes("roas") || id.includes("cohort") || id.includes("ltv")) {
    return "trend";
  }
  
  // Time, days, cycles -> Big number
  if (id.includes("tempo") || id.includes("prazo") || id.includes("ciclo") || id.includes("time")) {
    return "number";
  }
  
  // Conversion rates, percentages -> Donut
  if (id.includes("taxa") || id.includes("conversao") || id.includes("margem") || id.includes("churn")) {
    return "donut";
  }
  
  // Default by category
  if (cat.includes("financeiro")) return "bar";
  if (cat.includes("rh")) return "gauge";
  if (cat.includes("marketing")) return "trend";
  if (cat.includes("logística") || cat.includes("logistica")) return "number";
  
  return "donut";
};

// ==============================
// MAIN CAROUSEL
// ==============================
export const TVCarousel = ({ 
  metrics, 
  slideIntervalMs = 15000,
  summaryIntervalMs = 30000,
  categoria,
  onExitTVMode
}: TVCarouselProps) => {
  const totalSlides = metrics.length + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Math.floor(slideIntervalMs / 1000));
  
  const isSummarySlide = currentIndex === metrics.length;
  const currentInterval = isSummarySlide ? summaryIntervalMs : slideIntervalMs;

  useEffect(() => {
    setTimeLeft(Math.floor(currentInterval / 1000));
    
    const countdown = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, currentInterval]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, currentInterval);

    return () => clearTimeout(timeout);
  }, [currentIndex, totalSlides, currentInterval]);

  const currentMetric = !isSummarySlide ? metrics[currentIndex] : null;

  const renderSlide = () => {
    if (isSummarySlide) {
      return <SummarySlide metrics={metrics} categoria={categoria} />;
    }
    
    if (!currentMetric) return null;
    
    const slideType = getSlideType(currentMetric);
    
    switch (slideType) {
      case "gauge":
        return <GaugeSlide metric={currentMetric} />;
      case "bar":
        return <BarComparisonSlide metric={currentMetric} />;
      case "trend":
        return <TrendLineSlide metric={currentMetric} />;
      case "number":
        return <BigNumberSlide metric={currentMetric} />;
      case "donut":
      default:
        return <DonutProgressSlide metric={currentMetric} />;
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Exit button - always visible */}
      {onExitTVMode && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onExitTVMode}
          className="absolute top-6 right-6 z-50 bg-slate-800/80 hover:bg-slate-700 text-white w-14 h-14 rounded-full"
        >
          <X className="w-8 h-8" />
        </Button>
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center">
        {renderSlide()}
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-800/50 backdrop-blur-sm py-5 px-10 flex items-center justify-between">
        {/* Progress dots */}
        <div className="flex gap-3">
          {[...Array(totalSlides)].map((_, idx) => (
            <div
              key={idx}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? idx === metrics.length 
                    ? "w-12 bg-purple-500" 
                    : "w-12 bg-primary"
                  : "w-3 bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Timer and category */}
        <div className="flex items-center gap-6 text-slate-400">
          {categoria && (
            <span className="text-xl lg:text-2xl font-medium text-white">{categoria}</span>
          )}
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6" />
            <span className="text-lg lg:text-xl">
              {isSummarySlide 
                ? `Resumo • ${timeLeft}s`
                : `${currentIndex + 1}/${metrics.length} • ${timeLeft}s`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
