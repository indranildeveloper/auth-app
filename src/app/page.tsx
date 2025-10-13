import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">Welcome to our App</h1>
        <Button asChild>
          <Link href="/auth/login">Sign In / Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
