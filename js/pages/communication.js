// The original initComm() decoded a multi-MB base64 MP4 into a Blob URL at runtime
// (index.html l.611-619). In this refactor the video is served as a real file from
// src/assets/promo-video.mp4 — referenced directly by the <video> element in
// src/pages/communication.html. No runtime wiring is required beyond confirming
// the element is present, which keeps the public API identical to the original.
export function initComm() {
  const v = document.getElementById('mainVideo');
  if (v && !v.src) {
    v.src = 'assets/promo-video.mp4';
    v.load();
  }
}
