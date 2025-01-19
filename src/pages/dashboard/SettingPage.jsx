import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/AuthStore";
import EditRecruiterModal from "@/components/UpdateRecruiterProfileForm";

const SettingPage = () => {
  const { getRecruiterProfile } = useAuthStore();
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getRecruiterProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchProfile(); // Refresh profile data after modal is closed
  };

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <div className="mt-10 mb-6">
    //   <h1 className="text-2xl font-bold tracking-tight">
    //         Recruiter Profile
    //       </h1>
    //       <p className="text-gray-500">
    //         Kelola profile perusahaan anda disini.
    //       </p>
    //   </div>
    //   <p className="mt-4 text-lg">
    //     <strong>Company Name:</strong> {profile?.companyName || "Not specified"}
    //   </p>
    //   <p className="text-lg">
    //     <strong>Location:</strong> {profile?.location || "Not specified"}
    //   </p>
    //   {profile?.companyLogo && (
    //     <img
    //       src={`http://localhost:5000${profile.companyLogo}`}
    //       alt="Company Logo"
    //       className="w-20 h-20 mt-4"
    //     />
    //   )}
    //   <p className="text-lg">
    //     <strong>Location:</strong> {profile?.industry || "Not specified"}
    //   </p>
    //   <Button
    //     onClick={handleEditClick}
    //     className="mt-6 bg-blue-600 text-white hover:bg-blue-700"
    //   >
    //     Edit Profile
    //   </Button>

    //   {isModalOpen && (
    //     <EditRecruiterModal
    //       profile={profile}
    //       onClose={handleModalClose}
    //     />
    //   )}
    // </div>
    <>
      <div className="container mx-auto px-4 py-8 flex justify-between items-center mb-6 mt-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Recruiter Profile
        </h1>
        <p className="text-gray-500">Kelola profile perusahaan anda disini.</p>
      </div>
      <Button
        onClick={handleEditClick}
      >
        Edit Profile
      </Button>
      {isModalOpen && (
        <EditRecruiterModal profile={profile} onClose={handleModalClose} />
      )}
    </div>
    <div className="container mx-auto px-4">
      <div className="w-[800px] flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-xl">Company Name</h1>
          <span className="text-gray-500 text-md">{profile?.companyName || "Not specified"}</span>
        </div>
        <div>
          <h1 className="font-bold text-xl">Location</h1>
          <span className="text-gray-500 text-md">{profile?.location || "Not specified"}</span>
        </div>
      </div>
      <div className="w-[800px] flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl">Industry</h1>
          <span className="text-gray-500 text-md">{profile?.industry || "Not specified"}</span>
        </div>
        <div>
          <h1 className="font-bold text-xl">Company Size</h1>
          <span className="text-gray-500 text-md text-end">{profile?.companySize || "Not specified"}</span>
        </div>
      </div>
     
    </div>
    </>
    
  );
};

export default SettingPage;
