import React, { useState, useEffect } from 'react';
import ProductHero from '../views/ProductHero';
import ProductCTA from '../views/ProductCTA';
import ProductHowItWorks from '../views/ProductHowItWorks';
import ProductCategories from '../views/ProductCategories';
import ProductValues from '../views/ProductValues';
import ProductSmokingHero from '../views/ProductSmokingHero';

function Home() {
  return (
    <React.Fragment>
      <ProductHero/>
      <ProductValues/>
      <ProductCategories/>
      <ProductHowItWorks/>
      <ProductCTA/>
      <ProductSmokingHero/>
    </React.Fragment>
  );
}

export default Home;
