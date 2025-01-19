import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/AuthStore";

const FormUpdateRecruiter = () => {
  const { toast } = useToast();
  const { updateRecruiterProfile, getRecruiterProfile } = useAuthStore();

  const form = useForm({
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "",
      companyDescription: "",
      location: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getRecruiterProfile();
        form.reset({
          companyName: profile.companyName || "",
          industry: profile.industry || "",
          companySize: profile.companySize || "",
          companyDescription: profile.companyDescription || "",
          location: profile.location || "",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching profile",
          description: "Failed to load profile data",
        });
      }
    };

    fetchProfile();
  }, [getRecruiterProfile, form.reset]);

  const onSubmit = async (data) => {
    try {
      await updateRecruiterProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 px-4 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 px-4 rounded-lg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 px-4 rounded-lg" placeholder="e.g., 50-100 employees" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  className="min-h-[100px] px-4 py-2 rounded-lg"
                  placeholder="Tell us about your company..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} className="h-12 px-4 rounded-lg" placeholder="e.g., New York, NY" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg"
        >
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default FormUpdateRecruiter;

