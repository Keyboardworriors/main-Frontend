export type Genre =
  | "Electronic"
  | "Pop"
  | "Ballad"
  | "K-pop"
  | "Jazz"
  | "Rock"
  | "Classic"
  | "Hip-hop"
  | "Country";

export interface GenreSelectorProps {
  selectedGenres: Genre[];
  onGenreClick: (genre: Genre) => void;
}

export interface ProfileImageUploaderProps {
  profileImage: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputFieldProps {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
}
