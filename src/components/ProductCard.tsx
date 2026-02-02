import { ExternalLink } from "lucide-react";
import amazonLogo from "@/assets/amazon-logo.png";
import flipkartLogo from "@/assets/flipkart-logo.png";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  amazonLink: string;
  flipkartLink: string;
  description: string;
}

const ProductCard = ({
  name,
  price,
  image,
  amazonLink,
  flipkartLink,
  description,
}: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{description}</p>
        <p className="text-2xl font-bold text-primary mb-6">{price}</p>

        {/* Marketplace Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-amazon"
          >
            <img src={amazonLogo} alt="Amazon" className="h-6 object-contain" />
            <span className="flex-1 text-left">Buy on Amazon</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={flipkartLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-flipkart"
          >
            <img src={flipkartLogo} alt="Flipkart" className="h-6 object-contain" />
            <span className="flex-1 text-left">Buy on Flipkart</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
