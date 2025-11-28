-- Create user_credits table
CREATE TABLE public.user_credits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily_tasks table
CREATE TABLE public.daily_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_name TEXT NOT NULL,
  description TEXT NOT NULL,
  credits_reward INTEGER NOT NULL,
  daily_limit INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create task_completions table
CREATE TABLE public.task_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  task_id UUID NOT NULL REFERENCES public.daily_tasks(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_credits
CREATE POLICY "Users can view their own credits"
  ON public.user_credits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credits"
  ON public.user_credits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON public.user_credits FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for daily_tasks (public read)
CREATE POLICY "Anyone can view daily tasks"
  ON public.daily_tasks FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage daily tasks"
  ON public.daily_tasks FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for task_completions
CREATE POLICY "Users can view their own completions"
  ON public.task_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own completions"
  ON public.task_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_user_credits_updated_at
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default daily tasks
INSERT INTO public.daily_tasks (task_name, description, credits_reward, daily_limit) VALUES
  ('Join Discord Server', 'Join our Discord community and get rewarded!', 50, 1),
  ('Share on Social Media', 'Share our service on your social media', 30, 3),
  ('Watch Tutorial Video', 'Watch our tutorial videos', 20, 5),
  ('Invite a Friend', 'Invite friends to join our platform', 100, 10),
  ('Complete Daily Survey', 'Fill out our daily feedback survey', 25, 1),
  ('Visit Partner Site', 'Visit one of our partner websites', 15, 5),
  ('Write a Review', 'Write a review about our service', 75, 1),
  ('Join Newsletter', 'Subscribe to our newsletter', 40, 1),
  ('Follow on Twitter', 'Follow us on Twitter/X', 35, 1),
  ('Rate Us on Trustpilot', 'Leave a rating on Trustpilot', 60, 1);