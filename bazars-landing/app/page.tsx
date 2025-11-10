import Hero from "@/components/Hero";
import WorldMap from "@/components/WorldMap";
import TrustBar from "@/components/TrustBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* World Map Section */}
      <section className="w-full bg-gradient-to-b from-white to-cream py-12">
        <WorldMap />
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Footer */}
      <Footer />
    </main>
  );
}
