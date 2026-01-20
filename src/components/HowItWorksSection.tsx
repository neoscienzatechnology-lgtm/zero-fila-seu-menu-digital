import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { QrCode, UtensilsCrossed, ShoppingCart, Bell } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    step: "01",
    title: "Escaneie o QR Code",
    description: "O cliente aponta a câmera para o QR Code na sua mesa ou balcão. Em segundos, o menu completo aparece no celular.",
  },
  {
    icon: UtensilsCrossed,
    step: "02",
    title: "Escolha os produtos",
    description: "Menu visual com fotos, descrições e preços. O cliente monta o pedido do jeito que preferir, com calma.",
  },
  {
    icon: ShoppingCart,
    step: "03",
    title: "Faça o pedido",
    description: "Com um toque, o pedido vai direto para sua cozinha. Sem filas, sem erros de anotação, sem confusão.",
  },
  {
    icon: Bell,
    step: "04",
    title: "Retire quando pronto",
    description: "O cliente recebe uma notificação assim que o pedido fica pronto. É só retirar e aproveitar!",
  },
];

export const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="como-funciona" className="py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simples de usar, <span className="text-gradient">poderoso nos resultados</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em 4 passos simples, seu cliente faz o pedido sem sair do lugar. Veja como é fácil:
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number with icon */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-cta flex items-center justify-center shadow-glow">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
