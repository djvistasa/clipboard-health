const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    const data = JSON.stringify(event);
    const hashedKey = crypto.createHash("sha3-512").update(data).digest("hex");

    if (
      typeof event.partitionKey === "string" &&
      event.partitionKey.length > 0
    ) {
      candidate = event.partitionKey;
    } else if (typeof hashedKey === "string" && hashedKey.length > 0) {
      candidate = hashedKey;
    }
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
