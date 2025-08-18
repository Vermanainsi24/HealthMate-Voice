import React from 'react';
import { PricingTable } from '@clerk/nextjs'; // comment out if not using

function Billing(){
  return (
    <div className='px-10 '>
      <h2 className='font-bold text-3xl mb-4'>Join Subscription</h2>
      <PricingTable />
    </div>
  );
}

export default Billing;
