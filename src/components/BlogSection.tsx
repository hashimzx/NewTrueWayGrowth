import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  X, 
  Share2, 
  Bookmark, 
  Check 
} from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  category: 'Tajweed' | 'Parenting' | 'Hifz' | 'Spiritual';
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The 5 Essential Tajweed Rules Every Reciter Must Master',
    category: 'Tajweed',
    author: 'Sheikh Zaid Al-Mansoor',
    authorRole: 'Senior Tajweed Scholar & Ijazah Holder',
    date: 'October 21, 2026',
    readTime: '6 min read',
    excerpt: 'Tajweed is not merely an aesthetic embellishment; it is an obligation to safeguard the divine text from mispronunciation and distortion.',
    content: [
      'Reciting the Holy Quran with correct Tajweed is a spiritual obligation that traces directly back to the angel Jibreel (AS) teaching the Prophet Muhammad ﷺ. When we pronounce Arabic letters from their exact points of articulation (Makharij), we preserve the miraculous nuance of the divine revelation.',
      '1. The Four Rules of Noon Sakinah & Tanween: Whenever a resting Noon (نْ) or double vowel appears, it takes one of four rulings: Izhar (Clarity before throat letters), Idgham (Merging into Yarmaloon letters), Iqlab (Converting into a gentle Meem before Baa), or Ikhfa (Concealment with Ghunnah nasalization).',
      '2. The 5 Qalqalah Letters: Echoing the sound when resting on Qaaf, Taw, Baa, Jeem, or Daal (قُطْبُ جَدٍ). Without Qalqalah, these letters risk being swallowed or muffled.',
      '3. Heavy vs Light Letters (Tafkheem & Tarqeeq): Seven letters are always pronounced with full mouth resonance (Khaw, Saad, Daad, Ghayn, Taw, Qaf, Zha). Mixing heavy and light letters is the most common mistake for non-native speakers.',
      '4. Rules of Prolongation (Madd): Knowing the distinction between Madd Asli (natural 2 counts) and secondary Madd caused by Hamzah or Sukoon (4 to 6 counts).',
      '5. Rules of Waqf (Stopping & Pausing): Pausing at meaningful junctions to honor the divine intended context without breaking dependent clauses.'
    ],
    keyTakeaways: [
      'Master the 29 Makharij before attempting complex fast recitation.',
      'Distinguish between heavy letters and light letters carefully.',
      'Never skip the Ghunnah duration on doubled Noon and Meem.'
    ]
  },
  {
    id: 'post-2',
    title: 'Why Dedicated Female Quran Tutors Create Safer Learning for Sisters & Kids',
    category: 'Parenting',
    author: 'Ustadha Maryam Siddiqui',
    authorRole: 'Lead Female Education Director',
    date: 'October 18, 2026',
    readTime: '5 min read',
    excerpt: 'Discover why thousands of international Muslim families prefer certified female Quran teachers for young children and sisters.',
    content: [
      'For young children between ages 4 and 9, the emotional tone of the Quran classroom determines whether they view Quran study as a joyous blessing or a stressful burden. Female Quran teachers naturally bring patience, maternal tenderness, and encouragement to delicate early learners.',
      'For adult sisters, women who are converting to Islam, or mothers resuming their studies after decades, having a private, confidential space with an accredited Alimah offers complete comfort. Sisters can ask personal questions regarding purification (Taharah), menstruation rulings, and family supplications freely without reservation.',
      'At True Way Quran, our female instructors hold Sanad and Ijazah credentials from recognized institutions. They balance strict adherence to classical Tajweed rules with warm, uplifting pedagogical methods.'
    ],
    keyTakeaways: [
      'Patience and gentle encouragement build lifelong love for the Quran in children.',
      'Complete privacy allows adult female students to recite loudly and confidently without shyness.',
      'Dedicated sisters can pursue full Hifz and Ijazah certification from home.'
    ]
  },
  {
    id: 'post-3',
    title: 'How to Help Your Child Complete the Madani Qaida in 90 Days',
    category: 'Parenting',
    author: 'Qari Muhammad Bilal',
    authorRole: 'Madani Qaida Lead Examiner',
    date: 'October 14, 2026',
    readTime: '7 min read',
    excerpt: 'A practical, battle-tested framework for parents living in the UK, USA, and Canada to ensure effortless Qaida graduation.',
    content: [
      'Completing the Qaida is the single most critical milestone in a Muslim child’s educational life. If the foundation is shaky, reading the Mushaf will feel arduous and frustrating. If the foundation is solid, reading the Quran becomes as effortless as breathing.',
      'Step 1: Keep classes to 30 minutes maximum. Young children experience cognitive fatigue after 25 minutes of intense phonetic concentration. Short, highly focused daily sessions beat one long exhausting weekend class.',
      'Step 2: Utilize auditory reinforcement. Have your child listen to the correct teacher recitation 3 times before they attempt to recite the word themselves.',
      'Step 3: Celebrate incremental wins. Reward your child when they clear tricky throat letters (Haa and Ayn) or when they maintain a 7-day practice streak.'
    ],
    keyTakeaways: [
      'Short 25-30 minute classes ensure sharp mental focus.',
      'Always prioritize Makhraj accuracy over speedy page turning.',
      'Positive reinforcement and gentle praise produce confident reciters.'
    ]
  },
  {
    id: 'post-4',
    title: 'The Secrets of Quran Memorization (Hifz) for Working Adults',
    category: 'Hifz',
    author: 'Ustadh Tariq Hashimi',
    authorRole: 'Hafiz & Recitation Coach',
    date: 'October 10, 2026',
    readTime: '6 min read',
    excerpt: 'Think Hifz is only for full-time boarding students? Discover how busy professionals memorize the Holy Quran consistently.',
    content: [
      'The Prophet Muhammad ﷺ said: "The best among you are those who learn the Quran and teach it." While many believe memorization must happen in childhood, history proves that the vast majority of the Sahabah (Companions) memorized the Quran as adults while managing trade, warfare, and family.',
      'The secret lies in the "Half-Page Golden Rule": Memorize just 5 to 7 lines every morning after Fajr prayer when the mind is clean and peaceful. Within 2 to 3 years, you will have committed substantial portions or the entirety of the Quran to memory.',
      'The true challenge of Hifz is never memorizing new verses—it is revising what you already memorized. By adhering to a strict daily revision cycle (Manzil), your retention remains ironclad.'
    ],
    keyTakeaways: [
      'Consistent morning memorization after Fajr yields the greatest retention.',
      'Never memorize new verses without revising yesterday’s lesson first.',
      'Recite memorized verses during daily Sunnah and Tahajjud prayers.'
    ]
  }
];

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Tajweed', 'Parenting', 'Hifz', 'Spiritual'];

  const filteredPosts = BLOG_POSTS.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  return (
    <section className="py-16 bg-white border-b border-purple-100" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-900 rounded-full text-xs font-bold border border-purple-200">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Islamic Insights & Tajweed Guidance</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
            True Way Quran Blog & Educational Articles
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Practical advice on Tajweed rules, parenting strategies for teaching kids Quran, memorization habits for working adults, and reflections from certified scholars.
          </p>

          {/* Category Tabs */}
          <div className="inline-flex p-1 bg-purple-50 rounded-2xl border border-purple-100 mt-4 gap-1 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-purple-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl p-7 border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-200 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-purple-950 group-hover:text-purple-700 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-purple-100/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs">
                    {post.author.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">{post.author}</span>
                    <span className="text-[11px] text-slate-500 block">{post.date}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-purple-100/60 flex items-center justify-between text-xs font-bold text-purple-600 group-hover:text-purple-800">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-purple-100">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-purple-100 flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                {selectedPost.category} · {selectedPost.readTime}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-purple-950 leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-purple-100">
                  <span className="font-bold text-purple-900">{selectedPost.author}</span>
                  <span>·</span>
                  <span>{selectedPost.authorRole}</span>
                  <span>·</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              {/* Key takeaways box */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950 block">
                  Key Takeaways:
                </span>
                <div className="space-y-1.5">
                  {selectedPost.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-purple-900">
                      <Check className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Footer action */}
              <div className="pt-6 border-t border-purple-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
