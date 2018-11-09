export default function tentCount(count = 0) {
  if (count >= 13000) {
    return 12;
  } else if (count >= 8000) {
    return 9;
  } else if (count >= 4000) {
    return 6;
  } else if (count >= 1000) {
    return 3;
  }
  return 0;
}
