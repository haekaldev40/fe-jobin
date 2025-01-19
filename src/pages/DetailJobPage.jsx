import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { applicantServices } from "@/services/applicantService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, BriefcaseBusiness, Clock3, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalApplyJob from "@/components/ModalApplyJob";

const IconText = ({ Icon, text, className }) => (
  <div className={`flex items-center gap-4 mt-2 ${className}`}>
    <Icon className="h-4 w-4 " />
    <p className="text-lg">{text}</p>
  </div>
);

const DetailJobPage = () => {
  const { jobSlug } = useParams();
  const jobId = jobSlug.split("-").pop(); // Ambil bagian terakhir sebagai jobId
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await applicantServices.getJobByPublicId(jobId);
      console.log(response);
      setJob(response);
    };
    fetchJob();
  }, [jobId]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-14 ">
      <div className="flex justify-between">
        <div className="flex gap-8">
          <div>
            <img
              src={`http://localhost:5000${job.recruiter.companyLogo}`}
              alt={job.recruiter.companyName}
              className="w-30 h-20"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-xl text-gray-500 font-thin">
              {job.recruiter.companyName}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <ModalApplyJob jobId={job.id} />
          <Link to={`/companies/${job.recruiter.companyName}`}>
          <Button variant="outline">Detail Perusahaan</Button>
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <IconText Icon={MapPin} text={job.location} />
        <IconText Icon={Banknote} text={job.salary} />
        <IconText Icon={BriefcaseBusiness} text={job.employmentType} />
      </div>
      {/* Render detail lainnya */}
      <p className="mt-4 text-gray-500 text-sm">
        Diposting {""}{" "}
        {new Date(job.createdAt).toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div>
  <h2 className="font-bold text-lg mt-4">Persyaratan</h2>
  <ul className="list-disc list-inside mt-2">
    {job.requirements.map((requirement, index) => (
      <li key={index} className="text-gray-700">
      {requirement}
      </li>
    ))}
  </ul>
</div>

    </div>
  );
};

export default DetailJobPage;
