"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-bold text-xl">AuthDemo</Link>

        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <>
              <p className="text-sm text-neutral-700">
                Hi, {session.user.name?.split(" ")[0] || "User"}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </Button>
            </>
          ) : (
            !pathname.includes("/auth/") && (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </nav>
  );
} 