import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const ScubaReview: React.FC = () => {
  const navigate = useNavigate();
  const bookingUrl = '/booking?item=Scuba%20Review%20Course&type=course&price=2500&currency=THB';

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-72 md:h-96 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/review/REVIEW.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl md:text-5xl font-bold">Scuba Review-cursus</h1>
          <p className="mt-4 max-w-2xl">Fris je duikvaardigheden en kennis op met onze complete opfriscursus.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate(bookingUrl)}>Boek Scuba Review</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Cursusoverzicht</h2>
            <p className="mb-6">De Scuba Review-cursus is bedoeld voor gebrevetteerde duikers die hun vaardigheden willen opfrissen, hun kennis willen bijwerken of zich willen voorbereiden op gevorderde trainingen. Deze cursus behandelt essentiële duikprincipes, veiligheidsprocedures en praktische vaardigheden zodat je weer zelfverzekerd en bekwaam onder water bent.</p>

            <h3 className="text-xl font-semibold mb-3">Wat je herhaalt</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Opbouw en onderhoud van duikuitrusting</li>
              <li>Duikplanning en noodprocedures</li>
              <li>Drijfvermogen en trim</li>
              <li>Onderwatercommunicatie en navigatie</li>
              <li>Decompressietheorie en veiligheidsstops</li>
              <li>Herkenning van onderwaterleven en natuurbehoud</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Voor wie deze cursus is</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Duikers die recent niet hebben gedoken</li>
              <li>Duikers die zich voorbereiden op gevorderde cursussen</li>
              <li>Duikers die hun vaardigheden willen verbeteren</li>
              <li>Iedereen die meer zelfvertrouwen wil opbouwen</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Voordelen van de cursus</h3>
            <p className="mb-6">Met deze cursus houd je je vaardigheden op peil, leer je over updates in uitrusting en blijf je bij met actuele duikbest practices. Het is ook een uitstekende manier om te voldoen aan vereisten voor vervolgopleidingen.</p>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cursusdetails</CardTitle>
                  <Badge>Opfriscursus</Badge>
                </div>
                <CardDescription>1-2 dagen · Theorie en praktijkherhaling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿2,500</p>
                <p className="text-sm text-muted-foreground mb-4">Inclusief lesmateriaal en begeleide oefenduiken</p>
                <Button onClick={() => navigate(bookingUrl)}>Boek opfriscursus</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScubaReview;