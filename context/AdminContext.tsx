"use client"

import { createContext, useContext, useState, useEffect } from 'react';

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  parentId?: string;
  order: number;
}

interface AdminContextType {
  pages: Page[];
  menus: MenuItem[];
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, page: Partial<Page>) => void;
  deletePage: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  reorderMenuItems: (items: MenuItem[]) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const savedPages = localStorage.getItem('adminPages');
    const savedMenus = localStorage.getItem('adminMenus');
    
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    }
    if (savedMenus) {
      setMenus(JSON.parse(savedMenus));
    }
  }, []);

  const savePages = (newPages: Page[]) => {
    setPages(newPages);
    localStorage.setItem('adminPages', JSON.stringify(newPages));
  };

  const saveMenus = (newMenus: MenuItem[]) => {
    setMenus(newMenus);
    localStorage.setItem('adminMenus', JSON.stringify(newMenus));
  };

  const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...page,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    savePages([...pages, newPage]);
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    const updatedPages = pages.map(page => 
      page.id === id 
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    );
    savePages(updatedPages);
  };

  const deletePage = (id: string) => {
    savePages(pages.filter(page => page.id !== id));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: crypto.randomUUID(),
    };
    saveMenus([...menus, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updatedMenus = menus.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveMenus(updatedMenus);
  };

  const deleteMenuItem = (id: string) => {
    saveMenus(menus.filter(item => item.id !== id));
  };

  const reorderMenuItems = (items: MenuItem[]) => {
    saveMenus(items);
  };

  return (
    <AdminContext.Provider value={{
      pages,
      menus,
      addPage,
      updatePage,
      deletePage,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      reorderMenuItems,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
} 