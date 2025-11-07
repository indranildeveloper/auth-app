import { ComponentProps, ElementType } from "react";
import { DiscordIcon, GitHubIcon } from "@/components/auth/icons/OAuthIcons";

export const SUPPORTED_OAUTH_PROVIDERS = ["github", "discord"] as const;
export type TSupportedOAuthProvider =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  TSupportedOAuthProvider,
  {
    name: string;
    Icon: ElementType<ComponentProps<"svg">>;
  }
> = {
  github: { name: "GitHub", Icon: GitHubIcon },
  discord: { name: "Discord", Icon: DiscordIcon },
};
