import type { DefaultSession } from "next-auth";
import type { ILoginResponse } from "@/types/index";

declare module "next-auth" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: Date | null;
    id?: string;
  }

  interface Session {
    user: {} & DefaultSession["user"] & ILoginResponse;
    error: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: Date | null;
  }

  // interface User extends ILoginResponse {}
}


import 'usehooks-ts'

  // React 19 issue: https://github.com/juliencrn/usehooks-ts/issues/663
declare module 'usehooks-ts' {
  declare function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T | null | undefined> | RefObject<T | null | undefined>[],
    handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
    eventType?: EventType,
    eventListenerOptions?: AddEventListenerOptions
  ): void

  declare function useHover<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T | null | undefined>): boolean;
}
 
declare module 'next-intl' {
  interface AppConfig {
    Messages: import('./common.types').Messages;
  }
}