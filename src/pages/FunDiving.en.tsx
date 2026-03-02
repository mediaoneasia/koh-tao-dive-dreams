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
      description: "Top deep-dive site with huge fish schools, whale sharks, and giant barracuda.",
      depth: "18-40m",
      highlights: ["Whale Sharks", "Giant Barracuda", "Malabar Grouper"]
    },
    {
      name: "Chumphon Pinnacles",
      path: '/dive-sites/chumphon-pinnacle',
      description: "Granite pinnacles with excellent chances of whale sharks and large trevally schools.",
      depth: "15-30m",
      highlights: ["Whale Sharks", "Trevally Schools", "Eagle Rays"]
    },
    {
      name: "Japanese Gardens",
      path: '/dive-sites/japanese-gardens',
      description: "Diverse coral reef with colorful marine life and swim-throughs.",
      depth: "12-25m",
      highlights: ["Pinktail Triggerfish", "Spotted Eagle Ray", "Colorful Coral"]
    },
    {
      name: "Mango Bay",
      path: '/dive-sites/mango-bay',
      description: "Shallow coral reefs, perfect for relaxed dives packed with marine life.",
      depth: "5-18m",
      highlights: ["Colorful Coral", "Tropical Fish", "Seagrass Meadows"]
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
    { name: "Whale Sharks", description: "Gentle giants often spotted around Sail Rock and Chumphon Pinnacle" },
    { name: "Reef Cuttlefish", description: "Colorful cephalopods commonly seen in deeper water" },
    { name: "Marbled Octopus", description: "Small but fascinating animals in macro habitats" },
    { name: "Reef Fish Variety", description: "Colorful schools and unique reef species" }
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
            Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips.
            Discover colorful coral reefs, meet amazing marine life, and make unforgettable memories.
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
              Go Fun Diving Koh Tao
            </Button>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg" onClick={() => { try{ sessionStorage.setItem('scrollTo','course-openWater') }catch(_){ } ; navigate('/courses'); }}>Book a Course</Button>
          </div>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div id="fun-dive-tabs" className="max-w-6xl mx-auto px-4 py-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trips">Trips</TabsTrigger>
            <TabsTrigger value="sites">Sites</TabsTrigger>
            <TabsTrigger value="marine">Marine Life</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="booking">Booking</TabsTrigger>
          </TabsList>
        </div>

        {/* Introduction */}
        <TabsContent value="overview" className="transition-none">
          <section id="fun-dive-main" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-6">Where to Go Fun Diving in Thailand</h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  Koh Tao provides all this and more at a variety of dive sites ranging from shallow coral reefs
                  to deeper outlying granite pinnacles. Our experienced dive team will provide you with a
                  bespoke, relaxed and enjoyable fun diving experience tailored to your skill level.
                </p>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Trips & Programs */}
        <TabsContent value="trips" className="transition-none">
          <section className="py-12 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8">Trips & Programs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <img src="/images/photo-1682687982423-295485af248a.avif" alt="Fun Dive" className="w-full h-40 object-cover" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Fun Dive</CardTitle>
                      <Badge>Recreational</Badge>
                    </div>
                    <CardDescription>Duration: Half day — 2 dives</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Guided dives to nearby reefs — suitable for certified divers of all levels.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Experienced PADI guides</li>
                      <li>Premium equipment</li>
                      <li>Max 4 divers per guide</li>
                    </ul>
                          <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Fun Dive')}&type=dive&deposit=500&currency=THB`); }}>Inquire / Book</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <img src="/images/photo-1659518893171-b15e20a8e201.avif" alt="Discover Scuba" className="w-full h-40 object-cover" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Discover Scuba (Try Dive)</CardTitle>
                      <Badge>Beginner</Badge>
                    </div>
                    <CardDescription>Duration: Half day — short introduction dive</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Perfect for first-timers — pool skills followed by a shallow guided dive.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>No certification required</li>
                      <li>Friendly instructors</li>
                      <li>Equipment & photos available</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Discover Scuba')}&type=dive&deposit=1000&currency=THB`); }}>Inquire / Book</Button>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <img src="/images/sailrock.webp" alt="Sail Rock Special" className="w-full h-40 object-cover" onError={(e)=>{(e.target as HTMLImageElement).src='/images/photo-1618865181016-a80ad83a06d3.avif'}} />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Sail Rock Special</CardTitle>
                      <Badge>Full Day</Badge>
                    </div>
                    <CardDescription>Duration: Full day — 3 dives with lunch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">A full day offshore trip to Sail Rock and surrounding pinnacles — chances for large pelagics.</p>
                    <ul className="list-disc pl-5 text-sm mb-4">
                      <li>Breakfast & lunch provided</li>
                      <li>Experienced guides and briefings</li>
                      <li>Pickup & return to Koh Tao</li>
                    </ul>
                    <Button variant="secondary" onClick={() => { navigate(`/booking?item=${encodeURIComponent('Sail Rock Special')}&type=dive&deposit=1500&currency=THB`); }}>Inquire / Book</Button>
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
              <h2 className="text-4xl font-bold text-center mb-12">Best Koh Tao Fun Diving Trips</h2>
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
                          View dive site details
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-center mb-4">All Dive Sites</h3>
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

        {/* Marine Life */}
        <TabsContent value="marine" className="transition-none">
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Discover the Underwater World</h2>
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
                  View All Marine Life
                </Link>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Boat Schedule & Pricing */}
        <TabsContent value="schedule" className="transition-none">
          <section id="schedule" className="py-16 px-4 bg-muted/50">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Fun Diving Boat Schedule</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <CardTitle className="text-lg">Morning Trips</CardTitle>
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
                          <CardTitle className="text-lg">Afternoon Trips</CardTitle>
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
                        <p className="text-sm text-muted-foreground mt-2">Full day trip with lunch</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h2 id="pricing" className="text-4xl font-bold mb-8">Pricing</h2>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Standard Fun Dive</CardTitle>
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
                            View all dive sites overview
                          </Link>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <CardTitle className="text-lg">Sail Rock Trip</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">฿2,900</p>
                        <p className="text-sm text-muted-foreground">full day excursion</p>
                        <ul className="mt-4 space-y-2 text-sm">
                          <li>• Breakfast & lunch included</li>
                          <li>• Premium equipment</li>
                          <li>• Expert guide</li>
                          <li>• Whale shark opportunities</li>
                        </ul>
                        <div className="mt-4">
                          <Link to="/dive-sites/sail-rock" className="text-sm font-medium text-blue-600 hover:underline underline-offset-4">
                            View Sail Rock details
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

        {/* Diver Requirements */}
        <TabsContent value="requirements" className="transition-none">
          <section id="requirements" className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Important Notice for Certified Divers</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Last Dive Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      When was your last dive? If it has been longer than 12 months, we strongly advise
                      you complete a Scuba Review to refresh your diving knowledge and skills.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Medical Fitness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      All divers must complete the PADI Medical Questionnaire. If you answer "YES" to
                      any questions, a medical check-up may be required before diving.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Flying After Diving</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      DAN guidelines: 12 hours for single no-decompression dive, 18 hours for multiple
                      dives. We provide dive computers with optimal surface interval calculations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Weather Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your safety is our priority. Weather conditions may cause trip postponements
                      or rescheduling on short notice.
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
              <h2 className="text-4xl font-bold text-center mb-12">Top Tips to Choose a Reputable Dive Center</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quality Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Premium Aqualung equipment with balanced regulators and integrated weight systems.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dive Computer Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Essential for deep and repetitive dives. No dive computer, no diving.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Experienced Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      PADI professionals with deep local knowledge of marine life and dive sites.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Convenient Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Consider proximity to your accommodation for easy access and pickup services.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Value vs Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Quality diving equipment and experienced guides may cost 100-200 THB extra per dive.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">PADI Certification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Choose centers offering certification courses if you're not yet a certified diver.
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
              <h2 className="text-4xl font-bold mb-8">Book Your Fun Diving Adventure</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ready to discover Koh Tao’s incredible underwater world? Get in touch to enquire, or use the form below to send your booking request directly.
              </p>
                <div className="mb-4 flex flex-col items-center gap-2">
                  <Link to="/fun-diving-koh-tao#world-class-dive-sites" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">Fun Dive Info</Link>
                  <a href="/courses#course-openWater" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Book Course (PADI)</a>
                  <a href="https://www.divinginasia.com/#contact" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold mb-2">Get in touch to book/enquire</a>
                  <div className="text-muted-foreground text-sm mb-4">Or use the form below to send a booking request directly.</div>
                </div>
                <Button size="lg" onClick={() => navigate('/booking')}>Send Booking Request</Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FunDiving;