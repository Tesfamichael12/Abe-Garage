const whyChooseUsPoints = [
  {
    icon: "flaticon-mechanic",
    text: "Certified Expert Mechanics",
  },
  {
    icon: "flaticon-wrench",
    text: "Fast And Quality Service",
  },
  {
    icon: "flaticon-price-tag-1",
    text: "Best Prices in Town",
  },
  {
    icon: "flaticon-trophy",
    text: "Awarded Workshop",
  },
];

function LeftComponent() {
  return (
    <div className="lg:max-w-[50%] px-4">
      <p className="text-4xl font-bold text-customBlue font-jost">
        Why Choose Us{" "}
        <span className=" inline-block ml-3 w-12 h-[2px] bg-customeRed"></span>
      </p>

      <p className="text-base font-light text-gray-500 mb-12 mt-6">
        Bring to the table win-win survival strategies to ensure proactive
        domination. At the end of the day, going forward, a new normal that has
        evolved from generation heading towards.
      </p>

      <div>
        {whyChooseUsPoints.map((point) => (
          <div
            key={point.text}
            className="flex items-center gap-8 mb-4 border-b pb-4 max-w-[500px]"
          >
            <span
              className={`${point.icon} mr-5 text-5xl text-customeRed w-[50px] text-center`}
            ></span>
            <p className="text-2xl font-semibold text-customBlue">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftComponent;
