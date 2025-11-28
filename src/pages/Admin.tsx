import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Users, Ticket, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TicketType {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
  user_id: string;
}

interface ProfileType {
  id: string;
  user_id: string;
  name: string | null;
  discord_username: string | null;
  created_at: string;
}

interface UserRoleType {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const [userRoles, setUserRoles] = useState<UserRoleType[]>([]);
  const [editingTicket, setEditingTicket] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadAllData();
    } catch (error: any) {
      toast.error("Failed to verify admin access");
      navigate("/");
    }
  };

  const loadAllData = async () => {
    try {
      const [ticketsRes, profilesRes, rolesRes] = await Promise.all([
        supabase.from("tickets").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("*"),
      ]);

      if (ticketsRes.error) throw ticketsRes.error;
      if (profilesRes.error) throw profilesRes.error;
      if (rolesRes.error) throw rolesRes.error;

      setTickets(ticketsRes.data || []);
      setProfiles(profilesRes.data || []);
      setUserRoles(rolesRes.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("tickets")
        .update({ 
          status: status as "open" | "in_progress" | "resolved" | "closed",
          resolved_at: status === "resolved" ? new Date().toISOString() : null 
        })
        .eq("id", ticketId);

      if (error) throw error;
      toast.success("Ticket status updated");
      await loadAllData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update ticket");
    }
  };

  const updateTicketNotes = async (ticketId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("tickets")
        .update({ admin_notes: notes })
        .eq("id", ticketId);

      if (error) throw error;
      toast.success("Admin notes updated");
      setEditingTicket(null);
      await loadAllData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update notes");
    }
  };

  const getUserRole = (userId: string) => {
    const role = userRoles.find(r => r.user_id === userId);
    return role?.role || "user";
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      in_progress: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      resolved: "bg-green-500/10 text-green-500 border-green-500/20",
      closed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      urgent: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return colors[priority] || colors.medium;
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage tickets, users, and system settings</p>
          </div>
        </div>

        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tickets">
              <Ticket className="h-4 w-4 mr-2" />
              Tickets ({tickets.length})
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users ({profiles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="mt-6">
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{ticket.title}</CardTitle>
                        <CardDescription>
                          User ID: {ticket.user_id.slice(0, 8)}... • Created: {new Date(ticket.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Description:</p>
                      <p className="text-sm text-muted-foreground">{ticket.description}</p>
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingTicket(editingTicket === ticket.id ? null : ticket.id)}
                      >
                        {editingTicket === ticket.id ? "Cancel" : "Add Notes"}
                      </Button>
                    </div>

                    {editingTicket === ticket.id && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Admin notes..."
                          defaultValue={ticket.admin_notes || ""}
                          id={`notes-${ticket.id}`}
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const textarea = document.getElementById(`notes-${ticket.id}`) as HTMLTextAreaElement;
                            updateTicketNotes(ticket.id, textarea.value);
                          }}
                        >
                          Save Notes
                        </Button>
                      </div>
                    )}

                    {ticket.admin_notes && !editingTicket && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Admin Notes:</p>
                        <p className="text-sm text-muted-foreground">{ticket.admin_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {tickets.length === 0 && (
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tickets found</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="space-y-4">
              {profiles.map((profile) => (
                <Card key={profile.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{profile.name || "Unnamed User"}</CardTitle>
                        <CardDescription>
                          ID: {profile.user_id.slice(0, 8)}... • Joined: {new Date(profile.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{getUserRole(profile.user_id)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {profile.discord_username && (
                      <p className="text-sm text-muted-foreground">
                        Discord: {profile.discord_username}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}

              {profiles.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No users found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
