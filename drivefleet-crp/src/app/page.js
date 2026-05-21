// Main homepage routing index

import Banner from "../components/Banner";
import AboutUs from "../components/AboutUs";
import FeaturedCars from "@/components/FeaturedCars";
import RentalProcess from "../components/RentalProcess";
import BrandLogos from "../components/BrandLogos";
import WhyChooseUs from "../components/WhyChooseUs";
import ClientExperiences from "../components/ClientExperiences";
import FleetCategories from "../components/FleetCategories";
import Gallery from "../components/Gallery";
import LatestInsights from "../components/LatestInsights";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="w-full bg-black">
      <Banner />
      <AboutUs />
      <FeaturedCars />
      <RentalProcess />
      <BrandLogos />
      <WhyChooseUs />
      <ClientExperiences />
      <FleetCategories />
      <Gallery />
      <LatestInsights />
      <Contact />
    </div>
  );
}
