import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: 'Como faço para reservar uma mesa?',
      answer: 'Você pode fazer sua reserva diretamente pelo nosso site clicando no botão "Reservar Mesa", ou nos contatar via WhatsApp. Recomendamos reservas com pelo menos 24h de antecedência para garantir disponibilidade.'
    },
    {
      question: 'Vocês oferecem opções vegetarianas e veganas?',
      answer: 'Sim! Nosso cardápio internacional oferece diversas opções vegetarianas e veganas. Também podemos adaptar pratos mediante solicitação prévia.'
    },
    {
      question: 'As aulas de culinária são para iniciantes?',
      answer: 'Nossas aulas são voltadas para todos os níveis, desde iniciantes até cozinheiros experientes. Cada aula é adaptada ao nível de habilidade dos participantes.'
    },
    {
      question: 'Qual a capacidade para eventos privados?',
      answer: 'Podemos acomodar eventos de 10 a 100 pessoas. Para grupos maiores, consulte nossa equipe para soluções personalizadas de catering e espaços alternativos.'
    },
    {
      question: 'Vocês têm estacionamento?',
      answer: 'Sim, oferecemos estacionamento conveniado com desconto para nossos clientes. Também estamos próximos ao metrô e diversos pontos de ônibus.'
    },
    {
      question: 'É necessário experiência prévia para as aulas de culinária?',
      answer: 'Não! Nossas aulas são projetadas para todos os níveis. Nossos chefs instruem desde técnicas básicas até métodos avançados de culinária internacional.'
    },
    {
      question: 'Vocês oferecem certificados após as aulas?',
      answer: 'Sim, ao completar nossos cursos completos, você recebe um certificado de participação do Mundo Gastronômico.'
    },
    {
      question: 'Qual a política de cancelamento?',
      answer: 'Para reservas de mesa, pedimos cancelamento com pelo menos 6h de antecedência. Para aulas e eventos, a política varia conforme o tipo de serviço. Entre em contato para detalhes.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Não encontrou a resposta que procurava?
            </p>
            <a 
              href="#contact" 
              className="inline-block btn-gold"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
