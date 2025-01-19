import { useToast } from "@/hooks/use-toast";
import { applicantServices } from "@/services/applicantService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useApplicantJobs = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const {
        data,
        isLoading: isLoadingApplicantJobs,
        error: errorApplicantJobs,
    } = useQuery({
        queryKey: ["applicantJobs"],
        queryFn: applicantServices.getAllJobs
    });

    return {
        jobs: data?.jobs || [],
        isLoadingApplicantJobs,
        errorApplicantJobs,
    }
}

