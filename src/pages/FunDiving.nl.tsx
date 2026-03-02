import Contact from '../components/Contact';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fish, Waves, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { tryAutoScroll, scrollToWithOffset } from '@/lib/scroll';

const FunDiving = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const diveSites = [
    {
      name: "Sail Rock",
      path: '/dive-sites/sail-rock',
      description: "Top diepduiklocatie met grote visscholen, walvishaaien en reuzenbarracuda.",
      depth: "18-40m",
      highlights: ["Walvishaaien", "Reuzenbarracuda", "Malabar tandbaars"]
    },
    {
      name: "Chumphon Pinnacles",
      path: '/dive-sites/chumphon-pinnacle',
      description: "Granieten rotspieken met uitstekende kans op walvishaaien en grote scholen trevally.",
      depth: "15-30m",
      highlights: ["Walvishaaien", "Scholen trevally", "Adelaarsroggen"]
    },
    {
      name: "Japanese Gardens",
      path: '/dive-sites/japanese-gardens',
      description: "Divers koraalrif met kleurrijk onderwaterleven en doorgangen.",
      depth: "12-25m",
      highlights: ["Roze staarttrekker", "Gevlekte adelaarsrog", "Kleurrijk koraal"]
    },
    {
      name: "Mango Bay",
      path: '/dive-sites/mango-bay',
      description: "Ondiepe koraalriffen, perfect voor ontspannen duiken met veel onderwaterleven.",
      depth: "5-18m",
      highlights: ["Kleurrijk koraal", "Tropische vissen", "Zeegrasvelden"]
    }
  ];

  const allDiveSites = [
    { name: 'Sail Rock', path: '/dive-sites/sail-rock' },
    { name: 'Chumphon Pinnacle', path: '/dive-sites/chumphon-pinnacle' },
    { name: 'Japanese Gardens', path: '/dive-sites/japanese-gardens' },
    { name: 'HTMS Sattakut', path: '/dive-sites/htms-sattakut' },
    { name: 'Twins Pinnacle', path: '/dive-sites/twins-pinnacle' },
    { name: 'Shark Island', path: '/dive-sites/shark-island' },
    { name: 'Mango Bay', path: '/dive-sites/mango-bay' },
  ];

  const marineLife = [
    { name: "Walvishaaien", description: "Zachte reuzen die vaak te zien zijn bij Sail Rock en Chumphon Pinnacle" },
    { name: "Rifinktvis", description: "Kleurrijke koppotigen die vaak in dieper water worden gezien" },
    { name: "Gemarmerde octopus", description: "Kleine maar fascinerende dieren in macro-omgevingen" },
    { name: "Diverse rifvissen", description: "Kleurrijke scholen en unieke rifsoorten" }
  ];

  // Helper for smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const location = useLocation();

  const getTabForAnchor = (anchor: string) => {
    switch (anchor) {
      case 'world-class-dive-sites':
      case 'sites':
        return 'sites';
      case 'schedule':
      case 'pricing':
        return 'schedule';
      case 'requirements':
        return 'requirements';
      case 'tips':
        return 'tips';
      case 'booking':
        return 'booking';
      case 'fun-dive-main':
      default:
        return 'overview';
    }
  };

  useEffect(() => {
    const fromStorage = sessionStorage.getItem('scrollTo');
    const hashAnchor = location.hash ? location.hash.replace('#', '') : null;
    const anchor = fromStorage || hashAnchor;
    if (anchor) {
      const targetTab = getTabForAnchor(anchor);
      setActiveTab(targetTab);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          tryAutoScroll(anchor);
        });
      });
      try { sessionStorage.removeItem('scrollTo'); } catch (_) {}
    } else {
      setActiveTab('overview');
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/photo-1682687982423-295485af248a.avif')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Fun Diving Koh Tao</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Beleef het beste van de onderwaterwereld van Koh Tao met onze professioneel begeleide fun dive trips.
            Ontdek kleurrijke koraalriffen, ontmoet bijzonder onderwaterleven en maak onvergetelijke herinneringen.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg"
              onClick={() => {
                // If already on this page, smooth scroll with offset. Otherwise request anchor and navigate here.
                const el = document.getElementById('fun-dive-tabs');
                if (el) {
                  scrollToWithOffset('fun-dive-tabs');
                } else {
                  try { sessionStorage.setItem('scrollTo', 'fun-dive-tabs'); } catch (_) {}
                  navigate('/fun-diving-koh-tao');
                }
              }}
            >
              Ga fun diven op Koh Tao
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" onClick={() => { try{ sessionStorage.setItem('scrollTo','course-openWater') }catch(_){ } ; navigate('/courses'); }}>Boek een cursus</Button>
          </div>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div id="fun-dive-tabs" className="max-w-6xl mx-auto px-4 py-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview">Overzicht</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="sites">Locaties</TabsTrigger>
            <TabsTrigger value="marine">Marien</TabsTrigger>
            <TabsTrigger value="schedule">Schema</TabsTrigger>
            <TabsTrigger value="requirements">Vereisten</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="booking">Boeken</TabsTrigger>
          </TabsList>
        </div>

        {/* Introduction */}
        <TabsContent value="overview" className="transition-none">
          <section id="fun-dive-main" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Waar je kunt fun diven in Thailand</h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Koh Tao biedt dit en meer op een grote variatie aan duiklocaties, van ondiepe koraalriffen
                  tot dieper gelegen granieten pinnacles. Ons ervaren duikteam zorgt voor een
                  persoonlijke, ontspannen en plezierige fun dive-ervaring afgestemd op jouw niveau.
                </p>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Trips & Programs */}
        <TabsContent value="trips" className="transition-none">
          <section className="py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8">Trips & programma's</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <img src="/images/photo-1682687982423-295485af248a.avif" alt="Fun Dive" className="w-full h-40 object-cover" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Fun Dive</CardTitle>
                      <Badge>Recreatief</Badge>
                    </div>
                    <CardDescription>Duur: Halve dag — 2 duiken</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Begeleide duiken naar nabijgelegen riffen — geschikt voor gebrevetteerde duikers van elk niveau.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Ervaren PADI-gidsen</li>
                      <li>Premium uitrusting</li>
                      <li>Maximaal 4 duikers per gids</li>
                    </ul>
                          <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Fun Dive')}&type=dive&deposit=500&currency=THB`); }}>Informatie / Boeken</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <img src="/images/photo-1659518893171-b15e20a8e201.avif" alt="Discover Scuba" className="w-full h-40 object-cover" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Discover Scuba (Try Dive)</CardTitle>
                      <Badge>Beginner</Badge>
                    </div>
                    <CardDescription>Duur: Halve dag — korte introductieduik</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Perfect voor beginners — eerst zwembadvaardigheden, gevolgd door een ondiepe begeleide duik.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Geen brevet vereist</li>
                      <li>Vriendelijke instructeurs</li>
                      <li>Uitrusting & foto's beschikbaar</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Discover Scuba')}&type=dive&deposit=1000&currency=THB`); }}>Informatie / Boeken</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <img src="/images/sailrock.webp" alt="Sail Rock Special" className="w-full h-40 object-cover" onError={(e)=>{(e.target as HTMLImageElement).src='/images/photo-1618865181016-a80ad83a06d3.avif'}} />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Sail Rock Special</CardTitle>
                      <Badge>Hele dag</Badge>
                    </div>
                    <CardDescription>Duur: Hele dag — 3 duiken met lunch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Een volledige offshore dagtrip naar Sail Rock en omliggende pinnacles — kans op grote pelagische soorten.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Ontbijt & lunch inbegrepen</li>
                      <li>Ervaren gidsen en briefings</li>
                      <li>Ophalen en terugbrengen op Koh Tao</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Sail Rock Special')}&type=dive&deposit=1500&currency=THB`); }}>Informatie / Boeken</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Dive Sites */}
        <TabsContent value="sites" className="transition-none">
          <section id="world-class-dive-sites" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Beste fun diving-trips op Koh Tao</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {diveSites.map((site, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-xl">
                          <Link to={site.path} className="hover:text-blue-600 underline-offset-4 hover:underline">
                            {site.name}
                          </Link>
                        </CardTitle>
                        <Badge variant="secondary">{site.depth}</Badge>
                      </div>
                      <CardDescription>{site.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {site.highlights.map((highlight, i) => (
                          <Badge key={i} variant="outline">{highlight}</Badge>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link to={site.path} className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                          Bekijk details van de duiklocatie
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-center mb-4">Alle duiklocaties</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {allDiveSites.map((site) => (
                    <Link
                      key={site.path}
                      to={site.path}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                    >
                      {site.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Marien leven */}
        <TabsContent value="marine" className="transition-none">
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Ontdek de onderwaterwereld</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {marineLife.map((animal, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{animal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{animal.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link to="/marine-life" className="inline-flex items-center text-blue-600 font-medium hover:underline underline-offset-4">
                  Bekijk al het onderwaterleven
                </Link>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Boat Schedule & Prijs */}
        <TabsContent value="schedule" className="transition-none">
          <section id="schedule" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Bootschema fun diving</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Ochtendtrips</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Daily departures at 8:00 AM and 10:00 AM</p>
                        <p className="text-sm text-muted-foreground mt-2">2 dives per trip</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Middagtrips</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Daily departures at 1:00 PM</p>
                        <p className="text-sm text-muted-foreground mt-2">2 dives per trip</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">
                            <Link to="/dive-sites/sail-rock" className="hover:text-blue-600 underline-offset-4 hover:underline">
                              Sail Rock Special
                            </Link>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>Wednesday & Saturday at 6:30 AM</p>
                        <p className="text-sm text-muted-foreground mt-2">Hele dagtrip met lunch</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="pricing" className="text-4xl font-bold mb-8">Prijs</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Standaard Fun Dive</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">฿2,000</p>
                        <p className="text-sm text-muted-foreground">per trip (2 dives)</p>
                        <ul className="mt-4 space-y-2 text-sm">
                          <li>• Premium Aqualung equipment</li>
                          <li>• Experienced dive guide</li>
                          <li>• Freshwater showers</li>
                          <li>• Maximum 4 divers per guide</li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/koh-tao-dive-sites" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            Bekijk overzicht van alle duiklocaties
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Sail Rock-trip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">฿2,900</p>
                        <p className="text-sm text-muted-foreground">hele dagexcursie</p>
                        <ul className="mt-4 space-y-2 text-sm">
                          <li>• Breakfast & lunch included</li>
                          <li>• Premium equipment</li>
                          <li>• Expert guide</li>
                          <li>• Whale shark opportunities</li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/dive-sites/sail-rock" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            Bekijk Sail Rock-details
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Diver Vereisten */}
        <TabsContent value="requirements" className="transition-none">
          <section id="requirements" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Belangrijke informatie voor gebrevetteerde duikers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Laatste duik-check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Wanneer was je laatste duik? Als dat langer dan 12 maanden geleden is, adviseren we sterk dat
                      je een Scuba Review afrondt om je duikkennis en vaardigheden op te frissen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Medische geschiktheid</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Alle duikers moeten de PADI Medical Questionnaire invullen. Als je op
                      een vraag "JA" antwoordt, kan een medische keuring nodig zijn vóór het duiken.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Vliegen na het duiken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      DAN-richtlijnen: 12 uur na een enkele no-deco duik, 18 uur na meerdere
                      duiken. Wij bieden duikcomputers met optimale berekeningen voor oppervlakte-interval.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Weersomstandigheden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Jouw veiligheid heeft prioriteit. Door weersomstandigheden kunnen trips
                      op korte termijn worden uitgesteld of verplaatst.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Choosing a Dive Center */}
        <TabsContent value="tips" className="transition-none">
          <section id="tips" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Belangrijkste tips om een betrouwbare duikschool te kiezen</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kwaliteitsuitrusting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Premium Aqualung-uitrusting met gebalanceerde ademautomaten en geïntegreerde loodsystemen.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Duikcomputer verplicht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Essentieel voor diepe en repetitieve duiken. Geen duikcomputer, geen duik.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ervaren gidsen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      PADI-professionals met diepgaande kennis van lokaal onderwaterleven en duiksites.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Praktische locatie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Let op de afstand tot je accommodatie voor gemakkelijke toegang en ophaalservice.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Waarde vs prijs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kwaliteitsuitrusting en ervaren gidsen kunnen 100-200 THB extra per duik kosten.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PADI-certificering</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kies centra die certificeringscursussen aanbieden als je nog geen gebrevetteerde duiker bent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Booking Section */}
        <TabsContent value="booking" className="transition-none">
          <section id="booking" className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Boek jouw fun diving-avontuur</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Klaar om de geweldige onderwaterwereld van Koh Tao te ontdekken? Neem contact op voor een boekingsaanvraag of gebruik het formulier hieronder om direct te boeken.
              </p>
                <div className="mb-4 flex flex-col items-center gap-2">
                  <Link to="/fun-diving-koh-tao#world-class-dive-sites" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">Fun Dive-informatie</Link>
                  <a href="/courses#course-openWater" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Boek cursus (PADI)</a>
                  <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Neem contact op om te boeken/informatie aan te vragen</a>
                  <div className="text-muted-foreground text-sm mb-4">Of gebruik het formulier hieronder om direct een boekingsaanvraag te sturen.</div>
                </div>
                <Button size="lg" onClick={() => navigate('/booking')}>Verstuur boekingsaanvraag</Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunDiving;