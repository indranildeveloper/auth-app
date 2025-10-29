"use client";

import { ComponentProps } from "react";
import { ActionButton } from "../ui/action-button";

const BetterAuthActionButton = ({
  action,
  successMessage,
  ...props
}: Omit<ComponentProps<typeof ActionButton>, "action"> & {
  action: Promise<{ error: null | { message?: string } }>;
  successMessage?: string;
}) => {
  return (
    <ActionButton
      {...props}
      action={async () => {
        // @ts-expect-error this is good
        const response = await action();

        if (response.error) {
          return {
            error: true,
            message: response.error.message || "Action Failed!",
          };
        } else {
          return { error: false, message: successMessage };
        }
      }}
    />
  );
};

export default BetterAuthActionButton;
