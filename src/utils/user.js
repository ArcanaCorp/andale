export function getOrCreateUserId() {
    let userId = localStorage.getItem("anon_user_id");

    if (!userId) {
        userId = crypto.randomUUID(); // moderno, limpio, único
        localStorage.setItem("anon_user_id", userId);
    }

    return userId;
}