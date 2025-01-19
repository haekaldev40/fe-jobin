import { BriefcaseBusiness, FileUser, SearchCheck, UserPlus } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const steps = [
  {
    title: "Buat Akun",
    description: "Daftar dan buat akun anda untuk memulai perjalanan karier.",
    icon: <UserPlus width={40} height={40} className="rounded-full bg-gray-200 p-1" />,
  },
  {
    title: "Cari Pekerjaan",
    description: "Jelajahi berbagai lowongan sesuai minat dan kualifikasi Anda.",
    icon: <SearchCheck width={40} height={40} className="rounded-full bg-gray-200 p-1" />,
  },
  {
    title: "Upload CV",
    description: "Unggah CV Anda agar perusahaan dapat melihat profil lengkap Anda.",
    icon: <FileUser width={40} height={40} className="rounded-full bg-gray-200 p-1" />,
  },
  {
    title: "Dapatkan Pekerjaan",
    description: "Lakukan interview dan dapatkan pekerjaan yang Anda inginkan.",
    icon: <BriefcaseBusiness width={40} height={40} className="rounded-full bg-gray-200 p-1" />,
  },
];

const GetJobs = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto mt-20">
        <div className="text-center">
          <h1 className="text-3xl tracking-wide text-gray-700">
            Dapatkan Pekerjaan <span className="font-semibold">Dengan Mudah</span>
          </h1>
          <p className="text-gray-500 text-sm tracking-tight">
            Cara tercepat dan paling efektif untuk dipekerjakan oleh perusahaan
            terkemuka yang bekerja sesuai minat karier Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-10 pb-10">
          {steps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="mb-2">{step.icon}</CardTitle>
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetJobs;
