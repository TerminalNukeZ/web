import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PlanCalculatorProps {
  planType: "minecraft" | "discord" | "vps";
}

const PlanCalculator = ({ planType }: PlanCalculatorProps) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [requirements, setRequirements] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const { toast } = useToast();

  const handleCalculate = async () => {
    if (!requirements.trim()) {
      toast({
        title: "Missing information",
        description: "Please describe your requirements first",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    setRecommendation("");

    try {
      const { data, error } = await supabase.functions.invoke("suggest-plan", {
        body: { requirements, planType },
      });

      if (error) throw error;

      setRecommendation(data.recommendation);
    } catch (error: any) {
      console.error("Error calculating plan:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to calculate recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const placeholderText = {
    minecraft: "E.g., I need a server for 20-30 players, running modded Minecraft with 100+ mods, plugins like WorldEdit and EssentialsX...",
    discord: "E.g., I need to host 2 Discord bots, one with music features and another for moderation, expecting 1000+ server members...",
    vps: "E.g., I need to run a web application with a database, expecting 5000 daily visitors, need Docker support...",
  };

  return (
    <Card className="mb-12 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Not Sure Which Plan to Pick?</CardTitle>
        <CardDescription className="text-base">
          Tell us about your requirements and we'll suggest the perfect plan for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="requirements">Your Requirements</Label>
          <Textarea
            id="requirements"
            placeholder={placeholderText[planType]}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full"
          size="lg"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Recommendation
            </>
          )}
        </Button>

        {recommendation && (
          <Card className="mt-4 border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Our Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-foreground">{recommendation}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanCalculator;
