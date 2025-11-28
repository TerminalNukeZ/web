import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingFeature {
  label: string;
  value: string | number;
}

interface PricingCardProps {
  name: string;
  price: string;
  features: PricingFeature[];
  popular?: boolean;
  variant?: "minecraft" | "discord" | "vps";
}

const PricingCard = ({ name, price, features, popular = false, variant = "minecraft" }: PricingCardProps) => {
  const variantColors = {
    minecraft: "border-accent/50 hover:shadow-neon-green",
    discord: "border-primary/50 hover:shadow-neon-blue",
    vps: "border-secondary/50 hover:shadow-neon-purple",
  };

  const variantGradients = {
    minecraft: "from-accent/10 to-transparent",
    discord: "from-primary/10 to-transparent",
    vps: "from-secondary/10 to-transparent",
  };

  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${variantColors[variant]} ${
        popular ? "ring-2 ring-primary" : ""
      }`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
          POPULAR
        </div>
      )}
      
      <div className={`absolute inset-0 bg-gradient-to-br ${variantGradients[variant]} opacity-50 pointer-events-none`} />
      
      <CardHeader className="relative">
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="relative space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm">
              <span className="text-muted-foreground">{feature.label}: </span>
              <span className="text-foreground font-medium">{feature.value}</span>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="relative">
        <Button 
          variant="hero" 
          className="w-full"
          onClick={() => window.open('https://discord.gg/E5GcVQwqvZ', '_blank')}
        >
          Order Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
