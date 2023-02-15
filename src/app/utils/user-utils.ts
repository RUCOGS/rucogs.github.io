export function getCurrentAcademicYear() {
  const now = new Date();
  const semesterStart = new Date(`${now.getFullYear()}-09-1`);
  if (now < semesterStart) {
    // We're in the summer/spring semester, but we're not in fall yet, so we're still in the previous year
    return now.getFullYear() - 1;
  } else {
    // We're in the fall semester
    return now.getFullYear();
  }
}

export function getClassYearString(classYear: number) {
  const now = new Date();

  const graduationDate = new Date(`${classYear}-05-20`);
  if (now > graduationDate) {
    return '🎓 Alumni';
  }

  let academicYear = getCurrentAcademicYear();

  const grade = classYear - academicYear;
  if (grade === 1) {
    return '🎆 Senior';
  } else if (grade === 2) {
    return '🌇 Junior';
  } else if (grade === 3) {
    return '🦜 Sophmore';
  } else if (grade === 4) {
    return '🔰 Freshman';
  } else {
    return '📨 Incoming';
  }
}
