import EditProfileModal from "@/components/EditProfileModal";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import useAuthStore from "@/store/AuthStore";
import { useEffect, useState, useCallback } from "react";

const ApplicantProfile = () => {
  const { user, getApplicantProfile } = useAuthStore();
  const [profile, setProfile] = useState();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getApplicantProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [getApplicantProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile, refreshTrigger]);

  const handleProfileUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between max-w-7xl">
          <CardTitle>
            <h1 className="font-normal text-lg">Full Name</h1>
            <p className="text-sm text-gray-500">
              {profile.firstName} {profile.lastName}
            </p>
          </CardTitle>
          <CardTitle>
            <h1 className="font-normal text-lg">Phone Number</h1>
            <p className="text-sm text-gray-500">
              {profile?.phoneNumber || "-"}
            </p>
          </CardTitle>
          <CardTitle>
            <h1 className="font-normal text-lg">Address</h1>
            <p className="text-sm text-gray-500">{profile?.address || "-"}</p>
          </CardTitle>
        </CardHeader>

        <CardHeader className="flex flex-row items-center justify-between max-w-7xl">
          <CardTitle>
            <h1 className="font-normal text-lg">Education</h1>
            <p className="text-sm text-gray-500">
              {profile?.education || "-"}
            </p>
          </CardTitle>
          <CardTitle>
            <h1 className="font-normal text-lg">Experience</h1>
            <p className="text-sm text-gray-500">
              {profile?.experience || "-"}
            </p>
          </CardTitle>
          <CardTitle>
            <h1 className="font-normal text-lg">Skills</h1>
            <div className="flex flex-wrap gap-2">
              {profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded text-xs text-gray-700"
                  >
                    {skill.trim()}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500">-</p>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <div className="flex justify-end p-2 mx-4">
          <EditProfileModal onProfileUpdate={handleProfileUpdate} initialData={profile} />
        </div>
      </Card>
    </div>
  );
};

export default ApplicantProfile;