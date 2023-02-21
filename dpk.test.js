const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("should return trivial partition key if event is undefined", () => {
    expect(deterministicPartitionKey()).toBe(TRIVIAL_PARTITION_KEY);
  });

  test("should use partition key from event if it is a non-empty string", () => {
    const event = { partitionKey: "test-partition-key" };
    expect(deterministicPartitionKey(event)).toBe(event.partitionKey);
  });

  test("should hash event data if partition key is not a non-empty string", () => {
    const event = { data: { field1: "value1", field2: "value2" } };
    const hashedData = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hashedData);
  });

  test("should hash candidate if it is too long", () => {
    const longPartitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const hashedKey = crypto
      .createHash("sha3-512")
      .update(longPartitionKey)
      .digest("hex");
    const event = { partitionKey: longPartitionKey };
    expect(deterministicPartitionKey(event)).toBe(hashedKey);
  });

  test("should stringify and hash candidate if it is not a string", () => {
    const event = { partitionKey: { key: "value" } };
    const hashedKey = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    expect(deterministicPartitionKey(event)).toBe(hashedKey);
  });
});
