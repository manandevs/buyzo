-- ---------------------------------------------------------------------------
-- Helper: JWT subject (Clerk third‑party auth or Supabase Auth) + admin check
-- ---------------------------------------------------------------------------
create or replace function public.requesting_user_id()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'sub', auth.uid()::text);
$$;

create or replace function public.is_app_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users u
    where u.id = public.requesting_user_id()
      and u.role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- order_items
-- ---------------------------------------------------------------------------
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id),
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null check (price >= 0),
  variation jsonb,
  created_at timestamptz not null default now()
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

alter table public.order_items enable row level security;

-- Read: admins, or owner of the parent order (matches orders.user_id to JWT sub)
create policy "order_items_select_own_or_admin"
  on public.order_items
  for select
  using (
    public.is_app_admin()
    or exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and o.user_id = public.requesting_user_id()
    )
  );

-- Inserts: same as select (e.g. checkout attaching lines to your order)
create policy "order_items_insert_own_or_admin"
  on public.order_items
  for insert
  with check (
    public.is_app_admin()
    or exists (
      select 1
      from public.orders o
      where o.id = order_items.order_id
        and o.user_id = public.requesting_user_id()
    )
  );

-- Updates / deletes: admins only (tighten or extend if clients may edit carts)
create policy "order_items_update_admin"
  on public.order_items
  for update
  using (public.is_app_admin())
  with check (public.is_app_admin());

create policy "order_items_delete_admin"
  on public.order_items
  for delete
  using (public.is_app_admin());

-- ---------------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  author_id text references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_published_idx on public.blog_posts (published);

alter table public.blog_posts enable row level security;

-- Public (anon + authenticated): published posts only
create policy "blog_posts_select_published"
  on public.blog_posts
  for select
  using (published = true or public.is_app_admin());

create policy "blog_posts_insert_admin"
  on public.blog_posts
  for insert
  with check (public.is_app_admin());

create policy "blog_posts_update_admin"
  on public.blog_posts
  for update
  using (public.is_app_admin())
  with check (public.is_app_admin());

create policy "blog_posts_delete_admin"
  on public.blog_posts
  for delete
  using (public.is_app_admin());

-- ---------------------------------------------------------------------------
-- Storefront product columns (slug, filters, variants)
-- ---------------------------------------------------------------------------
alter table public.products add column if not exists slug text unique;
alter table public.products add column if not exists variations text[];
alter table public.products add column if not exists product_type text;
alter table public.products add column if not exists material text;
create index if not exists products_slug_idx on public.products (slug);