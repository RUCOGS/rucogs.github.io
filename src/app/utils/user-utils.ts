export function getClassYearString(classYear: number) {
  const currYear = new Date().getFullYear();
  const grade = classYear - currYear;
  if (grade > 4) {
    return '📨 Incoming';
  } else if (grade === 1) {
    return '🎆 Senior';
  } else if (grade === 2) {
    return '🌇 Junior';
  } else if (grade === 3) {
    return '🦜 Sophmore';
  } else if (grade === 4) {
    return '🔰 Freshman';
  } else {
    return '🎓 Alumni';
  }
}
