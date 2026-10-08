-- =============================================================
-- Ridoy Solutions Portfolio - Supabase production schema
-- 1) Create your Supabase project.
-- 2) Create your Auth user with the email you want to use as admin.
-- 3) Replace YOUR_ADMIN_EMAIL below and run this entire file in SQL Editor.
-- =============================================================

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users a
    where a.user_id = auth.uid()
  );
$$;

insert into public.admin_users (user_id, email)
select id, email from auth.users
where lower(email) = lower('basirulislam.hridoy05@gmail.com')
on conflict (user_id) do nothing;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  name text not null,
  designation text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  profile_image text not null default '',
  about_image text not null default '',
  resume_url text not null default '',
  facebook text not null default '',
  instagram text not null default '',
  twitter text not null default '',
  linkedin text not null default '',
  location text not null default '',
  bio text not null default '',
  about_text text not null default '',
  stats jsonb not null default '{"experience":"","projects":"","clients":""}'::jsonb,
  impact_stats jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  singleton boolean not null default true unique,
  site_title text not null default '',
  site_description text not null default '',
  hero_badge text not null default 'Digital Marketing Specialist',
  hero_cta text not null default 'View My Services',
  hero_secondary_cta text not null default 'Let’s Work Together',
  trust_label text not null default 'Trusted by Businesses Worldwide',
  footer_tagline text not null default 'More Traffic • More Leads • More Sales',
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'users',
  color text not null default '#168bff',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  issuer text not null default '',
  year text not null default '',
  image text not null default '',
  credential_url text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  title text not null,
  description text not null default '',
  metrics jsonb not null default '[]'::jsonb,
  visual text not null default 'google',
  challenge text not null default '',
  strategy jsonb not null default '[]'::jsonb,
  outcome text not null default '',
  before_stats jsonb not null default '[]'::jsonb,
  after_stats jsonb not null default '[]'::jsonb,
  card_image text not null default '',
  before_image text not null default '',
  after_image text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.case_studies
  add column if not exists card_image text not null default '';

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  company text not null default '',
  photo text not null default '',
  review text not null default '',
  rating integer not null default 5 check (rating between 1 and 5),
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.video_reviews (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  role text not null default '',
  company text not null default '',
  thumbnail text not null default '',
  video_url text not null default '',
  quote text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null,
  description text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text not null default '',
  message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  created_at timestamptz not null default now()
);

-- Public content is readable. Only admins can write.
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.certificates enable row level security;
alter table public.case_studies enable row level security;
alter table public.reviews enable row level security;
alter table public.video_reviews enable row level security;
alter table public.process_steps enable row level security;
alter table public.contact_messages enable row level security;
alter table public.admin_users enable row level security;

