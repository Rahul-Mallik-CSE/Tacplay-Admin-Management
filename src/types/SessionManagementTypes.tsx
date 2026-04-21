/** @format */

export type SessionScoreValue = "win" | "loss" | "draw";

export type SessionManagementListQueryParams = {
  search?: string;
  page: number;
  limit: number;
  status?: string;
  match_type?: string;
};

export type SessionManagementListItem = {
  session_id: string;
  session_name: string;
  field_id: string;
  player: string;
  amount: string;
  status: string;
  status_display: string;
  match_type?: string;
};

export type SessionManagementListResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: SessionManagementListItem[];
  requestId?: string;
};

export type SessionSummary = {
  session_id: string;
  session_name: string;
  status: string;
  status_display: string;
  team_full_text: string;
  team_a_booked: number;
  team_b_booked: number;
  team_a_limit: number;
  team_b_limit: number;
  match_clock_text: string;
  match_date: string;
  start_time: string;
  end_time: string;
};

export type SessionScoreboardTeam = {
  name: string;
  logo: string | null;
  score: number;
  player_count: number;
  player_limit: number;
};

export type SessionScoreboard = {
  left_team: SessionScoreboardTeam;
  middle: {
    team_full_text: string;
    session_code: string;
    match_clock_text: string;
  };
  right_team: SessionScoreboardTeam;
};

export type SessionDetailCore = {
  id: number;
  session_name: string;
  field_name: string;
  field_location: string;
  entry_fee_with_currency: string;
  status: string;
  status_display: string;
  team_a_name: string;
  team_b_name: string;
  team_a_score: number;
  team_b_score: number;
};

export type SessionPlayerCardStats = {
  win: number;
  loss: number;
  draw: number;
  played: number;
  rank: number;
  score: string;
};

export type SessionTeamPlayer = {
  booking_id: number;
  player_id: number;
  player_name: string;
  player_avatar: string | null;
  team: "A" | "B";
  result: SessionScoreValue | null;
  awarded_score: number;
  card_stats: SessionPlayerCardStats;
};

export type SessionStats = {
  team_a_count: number;
  team_b_count: number;
  total_bookings: number;
  team_full_text: string;
  team_a_limit: number;
  team_b_limit: number;
  total_capacity: number;
};

export type SessionManagementDetailData = {
  session_summary: SessionSummary;
  scoreboard: SessionScoreboard;
  session: SessionDetailCore;
  team_a_players: SessionTeamPlayer[];
  team_b_players: SessionTeamPlayer[];
  stats: SessionStats;
};

export type SessionManagementDetailResponse = {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: SessionManagementDetailData;
  requestId?: string;
};

export type SessionInfoData = {
  header: {
    title: string;
    subtitle: string;
    back_enabled: boolean;
    status: string;
    status_display: string;
  };
  field_info: {
    field_id: string;
    field_name: string;
    location: string;
    contact_number: string;
  };
  session_info: {
    session_id: string;
    session_name: string;
    match_type: string;
    session_date: string;
    time: string;
    session_type: string;
    team: number;
    player_per_team: string;
    packages: string;
  };
  team_info: {
    team_a_name: string;
    team_a_score: string;
    team_b_name: string;
    team_b_score: string;
    champion: string;
  };
  raw: {
    session_id: number;
    field_id: number;
    team_a_booked: number;
    team_b_booked: number;
    team_a_limit: number;
    team_b_limit: number;
    total_bookings: number;
    total_limit: number;
    entry_fee: string;
    status: string;
  };
};

export type SessionManagementInfoResponse = {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: SessionInfoData;
  requestId?: string;
};

export type SessionTeamScorePayload = {
  team_a_result: SessionScoreValue;
  team_b_result: SessionScoreValue;
};

export type SessionPlayerScorePayload = {
  players: {
    booking_id: number;
    result: SessionScoreValue;
  }[];
};

export type SessionScoreMutationPayload =
  | SessionTeamScorePayload
  | SessionPlayerScorePayload;

export type SessionScoreResultData = {
  session_id: number;
  status: string;
  status_display: string;
  team_a_result: SessionScoreValue;
  team_b_result: SessionScoreValue;
  team_a_score: number;
  team_b_score: number;
  winner: string;
};

export type SessionScoreResponse = {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: SessionScoreResultData;
  requestId?: string;
};

export type SessionEnableDisableResponse = {
  success: boolean;
  message: string;
  meta: Record<string, unknown>;
  data: Record<string, unknown>;
  requestId?: string;
};
