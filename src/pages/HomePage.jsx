import Companies from "@/components/Companies"
import Footer from "@/components/Footer"
import GetCandidate from "@/components/GetCandidate"
import GetJobs from "@/components/GetJobs"
import HeroSection from "@/components/HeroSection"

const HomePage = () => {
  return (
    <>
    <div className="max-w-6xl mx-auto pt-12">
      <HeroSection />
    </div>
    <div className="bg-gray-100">
    <Companies />
    </div>
    <div className="get-jobs">
      <GetJobs />
    </div>
    <div className="get-candidate">
      <GetCandidate />
    </div>
    <Footer />
    </>
  )
}

export default HomePage
