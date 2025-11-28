import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server, Bot, HardDrive, Shield, Zap, Clock, MapPin, Headphones, Download, Settings, Activity, Users, Database } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const [activeService, setActiveService] = useState("minecraft");
  const [activePanelFeature, setActivePanelFeature] = useState("one-click");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  const mousePosition = useMouseParallax(30);
  const featuresReveal = useScrollReveal({ threshold: 0.2 });
  const showcaseReveal = useScrollReveal({ threshold: 0.1 });
  const panelReveal = useScrollReveal({ threshold: 0.1 });
  const whyChooseReveal = useScrollReveal({ threshold: 0.2 });
  const testimonialsReveal = useScrollReveal({ threshold: 0.2 });
  const faqReveal = useScrollReveal({ threshold: 0.2 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const features = [
    {
      icon: Shield,
      title: "DDoS Protection",
      description: "Enterprise-grade protection for your servers",
    },
    {
      icon: Zap,
      title: "NVMe SSD Storage",
      description: "Lightning-fast performance with NVMe drives",
    },
    {
      icon: Clock,
      title: "Instant Setup",
      description: "Get your server running in minutes",
    },
    {
      icon: MapPin,
      title: "India Location",
      description: "Low latency for Indian players",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help you succeed",
    },
    {
      icon: Server,
      title: "100% Uptime",
      description: "Reliable infrastructure you can trust",
    },
  ];

  const services = [
    {
      id: "minecraft",
      icon: Server,
      title: "Minecraft Hosting",
      description: "From ₹45/month",
      details: "8 powerful plans with high-frequency CPUs and NVMe SSD storage",
      link: "/plans#minecraft",
      gradient: "from-accent/20 to-transparent",
      border: "border-accent/50",
      showcase: {
        title: "Minecraft",
        subtitle: "Your World, Your Rules",
        description: "Premium Java & Bedrock servers with instant setup and plugin support",
        price: "₹45",
        priceUnit: "/GB",
        specs: [
          { label: "Ryzen 9, AMD EPYC", icon: Server },
          { label: "DDR5 RAM", icon: HardDrive },
          { label: "NVMe SSD", icon: Zap },
        ],
        features: [
          { label: "DDoS Protection", icon: Shield },
          { label: "Instant Setup", icon: Clock },
          { label: "24/7 Support", icon: Headphones },
        ],
      },
    },
    {
      id: "discord",
      icon: Bot,
      title: "Discord Bot Hosting",
      description: "From ₹10/month",
      details: "6 plans perfect for hosting your Discord bots in Germany",
      link: "/plans#discord",
      gradient: "from-primary/20 to-transparent",
      border: "border-primary/50",
      showcase: {
        title: "Discord Bot",
        subtitle: "24/7 Bot Uptime",
        description: "Reliable hosting for Discord bots with instant deployment and monitoring",
        price: "₹10",
        priceUnit: "/month",
        specs: [
          { label: "Germany Location", icon: MapPin },
          { label: "2GB RAM", icon: HardDrive },
          { label: "Instant Deploy", icon: Zap },
        ],
        features: [
          { label: "99.9% Uptime", icon: Shield },
          { label: "Auto Restart", icon: Clock },
          { label: "24/7 Support", icon: Headphones },
        ],
      },
    },
    {
      id: "vps",
      icon: HardDrive,
      title: "VPS Hosting",
      description: "From ₹629/month",
      details: "4 enterprise VPS plans with Intel Xeon processors in India",
      link: "/plans#vps",
      gradient: "from-secondary/20 to-transparent",
      border: "border-secondary/50",
      showcase: {
        title: "VPS Hosting",
        subtitle: "Enterprise Power",
        description: "Full-featured VPS with Intel Xeon processors and complete root access",
        price: "₹629",
        priceUnit: "/month",
        specs: [
          { label: "Intel Xeon CPU", icon: Server },
          { label: "16GB DDR4 RAM", icon: HardDrive },
          { label: "NVMe Storage", icon: Zap },
        ],
        features: [
          { label: "DDoS Protection", icon: Shield },
          { label: "Full Root Access", icon: Clock },
          { label: "India Location", icon: MapPin },
        ],
      },
    },
  ];

  const panelFeatures = [
    {
      id: "one-click",
      icon: Download,
      title: "One-Click Installs",
      description: "Install modpacks, plugins & game versions",
      gradient: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/50",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      image: "https://ateex.cloud/images/panel/plugin.png",
    },
    {
      id: "easy-config",
      icon: Settings,
      title: "Easy Configuration",
      description: "Manage settings, players & worlds",
      gradient: "from-green-500/20 to-green-600/20",
      border: "border-green-500/50",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
      image: "https://ateex.cloud/images/panel/easy.png",
    },
    {
      id: "monitoring",
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Performance metrics & analytics",
      gradient: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/50",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-500",
      image: "https://ateex.cloud/images/panel/Real-Time-Monitoring.png",
    },
    {
      id: "player-manager",
      icon: Users,
      title: "Player Manager",
      description: "Roles, bans & activity oversight",
      gradient: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/50",
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-500",
      image: "https://ateex.cloud/images/panel/player.png",
    },
    {
      id: "backups",
      icon: Database,
      title: "Backups & Mods",
      description: "Backups, mods & dependency checks",
      gradient: "from-cyan-500/20 to-cyan-600/20",
      border: "border-cyan-500/50",
      iconBg: "bg-cyan-500/20",
      iconColor: "text-cyan-500",
      image: "https://ateex.cloud/images/panel/plugin.png",
    },
  ];

  const currentService = services.find(s => s.id === activeService) || services[0];
  const currentPanelFeature = panelFeatures.find(f => f.id === activePanelFeature) || panelFeatures[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePosition.x}px, ${mousePosition.y + scrollY * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div 
            className="absolute inset-0 bg-background/90"
            style={{
              transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>

        <div 
          className="container mx-auto px-4 z-10 text-center"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: Math.max(1 - scrollY / 600, 0),
          }}
        >
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
              Furious Nodes
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-4 max-w-3xl mx-auto">
              Fast, Reliable & Affordable Hosting in India
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium Minecraft, Discord Bot & VPS Hosting with 100% uptime, NVMe SSD storage, and 24/7 support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/plans">View Plans</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-glow-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-muted/30 relative">
        <div 
          className="container mx-auto px-4"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 400) * -0.1)}px)`,
          }}
        >
          <div 
            ref={featuresReveal.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              featuresReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Furious Nodes</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide enterprise-grade hosting solutions with features that matter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-700 hover:shadow-card ${
                  featuresReveal.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transform: `translate(${mousePosition.x * (index % 2 === 0 ? 0.15 : -0.15)}px, ${mousePosition.y * 0.15 + Math.max(0, (scrollY - 600) * -0.05 * (index % 2 === 0 ? 1 : -1))}px)`,
                  transitionDelay: `${index * 100}ms`,
                  transition: 'all 0.3s ease-out',
                }}
              >
                <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Showcase Section */}
      <section ref={showcaseRef} className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3 + (scrollY - 1000) * 0.2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="container mx-auto px-4 relative z-10"
          style={{
            transform: `translateY(${Math.max(0, (scrollY - 1200) * -0.08)}px)`,
          }}
        >
          <div 
            ref={showcaseReveal.ref}
            className={`text-center mb-12 transition-all duration-700 ${
              showcaseReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Premium Hosting Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 mt-2">
              Power Up <span className="bg-gradient-primary bg-clip-text text-transparent">Your Hosting</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ultra-low latency servers with premium hardware and 24/7 support
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Available Services */}
            <div 
              className="lg:w-1/3"
              style={{
                transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * 0.2}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="rounded-xl border border-border bg-card backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-border">
                  <div className="flex items-center gap-2 text-foreground">
                    <Server className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">Available Services</h3>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {services.map((service, index) => {
                    const Icon = service.icon;
                    const isActive = activeService === service.id;
                    const isPopular = index === 0;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveService(service.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-300 border group ${
                          isActive
                            ? 'bg-primary/10 border-primary/50 shadow-neon-blue' 
                            : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary animate-glow-pulse' : 'bg-muted-foreground'}`} />
                          <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} />
                          <span className="font-semibold">{service.title.replace(' Hosting', '')}</span>
                        </div>
                        {isPopular && (
                          <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/20 rounded-md">
                            Popular
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content - Dynamic Featured Service */}
            <div 
              className="lg:w-2/3"
              style={{
                transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="relative rounded-xl border border-primary/30 bg-card backdrop-blur-sm overflow-hidden group shadow-card">
                <div className="absolute top-0 right-0 z-10">
                  <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-bold rounded-bl-xl px-4 py-2 uppercase shadow-neon-blue">
                    {activeService === 'minecraft' ? 'Most Popular' : 'Featured'}
                  </div>
                </div>
                
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shadow-neon-blue">
                      {activeService === 'minecraft' && <Server className="w-8 h-8 text-primary" />}
                      {activeService === 'discord' && <Bot className="w-8 h-8 text-primary" />}
                      {activeService === 'vps' && <HardDrive className="w-8 h-8 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold">{currentService.showcase.title}</h3>
                      <p className="text-primary font-semibold">{currentService.showcase.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-8 text-base">
                    {currentService.showcase.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-primary" />
                        <span className="font-bold text-sm text-foreground">Server Specifications</span>
                      </div>
                      <div className="space-y-2">
                        {currentService.showcase.specs.map((spec, idx) => {
                          const SpecIcon = spec.icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 text-sm bg-muted/30 rounded-lg p-3 border border-border/50">
                              <SpecIcon className="w-4 h-4 text-primary" />
                              <span className="text-foreground">{spec.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-accent" />
                        <span className="font-bold text-sm text-foreground">Features</span>
                      </div>
                      <div className="space-y-2">
                        {currentService.showcase.features.map((feature, idx) => {
                          const FeatureIcon = feature.icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 text-sm bg-muted/30 rounded-lg p-3 border border-border/50">
                              <FeatureIcon className="w-4 h-4 text-accent" />
                              <span className="text-foreground">{feature.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6 border-t border-border/50">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                      <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {currentService.showcase.price}<span className="text-xl text-muted-foreground">{currentService.showcase.priceUnit}</span>
                      </p>
                    </div>
                    <Button asChild size="lg" variant="hero" className="w-full sm:w-auto">
                      <Link to={currentService.link} className="flex items-center gap-2">
                        Get Started
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Decorative background effect */}
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel Showcase Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div 
            ref={panelReveal.ref}
            className={`text-center mb-16 transition-all duration-700 ${
              panelReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <span className="text-sm font-medium text-primary">Our Game Panel</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Meet the <span className="bg-gradient-primary bg-clip-text text-transparent">Furious Nodes</span> Panel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our intuitive control panel makes managing your game servers effortless. Designed for both beginners and experts, with all the tools you need in one place.
            </p>
          </div>

          <div 
            className={`grid lg:grid-cols-2 gap-8 items-start transition-all duration-700 ${
              panelReveal.isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Left side - Feature cards */}
            <div className="space-y-4">
              {panelFeatures.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activePanelFeature === feature.id;
                
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActivePanelFeature(feature.id)}
                    className={`
                      group cursor-pointer p-6 rounded-xl border transition-all duration-300
                      ${isActive 
                        ? `bg-gradient-to-r ${feature.gradient} ${feature.border} shadow-lg` 
                        : 'bg-card/50 border-border/50 hover:border-border hover:bg-card/80'
                      }
                      backdrop-blur
                    `}
                    style={{ transitionDelay: `${(index + 1) * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`
                        p-3 rounded-lg transition-all duration-300
                        ${isActive ? feature.iconBg : 'bg-muted group-hover:bg-muted/80'}
                      `}>
                        <Icon className={`w-6 h-6 ${isActive ? feature.iconColor : 'text-foreground'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                          {feature.title}
                          <svg 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isActive ? 'rotate-0' : 'rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0'
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side - Screenshot display */}
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur p-6 shadow-2xl">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{currentPanelFeature.title}</h3>
                  <p className="text-muted-foreground">{currentPanelFeature.description}</p>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-muted/50">
                  <img 
                    key={currentPanelFeature.id}
                    src={currentPanelFeature.image} 
                    alt={currentPanelFeature.title}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
                
                {/* Decorative glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${currentPanelFeature.gradient} opacity-20 blur-xl -z-10 transition-all duration-500`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              ref={faqReveal.ref}
              className={`text-center mb-12 transition-all duration-700 ${
                faqReveal.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our hosting services
              </p>
            </div>

            <Accordion 
              type="single" 
              collapsible 
              className={`space-y-4 transition-all duration-700 ${
                faqReveal.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  What makes Furious Nodes different from other hosting providers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer enterprise-grade hardware with NVMe SSD storage and high-frequency processors at competitive prices. Our servers are located in India for optimal latency, and we provide 24/7 support, DDoS protection, and 100% uptime guarantee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  How quickly can I get my server up and running?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Your server will be deployed instantly after payment confirmation. You'll receive login credentials and can start configuring your server within minutes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  Do you offer refunds if I'm not satisfied?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we offer a 24-hour money-back guarantee for all our hosting plans. If you're not satisfied with our service within the first 24 hours, contact our support team for a full refund.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept UPI, debit/credit cards, net banking, and popular digital wallets. All payments are processed securely through our payment gateway.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  Can I upgrade my plan later?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! You can upgrade your plan at any time. The upgrade is instant, and you'll only pay the prorated difference for the remaining billing period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  Where are your servers located?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our Minecraft and VPS servers are located in Noida, India, providing excellent latency for Indian users. Discord bot hosting is located in Germany for global performance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  Is DDoS protection included in all plans?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, all our hosting plans come with standard DDoS protection to keep your servers safe from attacks. We monitor and mitigate threats 24/7 to ensure maximum uptime.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur">
                <AccordionTrigger className="text-left hover:no-underline">
                  How does the backup system work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Each plan includes automatic backups based on your plan tier. You can create, restore, and download backups anytime through your control panel. Backups are stored securely and can be restored with one click.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div 
          ref={whyChooseReveal.ref}
          className={`container mx-auto px-4 text-center transition-all duration-700 ${
            whyChooseReveal.isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers using Furious Nodes for their hosting needs
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/plans">Choose Your Plan</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
