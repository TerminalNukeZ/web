import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCard from "@/components/PricingCard";
import PlanCalculator from "@/components/PlanCalculator";

const Plans = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("minecraft");

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'minecraft' || hash === 'discord' || hash === 'vps') {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const minecraftPlans = [
    {
      name: "Furious – Grass",
      price: "₹45",
      features: [
        { label: "CPU", value: "1 vCore High Frequency" },
        { label: "RAM", value: "2GB DDR4 ECC" },
        { label: "Storage", value: "12GB NVMe SSD" },
        { label: "Additional Ports", value: "1" },
        { label: "Database Space", value: "1" },
        { label: "Backups Limit", value: "1" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Wood",
      price: "₹90",
      features: [
        { label: "CPU", value: "2 vCores High Frequency" },
        { label: "RAM", value: "4GB DDR4 ECC" },
        { label: "Storage", value: "24GB NVMe SSD" },
        { label: "Additional Ports", value: "2" },
        { label: "Database Space", value: "2" },
        { label: "Backups Limit", value: "2" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Stone",
      price: "₹180",
      features: [
        { label: "CPU", value: "3 vCores High Frequency" },
        { label: "RAM", value: "6GB DDR4 ECC" },
        { label: "Storage", value: "36GB NVMe SSD" },
        { label: "Additional Ports", value: "3" },
        { label: "Database Space", value: "3" },
        { label: "Backups Limit", value: "3" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
      popular: true,
    },
    {
      name: "Furious – Coal",
      price: "₹300",
      features: [
        { label: "CPU", value: "4 vCores High Frequency" },
        { label: "RAM", value: "8GB DDR4 ECC" },
        { label: "Storage", value: "48GB NVMe SSD" },
        { label: "Additional Ports", value: "4" },
        { label: "Database Space", value: "4" },
        { label: "Backups Limit", value: "4" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Iron",
      price: "₹420",
      features: [
        { label: "CPU", value: "5 vCores High Frequency" },
        { label: "RAM", value: "12GB DDR4 ECC" },
        { label: "Storage", value: "60GB NVMe SSD" },
        { label: "Additional Ports", value: "5" },
        { label: "Database Space", value: "5" },
        { label: "Backups Limit", value: "5" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Diamond",
      price: "₹600",
      features: [
        { label: "CPU", value: "6 vCores High Frequency" },
        { label: "RAM", value: "16GB DDR4 ECC" },
        { label: "Storage", value: "72GB NVMe SSD" },
        { label: "Additional Ports", value: "6" },
        { label: "Database Space", value: "6" },
        { label: "Backups Limit", value: "6" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Netherite",
      price: "₹900",
      features: [
        { label: "CPU", value: "7 vCores High Frequency" },
        { label: "RAM", value: "24GB DDR4 ECC" },
        { label: "Storage", value: "96GB NVMe SSD" },
        { label: "Additional Ports", value: "7" },
        { label: "Database Space", value: "7" },
        { label: "Backups Limit", value: "7" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
    {
      name: "Furious – Obsidian",
      price: "₹1200",
      features: [
        { label: "CPU", value: "8 vCores High Frequency" },
        { label: "RAM", value: "32GB DDR4 ECC" },
        { label: "Storage", value: "108GB NVMe SSD" },
        { label: "Additional Ports", value: "8" },
        { label: "Database Space", value: "8" },
        { label: "Backups Limit", value: "8" },
        { label: "Aternos Features", value: "Included" },
        { label: "Uptime", value: "100%" },
        { label: "Support", value: "24/7" },
      ],
    },
  ];

  const discordPlans = [
    {
      name: "Basic",
      price: "₹10",
      features: [
        { label: "RAM", value: "124MB DDR4 ECC" },
        { label: "CPU", value: "20%" },
        { label: "Storage", value: "512MB NVMe SSD" },
        { label: "MySQL Databases", value: "1" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "1" },
      ],
    },
    {
      name: "Common",
      price: "₹17",
      features: [
        { label: "RAM", value: "256MB DDR4 ECC" },
        { label: "CPU", value: "45%" },
        { label: "Storage", value: "1024MB NVMe SSD" },
        { label: "MySQL Databases", value: "1" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "1" },
      ],
    },
    {
      name: "Uncommon",
      price: "₹34",
      features: [
        { label: "RAM", value: "512MB DDR4 ECC" },
        { label: "CPU", value: "75%" },
        { label: "Storage", value: "2048MB NVMe SSD" },
        { label: "MySQL Databases", value: "2" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "2" },
      ],
      popular: true,
    },
    {
      name: "Epic",
      price: "₹70",
      features: [
        { label: "RAM", value: "1024MB DDR4 ECC" },
        { label: "CPU", value: "100%" },
        { label: "Storage", value: "4096MB NVMe SSD" },
        { label: "MySQL Databases", value: "3" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "2" },
      ],
    },
    {
      name: "Rare",
      price: "₹140",
      features: [
        { label: "RAM", value: "2048MB DDR4 ECC" },
        { label: "CPU", value: "150%" },
        { label: "Storage", value: "6144MB NVMe SSD" },
        { label: "MySQL Databases", value: "4" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "4" },
      ],
    },
    {
      name: "Developer",
      price: "₹260",
      features: [
        { label: "RAM", value: "4096MB DDR4 ECC" },
        { label: "CPU", value: "200%" },
        { label: "Storage", value: "8192MB NVMe SSD" },
        { label: "MySQL Databases", value: "4" },
        { label: "Network", value: "1 Gbps Connection" },
        { label: "Location", value: "Germany" },
        { label: "Backup", value: "5" },
      ],
    },
  ];

  const vpsPlans = [
    {
      name: "Intel 16GB",
      price: "₹600",
      features: [
        { label: "RAM", value: "16GB DDR4" },
        { label: "CPU", value: "6 Cores" },
        { label: "Disk", value: "100GB NVMe SSD" },
        { label: "Bandwidth", value: "Unmetered" },
        { label: "Processor", value: "Intel Xeon E5-2690 v2" },
        { label: "Location", value: "India – Noida" },
        { label: "Protection", value: "DDoS Standard" },
      ],
    },
    {
      name: "Intel 32GB",
      price: "₹1000",
      features: [
        { label: "RAM", value: "32GB DDR4" },
        { label: "CPU", value: "12 Cores" },
        { label: "Disk", value: "200GB NVMe SSD" },
        { label: "Bandwidth", value: "Unmetered" },
        { label: "Processor", value: "Intel Xeon E5-2690 v2" },
        { label: "Location", value: "India – Noida" },
        { label: "Protection", value: "DDoS Standard" },
      ],
      popular: true,
    },
    {
      name: "Intel 48GB",
      price: "₹1400",
      features: [
        { label: "RAM", value: "48GB DDR4" },
        { label: "CPU", value: "18 Cores" },
        { label: "Disk", value: "300GB NVMe SSD" },
        { label: "Bandwidth", value: "Unmetered" },
        { label: "Processor", value: "Intel Xeon E5-2690 v2" },
        { label: "Location", value: "India – Noida" },
        { label: "Protection", value: "DDoS Standard" },
      ],
    },
    {
      name: "Intel 64GB",
      price: "₹1800",
      features: [
        { label: "RAM", value: "64GB DDR4" },
        { label: "CPU", value: "26 Cores" },
        { label: "Disk", value: "400GB NVMe SSD" },
        { label: "Bandwidth", value: "Unmetered" },
        { label: "Processor", value: "Intel Xeon E5-2690 v2" },
        { label: "Location", value: "India – Noida" },
        { label: "Protection", value: "DDoS Standard" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect Plan</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium hosting solutions for every need. All plans include 100% uptime guarantee and 24/7 support.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="minecraft">Minecraft</TabsTrigger>
              <TabsTrigger value="discord">Discord Bot</TabsTrigger>
              <TabsTrigger value="vps">VPS</TabsTrigger>
            </TabsList>

            <TabsContent value="minecraft" className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Minecraft Server Hosting</h2>
                <p className="text-muted-foreground">High-performance servers for your Minecraft community</p>
              </div>
              
              <PlanCalculator planType="minecraft" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {minecraftPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    name={plan.name}
                    price={plan.price}
                    features={plan.features}
                    popular={plan.popular}
                    variant="minecraft"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discord" className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">Discord Bot Hosting</h2>
                <p className="text-muted-foreground">Reliable hosting for your Discord bots in Germany</p>
              </div>
              
              <PlanCalculator planType="discord" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discordPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    name={plan.name}
                    price={plan.price}
                    features={plan.features}
                    popular={plan.popular}
                    variant="discord"
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="vps" className="mt-0">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2">VPS Hosting</h2>
                <p className="text-muted-foreground">Enterprise-grade VPS with Intel Xeon processors in India</p>
              </div>
              
              <PlanCalculator planType="vps" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vpsPlans.map((plan, index) => (
                  <PricingCard
                    key={index}
                    name={plan.name}
                    price={plan.price}
                    features={plan.features}
                    popular={plan.popular}
                    variant="vps"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Plans;
