import React from 'react';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Feature';
import HowItWork from '../../components/HowItWork/HowItWork';
import Benefit from '../../components/Benefit/Benefit';
import Cta from '../../components/Cta/Cta';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWork />
      <Benefit />
      <Cta />
    </>
  );
};

export default Home;

