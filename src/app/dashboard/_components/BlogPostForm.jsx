"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { HiOutlinePhotograph, HiOutlineX } from "react-icons/hi";

const BlogEditor = dynamic(() => import("./BlogEditor"), { ssr: false });

function toSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogPostForm({ initialData = null, categories = [] }) {
  const router = useRouter();
  const imageInputRef = useRef(null);

  const [form, setForm] = useState({
    title:         initialData?.title         ?? "",
    slug:          initialData?.slug          ?? "",
    excerpt:       initialData?.excerpt       ?? "",
    content:       initialData?.content       ?? "",
    author:        initialData?.author        ?? "Admin",
    status:        initialData?.status        ?? "draft",
    tags:          initialData?.tags?.join(", ") ?? "",
    featuredImage: initialData?.featuredImage  ?? { url: "", alt: "" },
    categories:    initialData?.categories?.map(c => c._id || c) ?? [],
    seo: {
      title:       initialData?.seo?.title       ?? "",
      description: initialData?.seo?.description ?? "",
      keywords:    initialData?.seo?.keywords?.join(", ") ?? "",
    },
  });

  const [slugEdited, setSlugEdited] = useState(!!initialData);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");
  const [uploading, setUploading]   = useState(false);
  const [activeTab, setActiveTab]   = useState("content");

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugEdited && form.title) {
      setForm(f => ({ ...f, slug: toSlug(f.title) }));
    }
  }, [form.title, slugEdited]);

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const setSeo = (field, value) => setForm(f => ({ ...f, seo: { ...f.seo, [field]: value } }));
  const setImage = (field, value) => setForm(f => ({ ...f, featuredImage: { ...f.featuredImage, [field]: value } }));

  const toggleCategory = (id) => {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(id)
        ? f.categories.filter(c => c !== id)
        : [...f.categories, id],
    }));
  };

  const uploadFeaturedImage = async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
      if (!res.ok) { alert("Upload failed."); return; }
      const { url } = await res.json();
      setImage("url", url);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      title:    form.title.trim(),
      slug:     form.slug.trim() || toSlug(form.title),
      excerpt:  form.excerpt.trim(),
      content:  form.content,
      author:   form.author.trim(),
      status:   form.status,
      tags:     form.tags.split(",").map(t => t.trim()).filter(Boolean),
      featuredImage: form.featuredImage,
      categories: form.categories,
      seo: {
        title:       form.seo.title.trim(),
        description: form.seo.description.trim(),
        keywords:    form.seo.keywords.split(",").map(k => k.trim()).filter(Boolean),
      },
    };

    try {
      const url    = initialData ? `/api/blog/posts/${initialData._id}` : "/api/blog/posts";
      const method = initialData ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Save failed."); return; }
      router.push("/dashboard/blog");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelCls = "block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1";

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : form.status === "published" ? "Publish" : "Save Draft"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* ── Main Column ── */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className={labelCls}>Title *</label>
            <input
              required
              value={form.title}
              onChange={e => set("title", e.target.value)}
              placeholder="Post title"
              className={`${inputCls} text-lg font-semibold`}
            />
          </div>

          {/* Slug */}
          <div>
            <label className={labelCls}>Slug (URL)</label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={e => { setSlugEdited(true); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")); }}
                placeholder="auto-generated-from-title"
                className={inputCls}
              />
              <button
                type="button"
                onClick={() => { setSlugEdited(false); set("slug", toSlug(form.title)); }}
                className="px-3 py-2 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 whitespace-nowrap"
              >
                Auto
              </button>
            </div>
            {form.slug && (
              <p className="text-xs text-gray-400 mt-1">/blog/{form.slug}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => set("excerpt", e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="Short description shown in blog listing…"
              className={inputCls}
            />
            <p className="text-xs text-gray-400 mt-1">{form.excerpt.length}/500</p>
          </div>

          {/* Tab strip */}
          <div className="border-b border-gray-200">
            <div className="flex gap-4">
              {["content", "seo"].map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm font-semibold capitalize border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "seo" ? "SEO" : "Content"}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === "content" && (
            <BlogEditor value={form.content} onChange={v => set("content", v)} />
          )}

          {/* SEO */}
          {activeTab === "seo" && (
            <div className="space-y-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500">
                These fields override the post title/excerpt in search engine results. Leave blank to use defaults.
              </p>
              <div>
                <label className={labelCls}>SEO Title <span className="normal-case font-normal text-gray-400">(max 70 chars)</span></label>
                <input
                  value={form.seo.title}
                  onChange={e => setSeo("title", e.target.value)}
                  maxLength={70}
                  placeholder={form.title}
                  className={inputCls}
                />
                <p className="text-xs text-gray-400 mt-1">{form.seo.title.length}/70</p>
              </div>
              <div>
                <label className={labelCls}>Meta Description <span className="normal-case font-normal text-gray-400">(max 160 chars)</span></label>
                <textarea
                  value={form.seo.description}
                  onChange={e => setSeo("description", e.target.value)}
                  rows={3}
                  maxLength={160}
                  placeholder={form.excerpt || "Describe this post for search engines…"}
                  className={inputCls}
                />
                <p className="text-xs text-gray-400 mt-1">{form.seo.description.length}/160</p>
              </div>
              <div>
                <label className={labelCls}>Keywords <span className="normal-case font-normal text-gray-400">(comma-separated)</span></label>
                <input
                  value={form.seo.keywords}
                  onChange={e => setSeo("keywords", e.target.value)}
                  placeholder="hair care, bridal, salon tips"
                  className={inputCls}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          {/* Publish settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-800 text-sm">Publish Settings</h3>
            <div>
              <label className={labelCls}>Status</label>
              <select
                value={form.status}
                onChange={e => set("status", e.target.value)}
                className={inputCls}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input
                value={form.author}
                onChange={e => set("author", e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Featured Image</h3>
            {form.featuredImage.url ? (
              <div className="relative">
                <img
                  src={form.featuredImage.url}
                  alt={form.featuredImage.alt || "Featured"}
                  className="w-full rounded object-cover max-h-48"
                />
                <button
                  type="button"
                  onClick={() => setImage("url", "")}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black transition-colors"
                >
                  <HiOutlineX size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => imageInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors"
              >
                <HiOutlinePhotograph size={28} className="text-gray-400" />
                <p className="text-xs text-gray-500 text-center">Click to upload or paste URL below</p>
              </div>
            )}
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadFeaturedImage(f); e.target.value = ""; }}
            />
            <input
              value={form.featuredImage.url}
              onChange={e => setImage("url", e.target.value)}
              placeholder="Or paste image URL"
              className={inputCls}
            />
            <input
              value={form.featuredImage.alt}
              onChange={e => setImage("alt", e.target.value)}
              placeholder="Alt text"
              className={inputCls}
            />
            {uploading && <p className="text-xs text-primary animate-pulse">Uploading…</p>}
          </div>

          {/* Categories */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Categories</h3>
            {categories.length === 0 ? (
              <p className="text-xs text-gray-400">
                No categories yet.{" "}
                <a href="/dashboard/blog/categories" className="text-primary underline">Create one</a>
              </p>
            ) : (
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <label key={cat._id} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={form.categories.includes(cat._id)}
                      onChange={() => toggleCategory(cat._id)}
                      className="rounded border-gray-300 text-primary"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{cat.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm">Tags</h3>
            <input
              value={form.tags}
              onChange={e => set("tags", e.target.value)}
              placeholder="hair, bridal, tips (comma-separated)"
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
