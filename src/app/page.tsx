"use client";

import Link from "next/link";
import BetterAuthActionButton from "@/components/auth/BetterAuthActionButton";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

const HomePage = () => {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        {session === null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome to our App</h1>
            <Button asChild>
              <Link href="/auth/login">Sign In / Sign Up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>
            <BetterAuthActionButton
              variant="destructive"
              // @ts-expect-error this is good
              action={() => authClient.signOut()}
            >
              Sign Out
            </BetterAuthActionButton>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
