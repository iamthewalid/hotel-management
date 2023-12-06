import { isBetween } from '../../utils';

export const filterByDate =
  (from, to) =>
  ({ fromDate, toDate }) => {
    if (!from || !to) return false;

    const invalidFrom = isBetween(from, fromDate, toDate);
    const invalidTo = isBetween(to, fromDate, toDate);

    if (invalidFrom || invalidTo) return true;
    return false;
  };

export const isQueryInText = (query, text) => {
  if (!query) return true;
  const searchRegEx = new RegExp(query, 'i');
  const index = text.search(searchRegEx);
  return index !== -1;
};
