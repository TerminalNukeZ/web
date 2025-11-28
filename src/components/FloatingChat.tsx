import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const FloatingChat = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadMessages(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadMessages(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(50);

    if (error) {
      console.error("Failed to load messages:", error);
      return;
    }

    setMessages((data || []) as Message[]);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    try {
      const { data: savedMessage, error: saveError } = await supabase
        .from("chat_messages")
        .insert({
          user_id: user.id,
          role: "user",
          content: userMessage,
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setMessages((prev) => [...prev, savedMessage as Message]);

      const { data: aiResponse, error: aiError } = await supabase.functions.invoke("chat", {
        body: { message: userMessage },
      });

      if (aiError) throw aiError;

      const { data: savedAiMessage, error: saveAiError } = await supabase
        .from("chat_messages")
        .insert({
          user_id: user.id,
          role: "assistant",
          content: aiResponse.response,
        })
        .select()
        .single();

      if (saveAiError) throw saveAiError;

      setMessages((prev) => [...prev, savedAiMessage as Message]);
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    if (!user) {
      toast.error("Please sign in to use live chat");
      navigate("/auth");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-neon-blue hover:scale-110 transition-transform z-50"
          variant="hero"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-primary/20 flex flex-col z-50 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
              <h3 className="font-semibold text-primary-foreground">Furious AI Chat</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Start chatting with Furious AI</p>
                  <p className="text-xs mt-1">Ask about our hosting services!</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default FloatingChat;