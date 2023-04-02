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

const TIME_12_REGEX = new RegExp(
  /(?:(?:((?:0[1-9])|(?:1[1-2])|(?:[1-9])):([0-5][0-9]))|((?:0[1-9])|(?:1[1-2])|(?:[1-9]))) *(pm|am)/gim,
);

export function convertHourMinute12to24(time12: string): string {
  // Remove spaces
  let result = TIME_12_REGEX.exec(time12);
  if (result == null) return '';
  let hours = 0;
  let minutes = 0;
  let isPM = result[4].toLowerCase() == 'pm';
  if (result[3] != undefined) {
    // We have HH AM
    hours = parseInt(result[3]);
  } else {
    // We have HH:MM AM
    hours = parseInt(result[1]);
    minutes = parseInt(result[2]);
  }

  if (isPM) hours += 12;

  let minutesStr = minutes > 9 ? minutes : '0' + minutes;

  return hours + ':' + minutesStr;
}
