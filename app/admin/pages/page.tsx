"use client"

import { useAdmin } from "../../../context/AdminContext"
import { useState } from "react"
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa"

export default function AdminPages() {
  const { pages, addPage, updatePage, deletePage } = useAdmin()
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft" as const,
  })

  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault()
    addPage(newPage)
    setNewPage({ title: "", slug: "", content: "", status: "draft" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Pages</h1>
      </div>

      <div className="bg-[#181C23] shadow rounded-lg p-6 border border-[#FF4F59]/20">
        <form onSubmit={handleAddPage} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Title</label>
              <input
                type="text"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                className="w-full p-2 border border-[#FF4F59]/20 rounded bg-[#181C23] text-white focus:border-[#FF4F59] focus:ring-[#FF4F59]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Slug</label>
              <input
                type="text"
                value={newPage.slug}
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                className="w-full p-2 border border-[#FF4F59]/20 rounded bg-[#181C23] text-white focus:border-[#FF4F59] focus:ring-[#FF4F59]"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Content</label>
            <textarea
              value={newPage.content}
              onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
              className="w-full p-2 border border-[#FF4F59]/20 rounded bg-[#181C23] text-white focus:border-[#FF4F59] focus:ring-[#FF4F59]"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#FF4F59] text-white px-4 py-2 rounded hover:bg-[#FF4F59]/90 transition-colors duration-200"
          >
            Add Page
          </button>
        </form>
      </div>

      <div className="bg-[#181C23] shadow rounded-lg overflow-hidden border border-[#FF4F59]/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FF4F59]/20">
            <thead className="bg-[#181C23]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FFAD28] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FFAD28] uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FFAD28] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#FFAD28] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#181C23] divide-y divide-[#FF4F59]/20">
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {page.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-[#FFAD28]">
                      /{page.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        page.status === "published"
                          ? "bg-[#FF4F59] text-white"
                          : "bg-[#FFAD28] text-[#181C23]"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        updatePage(page.id, {
                          status: page.status === "draft" ? "published" : "draft",
                        })
                      }
                      className="text-[#FFAD28] hover:text-[#FFAD28]/80 mr-4 transition-colors duration-200"
                    >
                      {page.status === "draft" ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => deletePage(page.id)}
                      className="text-[#FF4F59] hover:text-[#FF4F59]/80 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 