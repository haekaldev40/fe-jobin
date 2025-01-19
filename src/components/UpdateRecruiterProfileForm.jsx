import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import useAuthStore from "@/store/AuthStore";

const EditRecruiterModal = ({ profile, onClose }) => {
  const { toast } = useToast();
  const { updateRecruiterProfile } = useAuthStore();

  const form = useForm({
    defaultValues: {
      companyName: profile?.companyName || "",
      industry: profile?.industry || "",
      companySize: profile?.companySize || "",
      companyDescription: profile?.companyDescription || "",
      location: profile?.location || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateRecruiterProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Edit Company Profile</h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-10" />
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
                        <Input {...field} className="h-10" />
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
                        <Input 
                          {...field} 
                          className="h-10"
                          placeholder="e.g., 50-100 employees" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="h-10"
                          placeholder="e.g., New York, NY" 
                        />
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
                          className="min-h-[120px] resize-none"
                          placeholder="Tell us about your company..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditRecruiterModal;