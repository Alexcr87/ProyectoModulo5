import Inicial from '@/components/inicial/inicial';
import PricingTable from '@/components/pricingTable/PricingTable3';
import TeamMembers from '@/components/teamMembers/TeamMembers';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Inicial/>
        <PricingTable/> 
        <TeamMembers/> 
    </div>
  );
  
}
