import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
  } from "@/components/ui/dialog";
import { Eye } from "lucide-react";



const ApplicantDetailDialog = ({ applicant }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        
          <Eye className="mr-2 h-4 w-4" /> 
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h3 className="text-lg font-semibold">Name:</h3>
            <p className="col-span-3">
              {applicant.applicant.firstName} {applicant.applicant.lastName}
            </p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <h3 className="text-lg font-semibold">Resume:</h3>
            <a
              href={`http://localhost:5000${applicant.cvResume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline col-span-3"
            >
              View Resume
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicantDetailDialog;
