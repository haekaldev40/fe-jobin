// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
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
import { LogOut, User, Notebook } from "lucide-react"
import useAuthStore from "@/store/AuthStore"


const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()

  // Function to get user initials for avatar fallback
  const getInitials = () => {
    if (user?.applicantProfile) {
      const { firstName, lastName } = user.applicantProfile
      return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
    }
    return 'U'
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }


  return (
    <div className="max-w-6xl mx-auto pt-4">
      <nav className="flex justify-between items-center">
        <div>Brand</div>
        
        <div className="flex items-center justify-between gap-10">
          <Link to="/">
            <h1 className="text-sm">Beranda</h1>
          </Link>
          <Link to="/jobs">
            <h1 className="text-sm">Cari Pekerjaan</h1>
          </Link>
          <Link to="/about">
            <h1 className="text-sm">Tentang Kami</h1>
          </Link>
        </div>

        <div className="flex justify-end gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user?.applicantProfile?.avatar || ''} 
                      alt={user?.email}
                    />
                    <AvatarFallback className="bg-emerald-800 text-white">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.applicantProfile?.firstName} {user?.applicantProfile?.lastName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                  <Link to="/myjobs" className="flex items-center cursor-pointer">
                    <Notebook className="mr-2 h-4 w-4" />
                    <span>Lamaran Kerja</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="link" className="underline">
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm">
                <Link to="/register/applicant">Register as Applicant</Link>
              </Button>
              <Button size="sm" variant="outline">
                <Link to="/register/recruiter">Register as Recruiter</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar