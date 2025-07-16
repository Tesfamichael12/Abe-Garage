import Link from "next/link";

interface BreadcrumbProps {
  title: string;
  backgroundImageUrl: string;
}

const Breadcrumb = ({ title, backgroundImageUrl }: BreadcrumbProps) => {
  return (
    <div
      className="relative w-full h-64 bg-center text-white"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
        <h1 className="text-5xl font-extrabold font-jost mb-2">{title}</h1>
        <div className="flex justify-center items-center gap-2 text-lg font-jost">
          <Link href="/" className="text-customeRed hover:underline">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <span className="text-white">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
