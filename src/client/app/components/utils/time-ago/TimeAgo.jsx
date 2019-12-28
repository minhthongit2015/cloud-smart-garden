import React from 'react';
import moment from 'moment';

moment.locale('vi');

function getCustomTime(time) {
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

const TimeAgo = React.memo((props) => {
  const { time: timez, className, ...restProps } = props;
  const time = moment(timez);
  const [value, forceUpdate] = React.useState(true);
  React.useEffect(() => {
    const intervalHandle = setInterval(() => {
      forceUpdate(!value);
    }, getIntervalByContext(time));
    return () => {
      clearInterval(intervalHandle);
    };
  });
  return (
    <span
      title={getCustomTime(time)}
      className={`time-ago text-monospace text-muted ${className}`}
      {...restProps}
    ><i className="far fa-clock" /> {time.fromNow()}
    </span>
  );
});

TimeAgo.format = getCustomTime;
TimeAgo.fromNow = fromNow;
TimeAgo.fromNowDetail = fromNowDetail;
TimeAgo.fromNowDetailLn = fromNowDetailLn;

export default TimeAgo;
