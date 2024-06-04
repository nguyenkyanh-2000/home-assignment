const { mergeTimeStamps } = require("./timestamps");

describe("mergeTimeStamps", () => {
  test("merges timestamps within 30 seconds interval", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:10Z" },
      { time: "2023-06-01T10:00:40Z" },
      { time: "2023-06-01T10:01:20Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:05Z" },
      { time: "2023-06-01T10:00:40Z" },
      { time: "2023-06-01T10:01:20Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("removes duplicate timestamps", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:40Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:40Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("merges timestamps within custom interval -- 60 seconds", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:20Z" },
      { time: "2023-06-01T10:01:10Z" },
      { time: "2023-06-01T10:02:00Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:10Z" },
      { time: "2023-06-01T10:01:35Z" },
    ];
    expect(mergeTimeStamps(timestamps, 60000)).toEqual(expected);
  });

  test("merges timestamps within custom interval -- 59 seconds", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:59Z" },
      { time: "2023-06-01T10:01:00Z" },
      { time: "2023-06-01T10:02:54Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:29Z" },
      { time: "2023-06-01T10:01:00Z" },
      { time: "2023-06-01T10:02:54Z" },
    ];
    expect(mergeTimeStamps(timestamps, 59000)).toEqual(expected);
  });

  test("handles empty array", () => {
    const timestamps = [];
    const expected = [];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("handles single timestamp", () => {
    const timestamps = [{ time: "2023-06-01T10:00:00Z" }];
    const expected = [{ time: "2023-06-01T10:00:00Z" }];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("handles timestamps exactly on the boundary of the interval", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:30Z" },
      { time: "2023-06-01T10:01:00Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:15Z" },
      { time: "2023-06-01T10:01:00Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("merges timestamps within 30 seconds interval with multiple timestamps", () => {
    const timestamps = [
      { time: "2023-06-01T10:00:00Z" },
      { time: "2023-06-01T10:00:05Z" },
      { time: "2023-06-01T10:00:10Z" },
      { time: "2023-06-01T10:00:15Z" },
      { time: "2023-06-01T10:00:20Z" },
      { time: "2023-06-01T10:00:25Z" },
      { time: "2023-06-01T10:00:30Z" },
      { time: "2023-06-01T10:00:35Z" },
      { time: "2023-06-01T10:00:40Z" },
      { time: "2023-06-01T10:00:45Z" },
      { time: "2023-06-01T10:00:50Z" },
      { time: "2023-06-01T10:01:00Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:15Z" },
      { time: "2023-06-01T10:00:46Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("merges timestamps with big difference between timestamps", () => {
    const timestamps = [
      { time: "2025-06-01T10:04:20Z" },
      { time: "2023-09-01T10:03:20Z" },
    ];
    const expected = [
      { time: "2023-09-01T10:03:20Z" },
      { time: "2025-06-01T10:04:20Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });

  test("multiple random timestamps with random orders", () => {
    const timestamps = [
      { time: "2023-06-01T10:01:20Z" },
      { time: "2023-06-01T10:00:10Z" },
      { time: "2023-06-01T10:00:40Z" },
      { time: "2023-06-01T10:00:00Z" },
    ];
    const expected = [
      { time: "2023-06-01T10:00:05Z" },
      { time: "2023-06-01T10:00:40Z" },
      { time: "2023-06-01T10:01:20Z" },
    ];
    expect(mergeTimeStamps(timestamps)).toEqual(expected);
  });
});
