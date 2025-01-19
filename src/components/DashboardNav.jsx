import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, LogOut, Settings, Building } from "lucide-react"
import useAuthStore from "@/store/AuthStore"


const DashboardNav = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore()
  console.log(user)
  const navigate = useNavigate()

  const getLogoUrl = () => {
    if (user?.profile?.companyLogo) {
      
      if (user.profile.companyLogo.startsWith('http')) {
        return user.profile.companyLogo;
      }
      // Jika path relatif, tambahkan base URL
      return `http://localhost:5000${user.profile.companyLogo}`;
    }
    return null;
  };

  const getInitials = () => {
    if (user?.recruiterProfile) {
      const companyName = user.recruiterProfile.companyName
      return companyName.substring(0, 2).toUpperCase()
    }
    return 'R'
  }

  const handleLogout = () => {
    logout()
    navigate('/')

    // Optional: Navigate to home or login page after logout
    // navigate('/')
  }

  return (
    <nav className="h-16 border-b bg-white fixed top-0 left-0 right-0 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-lg">{user.profile.companyName}</span>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage
                    src={getLogoUrl()}
                    alt={user?.profile?.companyName || 'Company Logo'}
                    // alt={user?.recruiterProfile?.companyName}
                  />
                  <AvatarFallback className="bg-emerald-800 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.recruiterProfile?.companyName}</span>
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem 
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav