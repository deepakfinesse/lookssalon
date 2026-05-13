"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Button from "../ui/Button";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import FadeUp from "../animation/FadeUp";

export default function BlogSection({ posts = [], categories = [], currentPage = 1, totalPages = 1, currentCategory = "", currentSort = "latest" }) {
  const router        = useRouter();
  const searchParams  = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [sortOpen, setSortOpen]         = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const navigate = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else    params.delete(k);
    });
    params.set("page", "1");
    startTransition(() => router.push(`/blog?${params.toString()}`));
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => router.push(`/blog?${params.toString()}`));
  };

  const featuredPost = posts[0] ?? null;
  const gridPosts    = posts.slice(1);

  const sortLabel = currentSort === "oldest" ? "Oldest First" : "Latest First";
  const categoryLabel = categories.find(c => c.slug === currentCategory)?.name ?? "Select Category";

  return (
    <section className={`bg-white min-h-screen px-4 py-12 max-w-6xl mx-auto transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      {/* ── Header ── */}
      <FadeUp delay={0.1}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-grey font-bold uppercase">
            Blog
          </h1>
          <div className="flex items-center gap-10">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => { setSortOpen(o => !o); setCategoryOpen(false); }}
                className="text-lg font-bold border border-primary font-primary text-grey uppercase px-5.5 py-1 flex items-center gap-1 hover:border-primary hover:text-primary transition-colors"
              >
                Sort By
                {sortOpen ? <FaAngleUp className="w-5 h-5 text-grey" /> : <FaAngleDown className="w-5 h-5 text-grey" />}
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[160px]">
                  {[{ label: "Latest First", value: "latest" }, { label: "Oldest First", value: "oldest" }].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { navigate({ sort: opt.value }); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${currentSort === opt.value ? "font-bold text-primary" : "text-grey"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category dropdown */}
            <div className="relative">
              <button
                onClick={() => { setCategoryOpen(o => !o); setSortOpen(false); }}
                className="text-lg font-bold border border-primary font-primary text-grey uppercase px-5.5 py-1 flex items-center gap-1 hover:border-primary hover:text-primary transition-colors"
              >
                {categoryLabel}
                {categoryOpen ? <FaAngleUp className="w-5 h-5 text-grey" /> : <FaAngleDown className="w-5 h-5 text-grey" />}
              </button>
              {categoryOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[180px]">
                  <button
                    onClick={() => { navigate({ category: "" }); setCategoryOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${!currentCategory ? "font-bold text-primary" : "text-grey"}`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat._id}
                      onClick={() => { navigate({ category: cat.slug }); setCategoryOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/10 transition-colors ${currentCategory === cat.slug ? "font-bold text-primary" : "text-grey"}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </FadeUp>

      {posts.length === 0 ? (
        <div className="flex items-center justify-center py-24 text-gray-400">
          <p>No posts found.</p>
        </div>
      ) : (
        <>
          {/* ── Featured / Hero Post ── */}
          {featuredPost && (
            <FadeUp delay={0.2}>
              <article className="mb-80 md:mb-46 group">
                <div className="relative w-full overflow-hidden">
                  {featuredPost.featuredImage?.url ? (
                    <img
                      src={featuredPost.featuredImage.url}
                      alt={featuredPost.featuredImage.alt || featuredPost.title}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full aspect-[16/7] bg-gray-100" />
                  )}
                </div>

                <div className="pt-3 relative max-w-5xl mx-auto">
                  <div className="absolute md:-top-20 left-0 p-4 w-full bg-white">
                    {featuredPost.categories?.[0] && (
                      <span className="border-1 border-primary text-grey text-lg uppercase font-bold px-5.5 py-0.5 mb-2 inline-block">
                        {featuredPost.categories[0].name}
                      </span>
                    )}
                    <h1 className="text-3xl md:text-3xl xl:text-3xl text-black group-hover:text-primary font-medium mb-1 transition-colors duration-300">
                      {featuredPost.title}
                    </h1>
                    <p className="text-md lg:text-lg text-black mb-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="mt-2">
                      <Button href={`/blog/${featuredPost.slug}`} label="Read more" />
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>
          )}

          {/* ── 2×2 Grid ── */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-18 mb-8">
              {gridPosts.map((post, i) => (
                <FadeUp key={post._id} delay={0.1 * (i + 1)}>
                  <GridCard post={post} />
                </FadeUp>
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-1 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-7 h-7 text-xs font-semibold rounded-sm transition-colors ${
                    currentPage === p
                      ? "bg-primary text-black"
                      : "text-gray-500 hover:text-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-primary transition-colors disabled:opacity-30"
              >
                <FaAngleUp className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

/* ── Grid Card ── */
function GridCard({ post }) {
  return (
    <article className="relative flex flex-col group">
      <div className="w-full mb-2 overflow-hidden">
        {post.featuredImage?.url ? (
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-4/3 bg-gray-100" />
        )}
      </div>

      {post.categories?.[0] && (
        <span className="inline-block w-fit border border-primary text-grey text-lg font-bold uppercase px-5.5 py-1 mb-2">
          {post.categories[0].name}
        </span>
      )}

      <h2 className="text-3xl md:text-3xl xl:text-3xl text-black group-hover:text-primary font-medium mb-1 transition-colors duration-300">
        {post.title}
      </h2>

      <p className="text-md lg:text-lg text-black mb-1">{post.excerpt}</p>

      <div className="mt-2">
        <Button href={`/blog/${post.slug}`} label="Read more" />
      </div>
    </article>
  );
}
