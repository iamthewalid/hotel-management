import dayjs from 'dayjs';

export function formatDate(date) {
  return dayjs(date).format('DD-MM-YYYY');
}

export function isBetween(target, date1, date2) {
  const targetDay = dayjs(target, 'DD-MM-YYYY').valueOf();
  const first = dayjs(date1, 'DD-MM-YYYY').valueOf();
  const second = dayjs(date2, 'DD-MM-YYYY').valueOf();

  const result = targetDay >= first && targetDay <= second;
  return result;
}
