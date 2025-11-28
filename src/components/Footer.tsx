import { Link } from "react-router-dom";
import logo from "@/assets/furious-nodes-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Furious Nodes" className="h-10 w-10" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Furious Nodes
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Fast, reliable & affordable hosting in India. We provide Minecraft Server Hosting, Discord Bot Hosting, and VPS Hosting with 24/7 support.
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-xs text-primary">
                🇮🇳 Made in India
              </div>
              <div className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-md text-xs text-accent">
                ⚡ 100% Uptime
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Plans
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Minecraft Hosting</li>
              <li className="text-sm text-muted-foreground">Discord Bot Hosting</li>
              <li className="text-sm text-muted-foreground">VPS Hosting</li>
              <li className="text-sm text-muted-foreground">24/7 Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Furious Nodes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
