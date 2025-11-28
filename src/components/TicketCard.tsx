import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

interface TicketCardProps {
  ticket: Ticket;
}

const statusColors = {
  open: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  in_progress: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  resolved: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  closed: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
};

const priorityColors = {
  low: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20",
  medium: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  high: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  urgent: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

export const TicketCard = ({ ticket }: TicketCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">{ticket.title}</CardTitle>
          <div className="flex gap-2 flex-shrink-0">
            <Badge variant="outline" className={statusColors[ticket.status as keyof typeof statusColors]}>
              {ticket.status.replace("_", " ")}
            </Badge>
            <Badge variant="outline" className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
              {ticket.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">{ticket.description}</p>
        {ticket.admin_notes && (
          <div className="bg-muted/50 p-3 rounded-md">
            <p className="text-xs font-medium text-muted-foreground mb-1">Admin Response:</p>
            <p className="text-sm">{ticket.admin_notes}</p>
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}</span>
          <span>Updated {formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true })}</span>
        </div>
      </CardContent>
    </Card>
  );
};
