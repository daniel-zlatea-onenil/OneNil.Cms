import Image from 'next/image';

type MatchAnalysisProps = {
  homeTeam: {
    name: string;
    logoUrl: string;
  };
  awayTeam: {
    name: string;
    logoUrl: string;
  };
  heroBannerUrl?: string;
};

// Dummy data - will be replaced with real data from Contentful
const dummyAnalysis = {
  title: 'Sevilla Secure Commanding Victory Over Granada',
  author: 'Carlos Martinez',
  authorRole: 'Senior Football Analyst',
  publishedAt: '2 hours ago',
  readTime: '5 min read',
  coverImage: 'https://images.ctfassets.net/600e09scr76p/5VywJl9HvAiCmLZ0pCGUBm/3d5fa22a38a9df94e49a3f0cf2c73f85/sevilla-fc-stadium.webp',
  content: [
    {
      type: 'paragraph',
      text: 'Sevilla delivered a dominant performance at the Ramon Sanchez-Pizjuan, securing a convincing 3-1 victory over Granada in a match that showcased their attacking prowess and tactical discipline.',
    },
    {
      type: 'heading',
      text: 'First Half Dominance',
    },
    {
      type: 'paragraph',
      text: 'The home side started brightly, with En-Nesyri opening the scoring in the 12th minute after a brilliant through ball from Rakitic. Granada struggled to contain Sevilla\'s fluid movement, though they managed to equalize through a well-worked set piece.',
    },
    {
      type: 'quote',
      text: 'We knew Granada would be tough opponents, but the players executed our game plan perfectly.',
      author: 'Diego Alonso, Sevilla Manager',
    },
    {
      type: 'heading',
      text: 'Second Half Control',
    },
    {
      type: 'paragraph',
      text: 'The second half saw Sevilla take complete control. A controversial penalty decision gave En-Nesyri his second of the night, and Granada\'s task became even harder when Duarte was sent off for a reckless challenge.',
    },
    {
      type: 'paragraph',
      text: 'Rakitic sealed the victory with a stunning long-range effort in the 85th minute, capping off an impressive individual performance that earned him the Player of the Match award.',
    },
    {
      type: 'heading',
      text: 'Key Takeaways',
    },
    {
      type: 'list',
      items: [
        'En-Nesyri continues his impressive scoring form with a brace',
        'Rakitic\'s vision and set-piece delivery were crucial throughout',
        'Granada\'s defensive vulnerabilities were exposed on multiple occasions',
        'Sevilla move up to 6th in the table with this result',
      ],
    },
  ],
  keyStats: [
    { label: 'Possession won in final third', home: 8, away: 3 },
    { label: 'Big chances created', home: 5, away: 2 },
    { label: 'Tackles won', home: 18, away: 12 },
  ],
};

export default function MatchAnalysis({ homeTeam, awayTeam, heroBannerUrl }: MatchAnalysisProps) {
  const coverImage = heroBannerUrl || dummyAnalysis.coverImage;

  return (
    <div className="space-y-6">
      {/* Main Article */}
      <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Image - Uses Match Hero Banner */}
        {coverImage && (
          <div className="relative h-64 md:h-80">
            <Image
              src={coverImage}
              alt={dummyAnalysis.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {dummyAnalysis.title}
              </h2>
            </div>
          </div>
        )}

        {/* Article Meta */}
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold">
                {dummyAnalysis.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-slate-900">{dummyAnalysis.author}</p>
                <p className="text-sm text-slate-500">{dummyAnalysis.authorRole}</p>
              </div>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>{dummyAnalysis.publishedAt}</p>
              <p>{dummyAnalysis.readTime}</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 py-6 prose prose-slate max-w-none">
          {dummyAnalysis.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="text-slate-700 leading-relaxed mb-4">
                    {block.text}
                  </p>
                );
              case 'heading':
                return (
                  <h3 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-3">
                    {block.text}
                  </h3>
                );
              case 'quote':
                return (
                  <blockquote
                    key={index}
                    className="border-l-4 border-red-600 pl-4 my-6 italic"
                  >
                    <p className="text-slate-700">&ldquo;{block.text}&rdquo;</p>
                    {block.author && (
                      <cite className="text-sm text-slate-500 not-italic mt-2 block">
                        — {block.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'list':
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                    {block.items?.map((item, i) => (
                      <li key={i} className="text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>

      {/* Key Stats Sidebar */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Advanced Stats</h3>

        {/* Team headers */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Image
              src={homeTeam.logoUrl}
              alt={homeTeam.name}
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="text-sm font-medium text-slate-700">{homeTeam.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">{awayTeam.name}</span>
            <Image
              src={awayTeam.logoUrl}
              alt={awayTeam.name}
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          {dummyAnalysis.keyStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{stat.home}</span>
              <span className="text-sm text-slate-500 text-center flex-1 px-2">
                {stat.label}
              </span>
              <span className="font-semibold text-slate-900">{stat.away}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
