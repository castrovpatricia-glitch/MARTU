-- MARTU cloud sync schema.
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
--
-- One row per user holding their entire app state as JSON (the same shape
-- the app already uses for its "export backup" feature). Simple, and enough
-- for a single person syncing between their own devices.

create table if not exists public.user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_data enable row level security;

create policy "Users can view own data"
  on public.user_data for select
  using (auth.uid() = user_id);

create policy "Users can insert own data"
  on public.user_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update own data"
  on public.user_data for update
  using (auth.uid() = user_id);
