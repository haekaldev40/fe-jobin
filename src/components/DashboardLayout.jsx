// src/components/layouts/DashboardLayout.jsx
import { useState } from "react"
import { cn } from "@/lib/utils"
import DashboardNav from "./DashboardNav"
import DashboardSidebar from "./DashboardSidebar"
import { Outlet } from "react-router-dom"


const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <DashboardNav 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className={cn(
          "flex-1 p-8 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}>
            
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout