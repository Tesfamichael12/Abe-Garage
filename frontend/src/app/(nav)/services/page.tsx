import Breadcrumb from "@/components/ui/Breadcrumb";
import ChoosUs from "@/components/whyChoosUs/ChoosUs";
import ServiceCard from "@/components/services/ServiceCard";

const services = [
  {
    icon: "flaticon-car-engine",
    title: "Engine Diagnostics",
    description:
      "We use the latest diagnostic equipment to accurately identify and repair any issues with your vehicle's engine.",
    price: 80,
  },
  {
    icon: "flaticon-tire",
    title: "Tire & Wheels",
    description:
      "We offer a wide range of tire services, including tire rotation, balancing, and alignment.",
    price: 50,
  },
  {
    icon: "flaticon-spray-gun",
    title: "Car Paint",
    description:
      "We use high-quality paint and equipment to give your car a new look.",
    price: 300,
  },
  {
    icon: "flaticon-gearbox",
    title: "Transmission",
    description:
      "We offer a full range of transmission services, including fluid changes, repairs, and replacements.",
    price: 200,
  },
  {
    icon: "flaticon-air-conditioning",
    title: "Air Conditioning",
    description:
      "We'll keep you cool with our expert A/C repair and maintenance services.",
    price: 100,
  },
  {
    icon: "flaticon-brake-disc",
    title: "Brake Repair",
    description:
      "We offer a full range of brake services, including pad and rotor replacement.",
    price: 150,
  },
];

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        title="Our Services"
        backgroundImageUrl="/images/banner1.jpg"
      />

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 font-jost">
              Explore Our Services
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We offer a wide range of services to keep your vehicle in top
              condition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                details={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <ChoosUs />
    </>
  );
};

export default ServicesPage;
