import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import useAuthStore from "@/store/AuthStore";
import { useToast } from "@/hooks/use-toast";

const EditProfileModal = ({ onProfileUpdate, initialData }) => {
  const { updateApplicantProfile } = useAuthStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (initialData) {
      setProfileData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        address: initialData.address || "",
        education: initialData.education || "",
        experience: initialData.experience || "",
        skills: initialData.skills?.join(", ") || "",
        phoneNumber: initialData.phoneNumber || "",
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updatedData = {
        ...profileData,
        skills: profileData.skills.split(",").map((skill) => skill.trim()),
      };
      await updateApplicantProfile(updatedData);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      onProfileUpdate();
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[100vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 py-4">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={profileData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                value={profileData.education}
                onChange={(e) => handleInputChange("education", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                value={profileData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="Separate skills with commas"
                className="h-9"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={profileData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                value={profileData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="">
          <div className="flex justify-end gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="px-4"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate} 
              disabled={loading}
              className="px-4"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;