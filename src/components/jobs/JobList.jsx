import { useJobs } from "@/utils/useJob";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CreateJobModal } from "./CreateJobModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

export const JobList = () => {
  const { jobs = [], deleteJob, isDeleting, isLoading, error } = useJobs();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const jobsData = jobs;
  console.log("Jobs Data:", jobs);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setCreateDialogOpen(true);
  };

  // Create Function Delete Job
  const handleConfirmDelete = async () => {
    if (selectedJobId) {
      await deleteJob(selectedJobId);
      setSelectedJobId(null); 
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 flex justify-between items-center mb-6 mt-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Postingan Pekerjaan
          </h1>
          <p className="text-gray-500">
            Kelola lowongan pekerjaan anda disini.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedJob(null);
            setCreateDialogOpen(true);
          }}
        >
          Buat Pekerjaan Baru
        </Button>
      </div>

      {jobsData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No jobs found. Create your first job posting!
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsData?.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.employmentType}</TableCell>
                
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(job)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedJobId(job.id)}
                        className="text-red-600"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Job</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this job? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setSelectedJobId(null)}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleConfirmDelete}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CreateJobModal
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        job={selectedJob}
      />
    </>
  );
};
