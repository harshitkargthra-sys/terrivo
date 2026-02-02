import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Warranty = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // ✅ Your Google Sheet Script URL is already added here:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxkBh3QkSIIqAgaezVAxkrJLjKEUodryjSZZ3ZBdSQto6HK16jO-xX-wdQ_g50Fg3fP/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        // 'text/plain' is required to prevent CORS errors with Google Apps Script
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });

      // Assuming success if the fetch completes
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Warranty Registered!",
        description: "Your product warranty has been successfully registered. Check your email for confirmation.",
      });

    } catch (error) {
      console.error("Submission Error:", error);
      setIsSubmitting(false);
      toast({
        title: "Registration Failed",
        description: "There was a problem saving your warranty. Please check your internet and try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Warranty Registered | Terrivo</title>
        </Helmet>
        <Layout>
          <section className="section-padding bg-gradient-to-br from-secondary via-background to-muted min-h-[70vh] flex items-center">
            <div className="container-brand">
              <div className="max-w-lg mx-auto text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Warranty Registered Successfully!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for registering your Terrivo product. Your details have been securely stored.
                  You'll receive a confirmation email shortly with your warranty details.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Register Warranty | Terrivo - Protect Your Purchase</title>
        <meta
          name="description"
          content="Register your Terrivo product warranty online. Get comprehensive coverage and peace of mind with our hassle-free warranty registration process."
        />
        <link rel="canonical" href="https://terrivo.in/warranty" />
      </Helmet>

      <Layout>
        <section className="section-padding bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container-brand">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">6 Months Coverage</span>
                </div>
                <h1 className="heading-display mb-4">
                  Register Your <span className="text-primary">Warranty</span>
                </h1>
                <p className="text-lead">
                  Protect your Terrivo purchase with our hassle-free warranty registration.
                  Simply fill in your details below.
                </p>
              </div>

              {/* Form */}
              <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-brand-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="form-label-brand">
                      Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      className="form-input-brand"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label-brand">
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                      className="form-input-brand"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="form-label-brand">
                      Phone Number <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="Enter your phone number"
                      className="form-input-brand"
                    />
                  </div>

                  {/* Product Purchased */}
                  <div>
                    <label htmlFor="product" className="form-label-brand">
                      Product Purchased <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="product"
                      name="product"
                      required
                      className="form-input-brand"
                    >
                      <option value="">Select a product</option>
                      <option value="Multi-Purpose Storage Bag">Terrivo Multi-Purpose Storage Bag</option>
                      <option value="Blouse Organizer">Terrivo Blouse Organizer</option>
                      <option value="Saree Cover">Terrivo Saree Cover</option>
                      <option value="Bridal Storage Set">Terrivo Bridal Storage Set</option>
                      <option value="Other">Other Terrivo Product</option>
                    </select>
                  </div>

                  {/* Purchase Date */}
                  <div>
                    <label htmlFor="purchaseDate" className="form-label-brand">
                      Purchase Date <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      name="purchaseDate"
                      required
                      className="form-input-brand"
                    />
                  </div>

                  {/* Order ID */}
                  <div>
                    <label htmlFor="orderId" className="form-label-brand">
                      Marketplace Order ID <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="orderId"
                      name="orderId"
                      required
                      placeholder="Amazon/Flipkart Order ID"
                      className="form-input-brand"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Find this in your Amazon or Flipkart order confirmation email.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register Warranty"}
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="mt-8 text-center text-muted-foreground text-sm">
                <p>
                  By registering your warranty, you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Warranty;