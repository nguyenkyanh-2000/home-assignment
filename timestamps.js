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
    let timestampsInInterval = [currentTimestamp];
    if (nextTimestamp) {
      let currentTimestampDate = new Date(currentTimestamp.time);
      let nextTimestampDate = new Date(nextTimestamp.time);
      while (nextTimestampDate - currentTimestampDate <= interval) {
        timestampsInInterval.push(nextTimestamp);
        timestampsQueue.dequeue();
        nextTimestamp = timestampsQueue.peek();
        if (!nextTimestamp) {
          break;
        }
        nextTimestampDate = new Date(nextTimestamp.time);
      }

      let totalTime = timestampsInInterval.reduce((acc, timestamp) => {
        return acc + new Date(timestamp.time).getTime();
      }, 0);

      let averageTimestamp = new Date(totalTime / timestampsInInterval.length);

      result.push({
        ...currentTimestamp,
        time: averageTimestamp.toISOString().split(".")[0] + "Z",
      });
    } else {
      result.push(currentTimestamp);
    }
  }

  return result;
}

module.exports = { mergeTimeStamps };
