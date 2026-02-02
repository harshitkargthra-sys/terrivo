import { Link } from "react-router-dom";
import { Mail, Shield, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-brand py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src="/terrivo-logo-footer.png"
                alt="Terrivo Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed">
              Quality you can trust. We're committed to delivering premium products
              that enhance your everyday life with reliability and style.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Register Warranty
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Claim Warranty
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@terrivo.in" className="hover:text-primary-foreground transition-colors">
                  support@terrivo.in
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Shield className="w-4 h-4" />
                <Link to="/warranty" className="hover:text-primary-foreground transition-colors">
                  Warranty Support
                </Link>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <FileText className="w-4 h-4" />
                <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {currentYear} Terrivo. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
