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

// === ライブ配信 & 添削チケット関連 ===

export interface Creator {
  id: number;
  user_id: string | null;
  name: string;
  slug: string;
  bio: string | null;
  avatar_url: string | null;
  tier: number;
  specialties: string[] | null;
  social_links: Record<string, string> | null;
  is_active: boolean;
  created_at: string;
}

export interface LiveArchive {
  id: number;
  creator_id: number;
  title: string;
  description: string | null;
  youtube_url: string;
  thumbnail_url: string | null;
  duration_min: number | null;
  streamed_at: string | null;
  tags: string[] | null;
  is_published: boolean;
  is_free: boolean;
  created_at: string;
  creator?: Creator;
}

export interface Subscription {
  id: number;
  user_id: string;
  plan_type: string;
  status: string;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}

export interface ReviewTicket {
  id: number;
  creator_id: number;
  title: string;
  description: string | null;
  price: number;
  rank: 'silver' | 'gold' | 'platinum';
  max_per_month: number | null;
  is_active: boolean;
  created_at: string;
  creator?: Creator;
}

export type ReviewOrderStatus = 'pending' | 'submitted' | 'in_review' | 'delivered' | 'completed';

export interface ReviewOrder {
  id: number;
  ticket_id: number;
  user_id: string;
  creator_id: number;
  status: ReviewOrderStatus;
  stripe_payment_id: string | null;
  submission_type: 'finished' | 'wip' | 'concept' | null;
  submission_url: string | null;
  production_note: {
    goal?: string;
    pain_points?: string;
    tools?: string;
    type?: string;
  } | null;
  submitted_at: string | null;
  review_video_url: string | null;
  review_text: string | null;
  delivered_at: string | null;
  public_opt_in: boolean;
  rating: number | null;
  rating_comment: string | null;
  created_at: string;
  ticket?: ReviewTicket;
  creator?: Creator;
}
