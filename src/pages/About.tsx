import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Shield, Users, Award, Heart, Target, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Uncompromising Fabric Quality",
    description: "We focus on fabric strength, stitching quality, and structure — so products don’t sag, tear, or lose shape with use.",
  },
  {
    icon: Users,
    title: "Customer-First Design",
    description: "Our products are designed based on real storage needs — sarees, blouses, seasonal clothing, and daily household use.",
  },
  {
    icon: Award,
    title: "Breathable Materials",
    description: "We prioritise airflow and fabric construction that helps protect clothes from moisture, odour, and long-term damage.",
  },
  {
    icon: Heart,
    title: "Built for Indian Homes",
    description: "Our designs consider Indian wardrobes, storage spaces, and usage patterns — not imported assumptions.",
  },
  {
    icon: Target,
    title: "Quality Checks & Consistency",
    description: "Every batch is inspected for fabric thickness, stitching strength, and finish consistency before sale.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Improvement",
    description: "Customer feedback directly influences our product upgrades, materials, and design refinements.",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Terrivo - Our Story & Values | Premium Home Textile Brand</title>
        <meta
          name="description"
          content="Learn about Terrivo's commitment to quality, reliability, and customer satisfaction. Discover why thousands trust our premium fabric storage solutions for their daily needs."
        />
        <link rel="canonical" href="https://terrivo.in/about" />
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container-brand">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-display mb-6 animate-slide-up">
                About <span className="text-primary">Terrivo</span>
              </h1>
              <p className="text-lead animate-slide-up" style={{ animationDelay: "0.1s" }}>
                Terrivo is an Indian home textile brand focused on thoughtfully designed fabric storage solutions. We create products that protect clothing, maintain airflow, and withstand regular household use — backed by clear warranty support and reliable after-sales service.


              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="section-padding bg-card">
          <div className="container-brand">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-section mb-6">
                  Our <span className="text-primary">Story</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Terrivo was created to solve a common household problem — storage products that look good initially but fail to protect clothes over time.
                    Many fabric organizers in the market compromise on material quality, stitching strength, or breathability. This results in sagging shelves, trapped moisture, and damaged garments.</p>
                  <p>At Terrivo, we take a more practical approach. Our textile products are selected and developed with a focus on fabric strength, airflow, and long-term usability. Each design is tested for regular Indian home conditions — frequent handling, seasonal storage, and varied wardrobes.</p>
                  <p>Today, Terrivo products are trusted by customers across India and are sold through leading marketplaces like Amazon and Flipkart, supported by a straightforward warranty process and responsive customer support.</p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-primary/10 rounded-2xl p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl font-bold text-primary">5K+</p>
                      <p className="text-muted-foreground mt-2">Happy Customers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl font-bold text-primary">4.8</p>
                      <p className="text-muted-foreground mt-2">Average Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl font-bold text-primary">15+</p>
                      <p className="text-muted-foreground mt-2">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl font-bold text-primary">6 Months</p>
                      <p className="text-muted-foreground mt-2">Warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-background">
          <div className="container-brand">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-section mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-lead">
                These core principles guide everything we do, from product development
                to customer service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group p-6 bg-card rounded-xl border border-border card-hover animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-brand">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed">
                "Our mission is to help households store their clothes better — using durable fabrics, practical design, and responsible after-sales support."
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
