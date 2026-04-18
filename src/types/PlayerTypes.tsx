/** @format */

export type PlayerListQueryParams = {
  search?: string;
  page: number;
  limit: number;
};

export type PlayerListItem = {
  user_id: number;
  display_id: string;
  full_name: string;
  email: string;
  country: string;
  session_played: number;
  matches_played: number;
  total_spent: string;
  status: string;
  subscription_plan: string;
  can_view: boolean;
};

export type PlayerListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: PlayerListItem[];
  requestId?: string;
};

export type PlayerMatchHistoryItem = {
  booking_id: number;
  display_booking_id: string;
  player_name: string;
  session_date: string;
  match_type: string;
  payment_amount: string;
  check_in_status: string;
  status: string;
  payment_status: string;
  field_name: string;
  session_name: string;
  team: string;
  can_view: boolean;
};

export type PlayerDetailQueryParams = {
  search?: string;
  page: number;
  limit: number;
};

export type PlayerDetailResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: {
    user: {
      id: number;
      display_id: string;
      full_name: string;
      email: string;
      contact_number: string;
      location: string | null;
      country: string;
      gender: string | null;
      profile_image: string | null;
      status: string;
      joined_at: string;
    };
    stats: {
      subscription_plan: string;
      total_match_play: number;
    };
    match_history: PlayerMatchHistoryItem[];
  };
  requestId?: string;
};
