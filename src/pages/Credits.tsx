import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Coins, CheckCircle, Clock, Trophy, Zap } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface DailyTask {
  id: string;
  title: string;
  description: string;
  credits_reward: number;
  daily_limit: number;
  created_at: string;
}

interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completed_at: string;
}

interface UserCredits {
  id: string;
  user_id: string;
  credits: number;
  created_at: string;
  updated_at: string;
}

const Credits = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch user credits
  const { data: creditsData } = useQuery<UserCredits | null>({
    queryKey: ["userCredits", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("user_credits" as any)
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        // No credits record, create one
        const { data: newData, error: insertError } = await supabase
          .from("user_credits" as any)
          .insert({ user_id: user.id, credits: 0 })
          .select()
          .single();
        
        if (insertError) throw insertError;
        return newData as unknown as UserCredits;
      }
      
      return data as unknown as UserCredits;
    },
    enabled: !!user,
  });

  // Fetch daily tasks
  const { data: tasks } = useQuery<DailyTask[]>({
    queryKey: ["dailyTasks"],
    queryFn: async () => {
      const { data, error} = await supabase
        .from("daily_tasks" as any)
        .select("*")
        .order("credits_reward", { ascending: false });
      
      if (error) throw error;
      return data as unknown as DailyTask[];
    },
  });

  // Fetch today's task completions
  const { data: completions } = useQuery<TaskCompletion[]>({
    queryKey: ["taskCompletions", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("task_completions" as any)
        .select("*")
        .eq("user_id", user.id)
        .gte("completed_at", today.toISOString());
      
      if (error) throw error;
      return data as unknown as TaskCompletion[];
    },
    enabled: !!user,
  });

  // Complete task mutation
  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      if (!user) throw new Error("Not authenticated");
      
      const task = tasks?.find(t => t.id === taskId);
      if (!task) throw new Error("Task not found");
      
      // Check if task is already completed today
      const taskCompletions = completions?.filter(c => c.task_id === taskId) || [];
      if (taskCompletions.length >= task.daily_limit) {
        throw new Error("Daily limit reached for this task");
      }
      
      // Insert task completion
      const { error: completionError } = await supabase
        .from("task_completions" as any)
        .insert({ user_id: user.id, task_id: taskId });
      
      if (completionError) throw completionError;
      
      // Update user credits
      const { error: creditError } = await supabase
        .from("user_credits" as any)
        .update({ 
          credits: (creditsData?.credits || 0) + task.credits_reward 
        })
        .eq("user_id", user.id);
      
      if (creditError) throw creditError;
      
      return task.credits_reward;
    },
    onSuccess: (reward) => {
      toast.success(`Earned ${reward} credits!`);
      queryClient.invalidateQueries({ queryKey: ["userCredits"] });
      queryClient.invalidateQueries({ queryKey: ["taskCompletions"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const getTaskProgress = (task: DailyTask) => {
    const taskCompletions = completions?.filter(c => c.task_id === task.id) || [];
    return {
      completed: taskCompletions.length,
      total: task.daily_limit,
      percentage: (taskCompletions.length / task.daily_limit) * 100,
    };
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 bg-card/50 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-primary/20 flex items-center justify-center">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-4xl mb-4">
                Credits & Tasks
              </CardTitle>
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-primary/20 border border-primary/30">
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  COMING SOON
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                We're working on an exciting credits system that will reward you for your engagement!
              </p>
              <p className="text-muted-foreground">
                Complete daily tasks, earn credits, and unlock premium features. Stay tuned for the launch!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Credits;
