export interface Item {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;

  plot?: string;
  genre?: string;
  director?: number;
  actors?: number;
  imdbRating?: string;
  runtime?: string;
}
