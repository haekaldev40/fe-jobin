import { Banknote, BriefcaseBusiness, Clock3, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";

const IconText = ({ Icon, text, className }) => (
  <div className={`flex items-center gap-4 mt-2 ${className}`}>
    <Icon className="h-4 w-4 text-gray-500" />
    <p className="text-gray-500 text-sm">{text}</p>
  </div>
);

const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
};

const JobCard = ({ job }) => {
  return (
    <Card className="max-w-md hover:shadow-lg transition-shadow mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex gap-8">
          <div className="flex gap-8">
            <img
              src={`http://localhost:5000${job.recruiter.companyLogo}`}
              alt={job.recruiter.companyName}
              className="w-10 h-10"
            />
            <div className="flex-1">
             <Link to={`/jobs/${generateSlug(job.title)}-${job.id}`} >
              <h3 className="text-lg font-bold">{job.title}</h3>
             </Link>
              <p className="text-base text-gray-500 font-thin">
                {job.recruiter.companyName}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <IconText Icon={MapPin} text={job.location} />
        <IconText Icon={Banknote} text={job.salary} />
        <IconText Icon={BriefcaseBusiness} text={job.employmentType} />
      </CardContent>

      {/* <CardFooter className="text-gray-500 text-sm">
      Diposting { '' } {new Date(job.createdAt).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
      </CardFooter> */}
    </Card>
  );
};

export default JobCard;
