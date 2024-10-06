import Inicial from '@/components/inicial/inicial';
import PricingTable from '@/components/pricingTable/PricingTable';
import TeamMembers from '@/components/teamMembers/TeamMembers';
import React, { useState } from 'react';


export default function Home() {
   
    return (
        <div id="__next">
            <Inicial />
            <PricingTable />
            <TeamMembers />
        </div>
    );
}

