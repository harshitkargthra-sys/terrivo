import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Terrivo</title>
        <meta
          name="description"
          content="Read Terrivo's privacy policy. Learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://terrivo.in/privacy" />
      </Helmet>

      <Layout>
        <section className="section-padding bg-background">
          <div className="container-brand">
            <div className="max-w-3xl mx-auto">
              <h1 className="heading-section mb-8">Privacy Policy</h1>

              <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                <p className="text-lead">
                  Last Updated: 7 January 2026
                </p>

                <p>
                  Terrivo values your privacy and is committed to protecting your personal information. This Privacy Policy explains how data is collected, used, and safeguarded when you use Terrivo.in.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">1. Information We Collect</h2>
                <p>We may collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Purchase and warranty registration details</li>
                  <li>Information submitted through the warranty claim form</li>
                  <li>Basic website usage data (cookies and analytics)</li>
                </ul>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
                <p>Your information is used to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process warranty registrations and warranty claims</li>
                  <li>Provide customer support and service communication</li>
                  <li>Improve our website, products, and services</li>
                  <li>Fulfill legal and regulatory requirements</li>
                </ul>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">3. Data Protection</h2>
                <p>
                  We apply reasonable technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">4. Data Sharing</h2>
                <p>
                  Terrivo does not sell, rent, or trade your personal information.
                </p>
                <p>Data may be shared only:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To comply with legal obligations</li>
                  <li>With trusted service providers strictly for warranty processing and support operations</li>
                </ul>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">5. Cookies</h2>
                <p>
                  Terrivo.in may use cookies to improve site performance and user experience. You can manage cookie preferences through your browser settings.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">6. Your Rights</h2>
                <p>
                  You may request access, correction, or deletion of your personal data by contacting our support team.
                </p>

                <hr className="my-8 border-border" />

                <h2 className="text-xl font-semibold text-foreground mt-8">7. Contact</h2>
                <p>
                  For privacy-related concerns, please use the Support section on Terrivo.in.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Privacy;
