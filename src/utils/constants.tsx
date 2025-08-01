import { CurrencyEnum, LanguageEnum, Messages } from "@/types";
import { ro, enUS, ru, Locale } from "date-fns/locale";

export const DATE_FNS_LOCALE_MAP: Record<string, Locale> = {
  ro,
  en: enUS,
  ru,
};

type NavKey = keyof Messages["nav"];
type NavLabel = `nav.${NavKey}`;

type NavLinkItem = {
  path: string;
  label: NavLabel;
};

export const NAV_LINK = {
  home: {
    path: "/",
    label: "nav.home",
  },
  about: {
    path: "/about",
    label: "nav.about",
  },
  faq: {
    path: "/faq",
    label: "nav.faq",
  },
  contacts: {
    path: "/contacts",
    label: "nav.contacts",
  },
} as const satisfies Record<string, NavLinkItem>;

export const NAV_LINKS = Object.values(NAV_LINK);

export const MOLDOVA_PHONE_CODE = "+373";

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;

export const QUERY_KEYS = {
  searchStations: "searchStations",
  searchStationsDestinations: "searchStationsDestinations",
  searchTripDates: "searchTripDates",
  search: "search",
  searchReturnTripDates: "searchReturnTripDates",
  profile: "profile",
  refundPolicy: "refundPolicy",
  passengers: "passengers",
  booking: "booking",
  drafts: "drafts",
  tickets: "tickets",
  payments: "payments",
  bookingPrice: "bookingPrice",
  weeklyTrips: "weeklyTrips",
  nearestTrips: "nearestTrips",
  reviews: "reviews",
  faq: "faq",
} as const;

