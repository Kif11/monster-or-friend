async function getHeadsetType() {
  const displays = await navigator.getVRDisplays();
  for (let i = 0; i < displays.length; i += 1) {
    const d = displays[i];
    if (d.displayName === "Oculus Quest") {
      return "Oculus Quest";
    } else if (d.displayName === "Oculus Go") {
      return "Oculus Go";
    }
  }
  return null
}

export { getHeadsetType };
