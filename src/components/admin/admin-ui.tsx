"use client";
import { ChangeEvent, ReactNode, useId, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { FaCheck, FaTrash, FaUpload } from "react-icons/fa";

export function AdminHeader({ eyebrow, title, description }: { eyebrow:string; title:string; description:string }) { return <div><div className="eyebrow">{eyebrow}</div><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{title}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{description}</p></div> }
export function Field({label,children,help}:{label:string;children:ReactNode;help?:string}) { return <label className="block"><span className="field-label">{label}</span>{children}{help&&<small className="mt-1 block text-[10px] text-slate-600">{help}</small>}</label> }
export function Input(props:any){ return <input {...props} className={`field ${props.className||""}`} /> }
export function Textarea(props:any){ return <textarea {...props} className={`field min-h-28 resize-y ${props.className||""}`} /> }
export function Select(props:any){ return <select {...props} className={`field ${props.className||""}`} /> }
export function Switch({checked,onChange,label="Published"}:{checked:boolean;onChange:(v:boolean)=>void;label?:string}){return <button type="button" onClick={()=>onChange(!checked)} className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs ${checked?"border-emerald-400/30 bg-emerald-400/10 text-emerald-300":"border-white/10 text-slate-500"}`}><span className={`h-2 w-2 rounded-full ${checked?"bg-emerald-400":"bg-slate-600"}`}/>{label}: {checked?"Yes":"No"}</button>}
export function SaveButton({loading}:{loading:boolean}){return <button disabled={loading} className="gradient-button">{loading?<><span className="animate-pulse">Saving…</span></>:<><FaCheck/> Save Changes</>}</button>}
function createUploadId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  // Some browsers/environments expose Web Crypto without randomUUID.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function uploadMedia(file: File, folder: string) {
  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `${folder}/${createUploadId()}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) throw error;
  return supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;
}
export function ImageUpload({value,onChange,folder="images"}:{value:string;onChange:(v:string)=>void;folder?:string}){const inputId=useId(); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const change=async(e:ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0]; if(!file)return; setBusy(true);setError("");try{onChange(await uploadMedia(file,folder));}catch(err:any){setError(err.message||"Upload failed");}finally{setBusy(false)}}; return <div><div className="flex flex-wrap gap-2"><input className="sr-only" id={`upload-${inputId}`} type="file" accept="image/*,.pdf" onChange={change}/><label htmlFor={`upload-${inputId}`} className="outline-button cursor-pointer"><FaUpload/> {busy?"Uploading…":"Upload file"}</label>{value&&<button type="button" onClick={()=>onChange("")} className="rounded-xl border border-red-400/20 px-3 py-2 text-xs text-red-300"><FaTrash/></button>}</div>{value&&<p className="mt-2 break-all text-[10px] text-slate-500">{value}</p>}{error&&<p className="mt-2 text-xs text-red-300">{error}</p>}</div>}
