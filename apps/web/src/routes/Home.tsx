import BestSellers from "../components/home/Bestsellers";
import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedProducts from "../components/home/FeaturedProducts";
import FlashSale from "../components/home/FlashSale";
import Hero from "../components/home/Hero";
import Testimonials from "../components/home/Testimonials";

export default function Home(){
    return (
        <>  
            <Hero />
            <CategoryShowcase />
            <FeaturedProducts />
            <BestSellers />      
            <FlashSale />
            <Testimonials />  
         </>
    )
}