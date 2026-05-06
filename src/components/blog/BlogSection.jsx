// components/BlogSection.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

const featuredPost = {
  category: "Hair Care",
  title: "How often should you wash and condition your hair?",
  excerpt:
    "Just like you need to refresh styling tips to keep your eyes, the same way your lifeline nail class requires the right words to come back to life.",
  image: "/img/blog/blog1.webp",
  href: "#",
};

const gridPosts = [
  {
    category: "Bridal",
    title: "Bridal hairstyles: How to pick the perfect one for your big day",
    excerpt:
      "Your big day is around and sorting style is one of the many elements that will create that perfect picture...",
    image: "/img/blog/blog1.webp",
    href: "#",
  },
  {
    category: "Hair Care",
    title: "How to take Care Of Bleached Hair",
    excerpt:
      "You're ready to make a big change, taking your hair color wherever it lands now and making it appear lighter.",
    image: "/img/blog/blog1.webp",
    href: "#",
  },
  {
    category: "Hair Care",
    title: "How To Take Care Of Bleached Hair",
    excerpt:
      "You're ready to make a big change, taking your hair color wherever it lands now and making it appear lighter.",
    image: "/img/blog/blog1.webp",
    href: "#",
  },
  {
    category: "Bridal",
    title: "Bridal hairstyles: How to pick the perfect one for your big day",
    excerpt:
      "Your big day is around and sorting style is one of the many elements that will create that perfect picture...",
    image: "/img/blog/blog1.webp",
    href: "#",
  },
];

const TOTAL_PAGES = 2;

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="bg-white min-h-screen px-4 py-12 max-w-6xl mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl md:text-4xl xl:text-5xl text-black font-bold uppercase text-center">
          Blog
        </h1>
        <div className="flex items-center gap-2">
          {/* <button className="text-xs font-medium border border-gray-300 text-gray-700 px-3 py-1.5 rounded-sm hover:border-primary hover:text-primary transition-colors">
            Sign In
          </button> */}
          <button className="text-lg font-medium border border-black text-primary px-3 py-1 flex items-center gap-1 hover:border-primary hover:text-primary transition-colors">
            Select Category
            <FaAngleDown className="w-7 h-7 text-black" />
          </button>
        </div>
      </div>

      {/* ── Featured / Hero Post ── */}
      <article className="mb-80 md:mb-46">
        {/* Image with overlay */}
        <div
          className="relative w-full overflow-hidden rounded-sm"
        >
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            width={1400}
            height={450}
            priority
          />
        </div>

        {/* Excerpt + CTA */}
        <div className="pt-3 relative max-w-5xl mx-auto">
          {/* Category tag + Title overlaid */}
          <div className="absolute md:-top-20 left-0 p-4 bg-white">
            <span className="border-1 border-primary text-black text-md font-semibold px-2.5 py-0.5 mb-2 inline-block">
              {featuredPost.category}
            </span>
            <h1 className="text-3xl md:text-4xl xl:text-4xl text-black font-normal mb-4">
              {featuredPost.title}
            </h1>
            <p className="text-md lg:text-lg text-black">
            {featuredPost.excerpt}
          </p>
          
           <div className="mt-2">
              <Button
                href={featuredPost.href}
                label="Read more"
              />
          </div>
          </div>
        </div>
      </article>

      {/* ── 2×2 Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-18 mb-8">
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
    <article className=" relative flex flex-col">
      {/* Image */}
      <div
        className="w-full  mb-2"
      >
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={200}
        />
      </div>

      {/* Category */}
      <span className="inline-block w-fit border border-primary text-black text-md font-semibold px-3 py-1 mb-2">
        {post.category}
      </span>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl xl:text-3xl text-black font-normal mb-4">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-md lg:text-lg text-black">
        {post.excerpt}
      </p>

      {/* CTA */}
      
      <div className="mt-2">
          <Button
            href={post.href}
            label="Read more"
          />
      </div>
    </article>
  );
}

