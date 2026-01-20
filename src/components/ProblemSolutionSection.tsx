import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, AlertTriangle, TrendingDown, Smartphone, CreditCard, Package } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Filas intermináveis",
    description: "Clientes desistem de esperar e vão embora, você perde vendas todos os dias.",
  },
  {
    icon: AlertTriangle,
    title: "Pedidos confusos",
    description: "Anotações erradas, pedidos trocados e clientes insatisfeitos.",
  },
  {
    icon: TrendingDown,
    title: "Faturamento limitado",
    description: "Com filas, você atende menos clientes e limita seu potencial de ganho.",
  },
];

const solutions = [
  {
    icon: Smartphone,
    title: "Pedido pelo celular",
    description: "Cliente escaneia o QR Code e faz o pedido direto do celular, sem precisar esperar.",
  },
  {
    icon: CreditCard,
    title: "Pagamento facilitado",
    description: "Pix, cartão ou dinheiro. O cliente escolhe e você recebe na hora.",
  },
  {
    icon: Package,
    title: "Retirada sem espera",
    description: "Cliente é notificado quando o pedido está pronto. Chega, retira e vai embora feliz.",
  },
];

export const ProblemSolutionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            O Problema
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Filas afastam clientes e <span className="text-destructive">limitam suas vendas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo dia você perde clientes que não querem esperar. E os que esperam, ficam frustrados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-destructive/20 rounded-2xl p-6 shadow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            A Solução
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zero Fila: <span className="text-gradient">pedidos digitais que funcionam</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Um sistema simples que transforma a experiência do seu cliente e aumenta suas vendas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-card border border-primary/20 rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-cta flex items-center justify-center mb-4">
                <solution.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
              <p className="text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
