import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroBlock from "@/components/IntroBlock";
import ProjectCards from "@/components/ProjectCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <IntroBlock />
        <ProjectCards />
      </main>
      <Footer />
    </div>
  );
}
