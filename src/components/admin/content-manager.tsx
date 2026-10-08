"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import {
  AdminHeader,
  Field,
  Input,
  Textarea,
  Select,
  Switch,
  SaveButton,
  ImageUpload,
} from "./admin-ui";
import { AdminPageSkeleton } from "./admin-skeleton";
import { refreshPublicContent } from "@/app/admin/actions";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "select" | "image" | "json";
  options?: string[];
  help?: string;
};

const configs: Record<
  string,
  { title: string; description: string; fields: FieldDef[] }
> = {
  services: {
    title: "Services",
    description:
      "Add, edit, reorder, publish or remove the services shown across your portfolio.",
    fields: [
      { key: "title", label: "Service name" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "icon",
        label: "Icon key",
        type: "select",
        options: [
          "users",
          "facebook",
          "google",
          "youtube",
          "location",
          "video",
          "code",
          "pen",
        ],
      },
      { key: "color", label: "Accent color", help: "Hex value such as #168bff" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  certificates: {
    title: "Certificates",
    description: "Manage certificate images, issuer details and credential links.",
    fields: [
      { key: "slug", label: "Unique slug" },
      { key: "title", label: "Title" },
      { key: "issuer", label: "Issuer" },
      { key: "year", label: "Year" },
      { key: "image", label: "Certificate file", type: "image" },
      { key: "credential_url", label: "Credential URL" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  reviews: {
    title: "Client Reviews",
    description:
      "Manage written testimonials and client photos. Ask clients for permission before publishing identifiable content.",
    fields: [
      { key: "name", label: "Client name" },
      { key: "role", label: "Role" },
      { key: "company", label: "Company" },
      { key: "photo", label: "Client photo", type: "image", help: "Upload to Supabase Storage." },
      { key: "review", label: "Review", type: "textarea" },
      { key: "rating", label: "Rating", type: "number", help: "1 to 5" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  video_reviews: {
    title: "Client Video Reviews",
    description:
      "Manage video testimonials. You can paste a YouTube embed URL or another embeddable video URL.",
    fields: [
      { key: "client_name", label: "Client name" },
      { key: "role", label: "Role" },
      { key: "company", label: "Company" },
      { key: "thumbnail", label: "Thumbnail", type: "image" },
      {
        key: "video_url",
        label: "Video embed URL",
        help: "Example: https://www.youtube.com/embed/VIDEO_ID",
      },
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  process_steps: {
    title: "Process",
    description:
      "Control the workflow section and add more steps when needed.",
    fields: [
      { key: "number", label: "Step number" },
      { key: "title", label: "Title" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
  case_studies: {
    title: "Case Studies",
    description:
      "Manage campaign results and detail pages. JSON fields keep multiple metrics in one record without changing the database every time.",
    fields: [
      { key: "slug", label: "Unique slug" },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: ["Google Ads", "Meta Ads", "SEO", "Social Media", "YouTube"],
      },
      { key: "title", label: "Title" },
      { key: "description", label: "Short description", type: "textarea" },
      {
        key: "metrics",
        label: "Metrics JSON",
        type: "json",
        help: 'Example: [{"label":"Sales","value":"+245%"}]',
      },
      {
        key: "visual",
        label: "Visual key",
        type: "select",
        options: ["google", "meta", "seo", "social", "youtube"],
      },
      { key: "challenge", label: "Challenge", type: "textarea" },
      {
        key: "strategy",
        label: "Strategy JSON",
        type: "json",
        help: 'Example: ["Keyword research","Testing"]',
      },
      { key: "outcome", label: "Outcome", type: "textarea" },
      { key: "before_stats", label: "Before stats JSON", type: "json" },
      { key: "after_stats", label: "After stats JSON", type: "json" },
      { key: "card_image", label: "Card image", type: "image", help: "Image shown on the homepage and All Case Studies cards." },
      { key: "before_image", label: "Before image", type: "image" },
      { key: "after_image", label: "After image", type: "image" },
      { key: "sort_order", label: "Display order", type: "number" },
    ],
  },
};

const empty = (fields: FieldDef[]) =>
  Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.type === "number" ? 0 : field.type === "json" ? "[]" : "",
    ])
  );

export default function ContentManager({
  table,
}: {
  table: keyof typeof configs;
}) {
  const cfg = configs[table];
  const [rows, setRows] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty(cfg.fields));
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    const { data, error } = await createClient()
      .from(table)
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) setError(error.message);
    else setRows(data || []);
    setInitialLoading(false);
  };

  useEffect(() => {
    let active = true;
    const supabase = createClient();

    void load();

    const channel = supabase
      .channel(`admin-content-${table}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => {
          if (active) void load();
        }
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [table]);

  const edit = (row: any) => {
    const next: any = { ...empty(cfg.fields), ...row };
    for (const field of cfg.fields) {
      if (field.type === "json" && typeof next[field.key] !== "string") {
        next[field.key] = JSON.stringify(next[field.key] || [], null, 2);
      }
    }
    setForm(next);
    setEditing(row.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const set = (key: string, value: any) =>
    setForm((current: any) => ({ ...current, [key]: value }));

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const payload: any = { ...form, published: form.published ?? true };

    for (const field of cfg.fields) {
      if (field.type === "json") {
        try {
          payload[field.key] = JSON.parse(payload[field.key] || "[]");
        } catch {
          setLoading(false);
          setError(`${field.label} contains invalid JSON.`);
          return;
        }
      }
    }

    for (const field of cfg.fields) {
      if (field.type === "number") payload[field.key] = Number(payload[field.key] || 0);
    }

    const result = editing
      ? await createClient().from(table).update(payload).eq("id", editing)
      : await createClient().from(table).insert(payload);

    if (result.error) {
      setError(result.error.message);
    } else {
      await refreshPublicContent();
      setMessage(editing ? "Updated successfully." : "Added successfully.");
      setForm(empty(cfg.fields));
      setEditing(null);
      await load();
    }

    setLoading(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    const { error } = await createClient().from(table).delete().eq("id", id);
    if (error) setError(error.message);
    else {
      await refreshPublicContent();
      await load();
    }
  };

  if (initialLoading) return <AdminPageSkeleton />;

  return (
    <div>
      <AdminHeader eyebrow="Content Management" title={cfg.title} description={cfg.description} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={save} className="rounded-2xl border border-accent/20 bg-[#061224]/60 p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">{editing ? "Edit item" : "Add new item"}</h2>
            {editing && (
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-white"
                onClick={() => {
                  setEditing(null);
                  setForm(empty(cfg.fields));
                }}
              >
                Cancel edit
              </button>
            )}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {cfg.fields.map((field) => (
              <div
                key={field.key}
                className={
                  field.type === "textarea" || field.type === "json" || field.type === "image"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <Field label={field.label} help={field.help}>
                  {field.type === "textarea" ? (
                    <Textarea value={form[field.key] ?? ""} onChange={(e: any) => set(field.key, e.target.value)} />
                  ) : field.type === "json" ? (
                    <Textarea
                      className="font-mono text-[11px]"
                      value={form[field.key] ?? "[]"}
                      onChange={(e: any) => set(field.key, e.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <Select value={form[field.key] ?? ""} onChange={(e: any) => set(field.key, e.target.value)}>
                      <option value="">Select…</option>
                      {field.options?.map((option) => <option key={option}>{option}</option>)}
                    </Select>
                  ) : field.type === "image" ? (
                    <ImageUpload value={form[field.key] ?? ""} onChange={(value) => set(field.key, value)} folder={table} />
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : "text"}
                      value={form[field.key] ?? ""}
                      onChange={(e: any) => set(field.key, e.target.value)}
                    />
                  )}
                </Field>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Switch checked={Boolean(form.published ?? true)} onChange={(value) => set("published", value)} />
            <SaveButton loading={loading} />
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-500/10 p-3 text-xs text-red-300">{error}</p>}
          {message && <p className="mt-4 rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-300">{message}</p>}
        </form>

        <div className="space-y-3">
          <h2 className="font-bold">Current items ({rows.length})</h2>
          {rows.map((row) => (
            <div key={row.id} className="rounded-2xl border border-white/10 bg-[#061224]/45 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {row.title || row.name || row.client_name || row.number}
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {row.company || row.category || row.description || ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => edit(row)} className="rounded-lg border border-accent/20 px-2.5 py-1.5 text-[10px] text-accent">
                    Edit
                  </button>
                  <button onClick={() => remove(row.id)} className="rounded-lg border border-red-400/20 px-2.5 py-1.5 text-[10px] text-red-300">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <Switch
                  checked={row.published !== false}
                  label="Published"
                  onChange={async (value) => {
                    const { error } = await createClient().from(table).update({ published: value }).eq("id", row.id);
                    if (!error) await refreshPublicContent();
                    await load();
                  }}
                />
              </div>
            </div>
          ))}
          {!rows.length && <div className="rounded-2xl border border-white/10 p-8 text-center text-sm text-slate-500">No items yet.</div>}
        </div>
      </div>
    </div>
  );
}
