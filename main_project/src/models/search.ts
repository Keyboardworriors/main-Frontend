import { Mood } from "./diary";
import { Music } from "./diary";

export interface SearchResult {
  diary_id: number;
  title: string;
  content: string;
  created_at: string;
  rec_music: Music;
  moods: string[];
}

export interface SearchResponse {
  diary_list: SearchResult[];
}

export interface Search {
  search: string;
}

export interface Chart {
  moods: Mood[];
  count: number;
}
