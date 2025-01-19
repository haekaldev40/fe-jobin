import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import { Toaster } from "./components/ui/toaster"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import HomePage from "./pages/HomePage"
import RegisterPageRecruiter from "./pages/RegisterPageRecruiter"
import RegisterPageApplicant from "./pages/RegisterPageApplicant"
import LoginPage from "./pages/LoginPage"
import DashboardLayout from "./components/DashboardLayout"
import JobPage from "./pages/dashboard/JobPage"
import DashboardPage from "./pages/dashboard/DashboardPage"
import ApplicantsPage from "./pages/dashboard/ApplicantsPage"
import GetJobsPage from "./pages/GetJobsPage"
import DetailJobPage from "./pages/DetailJobPage"
import SettingPage from "./pages/dashboard/SettingPage"
import DetailRecruiterPage from "./pages/DetailRecruiterPage"
import MyApplyJob from "./pages/MyApplyJob"
import ApplicantProfile from "./pages/ApplicantProfile"

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/register/applicant",
        element: <RegisterPageApplicant />
      },
      {
        path: "/register/recruiter",
        element: <RegisterPageRecruiter />
      },
      {
        path: "/jobs",
        element : <GetJobsPage />
      },
      {
        path: "jobs/:jobSlug",
        element: <DetailJobPage />
      },
      {
        path: "/companies/:companyName",
        element: <DetailRecruiterPage />
      },
      {
        path: "/myjobs",
        element: <MyApplyJob />
      },
      {
        path: "/profile",
        element: <ApplicantProfile />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "jobs",
        element: <JobPage />
      },
      {
        path: "applicants",
        element: <ApplicantsPage />
      },
      {
        path: "settings",
        element: <SettingPage />
      }
      // ... other dashboard routes
    ]
  }
])

const queryClient = new QueryClient()
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
    </>
  )
}

export default App
