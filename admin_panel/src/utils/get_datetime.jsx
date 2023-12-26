export const getDate = (date) => {
  if (date) return date.split('T')[0];
  return '';
};

export const getTime = (date) => {
  if (date)
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  return '';
};
