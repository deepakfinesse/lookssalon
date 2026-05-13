"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlinePencil, HiOutlineTrash, HiOutlinePlus,
  HiOutlineSearch, HiOutlineTag,
} from "react-icons/hi";

const STATUS_COLORS = {
  published: "bg-green-100 text-green-800",
  draft:     "bg-yellow-100 text-yellow-800",
};

export default function BlogDashboard() {
  const router = useRouter();
  const [posts, setPosts]         = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [page, setPage]           = useState(1);
  const [deleting, setDeleting]   = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        admin: "1", page, limit: 20, status: statusFilter, search,
      });
      const res = await fetch(`/api/blog/posts?${params}`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blog/posts/${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
      else { const d = await res.json(); alert(d.error || "Delete failed."); }
    } finally {
      setDeleting(null);
    }
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") { setPage(1); fetchPosts(); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-sm text-gray-500 mt-0.5">{pagination.total} total posts</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/blog/categories"
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HiOutlineTag size={16} /> Categories
          </Link>
          <Link
            href="/dashboard/blog/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            <HiOutlinePlus size={16} /> New Post
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearchKey}
            placeholder="Search posts…"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => { setStatus(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button
          onClick={() => { setPage(1); fetchPosts(); }}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <p className="text-sm">No posts found.</p>
            <Link href="/dashboard/blog/new" className="text-sm text-primary underline">Create your first post</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Categories</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden lg:table-cell">Published</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map(post => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">/{post.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.categories?.map(c => (
                        <span key={c._id} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{c.name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${STATUS_COLORS[post.status] || ""}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/blog/${post._id}/edit`}
                        className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                        title="Edit"
                      >
                        <HiOutlinePencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        disabled={deleting === post._id}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <HiOutlineTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 text-sm text-gray-600">
            {page} / {pagination.pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-1.5 text-sm border rounded disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
