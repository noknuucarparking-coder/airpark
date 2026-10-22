// AirPark Manager — Service Worker (v7.3)
// ใช้แสดงการแจ้งเตือนบน Android / iPhone / iPad และเปิดหน้า "แจ้งเตือน" เมื่อแตะ
// ไม่ได้เก็บแคชหน้าเว็บ — ทุกเครื่องได้เวอร์ชันล่าสุดจากเซิร์ฟเวอร์เสมอ
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of list) {
      try { await c.focus(); c.postMessage({ go: 'al' }); return; } catch (_) {}
    }
    if (self.clients.openWindow) await self.clients.openWindow('./#al');
  })());
});
