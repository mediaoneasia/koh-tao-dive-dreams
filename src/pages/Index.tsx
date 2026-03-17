import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { hasAdminAccess } from '@/lib/adminAccess';
import { tryAutoScroll } from '@/lib/scroll';
import Hero from '../components/Hero';
import DiveSites from '../components/DiveSites';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';
import FunDiving from './FunDiving';

const Index = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [user, setUser] = useState(null);
  // Always scroll to top on mount to prevent anchor jumps
  useEffect(() => {
    window.scrollTo(0, 0);
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const location = useLocation();

  // Removed auto-scroll logic for normal homepage behavior
  return (
    <div className="min-h-screen bg-background">
      // ...removed PageContentEditor and related admin modal..soom
      <Hero />
      <About />
      <DiveSites />
      <Courses />
      <FunDiving />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Index;
