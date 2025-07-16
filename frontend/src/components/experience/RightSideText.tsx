import Button from "../ui/Button";

function RightSide() {
  return (
    <div className="max-w-xl">
      <p className="text-lg text-customeRed font-semibold">ABOUT OUR COMPANY</p>
      <h2 className="text-4xl font-bold text-customBlue mt-2 font-jost">
        We Are The Best Choice For Your Car
      </h2>
      <div className="w-16 h-1 bg-customeRed my-5"></div>
      <p className="text-gray-500 leading-relaxed">
        We provide top-notch services to ensure your vehicle is in the best
        condition. Our team of experienced mechanics is dedicated to offering
        reliable and efficient solutions for all your car needs.
      </p>
      <p className="text-gray-500 leading-relaxed mt-4">
        From routine maintenance to complex repairs, we use the latest tools and
        technology to deliver high-quality workmanship. Your satisfaction is our
        priority, and we strive to exceed your expectations with every visit.
      </p>
      <Button className="mt-8 rounded-none">ABOUT US →</Button>
    </div>
  );
}

export default RightSide;
