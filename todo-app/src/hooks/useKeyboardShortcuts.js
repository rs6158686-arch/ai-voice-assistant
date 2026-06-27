import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard shortcuts
 * @param {object} shortcuts - Object with key combinations and their handlers
 */
function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      Object.entries(shortcuts).forEach(([combination, handler]) => {
        if (matchesKeyCombination(event, combination)) {
          event.preventDefault();
          handler();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

/**
 * Check if event matches the given key combination
 * Format: 'ctrl+n', 'shift+alt+d', 'ctrl+shift+e'
 */
function matchesKeyCombination(event, combination) {
  const keys = combination.toLowerCase().split('+');
  const eventKey = event.key.toLowerCase();

  const ctrlPressed = event.ctrlKey || event.metaKey;
  const shiftPressed = event.shiftKey;
  const altPressed = event.altKey;

  let hasCtrl = keys.includes('ctrl');
  let hasShift = keys.includes('shift');
  let hasAlt = keys.includes('alt');
  let hasKey = keys.includes(eventKey);

  return (
    hasCtrl === ctrlPressed &&
    hasShift === shiftPressed &&
    hasAlt === altPressed &&
    hasKey
  );
}

export default useKeyboardShortcuts;
