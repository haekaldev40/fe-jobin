import useAuthStore from "@/store/AuthStore";
import axios from "axios";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "@/hooks/use-toast";

const ApplicantStatusManage = ({ 
    applicationId, 
    currentStatus, 
    onStatusChange 
  }) => {
    const [status, setStatus] = useState(currentStatus);
    const { token } = useAuthStore();
  
    const handleStatusChange = async (newStatus) => {
      try {
          console.log('Token:', token); // Debug: Check if token exists
  
        const response = await axios.patch(
          `http://localhost:5000/api/recruiter/applicants/${applicationId}/status`, 
          { status: newStatus },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(response.data)
        setStatus(newStatus);
        toast({
            title: "Status Update",
            description: "Status berhasil diubah!"
        })
        onStatusChange(newStatus);
      } catch (error) {
        console.error('Failed to update status:', error);
        console.error('Full error:', error.response?.data);
        console.error('Status:', error.response?.status);
        console.error('Headers:', error.config?.headers);
        alert('Failed to update application status');
      }
    };
  
    const statusOptions = [
      'Pending', 
      'Reviewed', 
      'Rejected', 
      'Accepted'
    ];
  
    return (
      <Select 
        value={status} 
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Change Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
};

export default ApplicantStatusManage;