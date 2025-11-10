export const clickSound = typeof window !== 'undefined' ? new Audio('/sounds/click.mp3') : null;
export const correctSound = typeof window !== 'undefined' ? new Audio('/sounds/correct.mp3') : null;
export const wrongSound = typeof window !== 'undefined' ? new Audio('/sounds/wrong.mp3') : null;
export const bgSound = typeof window !== 'undefined' ? new Audio('/sounds/bg.mp3') : null;

if (typeof window !== 'undefined' && bgSound) {
  bgSound.loop = true;
  bgSound.volume = 0.18;
}
