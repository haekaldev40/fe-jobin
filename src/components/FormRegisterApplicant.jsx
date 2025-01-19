// src/components/forms/RegisterApplicantForm.jsx
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useToast } from "@/hooks/use-toast"
import useAuthStore from "@/store/AuthStore"
import { applicantSchema } from "@/schemas/AuthSchema"

import FormImage from '../assets/images/17437.jpg'

const FormRegisterApplicant = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const registerApplicant = useAuthStore((state) => state.registerApplicant)

  const form = useForm({
    resolver: yupResolver(applicantSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      skills: []
    },
  })

  const onSubmit = async (data) => {
    try {
      await registerApplicant(data)
      toast({
        title: "Registration successful",
        description: "Please login to continue",
      })
      navigate('/login')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.response?.data?.error || "Something went wrong",
      })
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-10 pb-10">
     
      <div className="w-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="w-full max-w-[440px] mx-auto">
          
          <div className="w-12 h-12 bg-emerald-800 rounded-lg flex items-center justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2">Get Started</h1>
            <p className="text-gray-500">Welcome, Lets create your account.</p>
          </div>

          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        className="h-12 px-4 rounded-lg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      
                    </div>
                    <FormControl>
                      <Input 
                        type="password" 
                        className="h-12 px-4 rounded-lg"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-12 px-4 rounded-lg"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-12 px-4 rounded-lg"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg"
              >
                Sign Up
              </Button>

              <div className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-emerald-800 hover:underline">
                  Log in
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      
      <div className="hidden lg:flex w-[95%]">
        <div className="relative w-full h-full p-12 justify-center">
        <img 
            src={FormImage}
            alt="Job illustration" 
            className="w-full h-full object-contain"
          />

          
          
        </div>
      </div>
    </div>
  )
}

export default FormRegisterApplicant