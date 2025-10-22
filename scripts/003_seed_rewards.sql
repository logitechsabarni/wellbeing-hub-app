-- Seed rewards table with sample rewards
INSERT INTO rewards (title, description, category, tokens_cost, is_popular) VALUES
  ('Coffee Break', 'Enjoy a free coffee at your favorite cafe', 'Food & Drink', 50, true),
  ('Movie Night', 'Watch a movie of your choice', 'Entertainment', 100, true),
  ('Massage Session', 'Relax with a 30-minute massage', 'Wellness', 200, true),
  ('Book', 'Get a new book to read', 'Learning', 75, false),
  ('Gym Pass', 'One month free gym membership', 'Fitness', 150, false),
  ('Spa Day', 'Full day spa experience', 'Wellness', 300, false),
  ('Concert Ticket', 'Attend a live concert', 'Entertainment', 250, false),
  ('Cooking Class', 'Learn to cook a new cuisine', 'Learning', 120, false),
  ('Weekend Getaway', 'Plan a weekend trip', 'Travel', 500, false),
  ('Gaming Console', 'Latest gaming console', 'Entertainment', 1000, false)
ON CONFLICT DO NOTHING;
