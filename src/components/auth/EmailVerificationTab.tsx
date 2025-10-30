"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import BetterAuthActionButton from "./BetterAuthActionButton";

const EmailVerificationTab = ({ email }: { email: string }) => {
  const [timeToNextResend, setTimeToNextResend] = useState<number>(30);
  const interval = useRef<NodeJS.Timeout>(undefined);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;
        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  useEffect(() => {
    startEmailVerificationCountdown();
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        We sent you a verification link. Please check your email and click the
        link to verify your account.
      </p>

      <BetterAuthActionButton
        variant="outline"
        className="w-full"
        successMessage="Verification Email Sent!"
        disabled={timeToNextResend > 0}
        // @ts-expect-error this is good
        action={() => {
          startEmailVerificationCountdown(30);
          return authClient.sendVerificationEmail({
            email,
            callbackURL: "/",
          });
        }}
      >
        {timeToNextResend > 0
          ? `Resend Email (${timeToNextResend})`
          : "Resend Email"}
      </BetterAuthActionButton>
    </div>
  );
};

// 01:24

export default EmailVerificationTab;
