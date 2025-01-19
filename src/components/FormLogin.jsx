// src/components/forms/LoginForm.jsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/AuthStore";
import { loginSchema } from "@/schemas/AuthSchema";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data);
      const redirectUrl =
        response.user.role === "APPLICANT" ? "/" : "/dashboard";
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      setIsLoading(false);
      navigate(redirectUrl);
    } catch (error) {
      if (error.response?.status === 401) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        });
        form.setValue('password', '')
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message || "Something went wrong",
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="w-full p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="w-full max-w-[440px] mx-auto">
          {/* Logo */}
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
            <h1 className="text-2xl font-semibold mb-2">Welcome Back</h1>
            <p className="text-gray-500">Please login to your account</p>
          </div>

          {/* Form */}
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
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          className="h-12 px-4 rounded-lg pr-10" // Tambahkan padding-right untuk icon
                          disabled={isLoading}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>

              <div className="text-center text-sm text-gray-500 mt-6">
                Dont have an account?{" "}
                <Link to="/" className="text-emerald-800 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex bg-white">
        <div className="w-full h-full flex items-center justify-center p-12">
          <img
            src="/path-to-your-image.png" // Ganti dengan path gambar Anda
            alt="Login illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
