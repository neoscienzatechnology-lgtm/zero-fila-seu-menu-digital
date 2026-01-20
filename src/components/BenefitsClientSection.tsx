import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Clock, Eye, Smile } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Pedido rápido",
    description: "Faça seu pedido em segundos, direto do seu celular. Sem complicação.",
  },
  {
    icon: Clock,
    title: "Sem filas",
    description: "Esqueça aquela fila enorme debaixo do sol. Peça de qualquer lugar.",
  },
  {
    icon: Eye,
    title: "Menu claro e visual",
    description: "Veja fotos dos pratos, leia descrições e escolha com calma.",
  },
  {
    icon: Smile,
    title: "Experiência melhor",
    description: "Receba notificação quando seu pedido ficar pronto. Chegue e retire!",
  },
];

export const BenefitsClientSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="clientes" className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
              Para Clientes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Uma experiência de compra{" "}
              <span className="text-gradient">muito melhor</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Seus clientes merecem praticidade. Com o Zero Fila, eles fazem pedidos sem estresse 
              e você ganha clientes mais satisfeitos e fiéis.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-cta flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl shadow-elevated p-8 border border-border">
              {/* Mock conversation */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center text-primary-foreground text-xl">
                    🍔
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm">Seu pedido foi recebido! Estamos preparando com carinho. ❤️</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center text-primary-foreground text-xl">
                    🍔
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm font-semibold text-primary">🔔 Pedido #42 pronto!</p>
                    <p className="text-sm mt-1">Pode vir retirar no balcão. Bom apetite!</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 max-w-xs">
                    <p className="text-sm">Obrigado! Chegando aí! 🏃‍♂️</p>
                  </div>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-cta rounded-2xl opacity-20 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
