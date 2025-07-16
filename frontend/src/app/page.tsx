import Header from "@/components/header/Header";
import Banner from "@/components/banner/Banner";
import Experience from "@/components/experience/Experience";
import ServiceHome from "@/components/services/ServiceHome";
import ChoosUs from "@/components/whyChoosUs/ChoosUs";
import IntroBanner from "@/components/IntroBanner";
import Footer from "@/components/footer/Footer";
import TestimonialSection from "@/components/TestimonialSection";
import SatisfactionGuarantee from "@/components/SatisfactionGuarantee";
import Callout from "@/components/Callout";
function page() {
  return (
    <>
      <Banner />
      <Experience />
      <ServiceHome />
      <ChoosUs />
      <IntroBanner />
      <SatisfactionGuarantee />
      <TestimonialSection />
      <Callout />
    </>
  );
}

export default page;
