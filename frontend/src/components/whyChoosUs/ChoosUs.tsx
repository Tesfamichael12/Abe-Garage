import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";
function ChoosUs() {
  return (
    <div className="">
      <div className="lg:flex px-10  max-w-[1300px] mx-auto pt-10 md:pt-[100px] ">
        <LeftComponent />
        <RightComponent />
      </div>
    </div>
  );
}

export default ChoosUs;
