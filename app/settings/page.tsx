"use client"

import { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

const fontSizes = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
];

const fontFamilies = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'poppins', label: 'Poppins' },
  { value: 'opensans', label: 'Open Sans' }
];

const themeModes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' }
];

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { theme, toggleTheme } = useTheme();
  const { 
    pages, 
    menus, 
    addPage, 
    updatePage, 
    deletePage, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem,
    reorderMenuItems 
  } = useAdmin();
  
  const [localSettings, setLocalSettings] = useState(settings);
  const [newPage, setNewPage] = useState({ title: '', slug: '', content: '' });
  const [newMenuItem, setNewMenuItem] = useState({ label: '', path: '', icon: '' });
  const [activeTab, setActiveTab] = useState<'general' | 'pages' | 'menus'>('general');

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    updateSettings(localSettings);
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  const handleAddPage = () => {
    addPage({
      ...newPage,
      status: 'draft',
    });
    setNewPage({ title: '', slug: '', content: '' });
  };

  const handleAddMenuItem = () => {
    addMenuItem({
      ...newMenuItem,
      order: menus.length,
    });
    setNewMenuItem({ label: '', path: '', icon: '' });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(menus);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    reorderMenuItems(items.map((item, index) => ({
      ...item,
      order: index,
    })));
  };

  return (
    <div className="p-6 bg-[#FFFAF4] dark:bg-[#181C23]">
      <h1 className="text-2xl font-bold mb-6 text-[#181C23] dark:text-[#FFFAF4]">Project Settings</h1>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-[#282A27]">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-4 px-4 ${activeTab === 'general' ? 'border-b-2 border-coral text-coral' : 'text-[#181C23] dark:text-[#FFFAF4]'}`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`pb-4 px-4 ${activeTab === 'pages' ? 'border-b-2 border-coral text-coral' : 'text-[#181C23] dark:text-[#FFFAF4]'}`}
        >
          Pages
        </button>
        <button
          onClick={() => setActiveTab('menus')}
          className={`pb-4 px-4 ${activeTab === 'menus' ? 'border-b-2 border-coral text-coral' : 'text-[#181C23] dark:text-[#FFFAF4]'}`}
        >
          Menus
        </button>
      </div>

      {activeTab === 'general' && (
        <div className="grid gap-6 max-w-4xl">
          {/* Project Information */}
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Project Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  value={localSettings.projectName}
                  onChange={(e) => handleSettingChange('projectName', e.target.value)}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={localSettings.logoUrl}
                  onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Theme Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Theme Mode
                </label>
                <select
                  value={localSettings.themeMode}
                  onChange={(e) => handleSettingChange('themeMode', e.target.value)}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                >
                  {themeModes.map(mode => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={localSettings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="w-full h-10 rounded border border-[#444744]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={localSettings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="w-full h-10 rounded border border-[#444744]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Accent Color
                </label>
                <input
                  type="color"
                  value={localSettings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="w-full h-10 rounded border border-[#444744]"
                />
              </div>
            </div>
          </div>

          {/* Typography Settings */}
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Typography Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Font Family
                </label>
                <select
                  value={localSettings.fontFamily}
                  onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                >
                  {fontFamilies.map(font => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Font Size
                </label>
                <select
                  value={localSettings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                >
                  {fontSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Custom Styles */}
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Custom Styles</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Custom CSS Variables (JSON)
                </label>
                <textarea
                  value={JSON.stringify(localSettings.customStyles, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      handleSettingChange('customStyles', parsed);
                    } catch (error) {
                      // Invalid JSON, don't update
                    }
                  }}
                  className="w-full h-32 p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4] font-mono"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-coral text-white py-3 hover:bg-[#e64550] transition-colors"
            >
              Save Settings
            </button>
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-500 text-white py-3 hover:bg-gray-600 transition-colors"
            >
              Reset Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="grid gap-6 max-w-4xl">
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Add New Page</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Content
                </label>
                <textarea
                  value={newPage.content}
                  onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                  className="w-full h-32 p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <button
                onClick={handleAddPage}
                className="bg-coral text-white py-2 px-4 rounded hover:bg-[#e64550] transition-colors"
              >
                Add Page
              </button>
            </div>
          </div>

          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Pages</h2>
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between p-4 bg-white dark:bg-[#181C23] rounded border border-[#444744]">
                  <div>
                    <h3 className="font-medium text-[#181C23] dark:text-[#FFFAF4]">{page.title}</h3>
                    <p className="text-sm text-gray-500">/{page.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePage(page.id, { status: page.status === 'published' ? 'draft' : 'published' })}
                      className="px-3 py-1 rounded text-sm"
                      style={{ backgroundColor: page.status === 'published' ? '#4CAF50' : '#FFC107' }}
                    >
                      {page.status}
                    </button>
                    <button
                      onClick={() => deletePage(page.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'menus' && (
        <div className="grid gap-6 max-w-4xl">
          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Add New Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={newMenuItem.label}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Path
                </label>
                <input
                  type="text"
                  value={newMenuItem.path}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, path: e.target.value })}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#181C23] dark:text-[#FFFAF4] mb-1">
                  Icon (SVG path)
                </label>
                <input
                  type="text"
                  value={newMenuItem.icon}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, icon: e.target.value })}
                  className="w-full p-2 rounded border border-[#444744] bg-white dark:bg-[#181C23] text-[#181C23] dark:text-[#FFFAF4]"
                />
              </div>
              <button
                onClick={handleAddMenuItem}
                className="bg-coral text-white py-2 px-4 rounded hover:bg-[#e64550] transition-colors"
              >
                Add Menu Item
              </button>
            </div>
          </div>

          <div className="bg-[#FFF2DF] dark:bg-[#282A27] p-6 rounded-lg">
            <h2 className="text-lg font-medium text-[#181C23] dark:text-[#FFFAF4] mb-4">Menu Items</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="menu-items">
                {(provided: DroppableProvided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {menus.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided: DraggableProvided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between p-4 bg-white dark:bg-[#181C23] rounded border border-[#444744]"
                          >
                            <div className="flex items-center">
                              <span className="mr-4 text-gray-500">{index + 1}</span>
                              <div>
                                <h3 className="font-medium text-[#181C23] dark:text-[#FFFAF4]">{item.label}</h3>
                                <p className="text-sm text-gray-500">{item.path}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}
    </div>
  );
} 