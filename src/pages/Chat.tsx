import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Loader2, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for OAuth errors in URL
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      toast.error(
        errorDescription?.includes('Unable to exchange external code')
          ? "Google sign-in failed. Please check your backend Google OAuth settings."
          : "Authentication failed. Please try signing in again."
      );
      // Clean URL and redirect to auth
      window.history.replaceState({}, '', '/auth');
      navigate('/auth');
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadMessages(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, searchParams]);

  const loadMessages = async (userId: string) => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to load messages");
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
      // Save user message
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

      // Get AI response
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke("chat", {
        body: { message: userMessage },
      });

      if (aiError) throw aiError;

      // Save AI response
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Furious AI Chat</h1>
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">Start a conversation with Furious AI</p>
              <p className="text-sm mt-2">Ask me anything about our hosting services!</p>
            </div>
          )}
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`p-4 ${
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground max-w-[80%]"
                  : "mr-auto bg-card max-w-[80%]"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </Card>
          ))}
          {loading && (
            <Card className="p-4 mr-auto bg-card max-w-[80%]">
              <Loader2 className="h-5 w-5 animate-spin" />
            </Card>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-6">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
            placeholder="Type your message..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;