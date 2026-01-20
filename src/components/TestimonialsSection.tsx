import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Dono do Burger Truck",
    avatar: "CS",
    content: "Desde que comecei a usar o Zero Fila, minhas vendas aumentaram 35%. Os clientes adoram não precisar esperar na fila!",
    rating: 5,
  },
  {
    name: "Ana Santos",
    role: "Proprietária do Taco Loco",
    avatar: "AS",
    content: "O sistema é super fácil de usar. Cadastrei meu cardápio em 10 minutos e já estava recebendo pedidos. Recomendo demais!",
    rating: 5,
  },
  {
    name: "Roberto Oliveira",
    role: "Foodtruck Açaí do Rob",
    avatar: "RO",
    content: "Perfeito para eventos! No último festival, atendi o dobro de clientes sem nenhuma confusão. Zero Fila salvou meu negócio.",
    rating: 5,
  },
];

const partners = [
  "FoodTruck Brasil",
  "Feira Gastronômica SP",
  "Street Food Festival",
  "Rota dos Trucks",
  "Sabor na Rua",
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que dizem quem <span className="text-gradient">já usa o Zero Fila</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comerciantes de todo o Brasil estão transformando seus negócios.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border shadow-card"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-cta flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partners placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Parceiros e eventos que confiam no Zero Fila{" "}
            <span className="text-xs opacity-60">(placeholder)</span>
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 rounded-lg bg-muted text-muted-foreground font-medium text-sm"
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
