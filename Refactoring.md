# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. I initialized the candidate variable to `TRIVIAL_PARTITION_KEY` so as to make the code easier to read
2. I removed the condition that checks of candidate is not a string as it is guaranteed to be a string at that point
3. I moved the logic for creating the hashedKey to inside the check that checks if event is truthy, so as to make the code more efficient.
4. I ensure that the `crypto.createHash` function is only called two times:

   - To create hashedKey
   - To rehash partition key in the event that it is too long

5. I made the last of statement only check the length of candidate before hashing it again
