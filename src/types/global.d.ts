import "next-auth";
import "next-auth/jwt";
import "usehooks-ts";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string | null;
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
    language?: string | null;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string | null;
      first_name?: string | null;
      last_name?: string | null;
      phone?: string | null;
      language?: string | null;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string | null;
    accessToken: string;
    first_name?: string | null;
    last_name?: string | null;
    phone?: string | null;
    language?: string | null;
  }
}

declare module "next-intl" {
  interface AppConfig {
    Messages: import("./common.types").Messages;
  }
}

// React 19 issue: https://github.com/juliencrn/usehooks-ts/issues/663
declare module "usehooks-ts" {
  declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null | undefined> | RefObject<T | null | undefined>[],
    handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
    eventType?: EventType,
    eventListenerOptions?: AddEventListenerOptions,
  ): void;

  declare function useHover<T extends HTMLElement = HTMLElement>(
    elementRef: RefObject<T | null | undefined>,
  ): boolean;
}
