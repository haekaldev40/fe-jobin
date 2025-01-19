import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase } from "lucide-react"; // Import icons

const SearchBar = ({ onSearch }) => {
  const [title, setTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");

  // State untuk debounce filter
  const [debouncedFilters, setDebouncedFilters] = useState({});

  // Debounce filter input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilters({
        title,
        employmentType,
        location,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, employmentType, location]);

  // Panggil onSearch ketika debounce selesai
  useEffect(() => {
    onSearch(debouncedFilters);
  }, [debouncedFilters]);

  const handleSearch = () => {
    onSearch({ title, employmentType, location });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className=""
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input Title dengan icon */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Cari Lowongan (contoh: Frontend Developer)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Input Location dengan icon */}
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Lokasi (contoh: Jakarta Pusat)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Select Employment Type dengan icon */}
          <div className="relative md:w-1/4">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 z-10" />
            <Select
              value={employmentType}
              onValueChange={(value) => setEmploymentType(value)}
            >
              <SelectTrigger className="pl-10 w-full">
                <SelectValue placeholder="Tipe Pekerjaan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="Harian">Harian</SelectItem>
                <SelectItem value="Mingguan">Mingguan</SelectItem>
                <SelectItem value="Contract">Kontrak</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Internship">Magang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Button Search */}
          <Button type="submit" className="md:w-1/6">
            <Search className="mr-2 h-4 w-4" /> Cari
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;