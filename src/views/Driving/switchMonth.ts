export const switchMonth = (inputDate: Date, isPreviousMonth: boolean) => {
  const date = new Date(inputDate);
  const month = date.getMonth();
  const year = date.getFullYear();

  let newMonth = isPreviousMonth ? month - 1 : month + 1;
  let newYear = year;

  if (newMonth < 0) {
    newMonth = 11;
    newYear = year - 1;
  } else if (newMonth > 11) {
    newMonth = 0;
    newYear = year + 1;
  }
  return new Date(newYear, newMonth);
};
