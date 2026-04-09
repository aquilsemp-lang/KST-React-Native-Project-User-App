/**
 * API endpoint constants for KissaShuru Mobile
 * Base URL: https://kissashuru.com/api/
 */

//export const API_BASE_URL = "https://staging.kissashurutalkies.com/api/";
export const API_BASE_URL="https://console.kissashuru.com/api/";
// export const API_BASE_URL = "http://127.0.0.1:8000/api/";
//export const API_BASE_URL = "https://staging-console.kissashuru.com/api/";

export const ApiEndpoints = {
  // Auth
  // REGISTER: "register",
  REGISTER: "user/register",
  LOGIN: "login",
  SOCIAL_LOGIN: "social-login",
  SEND_LOGIN_OTP: "send-login-otp",
  VERIFY_LOGIN_OTP: "verify-login-otp",
  STATE_NAMES: "locations/states",

  // Config
  APP_CONFIGURATION: "app-configuration",

  // Dashboard & Content
  DASHBOARD_NEW: "v2/dashboard-detail-new-data",
  MOVIE_DETAILS: "v2/movie-details",
  MOVIE_LIST: "movie-list",
  TV_SHOW_LIST: "tvshow-list",
  COMING_SOON: "coming-soon",

  // Search
  GET_SEARCH: "get-search",
  SEARCH_LIST: "search-list",
  SAVE_SEARCH: "save-search",

  // Genres & Cast
  GENRE_LIST: "genre-list",
  CAST_CREW_LIST: "castcrew-list",

  // Profile
  PROFILE_DETAILS: "profile-details",
  UPDATE_PROFILE: "update-profile",

  // Content Language
  GET_CONTENT_LANGUAGES: "downloadable-languages/active",
  SAVE_USER_LANGUAGES: "user-languages",
  GET_USER_LANGUAGES: "user-languages", // Append /{userId}

  // Watchlist
  WATCHLIST: "watch-list",
  ADD_TO_WATCHLIST: "save-watchlist",
  REMOVE_FROM_WATCHLIST: "delete-watchlist",

  // Continue Watch
  CONTINUE_WATCH_LIST: "continuewatch-list",
  SAVE_CONTINUE_WATCH: "save-continuewatch",

  // Likes & Views
  SAVE_LIKES: "save-likes",

  // Reminders
  SAVE_REMINDER: "save-reminder",

  // Rent/Purchase History
  RENT_HISTORY: "rent-history",

  // Video Calls
  VIDEO_CALL_INCOMING: "video-call/incoming",
  VIDEO_CALL_ACCEPT: "video-call", // + /{id}/accept
  VIDEO_CALL_REJECT: "video-call", // + /{id}/reject
  VIDEO_CALL_END: "video-call",    // + /{id}/end
  USER_RECORDINGS: "producer/video-call/user-recordings",
}