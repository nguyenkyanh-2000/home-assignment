const Queue = require("./Queue");

function mergeTimeStamps(timestamps, interval = 30000) {
  // Sorted the timestamps in ascending order based on the time
  timestamps.sort((a, b) => {
    return new Date(a.time) - new Date(b.time);
  });

  // Removed all duplicate timestamps (timestamps with same time)
  const uniqueTimestamps = [];
  timestamps.forEach((timestamp) => {
    if (
      !uniqueTimestamps.find(
        (uniqueTimestamp) => uniqueTimestamp.time === timestamp.time
      )
    ) {
      uniqueTimestamps.push(timestamp);
    }
  });

  let timestampsQueue = new Queue();
  for (i = 0; i < uniqueTimestamps.length; i++) {
    timestampsQueue.enqueue(uniqueTimestamps[i]);
  }

  let result = [];
  while (timestampsQueue.size() > 0) {
    let currentTimestamp = timestampsQueue.dequeue();
    let nextTimestamp = timestampsQueue.peek();
    if (nextTimestamp) {
      let currentTimestampDate = new Date(currentTimestamp.time);
      let nextTimestampDate = new Date(nextTimestamp.time);
      if (nextTimestampDate - currentTimestampDate <= interval) {
        let mergedTimestamp = {
          ...currentTimestamp,
          time:
            new Date(
              (currentTimestampDate.getTime() + nextTimestampDate.getTime()) / 2
            )
              .toISOString()
              .split(".")[0] + "Z",
        };
        timestampsQueue.dequeue();
        result.push(mergedTimestamp);
      } else {
        result.push(currentTimestamp);
      }
    } else {
      result.push(currentTimestamp);
    }
  }

  return result;
}

module.exports = { mergeTimeStamps };
