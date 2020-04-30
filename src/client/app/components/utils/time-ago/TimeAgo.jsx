import React from 'react';
import moment from 'moment';


moment.locale('vi');

function getCustomTime(time) {
  // TODO: Not using moment
  return moment(time).format('HH:mm:ss - DD/MM/YYYY');
}

function fromNow(time) {
  return moment(time).fromNow();
}

function fromNowDetailLn(time) {
  return `${fromNow(time)}\r\n(${getCustomTime(time)})`;
}

function fromNowDetail(time) {
  return `${fromNow(time)} (${getCustomTime(time)})`;
}

function getIntervalByContext(/* time */) {
  return 1000;
}

const TimeAgo = React.memo(({
  time, className, color = 'text-muted', noIcon, ...restProps
}) => {
  const mTime = moment(time);
  const [value, forceUpdate] = React.useState(true);
  React.useEffect(() => {
    const intervalHandle = setInterval(() => {
      forceUpdate(!value);
    }, getIntervalByContext(mTime));
    return () => {
      clearInterval(intervalHandle);
    };
  });
  return (
    <span
      title={getCustomTime(mTime)}
      className={`time-ago text-monospace ${color} ${className || ''}`}
      {...restProps}
    >
      {!noIcon && <i className="far fa-clock" />} {mTime.fromNow()}
    </span>
  );
});

TimeAgo.format = getCustomTime;
TimeAgo.fromNow = fromNow;
TimeAgo.fromNowDetail = fromNowDetail;
TimeAgo.fromNowDetailLn = fromNowDetailLn;

export default TimeAgo;
