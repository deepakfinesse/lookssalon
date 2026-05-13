"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import {
  FaBold, FaItalic, FaStrikethrough, FaListUl, FaListOl,
  FaQuoteLeft, FaLink, FaUnlink, FaImage, FaUndo, FaRedo,
  FaCode, FaMinus,
} from "react-icons/fa";

export default function BlogEditor({ value = "", onChange }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Write your blog post content here…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] p-4 focus:outline-none text-gray-800",
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  // Sync external value (e.g. on edit page load)
  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", prev);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const addImageUrl = () => {
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/blog/upload", { method: "POST", body: fd });
    if (!res.ok) { alert("Image upload failed."); return; }
    const { url } = await res.json();
    editor.chain().focus().setImage({ src: url }).run();
  };

  const ToolBtn = ({ onClick, active, title, children }) => (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      title={title}
      className={`p-1.5 rounded text-sm transition-colors ${
        active
          ? "bg-primary text-black"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
          <FaBold />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
          <FaItalic />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strike">
          <FaStrikethrough />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">
          <FaCode />
        </ToolBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        {[2, 3, 4].map(level => (
          <ToolBtn
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            active={editor.isActive("heading", { level })}
            title={`Heading ${level}`}
          >
            <span className="text-xs font-bold">H{level}</span>
          </ToolBtn>
        ))}

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">
          <FaListUl />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list">
          <FaListOl />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
          <FaQuoteLeft />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Divider">
          <FaMinus />
        </ToolBtn>

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <ToolBtn onClick={setLink} active={editor.isActive("link")} title="Add link">
          <FaLink />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().unsetLink().run()} active={false} title="Remove link">
          <FaUnlink />
        </ToolBtn>
        <ToolBtn onClick={addImageUrl} active={false} title="Insert image from URL">
          <FaImage />
        </ToolBtn>
        <button
          type="button"
          title="Upload image"
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 rounded text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }}
        />

        <span className="w-px h-5 bg-gray-300 mx-1" />

        <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
          <FaUndo />
        </ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
          <FaRedo />
        </ToolBtn>
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  );
}
