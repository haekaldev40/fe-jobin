import { useToast } from "@/hooks/use-toast";
import { jobServices } from "@/services/jobServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useJobs = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get All Jobs Recruiter
  const {
    data: jobsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: jobServices.getJobs,
  });

  const jobs = jobsData.job || [];


  // Create Job Mutation
  const { mutateAsync: createJob, isPending: isCreating } = useMutation({
    mutationFn: jobServices.createJob,
    onSuccess: () => {
      console.log("Job created successfully");
      // Invalidate dan refetch jobs setelah create berhasil
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Success",
        description: "Job created successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to create job",
      });
    },
  });

  const { mutateAsync: updateJob, isPending: isUpdating } = useMutation({
    mutationFn: jobServices.updateJob,
    onSuccess: () => {
      console.log("Job updated successfully");
      // Invalidate dan refetch jobs setelah update berhasil
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Success",
        description: "Job updated successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to update job",
      });
    },
  });

  const { mutateAsync: deleteJob, isPending: isDeleting } = useMutation({
    mutationFn: jobServices.deleteJob,
    onSuccess: () => {
      console.log("Job deleted successfully");
      // Invalidate dan refetch jobs setelah delete berhasil
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    }
  });

  return {
    jobs,
    isLoading,
    error,
    createJob,
    isCreating,
    updateJob,
    isUpdating,
    deleteJob,
    isDeleting,
  };
};
