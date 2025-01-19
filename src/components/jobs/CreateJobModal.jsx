import { useJobs } from "@/utils/useJob";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSchema } from "@/schemas/JobSchema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export const CreateJobModal = ({ open, onOpenChange, job }) => {
  const { createJob, updateJob, isCreating, isUpdating } = useJobs();
  const form = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      title: job?.title || "",
      description: job?.description || "",
      requirements: job?.requirements || [],
      salary: job?.salary || "",
      location: job?.location || "",
      employmentType: job?.employmentType || "",
    },
  });

  const onSubmit = async (data) => {
    if (job) {
      // Jika job ada, maka update
      await updateJob({ id: job.id, data });
    } else {
      // Jika job tidak ada, maka create
      await createJob(data);
    }
    form.reset();
    onOpenChange(false);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    // Remove semua karakter non-digit
    const number = value.replace(/\D/g, "");
    // Format ke currency
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {" "}
        <DialogHeader>
          <DialogTitle>
            {job ? "Edit Pekerjaan" : "Buat Pekerjaan Baru"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Job Title & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior Frontend Developer"
                        {...field}
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
                      <Input placeholder="e.g. Remote, Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Employment Type & Experience Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Harian">Harian</SelectItem>
                        <SelectItem value="Mingguan">Mingguan</SelectItem>
                        <SelectItem value="Bulanan">Bulanan</SelectItem>
                        <SelectItem value="Kontrak">Kontrak</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Entry">Entry Level</SelectItem>
                        <SelectItem value="Mid">Mid Level</SelectItem>
                        <SelectItem value="Senior">Senior Level</SelectItem>
                        <SelectItem value="Lead">Lead</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            {/* Salary & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. $50,000 - $70,000"
                        {...field}
                        onChange={(e) =>
                          field.onChange(formatCurrency(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed job description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      {field.value?.map((requirement, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            value={requirement}
                            onChange={(e) => {
                              const updatedRequirements = [...field.value];
                              updatedRequirements[index] = e.target.value;
                              field.onChange(updatedRequirements);
                            }}
                            placeholder={`Requirement ${index + 1}`}
                          />
                          {/* Optional: Button to remove item */}
                          <Button
                            type="button"
                            onClick={() => {
                              const updatedRequirements = field.value.filter(
                                (_, i) => i !== index
                              );
                              field.onChange(updatedRequirements);
                            }}
                          >
                            X
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedRequirements = [...field.value, ""];
                          field.onChange(updatedRequirements);
                        }}
                      >
                        Add Requirement
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {isCreating || isUpdating
                  ? "Processing..."
                  : job
                  ? "Update Job"
                  : "Create Job"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
