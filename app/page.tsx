import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { QuoteDisplay } from "@/components/quote-display";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          {/* Header */}
          <Header />

          {/* Quote Section */}
          <section className="w-full mt-6 md:mt-10" aria-label="Phrase du jour">
            <QuoteDisplay />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
