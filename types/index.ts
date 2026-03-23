export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export interface Course {
  id: number;
  category_id: number;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  tier_target: string;
  difficulty: number;
  sort_order: number;
  is_published: boolean;
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  description: string | null;
  video_url: string | null;
  video_id: string | null;
  duration: number | null;
  thumbnail_url: string | null;
  sort_order: number;
  is_free: boolean;
  key_points: string[] | null;
}

export interface Profile {
  user_id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  creator_tier: string | null;
  interests: string[] | null;
}

export interface WatchHistory {
  id: number;
  user_id: string;
  lesson_id: number;
  video_id: string | null;
  progress_seconds: number;
  completed: boolean;
  watched_at: string;
}

export interface Bookmark {
  id: number;
  user_id: string;
  lesson_id: number;
  created_at: string;
}
