
export default function KeyTracker() {
  window.key = {
    shift: false,
    ctrl: false,
    alt: false
  };
  function trackKeyState(e) {
    window.key = {
      shift: e.shiftKey,
      ctrl: e.ctrlKey,
      alt: e.altKey
    };
  }
  window.addEventListener('keydown', trackKeyState);
  window.addEventListener('keyup', trackKeyState);
}
