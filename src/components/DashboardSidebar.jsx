import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
} from "lucide-react"

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Job Posts',
    href: '/dashboard/jobs',
    icon: FileText
  },
  {
    title: 'Applicants',
    href: '/dashboard/applicants',
    icon: Users
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  }
]

const DashboardSidebar = ({ isOpen }) => {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-white transition-all duration-300",
      !isOpen && "-translate-x-full"
    )}>
      <nav className="space-y-1 p-4">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors",
              "hover:bg-gray-100 hover:text-gray-900",
              isActive && "bg-gray-100 text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default DashboardSidebar