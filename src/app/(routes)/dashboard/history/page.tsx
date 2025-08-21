// app/(routes)/dashboard/history/page.tsx
export const dynamic = "force-dynamic";

import React from 'react'
import HistoryTable from '../_components/HistoryTable'
import HistoryList from '../_components/HistoryList'

const HistoryPage = () => {
  return (
    <div><HistoryList /></div>
  )
}

export default HistoryPage