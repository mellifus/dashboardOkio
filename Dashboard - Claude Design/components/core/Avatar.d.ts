export interface AvatarProps {
  /** 1-2 letter initials, or omit for a plain filled circle placeholder. */
  initials?: string;
  /** Diameter in px. 30 for topbar user, 32 for message author, 52 for client profile header. */
  size?: number;
  /** `accent` = solid filled (topbar user); `tint` = soft accent circle (client/message placeholders). */
  tone?: "accent" | "tint";
}
