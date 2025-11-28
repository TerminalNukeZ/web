import { Server, Users, Zap, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Server,
      title: "Premium Infrastructure",
      description: "We use enterprise-grade hardware with NVMe SSD storage and high-frequency processors to ensure blazing-fast performance for all our hosting services.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our 24/7 support team is always ready to help. We believe in building long-term relationships with our customers through excellent service.",
    },
    {
      icon: Zap,
      title: "Innovation Driven",
      description: "We constantly upgrade our infrastructure and adopt the latest technologies to provide you with the best hosting experience possible.",
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description: "With DDoS protection, regular backups, and 100% uptime guarantee, your data and services are always safe and accessible.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Furious Nodes</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're passionate about providing fast, reliable, and affordable hosting solutions to businesses and gamers across India.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Furious Nodes was founded with a simple mission: to make premium hosting accessible to everyone in India. We noticed that many hosting providers either charged premium prices or compromised on quality, and we knew there had to be a better way.
              </p>
              <p>
                Starting with Minecraft server hosting, we've grown to offer a comprehensive suite of hosting solutions including Discord bot hosting and VPS services. What sets us apart is our commitment to using enterprise-grade hardware while keeping our prices competitive.
              </p>
              <p>
                Our infrastructure is strategically located in India, ensuring low latency for local users while maintaining connections to global networks. We invest heavily in DDoS protection, NVMe SSD storage, and high-frequency processors to deliver the performance our customers deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're more than just a hosting provider – we're your technology partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-card border border-border rounded-lg">
                <value.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Datacenter Advantage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Indian Datacenter Advantage</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-card border border-primary/20 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">&lt;10ms</div>
                <div className="text-sm text-muted-foreground">Latency for Indian users</div>
              </div>
              <div className="p-6 bg-card border border-accent/20 rounded-lg">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Uptime guarantee</div>
              </div>
              <div className="p-6 bg-card border border-secondary/20 rounded-lg">
                <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
