import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Básico",
    description: "Ideal para começar a testar o Zero Fila",
    price: "Grátis",
    period: "para sempre",
    highlighted: false,
    features: [
      "1 cardápio digital",
      "Até 20 produtos",
      "QR Code personalizado",
      "Pedidos ilimitados",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
  },
  {
    name: "Profissional",
    description: "Para quem quer crescer de verdade",
    price: "R$ 49",
    period: "/mês",
    highlighted: true,
    features: [
      "Cardápios ilimitados",
      "Produtos ilimitados",
      "QR Code personalizado",
      "Notificações por WhatsApp",
      "Relatórios de vendas",
      "Múltiplos colaboradores",
      "Suporte prioritário",
    ],
    cta: "Começar Agora",
  },
  {
    name: "Premium",
    description: "Solução completa para redes e franquias",
    price: "R$ 99",
    period: "/mês",
    highlighted: false,
    features: [
      "Tudo do Profissional",
      "Múltiplos pontos de venda",
      "API de integração",
      "Painel administrativo avançado",
      "Relatórios personalizados",
      "Gerente de conta dedicado",
      "Onboarding VIP",
    ],
    cta: "Falar com Vendas",
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="planos" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Planos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o plano ideal para{" "}
            <span className="text-gradient">seu negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece grátis e evolua conforme seu negócio cresce. Sem compromisso.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? "bg-gradient-cta text-primary-foreground shadow-glow scale-105"
                  : "bg-card border border-border shadow-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-foreground text-background text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "heroOutline" : "cta"}
                size="lg"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
