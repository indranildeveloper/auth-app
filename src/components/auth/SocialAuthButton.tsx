"use client";

import {
  SUPPORTED_OAUTH_PROVIDER_DETAILS,
  SUPPORTED_OAUTH_PROVIDERS,
} from "@/lib/auth/o-auth-providers";
import { FC } from "react";
import { authClient } from "@/lib/auth/auth-client";
import BetterAuthActionButton from "./BetterAuthActionButton";

const SocialAuthButton: FC = () => {
  return (
    <>
      {SUPPORTED_OAUTH_PROVIDERS.map((provider) => {
        const Icon = SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].Icon;
        // TODO: Handle loading and error states
        return (
          <BetterAuthActionButton
            key={provider}
            variant="outline"
            // @ts-expect-error this is good
            action={() => {
              return authClient.signIn.social({ provider, callbackURL: "/" });
            }}
          >
            <Icon />
            {SUPPORTED_OAUTH_PROVIDER_DETAILS[provider].name}
          </BetterAuthActionButton>
        );
      })}
    </>
  );
};

export default SocialAuthButton;