export const PRIVATE_LINK = {
  booking: {
    path: "/booking",
    label: "nav.booking",
    svgPath: (
      <path d="M10.17 19.064A1.468 1.468 0 1 1 10.172 22a1.468 1.468 0 0 1 0-2.936ZM17.02 19.064a1.468 1.468 0 1 1 0 2.936 1.468 1.468 0 0 1 0-2.936ZM3.344 3.537c1.232 0 2.32.804 2.682 1.982l3.065 9.957c.143.464.572.782 1.057.782h6.963c.467 0 .884-.294 1.042-.734l2.04-5.68a2.086 2.086 0 0 0-1.963-2.79h-7.57a.85.85 0 1 1 0-1.7h7.57c2.62 0 4.448 2.599 3.563 5.065l-2.04 5.68a2.809 2.809 0 0 1-2.642 1.859h-6.963a2.808 2.808 0 0 1-2.682-1.982L4.4 6.019a1.107 1.107 0 0 0-1.057-.783h-.512a.85.85 0 1 1 0-1.699h.512Z" />
    ),
  },
  tickets: {
    path: "/tickets",
    label: "nav.my_tickets",
    svgPath: (
      <>
        <path d="M13.06 13.991a.85.85 0 0 1 0 1.692l-.086.004H5.52a.85.85 0 1 1 0-1.7h7.454l.086.004ZM10.737 7.34a.85.85 0 0 1 1.137 1.26l-2.556 2.557a1.573 1.573 0 0 1-2.105.108l-.12-.108-.51-.511a.85.85 0 0 1 1.201-1.203l.422.422L10.672 7.4l.065-.058Z" />
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M14.838.942a2.714 2.714 0 0 1 2.714 2.713v13.757c0 2.017-2.123 3.33-3.927 2.428l-.197-.099a1.014 1.014 0 0 0-.797-.047l-.11.047-2.06 1.03a2.714 2.714 0 0 1-2.282.068l-.145-.067-1.907-.954a.681.681 0 0 0-.704.058l-.082.07a2.382 2.382 0 0 1-3.188.163l-.18-.163-.236-.235a2.714 2.714 0 0 1-.794-1.919V3.655A2.713 2.713 0 0 1 3.656.942h11.182Zm-11.182 1.7c-.56 0-1.013.454-1.013 1.013v14.137c0 .269.107.527.296.717l.236.235.106.087a.682.682 0 0 0 .858-.087l.14-.13a2.382 2.382 0 0 1 2.609-.316l1.906.953.11.047c.259.093.547.078.796-.047l2.06-1.03.145-.068a2.715 2.715 0 0 1 2.284.068l.196.098a1.014 1.014 0 0 0 1.467-.907V3.655c0-.56-.454-1.013-1.014-1.013H3.656Z"
        />
      </>
    ),
  },
  passengers: {
    path: "/passengers",
    label: "nav.passengers",
    svgPath: (
      <path d="M12.0098 12.165C15.1989 12.1652 18.0053 14.2705 18.8984 17.332L19.2979 18.7002C19.7788 20.3501 18.541 22 16.8223 22H7.19629C5.47785 21.9997 4.24071 20.35 4.72168 18.7002L5.12012 17.332L5.20898 17.0479C6.18855 14.1409 8.92022 12.1652 12.0098 12.165ZM12.0098 13.8682C9.65318 13.8683 7.56953 15.3745 6.82227 17.5918L6.75391 17.8086L6.35547 19.1768C6.19227 19.7371 6.61267 20.2975 7.19629 20.2979H16.8223C17.4062 20.2979 17.8265 19.7374 17.6631 19.1768L17.2646 17.8086C16.5833 15.4734 14.4424 13.8683 12.0098 13.8682ZM12.0098 2C14.7254 2.00012 16.9268 4.20231 16.9268 6.91797C16.9264 9.63331 14.7252 11.8348 12.0098 11.835C9.29435 11.8349 7.09217 9.63333 7.0918 6.91797C7.0918 4.20229 9.29412 2.0001 12.0098 2ZM12.0098 3.70312C10.2342 3.70323 8.79492 5.1424 8.79492 6.91797C8.79529 8.69322 10.2344 10.1327 12.0098 10.1328C13.7851 10.1327 15.2242 8.69321 15.2246 6.91797C15.2246 5.14241 13.7853 3.70325 12.0098 3.70312Z" />
    ),
  },
  payments: {
    path: "/payments",
    label: "nav.payments",
    svgPath: (
      <path d="M18.4512 3.77672C20.4473 3.77681 22.066 5.39487 22.0664 7.39098V9.21031C22.0666 9.21843 22.0674 9.22656 22.0674 9.23473C22.0674 9.24149 22.0666 9.24851 22.0664 9.25523V14.7445C22.0666 14.7513 22.0674 14.7581 22.0674 14.765C22.0674 14.7718 22.0666 14.7788 22.0664 14.7855V16.6078C22.0664 18.6042 20.4476 20.2229 18.4512 20.223H5.54785C3.55151 20.2228 1.93359 18.6042 1.93359 16.6078V7.39098C1.93399 5.39492 3.55175 3.7769 5.54785 3.77672H18.4512ZM5.54785 5.47594C4.49063 5.47611 3.63321 6.33381 3.63281 7.39098V16.6078C3.63281 17.6653 4.49039 18.5226 5.54785 18.5228H18.4512C19.5087 18.5227 20.3662 17.6653 20.3662 16.6078V15.6146H17.5303C15.5339 15.6144 13.916 13.9958 13.916 11.9994C13.9164 10.0033 15.5341 8.38529 17.5303 8.38512H20.3662V7.39098C20.3658 6.33376 19.5085 5.47603 18.4512 5.47594H5.54785ZM17.5303 10.0843C16.473 10.0845 15.6156 10.9422 15.6152 11.9994C15.6152 13.0569 16.4728 13.9142 17.5303 13.9144H20.3662V10.0843H17.5303Z" />
    ),
  },
  settings: {
    path: "/settings",
    label: "nav.profile_settings",
    svgPath: (
      <path d="M13.785 7c0-.63.247-1.237.689-1.688l2.424-2.425a5.082 5.082 0 0 0-4.645 1.964 5.082 5.082 0 0 0-.501 5.358.85.85 0 0 1-.162.984l-8.522 8.445-.005.004a.711.711 0 0 0-.09.908l.09.108.577.575.108.091a.713.713 0 0 0 .907-.09l8.53-8.514.101-.087a.851.851 0 0 1 .865-.08l.324.141a5.098 5.098 0 0 0 6.636-2.94c.278-.734.377-1.52.301-2.297l-2.296 2.298v-.001a2.41 2.41 0 0 1-2.668.535 2.409 2.409 0 0 1-.748-.503l-1.185-1.06c-.014-.013-.028-.025-.041-.039A2.41 2.41 0 0 1 13.785 7Zm8.225-.14-.002.001.175-.033-.173.031ZM15.484 7a.71.71 0 0 0 .2.491l1.15 1.03.045.042a.714.714 0 0 0 1.023 0l.012-.01 3.121-3.122.111-.093a.85.85 0 0 1 .935-.03l.176.12a2.038 2.038 0 0 1 .76 1.239 6.8 6.8 0 0 1-2.516 6.662 6.8 6.8 0 0 1-6.519.996L5.864 22.43v-.001a2.41 2.41 0 0 1-1.717.718 2.411 2.411 0 0 1-1.716-.72l-.563-.56h.001a2.409 2.409 0 0 1 .006-3.441l8.103-8.029a6.78 6.78 0 0 1 7.408-9.159l.234.043.078.02a2.038 2.038 0 0 1 1.286 1.152l.042.121a.85.85 0 0 1-.222.813l-3.115 3.115-.087.108a.711.711 0 0 0-.118.39Z" />
    ),
  },
} as const;

export const PRIVATE_LINKS = Object.values(PRIVATE_LINK);

export const CONTACTS = {
  email: "contact@aric.md",
  phone: "+373 79 435 990",
};

export const AVAILABLE_CURRENCIES = Object.values(CurrencyEnum);
export const AVAILABLE_LANGUAGES = Object.values(LanguageEnum);
export const CURRENCIES = Object.values(CurrencyEnum);

export const AUTH_SUCCESS_EVENT = "authSuccess";
