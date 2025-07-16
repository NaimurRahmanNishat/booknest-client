import Categories from "@/components/hero/Categories";
import FeaturedProducts from "@/components/hero/FeaturedProducts";
import Hero from "@/components/hero/Hero";
import Publishers from "@/components/hero/Publishers";
import RecomendedProducts from "@/components/hero/RecomendedProducts";
import { Testimonials } from "@/components/hero/Testimonials";
import WCU from "@/components/hero/WCU";

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedProducts/>
      <Categories/>
      <RecomendedProducts/>
      <Publishers/>
      <WCU/>
      <Testimonials/>
    </div>
  )
}

export default Home;