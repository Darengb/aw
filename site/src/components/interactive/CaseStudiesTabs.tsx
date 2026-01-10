import { useState } from 'react'
import type { CaseStudy } from '../../lib/types'

interface CaseStudiesTabsProps {
  studies: CaseStudy[]
  className?: string
}

export function CaseStudiesTabs({ studies, className = '' }: CaseStudiesTabsProps) {
  const [activeTab, setActiveTab] = useState(studies[0]?.id || '')

  const activeStudy = studies.find(s => s.id === activeTab)

  return (
    <div className={className}>
      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {studies.map((study) => (
          <button
            key={study.id}
            onClick={() => setActiveTab(study.id)}
            className={`
              px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
              ${activeTab === study.id
                ? 'bg-[var(--theme-color)] text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            {study.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeStudy && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Video Area */}
          {activeStudy.videoSrc && (
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl">
              <video
                key={activeStudy.videoSrc}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeStudy.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          )}

          {/* Content Area */}
          <div className="space-y-4">
            {activeStudy.content}
          </div>
        </div>
      )}
    </div>
  )
}

export default CaseStudiesTabs
