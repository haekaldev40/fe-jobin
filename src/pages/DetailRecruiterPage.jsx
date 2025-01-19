import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, MapPin } from "lucide-react";
import { applicantServices } from "@/services/applicantService";

const IconText = ({ Icon, text, className }) => (
  <div className={`flex items-center gap-4 mt-2 ${className}`}>
    <Icon className="h-4 w-4" />
    <p className="text-lg">{text}</p>
  </div>
);

const DetailRecruiterPage = () => {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const response = await applicantServices.getCompanyByName(companyName);
      setCompany(response);
    };
    fetchCompany();
  }, [companyName]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-14">
      <Card>
        <CardHeader>
          <div className="flex gap-8">
            <img
              src={`http://localhost:5000${company.companyLogo}`}
              alt={company.companyName}
              className="w-30 h-20"
            />
            <div>
              <CardTitle className="text-2xl">{company.companyName}</CardTitle>
              <p className="text-gray-500">{company.industry}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <IconText Icon={Building2} text={company.companySize} />
          <IconText Icon={MapPin} text={company.location} />
          
          <h2 className="font-bold text-lg mt-6 mb-2">Tentang Perusahaan</h2>
          <p className="text-gray-700">{company.companyDescription}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailRecruiterPage;