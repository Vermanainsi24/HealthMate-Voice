import { Button } from '@/components/ui/button'
import React from 'react'
import { AddNewSessionDialog } from './_components/AddNewSessionDialog';
import Image from 'next/image';
import HistoryList from './_components/HistoryList';
import DoctorsAgentList from './_components/DoctorsAgentList';
const Dashboard = () => {

  return (
    <div>
    <div className='flex justify-between items-center'> 
      <h1 className="font-bold text-2xl">My Dashboard</h1>
       <div><AddNewSessionDialog /></div>
    </div>
    <HistoryList />
    <DoctorsAgentList />

    </div>
    
  )
}

export default Dashboard;