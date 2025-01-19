import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";

import axios from "axios";
import useAuthStore from "@/store/AuthStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DashboardPage = () => {
  const [data, setData] = useState({
    totalJobPosts: 0,
    totalApplicants: 0,
    recentActivity: [],
  });
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recruiter/overview", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Statistics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Job Posts</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalJobPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalApplicants}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recentActivity.length === 0 ? (
            <p>No recent activity.</p>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Applicant Name</TableHead>
                  <TableHead className="w-1/4">Job Title</TableHead>
                  <TableHead className="w-1/4">Applied Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentActivity.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {activity.applicant.firstName} {activity.applicant.lastName}
                    </TableCell>
                    <TableCell>{activity.jobPosting.title}</TableCell>
                    
                    <TableCell>
                      {new Date(activity.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
