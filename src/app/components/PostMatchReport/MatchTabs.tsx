'use client';

import { useState, ReactNode } from 'react';

type Tab = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type MatchTabsProps = {
  tabs: Tab[];
  children: ReactNode[];
};

export default function MatchTabs({ tabs, children }: MatchTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div>
      {/* Tab navigation */}
      <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
        <div className="flex border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-red-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {children.map((child, index) => (
          <div
            key={tabs[index]?.id || index}
            className={activeTab === tabs[index]?.id ? 'block' : 'hidden'}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
