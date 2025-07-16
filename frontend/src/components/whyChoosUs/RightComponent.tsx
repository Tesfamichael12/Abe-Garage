import Image from "next/image";

const additionalServices = [
  "General Auto Repairs & Maintenance",
  "Transmission Repairs & Replacement",
  "Tire Repairs and Replacement",
  "State Emissions Inspection",
  "Break JOb / Break Services",
  "Electrical Diagnostic",
  "Fuel System Repairs",
  "Starting and Suspension Work",
  "Steering and Suspension Work",
  "Emission Repairs Facility",
  "Wheel Alignment",
  "Computer Diagnostic Testing",
];

function RightComponent() {
  return (
    <div className="lg:max-w-[50%] px-4">
      <p className="text-4xl font-bold text-customBlue mb-12 font-jost">
        Additional Services{" "}
        <span className="inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>
      <div className="lg:flex justify-between gap-10">
        <div className="hidden lg:block">
          <Image
            className=""
            src="/images/vban2.jpg"
            width={225}
            height={429}
            alt="image"
          />
        </div>

        <div>
          {additionalServices.map((service, index) => (
            <div key={index} className="flex items-center gap-5 mb-[6px]">
              <Image
                src="/images/icon-1.png"
                width={15}
                height={15}
                alt="icon"
              />
              <p>{service}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightComponent;
