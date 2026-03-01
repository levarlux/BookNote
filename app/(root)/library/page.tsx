import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import Search from "@/components/Search";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { userId } = await auth();
    
    if (!userId) {
        redirect("/sign-in");
    }

    const { query } = await searchParams;

    const books = await fetchQuery(api.books.getAll, { search: query });

    return (
        <main className="wrapper container">
            <HeroSection />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
                <h2 className="text-3xl font-serif font-bold text-[#212a3b]">Recent Books</h2>
                <Search />
            </div>

            <div className="library-books-grid">
                {books?.map((book) => (
                    <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL || ""} slug={book.slug} />
                ))}
            </div>
        </main>
    )
}

export default Page
