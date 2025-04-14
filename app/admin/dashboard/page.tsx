"use client"

import { useAdmin } from "../../../context/AdminContext"
import { useState } from "react"

export default function AdminDashboard() {
  const { pages, menus, addPage, deletePage, updatePage, addMenuItem, deleteMenuItem, reorderMenuItems } = useAdmin()
  const [newPage, setNewPage] = useState({ title: "", slug: "", content: "", status: "draft" as const })
  const [newMenuItem, setNewMenuItem] = useState({ label: "", path: "", icon: "", order: 0 })

  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault()
    addPage(newPage)
    setNewPage({ title: "", slug: "", content: "", status: "draft" })
  }

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault()
    addMenuItem(newMenuItem)
    setNewMenuItem({ label: "", path: "", icon: "", order: 0 })
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pages Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pages</h2>
          
          <form onSubmit={handleAddPage} className="mb-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Slug"
                value={newPage.slug}
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Content"
                value={newPage.content}
                onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Page
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {pages.map((page) => (
              <div key={page.id} className="border p-4 rounded">
                <h3 className="font-semibold">{page.title}</h3>
                <p className="text-sm text-gray-500">/{page.slug}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => updatePage(page.id, { status: page.status === "draft" ? "published" : "draft" })}
                    className="text-sm px-2 py-1 rounded bg-gray-200"
                  >
                    {page.status === "draft" ? "Publish" : "Unpublish"}
                  </button>
                  <button
                    onClick={() => deletePage(page.id)}
                    className="text-sm px-2 py-1 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
          
          <form onSubmit={handleAddMenuItem} className="mb-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Label"
                value={newMenuItem.label}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Path"
                value={newMenuItem.path}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, path: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Icon (optional)"
                value={newMenuItem.icon}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, icon: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Menu Item
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {menus.map((item) => (
              <div key={item.id} className="border p-4 rounded">
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.path}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="text-sm px-2 py-1 rounded bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 