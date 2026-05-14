-- Enable RLS on user-scoped tables

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stones ENABLE ROW LEVEL SECURITY;
ALTER TABLE hp_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_draw_logs ENABLE ROW LEVEL SECURITY;

-- profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid()::text = id);

-- stones: users can CRUD their own stones
CREATE POLICY "Users can view own stones"
  ON stones FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own stones"
  ON stones FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own stones"
  ON stones FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own stones"
  ON stones FOR DELETE
  USING (auth.uid()::text = user_id);

-- hp_logs: users can view their own logs
CREATE POLICY "Users can view own hp_logs"
  ON hp_logs FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own hp_logs"
  ON hp_logs FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- memory_draw_logs: users can view their own logs
CREATE POLICY "Users can view own memory_draw_logs"
  ON memory_draw_logs FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own memory_draw_logs"
  ON memory_draw_logs FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- skins & achievements: public read (shared data)
ALTER TABLE skins ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view skins"
  ON skins FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  USING (true);
