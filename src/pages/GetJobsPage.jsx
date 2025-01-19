import { useState, useEffect, useRef } from "react";
import JobCard from "@/components/jobs/JobCard";
import SearchBar from "@/components/SearchBar";
import axios from "axios";

const GetJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastFilters = useRef({}); // Referensi untuk menyimpan filter terakhir yang digunakan

  const fetchJobs = async (filters = {}) => {
    // Bandingkan filter dengan yang terakhir
    if (JSON.stringify(filters) === JSON.stringify(lastFilters.current)) {
      return; // Jika filter tidak berubah, jangan panggil API
    }

    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `http://localhost:5000/api/jobs/public?${queryParams}`
      );

      setJobs(response.data.jobs);
      lastFilters.current = filters; // Update filter terakhir yang digunakan
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ambil semua pekerjaan saat pertama kali load
    fetchJobs();
  }, []);

  const handleSearch = (filters) => {
    fetchJobs(filters); // Cari pekerjaan berdasarkan filter
  };

  return (
    <div className="max-w-6xl mx-auto pt-10">
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pb-10">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetJobsPage;
