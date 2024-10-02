import Inicial from '@/components/inicial/inicial';
import Inicial2 from '@/components/inicial/inicial2';
import Inicial3 from '@/components/inicial/inicial3';
import PricingTable from '@/components/pricingTable/PricingTable';
import TeamMembers from '@/components/teamMembers/TeamMembers';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Inicial3/>
       {/* <PricingTable3/>  */}
        <TeamMembers/> 
    </div>
  );
}
