import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    discordUsername: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const webhookUrl = "https://discord.com/api/webhooks/1439428506454065333/LCuzd-vDELB2B5X68_DYN-q13iEf27_yZz1ThWlyFaeBHSM3JBZTsAIuPYevh-GaWZZQ";
      
      const embed = {
        title: "📬 New Contact Form Submission",
        color: 0x3b82f6,
        fields: [
          { name: "Name", value: formData.name, inline: true },
          { name: "Email", value: formData.email, inline: true },
          { name: "Discord Username", value: formData.discordUsername || "Not provided", inline: true },
          { name: "Subject", value: formData.subject, inline: false },
          { name: "Message", value: formData.message, inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Furious Nodes Contact Form" }
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [embed] })
      });

      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "", discordUsername: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team anytime.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <CardTitle>Email Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">General inquiries</p>
                  <a href="mailto:contact@furiousnodes.xyz" className="text-primary hover:underline">
                    contact@furiousnodes.xyz
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <CardTitle>Discord Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Join our community</p>
                  <a href="https://discord.gg/R2vAcXj7gP" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Join Discord Server
                  </a>
                </CardContent>
              </Card>

              <div className="p-6 bg-gradient-primary rounded-lg">
                <h3 className="text-xl font-bold text-primary-foreground mb-2">Quick Response</h3>
                <p className="text-primary-foreground/90 text-sm">
                  Our support team typically responds within 2-4 hours during business hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discordUsername">Discord Username (Optional)</Label>
                      <Input
                        id="discordUsername"
                        name="discordUsername"
                        placeholder="username#0000"
                        value={formData.discordUsername}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" variant="hero" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
