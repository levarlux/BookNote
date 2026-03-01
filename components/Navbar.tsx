'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

const Navbar = () => {
    const pathName = usePathname();
    const { user } = useUser();

    const publicNavItems = [
        { label: "Home", href: "/" },
        { label: "Pricing", href: "/subscriptions" },
    ];

    const privateNavItems = [
        { label: "Library", href: "/library" },
        { label: "Add New", href: "/books/new" },
    ];

    return (
        <header className="w-full fixed z-50 bg-(--bg-primary)">
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image src="/assets/logo.png" alt="BookNote" width={42} height={26} />
                    <span className="logo-text">BookNote</span>
                </Link>

                <nav className="w-fit flex gap-7.5 items-center">
                    {publicNavItems.map(({ label, href }) => {
                        const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                        return (
                            <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>
                                {label}
                            </Link>
                        )
                    })}

                    <SignedIn>
                        {privateNavItems.map(({ label, href }) => {
                            const isActive = pathName === href || (href !== '/' && pathName.startsWith(href));

                            return (
                                <Link href={href} key={label} className={cn('nav-link-base', isActive ? 'nav-link-active' : 'text-black hover:opacity-70')}>
                                    {label}
                                </Link>
                            )
                        })}
                    </SignedIn>

                    <a 
                        href="https://github.com/levarlux/BookNote" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="nav-link-base text-black hover:opacity-70"
                    >
                        <Github className="w-5 h-5" />
                    </a>

                    <div className="flex gap-7.5 items-center">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="nav-btn">Sign In</button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="nav-user-link">
                                <UserButton />
                                {user?.firstName && (
                                    <Link href="/subscriptions" className="nav-user-name">
                                        {user.firstName}
                                    </Link>
                                )}
                            </div>
                        </SignedIn>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
