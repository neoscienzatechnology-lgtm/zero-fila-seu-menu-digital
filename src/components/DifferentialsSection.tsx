import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, Smartphone, Globe, Sparkles, MapPin, Download } from "lucide-react";

const differentials = [
  {
    icon: Truck,
    title: "Foco em foodtrucks",
    description: "Desenvolvido especialmente para foodtrucks e comércios de rua. Entendemos seus desafios.",
  },
  {
    icon: Sparkles,
    title: "Interface simples",
    description: "Seu cliente não precisa de tutorial. Menu intuitivo que qualquer pessoa sabe usar.",
  },
  {
    icon: Smartphone,
    title: "Funciona em qualquer celular",
    description: "Android, iPhone, tablets. Se tem navegador e internet, funciona.",
  },
  {
    icon: Download,
    title: "Não precisa instalar app",
    description: "Acesso direto pelo navegador. Sem ocupar memória do celular do cliente.",
  },
  {
    icon: MapPin,
    title: "Ideal para eventos e feiras",
    description: "Perfeito para ambientes com muito movimento e pouco tempo.",
  },
  {
    icon: Globe,
    title: "100% online",
    description: "Atualize seu menu em tempo real de qualquer lugar. Funciona 24/7.",
  },
];

export const DifferentialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="vantagens" className="py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Diferenciais
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que escolher o <span className="text-gradient">Zero Fila</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais do que um cardápio digital. Uma solução completa para você vender mais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-elevated"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-cta opacity-5 rounded-bl-full" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-5 group-hover:bg-gradient-cta transition-colors">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
