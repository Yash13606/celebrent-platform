
export function setupMonitoring() {
  const handler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const clickData = {
      elementType: target.tagName,
      elementId: target.id,
      elementClass: target.className,
      timestamp: new Date().toISOString(),
    };
    console.log("Click detected:", clickData);
    // Optionally: send click data to your backend in the future.
  };
  document.body.addEventListener("click", handler);
  return () => {
    document.body.removeEventListener("click", handler);
  };
}
