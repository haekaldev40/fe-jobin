import GudangGaram from "../assets/images/gudang-garam.png";
import Astra from "../assets/images/astra.png";
import Pertamina from "../assets/images/pertamina.png"
import UnitedTractor from "../assets/images/unitedTractor.png"
import Epson from "../assets/images/epson.png"
import Kai from "../assets/images/kai.png"

const companies = [
  {
    id: 1,
    image: GudangGaram,
    name: "Gudang Garam",
  },
  {
    id: 2,
    image: Astra,
    name: "Astra",
  },
  {
    id: 3,
    image: Pertamina,
    name: "Pertamina"

  },
  {
    id: 4,
    image: UnitedTractor,
    name: "United Tractor"
  },
  {
    id: 5,
    image: Epson,
    name: "Mayora"
  },
  {
    id:6, 
    image: Kai,
    name: "Kai"
  }
];

const Companies = () => {
  return (
    <div className="grid grid-cols-1 p-5 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {companies.map((company) => (
        <div key={company.id} className="flex items-center justify-center">
          <img
            src={company.image}
            alt={company.name}
            className="w-auto h-14 object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default Companies;
