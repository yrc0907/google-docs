import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <main className="flex flex-col items-center justify-center w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Next.js Auth Demo
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          A demonstration of Next.js authentication with Auth.js
        </p>

        <div className="mt-10 w-full max-w-md">
          {user ? (
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg border border-neutral-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}</h2>
                <p className="mb-4 text-neutral-600">You are signed in as {user.email}</p>
                <form action="/api/auth/signout" method="post">
                  <Button className="w-full">Sign Out</Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Link href="/auth/signin">
                <Button className="w-full mb-2">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
