"use client";
import ServiceCard from "./ServiceCard";
import Image from "next/image";

const services = [
  {
    title: "Performance Upgrade",
    icon: "flaticon-power",
    details:
      "Boost your vehicle's performance with our expert tuning and upgrades. We enhance engine power, handling, and overall efficiency for a thrilling driving experience.",
  },
  {
    title: "Transmission Services",
    icon: "flaticon-gearbox",
    details:
      "Our comprehensive transmission services ensure smooth gear shifts and long-lasting performance. We handle everything from fluid changes to complete rebuilds.",
  },
  {
    title: "Brake Repair & Service",
    icon: "flaticon-brake-disc",
    details:
      "Safety is paramount. Our brake services include inspections, pad replacements, and fluid changes to ensure your vehicle stops safely and reliably every time.",
  },
  {
    title: "Engine Service & Repair",
    icon: "flaticon-car-engine",
    details:
      "From routine maintenance to complex engine diagnostics and repairs, our certified mechanics keep your engine running at its peak performance.",
  },
  {
    title: "Tyre & Wheels",
    icon: "flaticon-tire",
    details:
      "We offer a wide selection of tyres and provide professional installation, balancing, and alignment services to ensure a smooth and safe ride.",
  },
  {
    title: "Denting & Painting",
    icon: "flaticon-spray-gun",
    details:
      "Our state-of-the-art body shop restores your vehicle's appearance to pristine condition. We handle everything from minor dents to major collision repairs.",
  },
];

function ServiceHome() {
  return (
    <div
      className="bg-gray-50 pt-20 bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/images/imgi_8_pattern-Dq1e15Dw.webp')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-customBlue inline-block font-jost">
            Our Featured Services
          </h2>
          <div className="inline-block w-20 h-1 bg-customeRed ml-4 -translate-y-2"></div>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal that
            has evolved from generation X is on the runway heading towards a
            streamlined cloud solution.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              icon={service.icon}
              details={service.details}
            />
          ))}
        </div>
      </div>

      <div className="relative py-5 bg-customeRed mt-60">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="text-white flex flex-col justify-center">
              <h2 className="text-4xl font-bold font-jost">
                Quality Service And
                <br />
                Customer Satisfaction !!
              </h2>
              <p className="mt-6 text-lg">
                We utilize the most recent symptomatic gear to ensure your
                vehicle is fixed or adjusted appropriately and in an opportune
                manner. We are an individual from Professional Auto Service, a
                first class execution arrange, where free assistance offices
                share shared objectives of being world-class car administration
                focuses.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center p-8">
          <div className="w-full relative h-full">
            <Image
              className="w-full h-full object-cover transform lg:-translate-y-20 shadow-2xl"
              src="/images/imgi_4_features-G0OKUQqo.webp"
              alt="Car dashboard"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceHome;
