export function getSemesterString() {
  const now = new Date();
  const markerOne = new Date(`1/1/${now.getFullYear()}`);
  const markerTwo = new Date(`5/15/${now.getFullYear()}`);
  const markerThree = new Date(`12/15/${now.getFullYear()}`);
  const markerFour = new Date(`12/31/${now.getFullYear()}`);

  // one to two = Spring
  // two to three = Fall
  // three to four = Spring

  if (markerOne <= now && now < markerTwo) return 'Spring ' + now.getFullYear();
  else if (markerTwo <= now && now < markerThree) return 'Fall ' + now.getFullYear();
  else if (markerThree <= now && now <= markerFour) return 'Spring ' + (now.getFullYear() + 1);
  return '';
}
