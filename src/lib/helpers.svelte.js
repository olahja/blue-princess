export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}