'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiPlay, FiClock, FiEye } from 'react-icons/fi';

type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  type: 'highlights' | 'interview' | 'analysis' | 'goal';
  embedUrl?: string;
};

// Dummy data - will be replaced with real data from Contentful
const dummyVideos: Video[] = [
  {
    id: '1',
    title: 'Full Match Highlights',
    description: 'Watch all the goals and key moments from Sevilla vs Granada',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '10:24',
    views: '125K',
    type: 'highlights',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'En-Nesyri\'s Brace - All Angles',
    description: 'Every angle of Youssef En-Nesyri\'s two goals',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '3:45',
    views: '89K',
    type: 'goal',
  },
  {
    id: '3',
    title: 'Rakitic Stunner - Goal of the Week Contender',
    description: 'Ivan Rakitic\'s spectacular long-range strike',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '2:18',
    views: '156K',
    type: 'goal',
  },
  {
    id: '4',
    title: 'Post-Match: Diego Alonso Reaction',
    description: 'Manager\'s thoughts on the victory and team performance',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '5:12',
    views: '34K',
    type: 'interview',
  },
  {
    id: '5',
    title: 'Tactical Analysis: How Sevilla Dominated',
    description: 'Breaking down Sevilla\'s tactical approach and key plays',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '8:56',
    views: '45K',
    type: 'analysis',
  },
  {
    id: '6',
    title: 'Player of the Match: Ivan Rakitic Interview',
    description: 'Exclusive interview with the MOTM after his stunning performance',
    thumbnail: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
    duration: '4:30',
    views: '67K',
    type: 'interview',
  },
];

const typeLabels: Record<Video['type'], string> = {
  highlights: 'Highlights',
  interview: 'Interview',
  analysis: 'Analysis',
  goal: 'Goal',
};

const typeColors: Record<Video['type'], string> = {
  highlights: 'bg-red-600',
  interview: 'bg-blue-600',
  analysis: 'bg-purple-600',
  goal: 'bg-green-600',
};

export default function MatchMedia() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [filter, setFilter] = useState<Video['type'] | 'all'>('all');

  const filteredVideos = filter === 'all'
    ? dummyVideos
    : dummyVideos.filter((v) => v.type === filter);

  const featuredVideo = dummyVideos.find((v) => v.type === 'highlights') || dummyVideos[0];

  return (
    <div className="space-y-6">
      {/* Featured Video / Video Player */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="relative aspect-video bg-slate-900">
          {selectedVideo?.embedUrl ? (
            <iframe
              src={selectedVideo.embedUrl}
              title={selectedVideo.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image
                src={(selectedVideo || featuredVideo).thumbnail}
                alt={(selectedVideo || featuredVideo).title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  onClick={() => setSelectedVideo(selectedVideo || featuredVideo)}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FiPlay className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded mb-2 ${typeColors[(selectedVideo || featuredVideo).type]}`}>
                  {typeLabels[(selectedVideo || featuredVideo).type]}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {(selectedVideo || featuredVideo).title}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {(selectedVideo || featuredVideo).description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Videos
        </button>
        {(['highlights', 'goal', 'interview', 'analysis'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === type
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {typeLabels[type]}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVideos.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className={`bg-white rounded-xl shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow ${
              selectedVideo?.id === video.id ? 'ring-2 ring-red-600' : ''
            }`}
          >
            <div className="relative aspect-video">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <FiPlay className="w-5 h-5 text-slate-900 ml-0.5" />
                </div>
              </div>
              <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-medium text-white rounded ${typeColors[video.type]}`}>
                {typeLabels[video.type]}
              </span>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 text-xs font-medium text-white bg-black/70 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-3">
              <h4 className="font-medium text-slate-900 text-sm line-clamp-2">
                {video.title}
              </h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <FiEye className="w-3 h-3" />
                  {video.views} views
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-slate-500">No videos available for this category.</p>
        </div>
      )}
    </div>
  );
}
