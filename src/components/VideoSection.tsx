import React, { useState } from 'react';
import { 
  Video, 
  Search, 
  ExternalLink, 
  Play, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Info, 
  Sparkles,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { VideoResource } from '../types';

interface VideoSectionProps {
  videos: VideoResource[];
  topic: string;
  onSaveVideo?: (video: VideoResource) => void;
  savedVideoIds?: string[];
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  videos,
  topic,
  onSaveVideo,
  savedVideoIds = [],
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState(topic);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoResource | null>(null);

  const filteredVideos = videos
    .filter((v) => filterDifficulty === 'all' || v.difficulty.toLowerCase() === filterDifficulty)
    .sort((a, b) => {
      const order = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      return order[a.difficulty] - order[b.difficulty];
    });

  const handleOpenLiveYouTubeSearch = (query: string) => {
    // Open verified YouTube search query in new tab without inventing fake video IDs
    const safeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner & Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Educational Video Lectures
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Curated Video Guides: {topic}
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            <Video className="w-3.5 h-3.5" />
            <span>Sorted Beginner → Advanced</span>
          </div>
        </div>

        {/* Live Search & API Integration Point */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live lectures or university courses..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            onClick={() => handleOpenLiveYouTubeSearch(searchQuery)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Search Live on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Transparency note regarding YouTube Data API */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-700">API Integration Point:</strong> In this prototype, vetted syllabus curricula and channels (Gate Smashers, MIT OCW, NPTEL) are structured as high-yield educational recommendations with direct YouTube query routing.
          </p>
        </div>
      </div>

      {/* Difficulty Filter Chips */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 mr-2">Filter Level:</span>
        {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterDifficulty(lvl)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
              filterDifficulty === lvl
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isSaved = savedVideoIds.includes(video.id);
          const badgeColors =
            video.difficulty === 'Beginner'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : video.difficulty === 'Intermediate'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-purple-50 text-purple-700 border-purple-200';

          return (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Video Card Header Mock */}
                <div className="h-36 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 p-4 relative flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${badgeColors}`}>
                      {video.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono bg-black/50 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-slate-300" />
                      {video.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-center my-auto">
                    <button
                      onClick={() => handleOpenLiveYouTubeSearch(video.youtubeSearchQuery)}
                      className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </button>
                  </div>

                  <div className="text-[10px] text-slate-300 font-medium truncate">
                    Channel: {video.channelName}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {video.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => handleOpenLiveYouTubeSearch(video.youtubeSearchQuery)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch on YouTube</span>
                </button>

                {onSaveVideo && (
                  <button
                    onClick={() => onSaveVideo(video)}
                    className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                      isSaved
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    title="Save Video"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
