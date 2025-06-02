export interface ILoginResponse {
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IParams {
  locale?: string;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export interface IParamsAndSearchParams {
  params?: IParams;
  searchParams?: ISearchParams;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  results: Array<T>;
}

export type TicketFormValues = {
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
};
