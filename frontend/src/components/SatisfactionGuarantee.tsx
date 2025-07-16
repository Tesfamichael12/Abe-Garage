"use client";

const guaranteeItems = [
  {
    icon: "flaticon-customer-service-1",
    title: "Quality Support",
    description:
      "Our dedicated support team is here to answer your questions and provide expert assistance every step of the way.",
  },
  {
    icon: "flaticon-car-2",
    title: "All Car Makes",
    description:
      "We have the expertise to service all makes and models, ensuring your vehicle receives specialized care, regardless of its origin.",
  },
  {
    icon: "flaticon-maintenance",
    title: "Variety Services",
    description:
      "From routine oil changes to complex engine diagnostics, we offer a comprehensive range of services to keep your car running smoothly.",
  },
  {
    icon: "flaticon-fast-time",
    title: "Fast Delivery",
    description:
      "We value your time. Our efficient process ensures your vehicle is back on the road as quickly as possible.",
  },
  {
    icon: "flaticon-price-tag",
    title: "Fair Price",
    description:
      "We believe in transparent and fair pricing, providing you with honest quotes and no hidden costs.",
  },
  {
    icon: "flaticon-null-1",
    title: "World Class Services",
    description:
      "Our certified technicians use state-of-the-art equipment to provide world-class service for your vehicle.",
  },
];

const SatisfactionGuarantee = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          {/* Left Column: Guarantee Text */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold">
              <span className="text-customeRed font-jost">100%</span>
              <br />
              <span className="text-blue-900 font-jost">Satisfaction</span>
              <br />
              <span className="text-blue-900 font-jost">Guarantee</span>
            </h2>
          </div>

          {/* Right Column: Guarantee Items */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {guaranteeItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <i className={`${item.icon} text-customeRed text-6xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 font-jost">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatisfactionGuarantee;
