import { ILocation } from "src/app/shared/models/location.model";

export interface LocationResponse {
  page: number;
  data: ILocation[];
  total: number;
}
