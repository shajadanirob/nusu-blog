
import { Banner } from "@/Components/Banner/Banner";
import { MobileBanner } from "@/Components/Banner/MobileBanner";
import BestSeller from "@/Components/BestSeller/BestSeller";
import Category from "@/Components/Category/Category";
import FeaturedProduct from "@/Components/FeaturedProduct/FeaturedProduct";
import NewArrival from "@/Components/NewArrival/NewArrival";
import Footer from "@/Components/Shared/Footer/Footer";
import MobileNavbar from "@/Components/Shared/MobileNavbar/MobileNavbar";
import Navbar from "@/Components/Shared/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  
  return (
    <div>
      <MobileNavbar/>
      <Navbar/>
      <MobileBanner/>
      <Banner/>
      <Category/>
      <FeaturedProduct/>
      <NewArrival/>
      <BestSeller/>
      <Footer/>
    </div>
  );
}
