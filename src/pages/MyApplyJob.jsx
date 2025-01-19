import { Card } from "@/components/ui/card";
import useAuthStore from "@/store/AuthStore";
import axios from "axios";
import { useEffect, useState } from "react";

const MyApplyJob = () => {
  const [historyJob, setHistoryJob] = useState([]);
  const { token } = useAuthStore();

  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed":
        return "text-blue-500";
      case "Rejected":
        return "text-red-500";
      case "Accepted":
        return "text-white bg-green-600";
      default:
        return "text-gray-500"; // Default untuk Pending
    }
  };

  useEffect(() => {
    const fetchHistoryJob = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/apply/history-apply",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setHistoryJob(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchHistoryJob();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Aktivitas Lamaran Pekerjaan</h1>
        <p className="text-gray-500 text-sm">
          {historyJob.length} lowongan pekerjaan dilamar.
        </p>
      </div>

      {historyJob.length === 0 ? (
        <div className="text-center text-gray-500">No applicants found</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {historyJob.map((history) => (
            <Card
              key={history.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="p-4 flex justify-between items-center mt-2">
                <span className="underline text-xl font-bold">
                  {history.jobPosting.title}
                </span>
                <p
                  className={` font-medium text-sm mr-4 rounded-md px-4 py-1 ${getStatusColor(
                    history.status
                  )}`}
                >
                  {history.status}
                </p>
              </div>
              <div className="ml-4 mt-[-15px] text-customBlack text-lg">
                <span className="">
                  {history.jobPosting.recruiter.companyName}
                </span>
                <p className="">{history.jobPosting.location}</p>
              </div>
              <div className="ml-4 mt-4 pb-4">
                <p className="mt-4 text-gray-500 text-xs">
                  Dilamar {""}{" "}
                  {new Date(history.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplyJob;
