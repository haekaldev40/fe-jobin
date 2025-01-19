import { Button } from "./ui/button";
import HeroImage from '../assets/images/heroImage.jpg'

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
      <div className="w-[80%] mx-auto lg:m-0">
        <h1 className="mb-5 text-5xl text-gray-700 tracking-normal leading-relaxed text-center lg:text-left">
          Jelajahi & Buka Karir Anda <span className="font-semibold">Bersama JOB-IN.</span>
        </h1>
        <div className="flex gap-8 justify-center lg:justify-start">
            <Button>Cari Pekerjaan</Button>
            <Button variant="outline">Buat Lowongan Pekerjaan</Button>
        </div>
      </div>
      <div className="pt-4 lg:pt-2">
        <img src={HeroImage} alt="hero image" />
      </div>
    </div>
  );
};

export default HeroSection;
