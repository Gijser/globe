/**
 * Creates an event HUD updater for a given list selector.
 * @param {string} listSelector - CSS selector for the <ul> or <ol> to update
 * @returns {{ setEvents: (events: Array), update: () => void }}
 */
export function createEventHudUpdater(listSelector) {
  let events = [];
  function updateHud() {
    const list = document.querySelector(listSelector);
    if (!list) return;
    list.innerHTML = "";
    for (const event of events) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = event.title || "(no title)";
      a.href = event.link || "#";
      a.target = "_blank";
      li.appendChild(a);
      if (event.date) {
        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` (${new Date(event.date).toLocaleString()})`;
        li.appendChild(dateSpan);
      }
      list.appendChild(li);
    }
  }
  return {
    setEvents(newEvents) {
      events = newEvents;
      updateHud();
    },
    update: updateHud
  };
}
