import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Headphones, CheckCircle, Upload, X, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);

  // Ref for clearing the file input manually
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const orderId = formData.get("orderId") as string;
    const issueType = formData.get("issueType") as string;
    const description = formData.get("description") as string;

    // --- 1. STRICT VALIDATION ---
    if (!name || !email || !orderId || !issueType || !description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in ALL required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Check terms acceptance
    if (!termsAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please read and accept the warranty claim terms and conditions to proceed.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // --- 2. CONFIGURATION ---
    const CLOUDINARY_UPLOAD_PRESET = "terrivo_uploads";
    const CLOUDINARY_CLOUD_NAME = "dpur2rduu";
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzku-6IlTReMDlhaGubaL63dA2IQuLN2SCOK9OXl1gkO_G19DmzBS4UIoE_vi7HEheB/exec";

    try {
      let imageLink = "No image uploaded";

      // --- 3. UPLOAD IMAGE ---
      if (uploadedFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", uploadedFile);
        imageFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: imageFormData }
        );

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed.");
        }

        const uploadData = await uploadResponse.json();
        imageLink = uploadData.secure_url;
      }

      // --- 4. SEND TO SHEET ---
      const dataToSend = new FormData();
      dataToSend.append("name", name);
      dataToSend.append("email", email);
      dataToSend.append("orderId", orderId);
      dataToSend.append("issueType", issueType);
      dataToSend.append("description", description);
      dataToSend.append("imageLink", imageLink);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: dataToSend,
        mode: "no-cors"
      });

      // --- 5. SUCCESS ---
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your claim has been submitted.",
      });

    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: "Check your internet connection.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Request Submitted | Terrivo</title>
        </Helmet>
        <Layout>
          <section className="section-padding min-h-[70vh] flex items-center justify-center text-center">
            <div className="max-w-lg mx-auto">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Request Received!</h1>
              <p className="text-gray-600 mb-8">
                Your warranty claim has been saved directly to our system.
              </p>
              <button onClick={() => window.location.reload()} className="bg-primary text-white px-6 py-3 rounded-lg font-bold">
                Submit Another
              </button>
            </div>
          </section>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Support & Warranty Claim | Terrivo</title>
        <link rel="canonical" href="https://terrivo.in/support" />
      </Helmet>

      <Layout>
        <section className="section-padding bg-gradient-to-br from-secondary via-background to-muted">
          <div className="container-brand max-w-3xl mx-auto">

            {/* --- RESTORED STYLISH HEADER --- */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Headphones className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">24-48hr Response Time</span>
              </div>
              <h1 className="heading-display mb-4">
                Claim <span className="text-primary">Warranty</span>
              </h1>
              <p className="text-lead">
                Facing an issue with your Terrivo product? Submit a support request
                or warranty claim and our team will assist you.
              </p>
            </div>
            {/* --- END HEADER --- */}

            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-brand-lg">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Full Name */}
                <div>
                  <label className="form-label-brand">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required className="form-input-brand" placeholder="Enter full name" />
                </div>

                {/* Email */}
                <div>
                  <label className="form-label-brand">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" required className="form-input-brand" placeholder="Enter email" />
                </div>

                {/* Order ID */}
                <div>
                  <label className="form-label-brand">Order ID <span className="text-red-500">*</span></label>
                  <input type="text" name="orderId" required className="form-input-brand" placeholder="Amazon/Flipkart Order ID" />
                </div>

                {/* Issue Type */}
                <div>
                  <label className="form-label-brand">Issue Type <span className="text-red-500">*</span></label>
                  <select name="issueType" required className="form-input-brand bg-white">
                    <option value="">Select issue type</option>
                    <option value="Warranty Claim">Warranty Claim</option>
                    <option value="Product Defect">Product Defect</option>
                    <option value="Missing Parts">Missing Parts/Accessories</option>
                    <option value="Other Issue">Other Issue</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="form-label-brand">Description <span className="text-red-500">*</span></label>
                  <textarea name="description" required rows={5} className="form-input-brand resize-none" placeholder="Describe your issue..."></textarea>
                </div>

                {/* FIXED IMAGE UPLOAD (Clickable) */}
                <div>
                  <label className="form-label-brand">Upload Image (Optional)</label>

                  <label className="relative flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all">
                    {!uploadedFile ? (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <div className="text-center">
                          <p className="font-medium text-foreground">Click to upload image</p>
                          <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center justify-between w-full p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Upload className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{uploadedFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-background rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>

                {/* Terms and Conditions */}
                <div className="border border-border rounded-lg p-6 bg-muted/30">
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="termsAccepted"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="termsAccepted" className="text-sm text-foreground cursor-pointer">
                      I have read and agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowFullTerms(!showFullTerms)}
                        className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Warranty Claim Terms & Conditions
                        {showFullTerms ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      {" "}<span className="text-red-500">*</span>
                    </label>
                  </div>

                  {/* Expandable Terms Content */}
                  {showFullTerms && (
                    <div className="mt-4 p-4 bg-background rounded-lg border border-border max-h-96 overflow-y-auto text-sm space-y-4 text-muted-foreground">
                      <h3 className="font-bold text-foreground text-base mb-3">Terrivo Warranty Claim – Terms & Conditions</h3>

                      <p className="text-foreground/90">
                        Terrivo provides limited warranty coverage on eligible textile products to ensure quality assurance and responsible after-sales support. This warranty applies only to manufacturing defects in fabric, stitching, and materials, and is subject to the following terms and conditions.
                      </p>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">1. Eligibility</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Warranty is valid only for products purchased through authorised Terrivo sellers on Amazon or Flipkart.</li>
                          <li>Warranty claims must be submitted within 6 months from the date of purchase.</li>
                          <li>A valid original purchase invoice / order ID is mandatory.</li>
                          <li>The product must not have been tampered with, misused, altered, or damaged due to negligence.</li>
                          <li>Warranty benefits are applicable only to the original purchaser and are non-transferable.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">2. Warranty Coverage</h4>
                        <p className="mb-2">The warranty covers manufacturing defects only, including:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Manufacturing defects in fabric or material</li>
                          <li>Stitching failures or fabric tears under normal household usage</li>
                          <li>Structural issues affecting the product's intended functionality</li>
                        </ul>
                        <p className="mt-2">Upon approval, Terrivo may, at its sole discretion:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Repair the product, or</li>
                          <li>Replace the product with the same or equivalent item, subject to availability</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">3. Warranty Exclusions</h4>
                        <p className="mb-2">Warranty claims will be rejected if damage is caused by:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Normal wear and tear from regular use</li>
                          <li>Loose stitching or fabric wear due to overloading or misuse</li>
                          <li>Burns, melting, or heat damage</li>
                          <li>Cuts, tears, or punctures caused by sharp objects</li>
                          <li>Damage caused by pets, insects, pests, rodents, or animals</li>
                          <li>Stains, discoloration, fading, odour, or fabric softening</li>
                          <li>Mould, moisture damage, or improper storage conditions</li>
                          <li>Damage due to washing, soaking, cleaning, or water exposure</li>
                          <li>Environmental factors or improper handling</li>
                          <li>Products purchased from unauthorised sellers or resellers</li>
                          <li>Alterations or repairs done by the customer or third parties</li>
                        </ul>
                        <p className="mt-2 italic">Cosmetic changes and ageing of fabric over time do not qualify as manufacturing defects.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">4. Required Documentation</h4>
                        <p className="mb-2">To initiate a warranty claim, customers must submit:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Valid Amazon or Flipkart Order ID / invoice</li>
                          <li>Clear photographs of the product showing the defect</li>
                          <li>A detailed description of the issue or defect</li>
                        </ul>
                        <p className="mt-2 italic">Incomplete or unclear submissions may delay or result in rejection of the claim.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">5. Product Shipping & Claim Process</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Customers are required to ship the product to Terrivo's designated warehouse for physical inspection.</li>
                          <li>Warranty claims are not approved based on images or videos alone.</li>
                          <li>The product must be securely packed to prevent transit damage.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">6. Shipping Responsibility</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Shipping the product to Terrivo's warehouse is the customer's responsibility.</li>
                          <li>Any shipping charges incurred while sending the product for inspection shall be borne by the customer.</li>
                          <li>Terrivo is not responsible for damage occurring during transit due to improper packaging.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">7. Inspection, Processing & Timeline</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Warranty claims are reviewed within 24–48 hours of claim submission.</li>
                          <li>Claim approval, rejection, or requests for additional information will be communicated via email.</li>
                          <li>Once the product is received and the claim is approved, replacement products will be shipped within 5–7 business days.</li>
                          <li>Replacement shipping to the customer will be handled by Terrivo at no additional cost.</li>
                        </ul>
                        <p className="mt-2 italic">If a claim is rejected, the product will not be replaced. Return shipping (if requested) may be chargeable.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">8. Remedy</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Upon approval, Terrivo will provide a replacement product of the same type or equivalent (subject to availability).</li>
                          <li>Refunds are governed by the return and refund policies of Amazon or Flipkart, depending on where the product was purchased.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">9. User Responsibilities</h4>
                        <p className="mb-2">Customers are responsible for:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Providing accurate and complete information in the warranty claim form</li>
                          <li>Responding promptly to any requests for additional information</li>
                          <li>Ensuring proper care, storage, and usage of products as per provided guidelines</li>
                        </ul>
                        <p className="mt-2 italic">Failure to comply may result in claim rejection.</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">10. Claim Review Authority</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Submission of a warranty claim does not guarantee approval.</li>
                          <li>Terrivo reserves the full right to approve or reject any warranty claim based on inspection results, product condition, and usage evidence.</li>
                          <li>The final decision regarding warranty claims rests solely with Terrivo.</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">11. Limitation of Liability</h4>
                        <p>
                          Terrivo's liability is strictly limited to repair or replacement of the defective product.
                          Terrivo shall not be liable for any indirect, incidental, or consequential damages arising from product use.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">12. Policy Updates</h4>
                        <p>
                          Terrivo reserves the right to update or modify these warranty terms and conditions at any time without prior notice.
                          The latest version available on the website shall be applicable.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">13. Contact Information</h4>
                        <p>
                          For warranty-related queries or support, please contact:{" "}
                          <a href="mailto:support@terrivo.in" className="text-primary hover:underline font-medium">support@terrivo.in</a>
                        </p>
                        <p className="mt-2 font-medium text-foreground/90">
                          Customers must ship the product to Terrivo's warehouse for inspection. Warranty applies only to manufacturing defects in fabric, stitching, and materials.
                          Damage due to use, insects, burns, cuts, moisture, or improper care is not covered.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Submit Support Request"}
                </button>
              </form>

              {/* Contact Info Footer */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Need immediate assistance? Email us at{" "}
                  <a href="mailto:support@terrivo.in" className="text-primary hover:underline font-medium">
                    support@terrivo.in
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Support;