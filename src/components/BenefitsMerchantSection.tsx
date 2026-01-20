import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Clock, CheckCircle2, BarChart3, Users, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const benefits = [
  {
    icon: TrendingUp,
    title: "Mais pedidos em menos tempo",
    description: "Atenda até 3x mais clientes no mesmo período. Sem fila, sem gargalo.",
  },
  {
    icon: Clock,
    title: "Redução drástica de filas",
    description: "Seus clientes não esperam mais. Pedem do celular enquanto você prepara.",
  },
  {
    icon: CheckCircle2,
    title: "Menos erros nos pedidos",
    description: "Chega de anotar errado. O cliente digita exatamente o que quer.",
  },
  {
    icon: Users,
    title: "Organização na cozinha",
    description: "Pedidos chegam organizados e em sequência. Sua equipe trabalha melhor.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e controle",
    description: "Acompanhe vendas, produtos mais pedidos e horários de pico em tempo real.",
  },
  {
    icon: Zap,
    title: "Setup em minutos",
    description: "Cadastre seu menu, imprima o QR Code e comece a receber pedidos hoje.",
  },
];

export const BenefitsMerchantSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comerciantes" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/90" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            Para Comerciantes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Benefícios que <span className="text-gradient">transformam seu negócio</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            O Zero Fila foi criado pensando nos desafios reais de quem trabalha com foodtruck.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card/10 backdrop-blur-lg border border-primary-foreground/10 rounded-2xl p-6 hover:bg-card/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-cta flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary-foreground">{benefit.title}</h3>
              <p className="text-primary-foreground/70">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
