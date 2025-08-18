import React from 'react'

import AppHeader from  "./_components/AppHeader";



function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col">
            <AppHeader />
            <div className="flex-1 overflow-y-autopx-10 md:px-20 lg:px-40 py-10">{children}</div>
        </div>
  )
}

export default Dashboardlayout;