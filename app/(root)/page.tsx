import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Mic, Sparkles, Car, Moon, Brain, Github, Shield, Zap, Eye, Code2, Headphones, FlaskConical, Accessibility } from "lucide-react";

export const metadata: Metadata = {
  title: "BookNote | The First Auditory-First Intellectual Companion for Your PDFs",
  description: "Hear the Unspoken. Speak to the Written. BookNote enables Auditory Knowledge Synthesis—engage in Synchronous Dialectic with any PDF. Transform passive reading into active intellectual dialogue.",
  keywords: ["Auditory Knowledge Synthesis", "PDF Voice Assistant", "Socratic Inquiry", "Active Recall via Voice", "Non-Linear Navigation", "Semantic Echo", "AI Voice Reader", "Open Source PDF Chat"],
  openGraph: {
    title: "BookNote | The First Auditory-First Intellectual Companion for Your PDFs",
    description: "Hear the Unspoken. Speak to the Written. Engage in Synchronous Dialectic with any document.",
    type: "website",
  },
};

const testimonialsRow1 = [
  {
    id: 1,
    quote: "I stopped 'skimming' and started 'interrogating.' BookNote turned my 300-page dissertation bibliography into a series of late-night Socratic debates.",
    author: "Julian V.",
    title: "PhD Candidate, Comparative Literature",
    avatar: "JV",
  },
  {
    id: 2,
    quote: "Reading a 60-page market report while driving was impossible. Now I discuss data points with BookNote during my commute.",
    author: "Sarah K.",
    title: "Senior Analyst",
    avatar: "SK",
  },
  {
    id: 3,
    quote: "Standard PDFs are a wall of static. Speaking to the text through BookNote bypasses my dyslexia and lets me engage with ideas directly.",
    author: "Leo T.",
    title: "Independent Researcher",
    avatar: "LT",
  },
];

const testimonialsRow2 = [
  {
    id: 4,
    quote: "I didn't just buy a subscription; I joined a movement. Being able to see exactly how BookNote handles my data gives me confidence.",
    author: "Marcus D.",
    title: "Open Source Contributor",
    avatar: "MD",
  },
  {
    id: 5,
    quote: "As a professor, I use BookNote to prepare lectures. The Socratic dialogue helps me see arguments from angles I missed during reading.",
    author: "Dr. Elena R.",
    title: "Philosophy Professor",
    avatar: "ER",
  },
  {
    id: 6,
    quote: "My grandfather can't read anymore due to vision loss. BookNote gave him his love of reading back. He 'reads' through conversation now.",
    author: "James M.",
    title: "Software Engineer",
    avatar: "JM",
  },
];

const personas = [
  {
    id: 1,
    icon: Car,
    title: "The Commuting Intellectual",
    description: "Turn your 40-minute drive into a seminar. Discuss the nuances of a philosophy paper without taking your hands off the wheel.",
  },
  {
    id: 2,
    icon: Moon,
    title: "The Night-Owl Researcher",
    description: "Give your eyes a rest. Lay back and let the AI walk you through complex data while you interrogate the findings verbally.",
  },
  {
    id: 3,
    icon: Accessibility,
    title: "The Neurodivergent Reader",
    description: "Transform static blocks of text into a dynamic verbal dialogue. Perfect for those who struggle with traditional reading but excel in conversation.",
  },
];

