import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { SignedIn, SignedOut } from "@clerk/nextjs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await fetchQuery(api.books.getPublicBook, { slug });

  if (!book) {
    return { title: "Book Not Found | BookNote" };
  }

  return {
    title: `${book.title} by ${book.author} | BookNote`,
    description: book.description || `Read "${book.title}" by ${book.author} on BookNote. Transform books into AI conversations.`,
    openGraph: {
      title: book.title,
      description: book.description || `Read ${book.title} by ${book.author}`,
      images: book.coverURL ? [book.coverURL] : [],
      type: "website",
    },
  };
}

export default async function BookLandingPage({ params }: Props) {
  const { slug } = await params;
  const book = await fetchQuery(api.books.getPublicBook, { slug });

  if (!book) {
    notFound();
  }

  return (
    <div className="book-page-container">
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <div className="book-info-section">
        <h1 className="text-4xl font-serif font-bold text-[#212a3b]">{book.title}</h1>
        <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
        
        {book.description && (
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">{book.description}</p>
        )}
        
        {book.persona && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">AI Persona</p>
            <p className="text-sm text-blue-700">{book.persona}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <SignedIn>
          <Link
            href={`/read/${book._id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#212a3b] text-white rounded-lg hover:bg-[#2d3a4f] transition-colors"
          >
            <Mic className="size-5" />
            Start AI Conversation
          </Link>
        </SignedIn>
        
        <SignedOut>
          <div className="p-4 bg-gray-100 rounded-lg text-center">
            <p className="text-gray-700">Sign in to start an AI conversation with this book</p>
          </div>
        </SignedOut>
      </div>
    </div>
  );
}
