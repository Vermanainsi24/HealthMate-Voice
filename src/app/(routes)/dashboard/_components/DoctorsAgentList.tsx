import React from 'react';
import { AIDoctorAgents } from '../../../../../shared/list';
import DoctorAgentCard from './DoctorAgentCard';

function DoctorsAgentList() {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-xl">AI Specialist Doctors Agent</h2>

      <div className='grid grid-cols-2  gap-5 md:grid-cols-3 gap-5 lg:grid-cols-5 gap-5 xl:grid-cols-5 gap-5 mt-5'>
        {AIDoctorAgents.map((doctorAgent, index) => (
          <div key={index}>
            <DoctorAgentCard doctorAgent={doctorAgent} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsAgentList;
