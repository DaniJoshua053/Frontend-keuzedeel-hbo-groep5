import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function FAQ() {
  const { t } = useLanguage();

  const generalFaqs = [
    {
      question: 'Welke materialen gebruiken jullie voor de vlaggen?',
      answer: 'Al onze vlaggen zijn gemaakt van hoogwaardig polyester dat weerbestendig, kleurvast en duurzaam is voor zowel binnen- als buitengebruik.',
    },
    {
      question: 'Hoe lang duurt de verzending?',
      answer: 'Standaard verzending duurt normaal 2-3 werkdagen binnen Nederland. Internationale bestellingen kunnen 7-14 werkdagen duren afhankelijk van de bestemming.',
    },
    {
      question: 'Bieden jullie gratis verzending aan?',
      answer: 'Ja! We bieden gratis verzending aan op alle bestellingen boven €50. Bestellingen onder €50 hebben een verzendkosten van €5,99.',
    },
    {
      question: 'Zijn de vlaggen geschikt voor buitengebruik?',
      answer: 'Absoluut! Alle vlaggen zijn ontworpen om buitenomstandigheden te weerstaan. Ze zijn gemaakt van weerbestendig polyester met versterkte randen en kleurvaste kleuren.',
    },
  ];

  const flagpoleFaqs = [
    {
      question: 'Welke vlaggenstok heb ik nodig?',
      answer: 'Voor particulier gebruik raden we de 5 meter vlaggenstok aan. Voor bedrijven en verenigingen is de 7 meter stok ideaal. De 9 meter stok is perfect voor grote gebouwen en overheidslocaties.',
    },
    {
      question: 'Zijn de vlaggenstokken makkelijk te installeren?',
      answer: 'Ja! Al onze vlaggenstokken worden geleverd met grondanker en bevestigingsmateriaal. De montage is eenvoudig en kan door één persoon worden gedaan. Een installatiehandleiding is inbegrepen.',
    },
    {
      question: 'Welke vlagformaat past bij welke stok?',
      answer: '5 meter stok: vlaggen tot 150x225cm. 7 meter stok: vlaggen tot 200x300cm. 9 meter stok: vlaggen tot 250x375cm. We adviseren altijd een vlag te kiezen die proportioneel is aan de stokhoogte.',
    },
    {
      question: 'Hebben de vlaggenstokken garantie?',
      answer: 'Ja, alle vlaggenstokken hebben 5 jaar garantie tegen fabricagefouten. Dit dekt materiaal- en constructiegebreken bij normaal gebruik.',
    },
  ];

  const customFaqs = [
    {
      question: 'Hoe werkt het custom vlag ontwerpen?',
      answer: 'Upload uw logo of ontwerp in onze configurator, kies het formaat en materiaal, en wij produceren uw unieke vlag. U ontvangt binnen 24 uur een digitale proof ter goedkeuring voordat we beginnen met produceren.',
    },
    {
      question: 'Welke bestandsformaten accepteren jullie?',
      answer: 'We accepteren JPG, PNG, PDF, AI en EPS bestanden. Voor het beste resultaat raden we vector formaten (AI, EPS) aan met minimaal 300 DPI resolutie.',
    },
    {
      question: 'Hoe lang duurt het om een custom vlag te maken?',
      answer: 'Na goedkeuring van de digitale proof duurt de productie 7-10 werkdagen. U ontvangt een verwachte levertijd nadat u de proof heeft goedgekeurd.',
    },
    {
      question: 'Is er een minimum aantal voor custom vlaggen?',
      answer: 'Nee! We produceren al vanaf 1 custom vlag. Voor grotere aantallen (10+) bieden we volume kortingen aan. Neem contact op voor een offerte.',
    },
    {
      question: 'Kan ik mijn ontwerp nog aanpassen na uploaden?',
      answer: 'Ja, tot het moment dat u de digitale proof goedkeurt, kunt u altijd wijzigingen aanvragen. Na goedkeuring kunnen er geen wijzigingen meer worden aangebracht.',
    },
  ];

  const orderFaqs = [
    {
      question: 'Kan ik mijn bestelling retourneren?',
      answer: 'Ja, we accepteren retourzendingen binnen 30 dagen na aankoop. Het artikel moet ongebruikt zijn en in de originele staat. Zie ons retourbeleid voor meer details. Let op: custom gemaakte vlaggen kunnen niet worden geretourneerd.',
    },
    {
      question: 'Welke betaalmethoden accepteren jullie?',
      answer: 'We accepteren iDEAL, creditcards (Visa, Mastercard, American Express), PayPal en bankoverschrijving voor zakelijke klanten.',
    },
    {
      question: 'Kan ik mijn bestelling volgen?',
      answer: 'Ja! Zodra uw bestelling is verzonden, ontvangt u een trackingnummer via e-mail. U kunt ook de bestelstatus bekijken in uw account onder "Mijn Bestellingen".',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Veelgestelde Vragen</h1>
        <p className="text-muted-foreground">
          Vind antwoorden op de meest gestelde vragen over onze producten en diensten
        </p>
      </div>

      <div className="space-y-8">
        {/* General FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Algemeen</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {generalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`general-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Flagpole FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Vlaggenstokken</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {flagpoleFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`flagpole-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Custom FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Vlaggen</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {customFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`custom-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Order FAQs */}
        <Card>
          <CardHeader>
            <CardTitle>Bestellingen & Betaling</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {orderFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`order-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Contact CTA */}
      <Card className="mt-8 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <CardContent className="p-8 text-center">
          <h3 className="mb-2">Staat uw vraag er niet bij?</h3>
          <p className="text-muted-foreground mb-4">
            Neem gerust contact met ons op. We helpen u graag verder!
          </p>
          <a href="/contact">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition-colors">
              Neem Contact Op
            </button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
