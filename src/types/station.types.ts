import type {
  AddressDTO,
  Coordinates,
  NamesDTO,
  Timestamps,
} from "./common.types";

export interface Station extends Timestamps, NamesDTO, AddressDTO, Coordinates {
  id: number;
}

export interface SearchStation extends NamesDTO {
  id: number;
}

export interface StationCreateDto extends NamesDTO, AddressDTO, Coordinates {}

export interface StationUpdateDto extends NamesDTO, AddressDTO, Coordinates {
  id: number;
}
