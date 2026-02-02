import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>Terms & Conditions | Terrivo</title>
                <meta
                    name="description"
                    content="Read Terrivo's Terms & Conditions. Learn about our policies regarding website usage, purchases, warranties, and legal terms."
                />
                <link rel="canonical" href="https://terrivo.in/terms" />
            </Helmet>

            <Layout>
                <section className="section-padding bg-background">
                    <div className="container-brand">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="heading-section mb-8">Terms & Conditions</h1>

                            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                                <p className="text-lead">
                                    Last Updated: 7 January 2026
                                </p>

                                <p>
                                    By accessing or using Terrivo.in, you agree to the following Terms & Conditions.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">1. Website Purpose</h2>
                                <p>Terrivo.in provides:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Product information</li>
                                    <li>Warranty regulations</li>
                                    <li>Warranty registration and claim submission</li>
                                    <li>Customer support resources</li>
                                </ul>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">2. Product Purchases</h2>
                                <p>
                                    Terrivo products are sold through third-party marketplaces such as Amazon and Flipkart.
                                </p>
                                <p>
                                    All orders, payments, deliveries, returns, and refunds are governed by the respective marketplace's policies.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">3. Warranty & Claims</h2>
                                <p>
                                    Warranty coverage and claims are subject to Terrivo's Warranty Terms & Conditions and Warranty Regulations.
                                </p>
                                <p>
                                    All warranty claims must be submitted through the official Warranty Claim Form on Terrivo.in.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">4. Intellectual Property</h2>
                                <p>
                                    All website content, including text, images, branding, logos, and design elements, is the property of Terrivo and may not be copied or reused without prior written permission.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">5. Limitation of Liability</h2>
                                <p>
                                    To the maximum extent permitted by law, Terrivo shall not be liable for indirect, incidental, or consequential damages arising from the use of this website or products.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">6. Governing Law</h2>
                                <p>
                                    These terms are governed by the laws of India.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">7. Updates to Policies</h2>
                                <p>
                                    Terrivo reserves the right to update these policies at any time. Continued use of the website implies acceptance of the revised terms.
                                </p>

                                <hr className="my-8 border-border" />

                                <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
                                <p>
                                    For any questions related to these Terms & Conditions, please visit the Support section on Terrivo.in.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Terms;
