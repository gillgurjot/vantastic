export const openMap = (address) => {
  if (
    // if we're on iOS, open in Apple Maps
    navigator.platform.indexOf('iPhone') != -1 ||
    navigator.platform.indexOf('iPad') != -1 ||
    navigator.platform.indexOf('iPod') != -1
  ) {
    window.open(`maps://maps.google.com/maps?daddr=${address}&amp;ll=`);
  } else {
    // else use Google Maps
    window.open(`https://maps.google.com/maps?daddr=${address}&amp;ll=`);
  }
};

export const convertTime = (time) => {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? ' AM' : ' PM';
    time[0] = +time[0] % 12 || 12;
  }
  return time.join('');
};

export const getJobsByTime = (jobs) => {
  const jobsToSort = [...jobs];

  const jobsByTime = jobsToSort.sort(
    (a, b) => new Date('2000/05/16 ' + a.from) - new Date('2000/05/16 ' + b.from),
  );
  return jobsByTime;
};
