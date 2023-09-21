const twoDigit = (n: number): string => {
  return ('0' + n).slice(-2);
};

export default (date?: Date) => {
  date = date || new Date();

  const year = date.getFullYear();
  const month = twoDigit(date.getMonth() + 1);
  const day = twoDigit(date.getDate());
  const minutes = twoDigit(date.getMinutes());
  const seconds = twoDigit(date.getSeconds());

  return `${year}-${month}-${day}:${minutes}:${seconds}`;
}
