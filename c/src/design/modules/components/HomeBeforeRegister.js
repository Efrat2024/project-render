import React from 'react';
import ProductHero from '../views/ProductHero';
import ProductCTA from '../views/ProductCTA';
import ProductHowItWorks from '../views/ProductHowItWorks';
import ProductValues from '../views/ProductValues';
import ProductSmokingHero from '../views/ProductSmokingHero';

function HomeBeforeSingIn() {
  return (
    <React.Fragment>
      <ProductHero/>
      <ProductValues/>
      
      <ProductHowItWorks/>
      <ProductCTA/>
      <ProductSmokingHero/>
      
    </React.Fragment>
  );
}

export default HomeBeforeSingIn;
