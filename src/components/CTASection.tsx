import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-foreground/20 mb-8"
          >
            <Zap className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
            Pronto para acabar com as filas e vender mais?
          </h2>
          
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Junte-se a centenas de comerciantes que já transformaram seus negócios com o Zero Fila. 
            Comece gratuitamente hoje!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="heroOutline" size="xl" className="group text-lg">
              Quero eliminar as filas agora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="mt-8 text-primary-foreground/60 text-sm">
            ✓ Sem cartão de crédito &nbsp;&nbsp; ✓ Setup em 5 minutos &nbsp;&nbsp; ✓ Suporte em português
          </p>
        </motion.div>
      </div>
    </section>
  );
};
