"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInTab from "@/components/auth/SignInTab";
import SignUpTab from "@/components/auth/SignUpTab";
import { Separator } from "@/components/ui/separator";
import SocialAuthButton from "@/components/auth/SocialAuthButton";
import { authClient } from "@/lib/auth-client";
import EmailVerificationTab from "@/components/auth/EmailVerificationTab";

type TTab = "signin" | "signup" | "email-verification";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<TTab>("signin");
  const router = useRouter();

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session.data != null) {
        router.push("/");
      }
    });
  }, [router]);

  function openEmailVerificationTab(email: string) {
    setEmail(email);
    setSelectedTab("email-verification");
  }

  return (
    <Tabs
      value={selectedTab}
      onValueChange={(value) => setSelectedTab(value as TTab)}
      className="mx-auto w-full my-6 px-4"
    >
      {(selectedTab === "signin" || selectedTab === "signup") && (
        <TabsList>
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
      )}
      <TabsContent value="signin">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInTab openEmailVerificationTab={openEmailVerificationTab} />
          </CardContent>
          <Separator />
          <CardFooter className="grid grid-cols-2 gap-3">
            <SocialAuthButton />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpTab openEmailVerificationTab={openEmailVerificationTab} />
          </CardContent>
          <Separator />
          <CardFooter className="grid grid-cols-2 gap-3">
            <SocialAuthButton />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="email-verification">
        <Card>
          <CardHeader className="text-2xl font-bold">
            <CardTitle>Verify your email</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailVerificationTab email={email} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default LoginPage;
