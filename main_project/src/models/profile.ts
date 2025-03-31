export interface SocialLoginUser {
  email: string;
  profile_image: string;
  provider: string;
  is_active: boolean;
}

export const GENRE_LIST = [
  "Electronic",
  "Pop",
  "Ballad",
  "K-pop",
  "Jazz",
  "Rock",
  "Classic",
  "Hip-hop",
  "Country",
] as const;

export type Genre = (typeof GENRE_LIST)[number];

export const isValidGenre = (genre: string): genre is Genre => {
  return GENRE_LIST.includes(genre as Genre);
};

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
  maxLength?: number;
  isError?: boolean;
}
