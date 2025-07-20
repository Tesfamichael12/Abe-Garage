import Breadcrumb from "@/components/ui/Breadcrumb";
import Experience from "@/components/experience/Experience";
import ChoosUs from "@/components/whyChoosUs/ChoosUs";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import KpiSection from "@/components/KpiSection";

const teamMembers = [
  {
    name: "John Doe",
    role: "Lead Mechanic",
    image: "/images/banner1.jpg",
  },
  {
    name: "Jane Smith",
    role: "Engine Specialist",
    image: "/images/banner2.jpg",
  },
  {
    name: "Mike Johnson",
    role: "Transmission Expert",
    image: "/images/tyre.jpg",
  },
];

const AboutPage = () => {
  return (
    <>
      <Breadcrumb title="About Us" backgroundImageUrl="/images/vban1.jpg" />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 font-jost mb-6">
                We are highly skilled mechanics for your car repair
              </h2>
              <p className="text-gray-500 mb-6">
                Abe Garage is a full-service auto repair shop that has been
                serving the community for over 20 years. We are a team of
                certified mechanics who are passionate about cars and committed
                to providing our customers with the best possible service.
              </p>
              <p className="text-gray-500">
                We use the latest diagnostic equipment to accurately identify
                and repair any issues with your vehicle. We also offer a wide
                range of services, from routine maintenance to major repairs.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/tyre.jpg"
                alt="Mechanic working on a car"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <KpiSection /> */}

      {/* Meet the Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 font-jost mb-12">
            Meet Our Expert Mechanics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 font-jost">
                  {member.name}
                </h3>
                <p className="text-customeRed mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-500 hover:text-customeRed">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-customeRed">
                    <FaTwitter />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-customeRed">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChoosUs />
    </>
  );
};

export default AboutPage;
