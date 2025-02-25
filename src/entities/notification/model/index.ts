export type NotificationT = "success" | "warning" | "error" | "info";

export const NOTIFICATION_TYPES = {
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
	INFO: "info",
} satisfies Record<string, NotificationT>;
