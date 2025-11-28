import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Ticket } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { CreateTicketDialog } from "@/components/CreateTicketDialog";
import { TicketCard } from "@/components/TicketCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

const Tickets = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      loadTickets(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadTickets = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = (status: string) => {
    if (status === "all") return tickets;
    return tickets.filter((t) => t.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Support Tickets</h1>
              <p className="text-muted-foreground">
                Manage your support requests and track their status
              </p>
            </div>
          </div>
          <CreateTicketDialog onTicketCreated={() => user && loadTickets(user.id)} />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({tickets.length})
            </TabsTrigger>
            <TabsTrigger value="open">
              Open ({filterTickets("open").length})
            </TabsTrigger>
            <TabsTrigger value="in_progress">
              In Progress ({filterTickets("in_progress").length})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({filterTickets("resolved").length})
            </TabsTrigger>
            <TabsTrigger value="closed">
              Closed ({filterTickets("closed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first support ticket to get started
                </p>
                <CreateTicketDialog onTicketCreated={() => user && loadTickets(user.id)} />
              </div>
            ) : (
              <div className="grid gap-4">
                {tickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </TabsContent>

          {["open", "in_progress", "resolved", "closed"].map((status) => (
            <TabsContent key={status} value={status} className="mt-6">
              <div className="grid gap-4">
                {filterTickets(status).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No {status.replace("_", " ")} tickets</p>
                  </div>
                ) : (
                  filterTickets(status).map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Tickets;
