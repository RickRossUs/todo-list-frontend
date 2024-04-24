export interface OffsetResponse {
  count: number;
  next: string | null;
  previous: string | null;
  offset: number;
  results: Array<any>;
}
