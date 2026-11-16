import { Header } from "@/components/Header";
import { ScrollVideo } from "@/components/Hero/ScrollVideo";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Brands } from "@/components/sections/Brands";
import { Projects } from "@/components/sections/Projects";
import { Videos } from "@/components/sections/Videos";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <ScrollVideo />
        <About />
        <Services />
        <Process />
        <Brands />
        <Projects />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
