import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import StaticProductGrid from "@/components/StaticProductGrid";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Headphones } from "lucide-react";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Terrivo - Quality You Can Trust | Premium Electronics</title>
        <meta
          name="description"
          content="Discover Terrivo's premium electronics collection. Wireless earbuds, smartwatches, power banks and headphones designed for your lifestyle. Shop now on Amazon and Flipkart."
        />
        <meta name="keywords" content="Terrivo, electronics, wireless earbuds, smartwatch, power bank, headphones, premium quality" />
        <link rel="canonical" href="https://terrivo.in" />
      </Helmet>

      <Layout>
        <Hero />
        <AboutSection />
        <StaticProductGrid />

        {/* CTA Section */}
        <section className="section-padding bg-primary">
          <div className="container-brand">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Warranty CTA */}
              <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                  <h3 className="text-2xl font-bold text-primary-foreground">Register Your Warranty</h3>
                </div>
                <p className="text-primary-foreground/80 mb-6">
                  Protect your purchase with our hassle-free warranty registration.
                  Get peace of mind with our 6-month coverage.
                </p>
                <Link
                  to="/warranty"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
                >
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Support CTA */}
              <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="w-8 h-8 text-primary-foreground" />
                  <h3 className="text-2xl font-bold text-primary-foreground">Claim Warranty</h3>
                </div>
                <p className="text-primary-foreground/80 mb-6">
                  Our dedicated support team is here to help. Submit a claim or
                  get assistance with any product-related queries.
                </p>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
                >
                  Get Warranty
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
