'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VapiControls from "@/components/VapiControls";

interface BookData {
  _id: string;
  clerkId: string;
  title: string;
  slug: string;
  author: string;
  persona?: string;
  description?: string;
  fileURL: string;
  fileBlobKey: string;
  coverURL?: string;
  coverBlobKey?: string;
  fileSize: number;
  totalSegments: number;
}

interface VapiControlsClientProps {
  book: BookData;
  userId: string;
}

const VapiControlsClient = ({ book, userId }: VapiControlsClientProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!userId || book.clerkId !== userId) {
      toast.error("You don't have access to this book");
      router.push("/");
    }
  }, [userId, book.clerkId, router]);

  const adaptedBook = {
    _id: book._id,
    clerkId: book.clerkId,
    title: book.title,
    slug: book.slug,
    author: book.author,
    persona: book.persona,
    fileURL: book.fileURL,
    fileBlobKey: book.fileBlobKey,
    coverURL: book.coverURL || "",
    coverBlobKey: book.coverBlobKey,
    fileSize: book.fileSize,
    totalSegments: book.totalSegments,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return <VapiControls book={adaptedBook as any} />;
};

export default VapiControlsClient;
