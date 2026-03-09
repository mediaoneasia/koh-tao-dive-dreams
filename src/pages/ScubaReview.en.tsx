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
          <h1 className="text-4xl md:text-5xl font-bold">Scuba Review Course</h1>
          <p className="mt-4 max-w-2xl">Refresh your scuba skills and confidence with our complete refresher program.</p>
          <div className="mt-6">
            <Button size="lg" onClick={() => navigate(bookingUrl)}>Book Scuba Review</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Course Overview</h2>
            <p className="mb-6">The Scuba Review course is designed for certified divers who want to refresh skills, update knowledge, or prepare for advanced training. It covers core dive principles, safety procedures, and practical drills so you can return to the water with confidence.</p>

            <h3 className="text-xl font-semibold mb-3">What You'll Review</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Scuba equipment setup and care</li>
              <li>Dive planning and emergency procedures</li>
              <li>Buoyancy and trim control</li>
              <li>Underwater communication and navigation</li>
              <li>Decompression theory and safety stops</li>
              <li>Environmental awareness and marine-life respect</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Who This Is For</h3>
            <ul className="list-disc pl-5 mb-6">
              <li>Divers who have not dived recently</li>
              <li>Divers preparing for advanced courses</li>
              <li>Divers wanting to sharpen core skills</li>
              <li>Anyone wanting more confidence in the water</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Course Benefits</h3>
            <p className="mb-6">This refresher helps keep your diving skills current, updates you on equipment and best practices, and is a great way to meet prerequisites for follow-up training.</p>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Course Details</CardTitle>
                  <Badge>Refresher</Badge>
                </div>
                <CardDescription>1-2 days · Theory and practical review</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-sky-600 mb-3">฿2,500</p>
                <p className="text-sm text-muted-foreground mb-4">Includes learning materials and supervised practice dives</p>
                <Button onClick={() => navigate(bookingUrl)}>Book Refresher Course</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ScubaReview;