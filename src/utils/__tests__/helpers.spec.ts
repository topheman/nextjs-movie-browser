import { sum } from "../helpers";

describe("src/utils/helpers", () => {
  describe("sum", () => {
    it("Should sum 2 numbers", () => {
      expect(sum(20, 22)).toBe(42);
    });
  });
});
