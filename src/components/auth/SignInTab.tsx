"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { LoadingSwap } from "../ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(6),
});

type TSignInForm = z.infer<typeof signInSchema>;

const SignInTab = ({
  openEmailVerificationTab,
  openForgotPasswordTab,
}: {
  openEmailVerificationTab: (email: string) => void;
  openForgotPasswordTab: () => void;
}) => {
  const router = useRouter();
  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSignIn = async (data: TSignInForm) => {
    await authClient.signIn.email(
      {
        ...data,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Successfully signed in!");
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "EMAIL_NOT_VERIFIED") {
            openEmailVerificationTab(data.email);
            return;
          }
          toast.error(error.error.message || "Failed to sign in!");
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSignIn)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Password</FormLabel>
                <Button
                  onClick={openForgotPasswordTab}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-sm font-normal underline"
                >
                  Forgot Password?
                </Button>
              </div>
              <FormControl>
                <PasswordInput placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          <LoadingSwap isLoading={isSubmitting}>Sign In</LoadingSwap>
        </Button>
      </form>
    </Form>
  );
};

export default SignInTab;
