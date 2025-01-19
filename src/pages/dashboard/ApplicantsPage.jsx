import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "@/store/AuthStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, MoreVertical } from "lucide-react";
import ApplicantDetailDialog from "@/components/ApplicantDetailDialog";
import { toast } from "@/hooks/use-toast";

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/recruiter/applicants/apply-job",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setApplicants(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to fetch applicants");
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [token]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/recruiter/applicants/${applicationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.id === applicationId
            ? { ...applicant, status: newStatus }
            : applicant
        )
      );
      toast({
        title: "Status Update",
        description: "Status berhasil diubah!",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description: "Gagal mengubah status.",
        variant: "destructive",
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading applicants...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-10 mb-6">
      <h1 className="text-2xl font-bold tracking-tight">
            Job Applicants
          </h1>
          <p className="text-gray-500">
            Kelola data applicants pekerjaan anda disini.
          </p>
      </div>
      
      {applicants.length === 0 ? (
        <div className="text-center text-gray-500">No applicants found</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Job Applied</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>
                  {applicant.applicant.firstName} {applicant.applicant.lastName}
                </TableCell>
                <TableCell>{applicant.jobPosting.title}</TableCell>
                <TableCell>
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{applicant.status}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <ApplicantDetailDialog applicant={applicant} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[
                          "Pending",
                          "Reviewed",
                          "Rejected",
                          "Accepted",
                        ].map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() =>
                              handleStatusChange(applicant.id, status)
                            }
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ApplicantsPage;
