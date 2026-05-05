// components/BlogSection.jsx
"use client";
import Image from "next/image";
import { useState } from "react";

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const featuredPost = {
  category: "Hair Care",
  title: "How often should you wash and condition your hair?",
  excerpt:
    "Just like you need to refresh styling tips to keep your eyes, the same way your lifeline nail class requires the right words to come back to life.",
  image: "/images/blog/featured.jpg",
  href: "#",
};

const gridPosts = [
  {
    category: "Bridal",
    title: "Bridal hairstyles: How to pick the perfect one for your big day",
    excerpt:
      "Your big day is around and sorting style is one of the many elements that will create that perfect picture...",
    image: "/images/blog/bridal1.jpg",
    href: "#",
  },
  {
    category: "Hair Care",
    title: "How to take Care Of Bleached Hair",
    excerpt:
      "You're ready to make a big change, taking your hair color wherever it lands now and making it appear lighter.",
    image: "/images/blog/bleached1.jpg",
    href: "#",
  },
  {
    category: "Hair Care",
    title: "How To Take Care Of Bleached Hair",
    excerpt:
      "You're ready to make a big change, taking your hair color wherever it lands now and making it appear lighter.",
    image: "/images/blog/bleached2.jpg",
    href: "#",
  },
  {
    category: "Bridal",
    title: "Bridal hairstyles: How to pick the perfect one for your big day",
    excerpt:
      "Your big day is around and sorting style is one of the many elements that will create that perfect picture...",
    image: "/images/blog/bridal2.jpg",
    href: "#",
  },
];

const TOTAL_PAGES = 2;

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="bg-white min-h-screen px-4 py-6 max-w-2xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black tracking-tight text-black uppercase">
          Blog
        </h1>
        <div className="flex items-center gap-2">
          <button className="text-xs font-medium border border-gray-300 text-gray-700 px-3 py-1.5 rounded-sm hover:border-primary hover:text-primary transition-colors">
            Sign In
          </button>
          <button className="text-xs font-medium border border-gray-300 text-gray-700 px-3 py-1.5 rounded-sm flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            Select Category
            <FaAngleDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* ── Featured / Hero Post ── */}
      <article className="mb-6">
        {/* Image with overlay */}
        <div
          className="relative w-full overflow-hidden rounded-sm"
          style={{ aspectRatio: "16/9" }}
        >
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
          />
          {/* Category tag + Title overlaid */}
          <div className="absolute bottom-0 left-0 p-4">
            <span className="bg-primary text-black text-[10px] font-semibold px-2.5 py-0.5 rounded-full mb-2 inline-block tracking-wide">
              {featuredPost.category}
            </span>
            <h2 className="text-white font-bold text-lg leading-snug max-w-xs">
              {featuredPost.title}
            </h2>
          </div>
        </div>

        {/* Excerpt + CTA */}
        <div className="pt-3">
          <p className="text-gray-500 text-xs leading-relaxed mb-3">
            {featuredPost.excerpt}
          </p>
          <ReadMoreButton href={featuredPost.href} />
        </div>
      </article>

      {/* ── 2×2 Grid ── */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {gridPosts.map((post, i) => (
          <GridCard key={i} post={post} />
        ))}
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-end gap-1">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-7 h-7 text-xs font-semibold rounded-sm transition-colors ${
              currentPage === page
                ? "bg-primary text-black"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, TOTAL_PAGES))}
          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
        >
          <FaAngleUp className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ── Grid Card ── */
function GridCard({ post }) {
  return (
    <article className="flex flex-col">
      {/* Image */}
      <div
        className="relative w-full overflow-hidden rounded-sm mb-2"
        style={{ aspectRatio: "4/3" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Category */}
      <span className="text-primary text-[10px] font-semibold tracking-wide uppercase mb-1">
        {post.category}
      </span>

      {/* Title */}
      <h3 className="text-black font-bold text-xs leading-snug mb-1.5 line-clamp-3">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-500 text-[10px] leading-relaxed mb-2.5 line-clamp-3 flex-1">
        {post.excerpt}
      </p>

      {/* CTA */}
      <ReadMoreButton href={post.href} />
    </article>
  );
}

/* ── Read More Button ── */
function ReadMoreButton({ href }) {
  return (
    <a
      href={href}
      className="inline-block bg-primary text-black text-[10px] font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
    >
      Read more
    </a>
  );
}
