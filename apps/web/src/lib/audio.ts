function handlePlayback(promise: Promise<void>) {
  void promise.catch(() => {
    // Sound is progressive enhancement. Browser policy may reject playback.
  });
}

export function playAudio(audio: HTMLAudioElement | null, startTime = 0): void {
  if (audio === null) {
    return;
  }

  audio.currentTime = startTime;
  handlePlayback(audio.play());
}

export function playAudioClone(
  audio: HTMLAudioElement | null,
  startTime = 0,
): void {
  if (audio === null) {
    return;
  }

  const clonedNode = audio.cloneNode();

  if (!(clonedNode instanceof HTMLAudioElement)) {
    return;
  }

  playAudio(clonedNode, startTime);
}
