// src/utils/SectionHeader.tsx
import { cn } from "@/lib/utils";
import { AuroraText } from "../ui/AuroraText";

interface SectionHeaderProps {
  highlight: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader = ({ highlight, subtitle, className }: SectionHeaderProps) => (
  <div className={cn("text-center", className)}>
    <h2 className="text-2xl font-bold">
      <AuroraText>{highlight}</AuroraText>
    </h2>
    {subtitle && <p className="text-gray-600">{subtitle}</p>}
  </div>
);

export default SectionHeader;
