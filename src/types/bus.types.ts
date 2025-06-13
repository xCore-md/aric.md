import type { NamesDTO, Timestamps } from "./common.types";

export interface Bus extends Timestamps {
  id: number;
  number: string;
  name: string;
  photo: string | null;
  status: BusStatus;
  seats_count: number;
}

export interface BusCreateDto {
  number: string;
  name: string;
  photo: string | null;
  seats_count: number;
  status: BusStatus;
  facilities: number[];
}

export type BusUpdateDto = { id: number } & BusCreateDto;

export interface Facility extends NamesDTO {
  id: number;
}

export type FacilityUpdateDto = { id: number } & Facility;

export interface BusWithFacilities extends Bus {
  facilities: Facility[];
}

export interface BusAggregates {
  statuses: Record<BusStatus, number>;
  total_seats: number;
}

export enum BusStatus {
  Active = "Active",
  Maintenance = "Maintenance",
  Inactive = "Inactive",
}
