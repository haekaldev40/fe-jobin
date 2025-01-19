import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAuthStore from "@/store/AuthStore";
import { toast } from "@/hooks/use-toast";

const ModalApplyJob = ({ jobId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const { isAuthenticated, user } = useAuthStore();

  const handleApply = () => {
    if (!isAuthenticated) {
      // Redirect ke halaman login jika belum login
      window.location.href = "/login";
      return;
    }

    // Tampilkan modal untuk upload CV jika user sudah login
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("jobPostingId", jobId);
      formData.append("coverLetter", coverLetter);
      formData.append("cvResume", file);

      const { token } = useAuthStore.getState();

      const response = await axios.post("http://localhost:5000/api/apply/apply-job", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      toast({
        title: "Success",
        description: "Lamaran pekerjaan berhasil dikirim!",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error applying job:", error);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Gagal mengirim lamaran pekerjaan!",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleApply}>Lamar Pekerjaan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload CV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          
          <textarea
            placeholder="Cover Letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border p-2"
          />
          
          <Button 
            onClick={handleSubmit} 
            disabled={!file}
            className="w-full"
          >
            Kirim Lamaran
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalApplyJob;