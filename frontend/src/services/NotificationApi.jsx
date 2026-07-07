const API_URL = "http://127.0.0.1:8000";

// ===============================
// Notification Count
// ===============================
export async function getNotificationCount(userId) {
    const response = await fetch(
        `${API_URL}/notifications/count/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch notification count");
    }

    return await response.json();
}

// ===============================
// Latest Notifications
// ===============================
export async function getLatestNotifications(
    userId
) {
    const response = await fetch(
        `${API_URL}/notifications/latest/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch latest notifications");
    }

    return await response.json();
}

// ===============================
// All Notifications
// ===============================
export async function getAllNotifications(userId) {
    const response = await fetch(
        `${API_URL}/notifications/${encodeURIComponent(userId)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch notifications");
    }

    return await response.json();
}

// ===============================
// Mark One Notification Read
// ===============================
export async function markAsRead(notificationId) {
    const response = await fetch(
        `${API_URL}/notifications/read/${notificationId}`,
        {
            method: "PUT",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark notification as read");
    }

    return await response.json();
}

// ===============================
// Mark All Notifications Read
// ===============================
export async function markAllRead(userId) {
    const response = await fetch(
        `${API_URL}/notifications/read-all/${encodeURIComponent(userId)}`,
        {
            method: "PUT",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to mark all notifications as read");
    }

    return await response.json();
}