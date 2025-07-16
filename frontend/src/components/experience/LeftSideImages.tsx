import Image from "next/image";

function LeftSideImages() {
  return (
    <div className="hidden lg:block shrink-0">
      <div className="relative">
        <div className="flex gap-4">
          <Image
            src="/images/vban1.jpg"
            alt="Pouring oil"
            width={225}
            height={429}
            className="object-cover"
          />
          <Image
            src="/images/vban2.jpg"
            alt="Car parts"
            width={225}
            height={429}
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-12 -right-12 bg-white py-5 shadow-2xl text-center w-36">
          <p className="text-customeRed font-black text-6xl">17</p>
          <p className="text-customBlue font-bold text-lg tracking-widest">
            YEARS
          </p>
          <p className="text-customBlue font-bold text-md tracking-widest -mt-1">
            EXPERIENCE
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeftSideImages;
