import React from 'react';
import MainLayout from './layouts/MainLayout';
import ExploreVenues from './components/ExploreVenues';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';

export default function App() {
  return (
    <MainLayout>
      <Hero />
      <ExploreVenues />
      <HowItWorks />
    </MainLayout>
  );
}