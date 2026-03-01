import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import VapiControlsClient from "./VapiControlsClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReadBookPage({ params }: Props) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const { id } = await params;
  const book = await fetchQuery(api.books.getById, { bookId: id as any });

  if (!book) {
    redirect("/");
  }

  return (
    <div className="book-page-container">
      <Link href={`/books/${book.slug}`} className="back-btn-floating">
        <ArrowLeft className="size-6 text-[#212a3b]" />
      </Link>

      <VapiControlsClient book={book} userId={userId} />
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const book = await fetchQuery(api.books.getById, { bookId: id as any });

  return {
    title: book ? `${book.title} | Read Now` : "Book Not Found",
    robots: {
      index: false,
      follow: false,
    },
  };
}