export default function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="wrapper pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="library-hero-card">
          <div className="library-hero-content">
            <div className="library-hero-text">
              <h1 className="library-hero-title">
                Hear the Unspoken.
                <br />
                <span className="text-brand">Speak to the Written.</span>
              </h1>
              <p className="library-hero-description">
                The First Auditory-First Intellectual Companion for Your PDFs.
                Most AI readers just summarize text. BookNote builds a bridge between your voice and your books.
                Engage in Synchronous Dialectic with any document—no more passive reading.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full lg:w-auto">
                <Link href="/books/new" className="btn-primary text-base py-3 px-5">
                  Own Your Intellectual Engine
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/subscriptions" className="library-cta-secondary text-base py-3 px-5">
                  View Pricing
                </Link>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-3">
                No credit card required • Start with 1 free book • Open Source
              </p>
            </div>

            <div className="library-steps-card min-w-[260px] max-w-[280px] z-10 shadow-soft-md">
              <ul className="space-y-6">
                <li className="library-step-item">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--text-primary)] flex items-center justify-center font-semibold text-lg">1</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title text-lg font-bold">Upload PDF</h3>
                    <p className="library-step-description text-gray-500">Add your book file</p>
                  </div>
                </li>
                <li className="library-step-item">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--text-primary)] flex items-center justify-center font-semibold text-lg">2</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title text-lg font-bold">AI Processing</h3>
                    <p className="library-step-description text-gray-500">We analyze the content</p>
                  </div>
                </li>
                <li className="library-step-item">
                  <div className="w-10 h-10 min-w-10 min-h-10 rounded-full border border-[var(--text-primary)] flex items-center justify-center font-semibold text-lg">3</div>
                  <div className="flex flex-col">
                    <h3 className="library-step-title text-lg font-bold">Voice Chat</h3>
                    <p className="library-step-description text-gray-500">Discuss with AI</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee - Two Rows */}
      <section className="py-12 bg-[#f8f4e9] overflow-hidden">
        <div className="wrapper mb-8">
          <h2 className="section-title text-center">Intellectual Social Proof</h2>
        </div>
        
        {/* Row 1 - Left to Right */}
        <div className="relative flex overflow-x-hidden mb-6">
          <div className="animate-marquee whitespace-nowrap py-2 flex gap-6">
            {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <div key={`row1-${t.id}-${i}`} className="inline-flex px-2">
                <div className="bg-white rounded-xl p-5 shadow-soft min-w-[320px] max-w-[360px] border border-[var(--border-subtle)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f3e4c7] rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-[#663820] text-sm">{t.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-primary)] text-sm leading-relaxed line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                      <p className="font-semibold text-[var(--text-primary)] mt-2 text-sm">{t.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8f4e9] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8f4e9] to-transparent" />
        </div>

        {/* Row 2 - Right to Left (Opposite) */}
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee-reverse whitespace-nowrap py-2 flex gap-6">
            {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <div key={`row2-${t.id}-${i}`} className="inline-flex px-2">
                <div className="bg-white rounded-xl p-5 shadow-soft min-w-[320px] max-w-[360px] border border-[var(--border-subtle)]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f3e4c7] rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold text-[#663820] text-sm">{t.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-primary)] text-sm leading-relaxed line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                      <p className="font-semibold text-[var(--text-primary)] mt-2 text-sm">{t.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8f4e9] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8f4e9] to-transparent" />
        </div>
      </section>

      {/* Persona-Based Use Cases */}
      <section className="wrapper py-16 md:py-20">
        <h2 className="section-title text-center mb-4">Built for the Curious Mind</h2>
        <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
          Whether you&apos;re a commuting professional, night-owl researcher, or neurodivergent learner, 
          BookNote transforms static text into dynamic Auditory Knowledge Synthesis.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {personas.map((persona) => (
            <div key={persona.id} className="bg-white rounded-[14px] p-6 shadow-soft hover:shadow-soft-md transition-shadow border border-[var(--border-subtle)]">
              <div className="w-14 h-14 bg-[#f3e4c7] rounded-xl flex items-center justify-center mb-4">
                <persona.icon className="w-7 h-7 text-[#663820]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-serif">{persona.title}</h3>
              <p className="text-[var(--text-secondary)]">{persona.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why BookNote is Different */}
      <section className="wrapper py-16 md:py-20 bg-[var(--bg-secondary)] rounded-[14px]">
        <h2 className="section-title text-center mb-4">Beyond the Text Box</h2>
        <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto mb-12">
          We don&apos;t just read your PDFs. We engage in genuine intellectual dialogue.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Dynamic Persona Synthesis</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              We don&apos;t just &apos;read&apos; the book. We analyze the author&apos;s tone to provide responses that feel like a conversation with the source material.
            </p>
          </div>
          
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Zero-Latency Vocal Loops</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              Powered by Vapi AI, our system eliminates the &apos;awkward silence&apos; found in other AI voice tools. It&apos;s a fluid, human-speed exchange.
            </p>
          </div>
          
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Privacy-First Intellectual Property</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              Your books are your brains. We don&apos;t train models on your private uploads. Your insights stay yours.
            </p>
          </div>
          
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Verifiable RAG Pipeline</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              Powered by Convex&apos;s real-time vector infrastructure for instant semantic retrieval. No AI hallucinations—100% factual accuracy.
            </p>
          </div>
          
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Code2 className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Self-Sovereign Data</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              Most AI tools are black boxes. BookNote is Open Source. Your PDFs never enter a &apos;training set&apos; for a giant model.
            </p>
          </div>
          
          <div className="bg-white rounded-[14px] p-6 shadow-soft border border-[var(--border-subtle)]">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-brand" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] font-serif">Auditory Knowledge Synthesis</h3>
            </div>
            <p className="text-[var(--text-secondary)]">
              For people who learn better by talking. Transform passive reading into Active Recall via Voice with Socratic Inquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="wrapper py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">Transparency Over Proprietary Walls</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Most AI tools are black boxes. BookNote is Open Source. We believe your library belongs to you—not a corporation. 
            Inspect the code, verify the privacy, and contribute to the future of auditory learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books/new" className="btn-primary text-base py-3 px-5 inline-flex">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a 
              href="https://github.com/levarlux/BookNote" 
              target="_blank" 
              rel="noopener noreferrer"
              className="library-cta-secondary text-base py-3 px-5 inline-flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              Star on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="wrapper pb-16 md:pb-20">
        <div className="bg-[#f3e4c7] rounded-[14px] p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--text-primary)] mb-4">
            Ready to transform how you read?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-xl mx-auto">
            Join the movement of intellectuals who are redefining the relationship between voice, text, and knowledge.
          </p>
          <Link 
            href="/books/new"
            className="btn-primary text-base py-3 px-6 inline-flex"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[var(--bg-secondary)]">
        <div className="wrapper flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © 2026 BookNote. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/levarlux/BookNote" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Github className="w-4 h-4" />
              Open Source
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
