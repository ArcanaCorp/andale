self.addEventListener("push", function (event) {
    if (!event.data) return;

    const data = event.data.json();

    const title = data.title || "Actualización de tu pedido";

    const options = {
        body: data.body || "El estado de tu pedido ha cambiado.",
        icon: "/icon.png",
        badge: "/icon.png",
        tag: data.tag || "order-status-update",
        renotify: true,
        data: {
            url: data.url || "/orders"
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", function (event) {
    event.notification.close();

    const url = event.notification?.data?.url || "/orders";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clientList) => {
            for (const client of clientList) {
                if ("focus" in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});