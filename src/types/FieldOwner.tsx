/** @format */

export type FieldOwnerListQueryParams = {
  search?: string;
  status?: string;
  page: number;
  limit: number;
};

export type FieldOwnerListItem = {
  user_id: number;
  display_id: string;
  owner_name: string;
  field_name: string;
  email: string;
  country: string;
  apply_date: string;
  status: string;
  can_view: boolean;
};

export type FieldOwnerListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: FieldOwnerListItem[];
  requestId?: string;
};

export type FieldOwnerSessionHistoryItem = {
  session_id: number;
  display_session_id: string;
  session_name: string;
  field_id: string;
  player: string;
  amount: string;
  status: string;
  can_view: boolean;
  match_type: string;
  match_date: string;
  start_time: string;
  end_time: string;
};

export type FieldOwnerDetailQueryParams = {
  search?: string;
  page: number;
  limit: number;
};

export type FieldOwnerDetailResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: {
    user: {
      id: number;
      display_id: string;
      full_name: string;
      email: string;
      contact_number: string;
      country: string;
      profile_image: string | null;
      status: string;
      joined_at: string;
    };
    field: {
      id: number;
      field_name: string;
      description: string;
      full_address: string;
      business_name: string;
      business_type: string;
      approval_status: string;
      submitted_at: string;
      approved_at: string | null;
      rejection_reason: string | null;
    };
    stats: {
      subscription_plan: string;
      total_session: number;
      rank_match: number;
      social_match: number;
      total_revenue: string;
    };
    session_history: FieldOwnerSessionHistoryItem[];
  };
  requestId?: string;
};
