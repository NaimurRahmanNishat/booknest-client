import logo from "../../assets/images/logo.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  image?: string;
}

const Logo = ({ className, image }: LogoProps) => {
  return (
    <Link
      to="/"
      className={cn("flex items-center space-x-2 font-bold text-xl", className)}
    >
      <img src={image || logo} alt="Logo" className="w-28 h-20 py-1" />
    </Link>
  );
};

export default Logo;