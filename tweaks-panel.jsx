// ─────────────────────────────────────────────────────────────────────────────
// LOCAL STUB of tweaks-panel.jsx
//
// The real tweaks-panel.jsx is the Claude Design editor overlay: a floating
// controls panel driven by the host via postMessage (__activate_edit_mode …).
// Run standalone (outside the Claude Design host) it never receives those
// messages, so it stays closed and renders nothing — the page itself is 100%
// app.jsx. This stub reproduces that exact behaviour: it feeds app.jsx the
// fixed TWEAK_DEFAULTS and makes every Tweak* control a no-op, so the rendered
// page is pixel-identical to the design.
//
// We never push this file back to Claude Design — the real one stays intact
// there. Only app.jsx is the file we edit and sync.
// ─────────────────────────────────────────────────────────────────────────────

function useTweaks(defaults) {
  const [values] = React.useState(defaults);
  return [values, function noop() {}];
}

const __null = () => null;

Object.assign(window, {
  useTweaks,
  TweaksPanel: __null,
  TweakSection: __null,
  TweakRow: __null,
  TweakSlider: __null,
  TweakToggle: __null,
  TweakRadio: __null,
  TweakSelect: __null,
  TweakText: __null,
  TweakNumber: __null,
  TweakColor: __null,
  TweakButton: __null,
});
