import { distinct } from ".";

describe("Function: [distinct()]", () => {
  it.each([
    ["", "", true],
    ["", " ", false],
    ["Kim and Chloe are awesome!!", "Kim and Chloe are awesome..", false],
  ])(
    "should compare [$prev] and [$curr] and return [$expected] for Strings",
    (prev, curr, expected) => {
      expect(distinct(prev, curr)).toBe(expected);
    }
  );

  it.each([
    [0, 0, true],
    [1, 2, false],
    [128_000_000, 128_000_000, true],
    [128_000_000, 128_000_005, false],
  ])(
    "should compare [$prev] and [$curr] and return [$expected] for Numbers",
    (prev, curr, expected) => {
      expect(distinct(prev, curr)).toBe(expected);
    }
  );

  it.each([
    [true, true, true],
    [false, false, true],
    [true, false, false],
  ])(
    "should compare [$prev] and [$curr] and return [$expected] for Booleans",
    (prev, curr, expected) => {
      expect(distinct(prev, curr)).toBe(expected);
    }
  );

  it.each([
    [{}, {}, true],
    [{ name: "" }, { name: "" }, true],
    [{ name: "", occupation: "" }, { name: "", occupation: "" }, true],
    [
      {
        name: "Kim",
        occupation: "Actor",
        billionaire: { status: true, networth: 3_000_000_000 },
      },
      {
        name: "Kim",
        occupation: "Actor",
        billionaire: { status: true, networth: 3_000_000_000 },
      },
      true,
    ],
    [
      { name: "Kim", occupation: "Actor" },
      { name: "Chloe", occupation: "Actor" },
      false,
    ],
    [{ name: "Kim" }, { name: "Chloe", occupation: "Actor" }, false],
    [
      {
        name: "Kim",
        occupation: "Actor",
        billionaire: { status: true, networth: 3_000_000_000 },
      },
      {
        name: "Kim",
        occupation: "Actor",
        billionaire: { status: true, networth: 5_000_000_000 },
      },
      false,
    ],
  ])(
    "should compare [$prev] and [$curr] and return [$expected] for Objects",
    (prev, curr, expected) => {
      expect(distinct(prev, curr)).toBe(expected);
    }
  );

  it.each([
    [[], [], true],
    [[1, 1], [1, 1], true],
    [
      [1, 1, { name: "Kim", occupation: "Actor" }],
      [1, 1, { name: "Kim", occupation: "Actor" }],
      true,
    ],
    [[1, 1], [1, 1, 1], false],
    [[{ name: "Kim" }], [{ name: "Chloe" }], false],
    [
      [
        {
          name: "Kim",
          occupation: "Actor",
          billionaire: { status: true, networth: 5_000_000_000 },
        },
      ],
      [
        {
          name: "Kim",
          occupation: "Actor",
          billionaire: { status: true, networth: 3_000_000_000 },
        },
      ],
      false,
    ],
  ])(
    "should compare [$prev] and [$curr] and return [$expected] for Arrays",
    (prev, curr, expected) => {
      expect(distinct(prev, curr)).toBe(expected);
    }
  );
});