do $$
declare t text;
begin
  foreach t in array array['profiles','site_settings','services','certificates','case_studies','reviews','video_reviews','process_steps'] loop
    execute format('drop policy if exists "public read %s" on public.%I', t, t);
    execute format('create policy "public read %s" on public.%I for select using (true)', t, t);
    execute format('drop policy if exists "admin write %s" on public.%I', t, t);
    execute format('create policy "admin write %s" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end $$;

drop policy if exists "admin messages" on public.contact_messages;
create policy "admin messages" on public.contact_messages for select using (public.is_admin());
create policy "public create messages" on public.contact_messages for insert with check (true);
create policy "admin update messages" on public.contact_messages for update using (public.is_admin()) with check (public.is_admin());
create policy "admin delete messages" on public.contact_messages for delete using (public.is_admin());

drop policy if exists "admin read admins" on public.admin_users;
create policy "admin read admins" on public.admin_users for select using (public.is_admin());

insert into public.profiles (singleton, name, designation, email, whatsapp, profile_image, about_image, resume_url, facebook, instagram, twitter, linkedin, location, bio, about_text, stats, impact_stats)
values (true, 'Ridoy Ahmed', 'Digital Marketer | Growth Strategist', 'ridoysolutions@gmail.com', '+880 1792 462206', '/images/profile/profileImg.png', '/images/profile/about img.png', '/documents/resume.pdf', 'https://www.facebook.com/profile.php?id=61594845248560', 'https://www.instagram.com/ridoysolutions/', '', 'https://www.linkedin.com/in/ridoysolutions/', 'Rangpur, Bangladesh', 'I help businesses grow through data-driven digital marketing strategies, paid advertising, SEO, content strategy, and performance-focused execution.', 'I’m Ridoy Ahmed, a digital marketer and SEO specialist with a passion for helping businesses grow online. I focus on data-driven strategies, creative content, and effective SEO techniques to increase visibility, traffic, and sales.', '{"experience":"3+","projects":"100+","clients":"50+"}', '[{"value":150,"suffix":"+","label":"Projects Completed"},{"value":2,"suffix":"+","label":"Years Experience"},{"value":100,"suffix":"%","label":"Client Satisfaction"},{"value":25,"suffix":"+","label":"Global Clients"}]')
on conflict (singleton) do nothing;

insert into public.site_settings (singleton, site_title, site_description)
values (true, 'Ridoy Ahmed | Digital Marketer | Growth Strategist', 'Digital marketing portfolio of Ridoy Ahmed — Google Ads, Meta Ads, YouTube Ads, SEO, social media and performance-focused growth strategies.')
on conflict (singleton) do nothing;

insert into public.process_steps (number,title,description,sort_order)
select * from (values
('01','Research & Analysis','Understand your business, audience, market, and goals.',1),
('02','Strategy Planning','Create a focused marketing plan built around measurable goals.',2),
('03','Execution & Optimization','Launch campaigns, test ideas, and continuously improve performance.',3),
('04','Report & Growth','Track meaningful results and use insights to scale what works.',4)
) as x(number,title,description,sort_order)
where not exists (select 1 from public.process_steps);

-- Storage: one public bucket for portfolio images/files.
insert into storage.buckets (id, name, public)
values ('portfolio-media','portfolio-media',true)
on conflict (id) do update set public = true;

drop policy if exists "public media read" on storage.objects;
create policy "public media read" on storage.objects for select using (bucket_id = 'portfolio-media');
drop policy if exists "admin media insert" on storage.objects;
create policy "admin media insert" on storage.objects for insert with check (bucket_id = 'portfolio-media' and public.is_admin());
drop policy if exists "admin media update" on storage.objects;
create policy "admin media update" on storage.objects for update using (bucket_id = 'portfolio-media' and public.is_admin()) with check (bucket_id = 'portfolio-media' and public.is_admin());
drop policy if exists "admin media delete" on storage.objects;
create policy "admin media delete" on storage.objects for delete using (bucket_id = 'portfolio-media' and public.is_admin());

-- Seed current services/certificates/reviews/case studies from the existing frontend.
insert into public.services (title,description,icon,color,sort_order)
select * from (values
('Social Media Management','Plan, manage, publish, and optimize social content to build a consistent brand presence and stronger audience engagement.','users','#E1306C',1),
('Meta Ads','Plan, launch, test, and optimize Facebook and Instagram ad campaigns focused on qualified reach, leads, and sales.','facebook','#0866FF',2),
('Google Ads','Build and optimize search and performance campaigns around high-intent traffic, conversions, and measurable growth.','google','#4285F4',3),
('YouTube Marketing','Support channel setup, video SEO, content strategy, monetization, management, promotion, and YouTube Ads.','youtube','#FF0000',4),
('Local SEO','Improve local search visibility, Google Business presence, rankings, and discovery for customers ready to take action.','location','#34A853',5),
('Video Editing & Thumbnails','Create clean, engaging video edits and click-focused thumbnails that support stronger content performance and retention.','video','#F43F5E',6),
('Web Design & Development','Create modern, responsive, conversion-focused websites that support your brand, campaigns, and marketing goals.','code','#8B5CF6',7),
('Content Marketing','Build strategic content around audience needs, search intent, brand trust, and clear actions that support growth.','pen','#F59E0B',8)
) as x(title,description,icon,color,sort_order)
where not exists (select 1 from public.services);

insert into public.certificates (slug,title,issuer,year,image,description,sort_order)
select * from (values
('google-ads-display','Google Ads Display Certification','Google','2026','/images/certificates/ads display.jpg','Certification focused on display advertising strategy, campaign setup, audience targeting, and performance measurement.',1),
('google-ads-search','Google Ads Search Certification','Google','2026','/images/certificates/ads search.jpg','Certification focused on search campaign strategy, keyword intent, optimization, and performance-focused advertising.',2),
('google-ads-video','Google Ads Video Certification','Google','2026','/images/certificates/ads video.jpg','Certification focused on video advertising strategy, audience reach, campaign setup, and measurable growth.',3),
('social-media-marketing','Social Media Marketing Crash Course','Meta','2026','/images/certificates/social media.jpg','Training focused on social media strategy, content planning, audience growth, and performance marketing.',4),
('local-seo-semrush','Local SEO Essentials with Semrush','Semrush','2026','/images/certificates/local seo.jpg','Training focused on local search visibility, local optimization, and practical SEO workflows.',5),
('keyword-research-semrush','Keyword Research Essentials with Semrush','Semrush','2026','/images/certificates/keyword.jpg','Training focused on keyword research, search intent, topic discovery, and SEO planning.',6),
('on-page-seo-ai-search','On Page SEO and AI Search','Semrush','2026','/images/certificates/on page seo.jpg','Training focused on on-page SEO, content optimization, and adapting search strategy for AI-driven discovery.',7)
) as x(slug,title,issuer,year,image,description,sort_order)
where not exists (select 1 from public.certificates);

insert into public.reviews (name,role,company,review,rating,sort_order)
select * from (values
('Tanvir Rahman','CEO','TechForward','Ridoy''s campaign strategy brought us significantly more qualified leads in just a few months. Highly recommended.',5,1),
('Nusrat Jahan','Marketing Manager','TechHive','Professional, responsive, and results-driven. He understood our goals and delivered beyond expectations.',5,2),
('Sheikh Rafi','Founder','LocalBazaar','His SEO work helped us improve our search visibility and bring more relevant traffic to the website.',5,3)
) as x(name,role,company,review,rating,sort_order)
where not exists (select 1 from public.reviews);

insert into public.video_reviews (client_name,role,company,video_url,quote,sort_order)
select * from (values
('Client Video Review','Client','','https://www.youtube.com/embed/lapEzkx5In8','Add the client quote from the real testimonial here.',1),
('Client Video Review','Client','','https://www.youtube.com/embed/6unRPgLSJ8o','Add the client quote from the real testimonial here.',2)
) as x(client_name,role,company,video_url,quote,sort_order)
where not exists (select 1 from public.video_reviews);

insert into public.case_studies (slug,category,title,description,metrics,visual,challenge,strategy,outcome,before_stats,after_stats,card_image,before_image,after_image,sort_order)
select * from (values
('ecommerce-store-growth','Google Ads','E-commerce Store Growth','Improved sales efficiency with a focused search and shopping campaign strategy.','[{"label":"Sales","value":"+245%"},{"label":"ROAS","value":"3.8x"},{"label":"CPA","value":"-42%"}]'::jsonb,'google','The store needed more qualified search traffic and stronger purchase efficiency without scaling spend blindly.','["Search intent mapping","Shopping campaign restructuring","Conversion-focused landing pages","Weekly search-term optimization"]'::jsonb,'Higher sales volume with stronger efficiency across the core acquisition campaigns.','[{"label":"Sales","value":"100","note":"Baseline index"},{"label":"CPA","value":"$100","note":"Baseline cost"},{"label":"ROAS","value":"1.9x","note":"Starting point"}]'::jsonb,'[{"label":"Sales","value":"+245%","note":"Growth"},{"label":"CPA","value":"-42%","note":"Lower cost"},{"label":"ROAS","value":"3.8x","note":"Efficiency"}]'::jsonb,'','/images/case-studies/case-1-before.png','/images/case-studies/case-1-after.png',1),
('brand-awareness-campaign','Meta Ads','Brand Awareness Campaign','Expanded reach and engagement with creative testing and audience segmentation.','[{"label":"Reach","value":"+210%"},{"label":"ROAS","value":"3.8x"},{"label":"Engagement","value":"+68%"}]'::jsonb,'meta','The brand needed wider qualified reach while keeping creative testing and audience learning structured.','["Audience segmentation","Creative angle testing","Retargeting flows","Performance-led budget allocation"]'::jsonb,'A broader audience footprint with stronger engagement and measurable campaign efficiency.','[{"label":"Reach","value":"100","note":"Baseline index"},{"label":"Engagement","value":"1x","note":"Baseline"},{"label":"ROAS","value":"1.7x","note":"Starting point"}]'::jsonb,'[{"label":"Reach","value":"+210%","note":"Growth"},{"label":"Engagement","value":"+68%","note":"Growth"},{"label":"ROAS","value":"3.8x","note":"Efficiency"}]'::jsonb,'','/images/case-studies/case-2-before.png','/images/case-studies/case-2-after.png',2),
('seo-growth-strategy','SEO','SEO Growth Strategy','Built organic visibility through technical cleanup, content, and keyword strategy.','[{"label":"Organic Traffic","value":"+72%"},{"label":"Avg. Position","value":"#3"},{"label":"Keywords","value":"+54%"}]'::jsonb,'seo','Organic visibility was limited by technical gaps and content that was not aligned tightly enough with search intent.','["Technical SEO cleanup","Keyword clustering","Content optimization","Internal-link architecture"]'::jsonb,'Steadier organic visibility with stronger rankings across priority topics.','[{"label":"Traffic","value":"100","note":"Baseline index"},{"label":"Position","value":"#18","note":"Starting point"},{"label":"Keywords","value":"100","note":"Baseline index"}]'::jsonb,'[{"label":"Traffic","value":"+72%","note":"Growth"},{"label":"Position","value":"#3","note":"Average"},{"label":"Keywords","value":"+54%","note":"Growth"}]'::jsonb,'','/images/case-studies/case-3-before.png','/images/case-studies/case-3-after.png',3),
('social-growth-campaign','Social Media','Social Growth Campaign','Improved consistency, audience engagement, and content performance across social channels.','[{"label":"Followers","value":"+140%"},{"label":"Engagement","value":"3.6x"},{"label":"Traffic","value":"+62%"}]'::jsonb,'social','The social presence needed a clearer content system, stronger consistency, and better audience interaction.','["Content pillars","Publishing system","Engagement optimization","Channel performance review"]'::jsonb,'More consistent social growth and stronger engagement signals across the content mix.','[{"label":"Followers","value":"100","note":"Baseline index"},{"label":"Engagement","value":"1x","note":"Baseline"},{"label":"Traffic","value":"100","note":"Baseline index"}]'::jsonb,'[{"label":"Followers","value":"+140%","note":"Growth"},{"label":"Engagement","value":"3.6x","note":"Growth"},{"label":"Traffic","value":"+62%","note":"Growth"}]'::jsonb,'','/images/case-studies/case-4-before.png','/images/case-studies/case-4-after.png',4),
('youtube-channel-growth','YouTube','YouTube Channel Growth','Improved discoverability with channel optimization, video SEO, and promotion.','[{"label":"Views","value":"+185%"},{"label":"CTR","value":"+41%"},{"label":"Subscribers","value":"+96%"}]'::jsonb,'youtube','The channel needed stronger discoverability and packaging so more of the content could reach relevant viewers.','["Video SEO","Title and thumbnail optimization","Channel positioning","Promotion and retention review"]'::jsonb,'Improved discoverability, click-through performance, and subscriber growth.','[{"label":"Views","value":"100","note":"Baseline index"},{"label":"CTR","value":"2.9%","note":"Starting point"},{"label":"Subscribers","value":"100","note":"Baseline index"}]'::jsonb,'[{"label":"Views","value":"+185%","note":"Growth"},{"label":"CTR","value":"+41%","note":"Growth"},{"label":"Subscribers","value":"+96%","note":"Growth"}]'::jsonb,'','/images/case-studies/case-5-before.png','/images/case-studies/case-5-after.png',5)
) as x(slug,category,title,description,metrics,visual,challenge,strategy,outcome,before_stats,after_stats,card_image,before_image,after_image,sort_order)
where not exists (select 1 from public.case_studies);

-- Enable Supabase Realtime so the admin panel and public site can react to content changes.
do $$
declare
  t text;
  tables text[] := array[
    'profiles',
    'site_settings',
    'services',
    'certificates',
    'case_studies',
    'reviews',
    'video_reviews',
    'process_steps',
    'contact_messages'
  ];
begin
  foreach t in array tables loop
    if not exists (
      select 1
      from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
exception
  when undefined_object then
    raise notice 'supabase_realtime publication is not available yet. Enable Realtime for these tables in Supabase and rerun this block.';
end $$;
