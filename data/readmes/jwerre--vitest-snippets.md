# Vitest Snippets for Zed Editor

A comprehensive collection of Vitest snippets designed to speed up test development in the Zed editor.

## Installation

To use these snippets in Zed:

1. Open Zed
2. Go to `Settings` → `Snippets`
3. Click `Configure Snippets`
4. Select the appropriate language (JavaScript or TypeScript)
5. Paste the content from the relevant snippet file

## Available Snippets

### Basic Test Structure
- bench(name, fn, options?) - Creates an individual benchmark case.
- describe(name, fn) - Creates a test suite to group related tests.
- it(name, fn, options?) - An alias for test.
- test(name, fn, options?) - Creates an individual test case.

#### Describe
- describe.concurrent(name, fn) - Runs all tests in this suite concurrently.
- describe.each(cases)(name, fn) - Runs a suite multiple times with different data.
- describe.for(cases)(name, fn) - Runs a suite multiple times with different data.
- describe.only(name, fn) - Runs only this test suite.
- describe.runIf(condition)(name, fn?) - Runs this test suite only if the condition is true.
- describe.sequential(name, fn) - Runs all tests in this suite sequentially.
- describe.shuffle(name, fn) - Runs all tests in this suite in a random order.
- describe.skip(name, fn?) - Skips this test suite.
- describe.skipIf(condition)(name, fn?) - Skips this test suite if the condition is true.
- describe.todo(name) - Marks a test suite as not yet implemented.

#### Test
- test.concurrent(name, fn) - Runs this test concurrently with others.
- test.each(cases)(name, fn) - Runs a test multiple times with different data.
- test.extends - extend the test context with custom fixtures
- test.only(name, fn) - Runs only this test (and other .only tests).
- test.runIf(condition)(name, fn) - Runs the test only if the condition is true.
- test.skip(name, fn?) - Skips this test.
- test.skipIf(condition)(name, fn?) - Skips this test if the condition is true.
- test.todo(name) - Marks a test as not yet implemented.

#### Bench
- bench.skip(name, fn?) - Skips this benchmark.
- bench.only(name, fn) - Runs only this benchmark.
- bench.todo(name) - Marks a benchmark as not yet implemented.

#### Setup and Teardown
- afterAll(fn) - Runs a function once after all tests in the suite.
- afterEach(fn) - Runs a function after each test in the suite.
- beforeAll(fn) - Runs a function once before all tests in the suite.
- beforeEach(fn) - Runs a function before each test in the suite.

#### Test Hooks
- onTestFailed(fn) - Registers a function to run when the test fails.
- onTestFinished(fn) - Registers a cleanup function to run when the test finishes.

### Mocks
- .getMockImplementation() - Returns the current mock implementation.
- .getMockName() - Returns the custom name for the mock.
- .mockClear() - Clears call and instance history.
- .mockName(name) - Sets a custom name for the mock.
- .mockImplementation(fn) - Sets the default implementation of a mock.
- .mockImplementationOnce(fn) - Sets a one-time implementation.
- .withImplementation(fn, cb) - Runs a callback with a temporary implementation.
- .mockRejectedValue(error) - Sets an error to be returned as a rejected promise.
- .mockRejectedValueOnce(error) - Sets a one-time error to be returned as a rejected promise.
- .mockReset() - Clears history and resets implementation to vi.fn().
- .mockRestore() - Clears history and restores the original implementation (for spies).
- .mockResolvedValue(value) - Sets a value to be returned as a resolved promise.
- .mockResolvedValueOnce(value) - Sets a one-time value to be returned as a resolved promise.
- .mockReturnThis() - Sets the mock to return this context.
- .mockReturnValue(value) - Sets a value to be returned.
- .mockReturnValueOnce(value) - Sets a one-time value to be returned.
- .mock.calls - An array containing all call arguments.
- .mock.lastCall - The arguments of the last call.
- .mock.results - An array containing all call results (return/throw).
- .mock.settledResults - An array of settled promise results.
- .mock.invocationCallOrder - An array of invocation call orders.
- .mock.contexts - An array of this contexts for all calls.
- .mock.instances - An array of instances created by the mock.

### Vi Utility

#### Mock Modules
- vi.doMock(path, factory?) - Mocks a module without hoisting (for circular dependencies).
- vi.doUnmock(path) - Unmocks a module (non-hoisted version of vi.unmock).
- vi.dynamicImportSettled() - Waits for all dynamic imports to resolve or reject.
- vi.importActual(path) - Imports a module, bypassing any mocks.
- vi.importMock(path) - Imports a module with all its exports mocked.
- vi.mock(path, factory?) - Mocks an entire module (must be hoisted).
- vi.mocked(value, deep?) - Type-casts a value as a mock, asserting its mock type.
- vi.resetModules() - Clears the module import cache.
- vi.unmock(path) - Specifies that a module should not be mocked (hoisted).

#### Mocking Functions and Objects
- vi.clearAllMocks() - Clears mock.calls and mock.instances for all mocks.
- vi.fn(implementation?) - Creates a new, empty mock function.
- vi.isMockFunction(fn) - Checks if a value is a mock function or spy.
- vi.mockObject(object, overrides?) - Creates a deep mock of an object.
- vi.resetAllMocks() - Resets all mocks (clears history, instances, and resets implementations).
- vi.restoreAllMocks() - Restores all spies and mocks to their original implementations.
- vi.spyOn(object, 'methodName') - Creates a spy on an existing object method.
- vi.stubEnv(name, value) - Stubs an environment variable (process.env).
- vi.stubGlobal(name, value) - Stubs a global variable.
- vi.unstubAllEnvs() - Restores all stubbed environment variables.
- vi.unstubAllGlobals() - Restores all stubbed global variables.

#### Fake Timers
- vi.advanceTimersByTime(ms) - Advances fake timers by a specified time (in ms).
- vi.advanceTimersByTimeAsync(ms) - Advances fake timers by time (async version).
- vi.advanceTimersToNextFrame() - Advances timers to the next requestAnimationFrame.
- vi.advanceTimersToNextTimer() - Advances timers to the next scheduled timer.
- vi.advanceTimersToNextTimerAsync() - Advances to the next timer (async version).
- vi.clearAllTimers() - Clears all pending timers.
- vi.getMockedSystemTime() - Gets the current mocked system time.
- vi.getRealSystemTime() - Gets the current real system time.
- vi.getTimerCount() - Returns the number of pending timers.
- vi.isFakeTimers() - Checks if timers are currently mocked.
- vi.runAllTicks() - Runs all pending microtasks (e.g., process.nextTick).
- vi.runAllTimers() - Runs all pending macrotasks (timers).
- vi.runAllTimersAsync() - Runs all pending macrotasks (async version).
- vi.runOnlyPendingTimers() - Runs only currently pending timers.
- vi.runOnlyPendingTimersAsync() - Runs only pending timers (async version).
- vi.setSystemTime(date) - Sets the system time when fake timers are in use.
- vi.useFakeTimers() - Mocks timer functions (setTimeout, setInterval).
- vi.useRealTimers() - Restores real timer functions.

#### Miscellaneous
- vi.hoisted(fn) - Hoists a function to the top (used inside vi.mock).
- vi.resetConfig() - Resets Vitest configuration to its default.
- vi.setConfig(config) - Sets Vitest configuration for the current test file.
- vi.waitFor(fn, options?) - Waits for an assertion function to pass.
- vi.waitUntil(fn, options?) - Waits for a condition function to return true.


### Assertions (expect)

- expect(value) - The function used to create an assertion.
- expect.assert(value) - Chai's assert API as expect.assert for convenience
- expect.poll(fn, options?) - Polls a function until the assertion passes.
- expect.soft(value) - Creates a soft assertion that doesn't stop the test on failure.
- .not - Inverts the meaning of the next matcher.
- .rejects - Unwraps a promise's rejected reason.
- .resolves - Unwraps a promise's resolved value.
- .toBe(value) - Checks for strict equality (Object.is).
- .toBeCloseTo(number, precision?) - Checks if a number is close to another.
- .toBeDefined() - Checks that a value is not undefined.
- .toBeFalsy() - Checks that a value is falsy.
- .toBeGreaterThan(number) - Checks if a number is greater than another.
- .toBeGreaterThanOrEqual(number) - Checks if a number is greater than or equal.
- .toBeInstanceOf(class) - Checks if a value is an instance of a class.
- .toBeLessThan(number) - Checks if a number is less than another.
- .toBeLessThanOrEqual(number) - Checks if a number is less than or equal.
- .toBeNaN() - Checks that a value is NaN.
- .toBeNull() - Checks that a value is null.
- .toBeNullable() - Checks that a value is null or undefined.
- .toBeOneOf(array) - Checks if a value is one of the members of an array.
- .toBeTruthy() - Checks that a value is truthy.
- .toBeTypeOf(type) - Checks the type of a value (e.g., 'string').
- .toBeUndefined() - Checks that a value is undefined.
- .toContain(value) - Checks if an array or string contains a value.
- .toContainEqual(value) - Checks if an array contains an element with deep equality.
- .toEqual(value) - Deeply checks for equality of properties.
- .toHaveLength(number) - Checks the length of an array or string.
- .toHaveProperty(path, value?) - Checks if an object has a property.
- .toMatch(regexp | string) - Checks if a string matches a regex or substring.
- .toMatchFileSnapshot(filepath) - Compares a value to a snapshot in a separate file.
- .toMatchInlineSnapshot() - Compares a value to an inline snapshot.
- .toMatchObject(object) - Checks if an object contains the specified properties.
- .toMatchSnapshot() - Compares a value to a stored snapshot.
- .toSatisfy(predicate) - Checks if a value satisfies a predicate function.
- .toStrictEqual(value) - Deeply checks for equality, including object types.
- .toThrowError(error?) - Checks that a function throws an error.
- .toThrowErrorMatchingInlineSnapshot() - Checks if an error message matches an inline snapshot.
- .toThrowErrorMatchingSnapshot() - Checks if an error message matches a snapshot.
- expect.assertions(count) - Verifies that a specific number of assertions are called.
- expect.hasAssertions() - Verifies that at least one assertion is called.
- expect.unreachable() - Marks a line as unreachable.
- expect.anything() - Matches any value except null or undefined.
- expect.any(constructor) - Matches any value created with the given constructor.
- expect.closeTo(number, precision?) - Matches a number close to the expected value.
- expect.arrayContaining(array) - Matches an array containing the specified elements.
- expect.objectContaining(object) - Matches an object containing the specified properties.
- expect.stringContaining(string) - Matches a string containing the specified substring.
- expect.stringMatching(regexp) - Matches a string against a regex.
- expect.schemaMatching(schema) - Matches a value against a Zod schema.
- expect.addSnapshotSerializer(serializer) - Adds a custom snapshot serializer.
- expect.extend(matchers) - Adds custom matchers to expect.
- expect.addEqualityTesters(testers) - Adds custom equality testers.

##### Mock Function Matchers
- .toHaveBeenCalled() - Checks if a mock function was called.
- .toHaveBeenCalledAfter(mock) - Checks if a mock was called after another mock.
- .toHaveBeenCalledBefore(mock) - Checks if a mock was called before another mock.
- .toHaveBeenCalledExactlyOnceWith(...args) - Checks if a mock was called exactly once with specific args.
- .toHaveBeenCalledTimes(number) - Checks how many times a mock was called.
- .toHaveBeenCalledWith(...args) - Checks if a mock was called with specific arguments.
- .toHaveBeenLastCalledWith(...args) - Checks the arguments of the last call.
- .toHaveBeenNthCalledWith(n, ...args) - Checks the arguments of the nth call.
- .toHaveLastReturnedWith(value) - Checks the return value of the last call.
- .toHaveNthReturnedWith(n, value) - Checks the return value of the nth call.
- .toHaveReturned() - Checks if a mock function returned successfully.
- .toHaveReturnedTimes(number) - Checks how many times a mock returned.
- .toHaveReturnedWith(value) - Checks if a mock returned a specific value.

##### Promise Matchers (.resolves / .rejects)
- .toHaveLastResolvedWith(value) - Checks the last resolved value.
- .toHaveNthResolvedWith(n, value) - Checks the nth resolved value.
- .toHaveResolved() - Checks if a promise resolved.
- .toHaveResolvedTimes(number) - Checks how many times a promise resolved.
- .toHaveResolvedWith(value) - Checks if a promise resolved with a specific value.

### Assertions (assert)
- assert(value, message?) - Asserts that a value is truthy.
- assert.changes(fn, object, prop, message?) - Asserts fn changes object[prop].
- assert.changesButNotBy(fn, object, prop, delta, message?) - Asserts fn changes object[prop] but not by delta.
- assert.changesBy(fn, object, prop, delta, message?) - Asserts fn changes object[prop] by delta.
- assert.closeTo(actual, expected, delta, message?) - Asserts |actual - expected| <= delta.
- assert.containsAllDeepKeys(object, keys, message?) - (Alias for hasAllDeepKeys).
- assert.containsAllKeys(object, keys, message?) - (Alias for hasAllKeys).
- assert.decreases(fn, object, prop, message?) - Asserts fn decreases object[prop].
- assert.decreasesButNotBy(fn, object, prop, delta, message?) - Asserts fn decreases object[prop] but not by delta.
- assert.decreasesBy(fn, object, prop, delta, message?) - Asserts fn decreases object[prop] by delta.
- assert.deepEqual(actual, expected, message?) - Asserts deep equality.
- assert.deepInclude(haystack, needle, message?) - Asserts haystack deep-includes needle.
- assert.deepNestedInclude(value, path, needle, message?) - Asserts value has deep-equal needle at path.
- assert.deepNestedPropertyVal(object, path, value, message?) - Asserts nested property path deep equals value.
- assert.deepOwnInclude(value, needle, message?) - Asserts value has deep-equal own property needle.
- assert.deepPropertyVal(object, prop, value, message?) - Asserts object[prop] deep equals value.
- assert.doesNotChange(fn, object, prop, message?) - Asserts fn does not change object[prop].
- assert.doesNotDecrease(fn, object, prop, message?) - Asserts fn does not decrease object[prop].
- assert.doesNotHaveAllDeepKeys(object, keys, message?) - Asserts object does not have all deep keys.
- assert.doesNotHaveAllKeys(object, keys, message?) - Asserts object does not have all keys.
- assert.doesNotHaveAnyDeepKeys(object, keys, message?) - Asserts object has no deep keys.
- assert.doesNotHaveAnyKeys(object, keys, message?) - Asserts object has none of keys.
- assert.doesNotIncrease(fn, object, prop, message?) - Asserts fn does not increase object[prop].
- assert.doesNotThrow(fn, error?, message?) - Asserts fn does not throw error.
- assert.equal(actual, expected, message?) - Asserts non-strict equality (==).
- assert.exists(value, message?) - Asserts value is not null or undefined.
- assert.fail(message?) - Throws an assertion error.
- assert.hasAllDeepKeys(object, keys, message?) - Asserts object has all deep keys.
- assert.hasAllKeys(object, keys, message?) - Asserts object has all keys.
- assert.hasAnyDeepKeys(object, keys, message?) - Asserts object has at least one deep keys.
- assert.hasAnyKeys(object, keys, message?) - Asserts object has at least one of keys.
- assert.ifError(value, message?) - Asserts value is falsy.
- assert.include(haystack, needle, message?) - Asserts haystack.includes(needle).
- assert.includeDeepMembers(superset, subset, message?) - Asserts superset deep-includes all members of subset.
- assert.includeDeepOrderedMembers(superset, subset, message?) - Asserts superset deep-includes all members of subset in order.
- assert.includeMembers(superset, subset, message?) - Asserts superset includes all members of subset.
- assert.includeOrderedMembers(superset, subset, message?) - Asserts superset includes all members of subset in order.
- assert.increases(fn, object, prop, message?) - Asserts fn increases object[prop].
- assert.increasesButNotBy(fn, object, prop, delta, message?) - Asserts fn increases object[prop] but not by delta.
- assert.increasesBy(fn, object, prop, delta, message?) - Asserts fn increases object[prop] by delta.
- assert.instanceOf(value, constructor, message?) - Asserts value instanceof constructor.
- assert.isAbove(value, above, message?) - Asserts value > above.
- assert.isArray(value, message?) - Asserts value is an array.
- assert.isAtLeast(value, atLeast, message?) - Asserts value >= atLeast.
- assert.isAtMost(value, atMost, message?) - Asserts value <= atMost.
- assert.isBelow(value, below, message?) - Asserts value < below.
- assert.isBoolean(value, message?) - Asserts value is a boolean.
- assert.isDefined(value, message?) - Asserts value !== undefined.
- assert.isEmpty(value, message?) - Asserts value is empty.
- assert.isExtensible(object, message?) - Asserts object is extensible.
- assert.isFalse(value, message?) - Asserts value === false.
- assert.isFinite(value, message?) - Asserts value is a finite number.
- assert.isFrozen(object, message?) - Asserts object is frozen.
- assert.isFunction(value, message?) - Asserts value is a function.
- assert.isNaN(value, message?) - Asserts value is NaN.
- assert.isNotArray(value, message?) - Asserts value is not an array.
- assert.isNotBoolean(value, message?) - Asserts value is not a boolean.
- assert.isNotEmpty(value, message?) - Asserts value is not empty.
- assert.isNotExtensible(object, message?) - Asserts object is not extensible.
- assert.isNotFalse(value, message?) - Asserts value !== false.
- assert.isNotFrozen(object, message?) - Asserts object is not frozen.
- assert.isNotFunction(value, message?) - Asserts value is not a function.
- assert.isNotNaN(value, message?) - Asserts value is not NaN.
- assert.isNotNull(value, message?) - Asserts value !== null.
- assert.isNotNumber(value, message?) - Asserts value is not a number.
- assert.isNotObject(value, message?) - Asserts value is not an object.
- assert.isNotOk(value, message?) - Asserts that a value is falsy.
- assert.isNotSealed(object, message?) - Asserts object is not sealed.
- assert.isNotString(value, message?) - Asserts value is not a string.
- assert.isNotTrue(value, message?) - Asserts value !== true.
- assert.isNull(value, message?) - Asserts value === null.
- assert.isNumber(value, message?) - Asserts value is a number.
- assert.isObject(value, message?) - Asserts value is an object.
- assert.isOk(value, message?) - Asserts that a value is truthy.
- assert.isSealed(object, message?) - Asserts object is sealed.
- assert.isString(value, message?) - Asserts value is a string.
- assert.isTrue(value, message?) - Asserts value === true.
- assert.isUndefined(value, message?) - Asserts value === undefined.
- assert.lengthOf(value, length, message?) - Asserts value.length === length.
- assert.match(value, regex, message?) - Asserts regex.test(value).
- assert.nestedInclude(value, path, needle, message?) - Asserts value has needle at path.
- assert.nestedProperty(object, path, message?) - Asserts object has nested property path.
- assert.nestedPropertyVal(object, path, value, message?) - Asserts nested property path equals value.
- assert.notDeepEqual(actual, expected, message?) - Asserts deep inequality.
- assert.notDeepInclude(haystack, needle, message?) - Asserts haystack does not deep-include needle.
- assert.notDeepNestedInclude(value, path, needle, message?) - Asserts value does not have deep-equal needle at path.
- assert.notDeepNestedPropertyVal(object, path, value, message?) - Asserts nested property path does not deep equal value.
- assert.notDeepOwnInclude(value, needle, message?) - Asserts value does not have deep-equal own property needle.
- assert.notDeepPropertyVal(object, prop, value, message?) - Asserts object[prop] does not deep equal value.
- assert.notEqual(actual, expected, message?) - Asserts non-strict inequality (!=).
- assert.notExists(value, message?) - Asserts value is null or undefined.
- assert.notInclude(haystack, needle, message?) - Asserts !haystack.includes(needle).
- assert.notIncludeDeepMembers(superset, subset, message?) - Asserts superset does not deep-include all members of subset.
- assert.notIncludeDeepOrderedMembers(superset, subset, message?) - Asserts superset does not deep-include all members of subset in order.
- assert.notIncludeMembers(superset, subset, message?) - Asserts superset does not include all members of subset.
- assert.notIncludeOrderedMembers(superset, subset, message?) - Asserts superset does not include all members of subset in order.
- assert.notInstanceOf(value, constructor, message?) - Asserts !(value instanceof constructor).
- assert.notMatch(value, regex, message?) - Asserts !regex.test(value).
- assert.notNestedInclude(value, path, needle, message?) - Asserts value does not have needle at path.
- assert.notNestedProperty(object, path, message?) - Asserts object does not have nested property path.
- assert.notNestedPropertyVal(object, path, value, message?) - Asserts nested property path does not equal value.
- assert.notOwnInclude(value, needle, message?) - Asserts value does not have own property needle.
- assert.notProperty(object, prop, message?) - Asserts object does not have property prop.
- assert.notPropertyVal(object, prop, value, message?) - Asserts object[prop] != value.
- assert.notSameDeepMembers(set1, set2, message?) - Asserts set1 and set2 do not have the same deep members.
- assert.notSameDeepOrderedMembers(set1, set2, message?) - Asserts set1 and set2 do not have same deep members in same order.
- assert.notSameMembers(set1, set2, message?) - Asserts set1 and set2 do not have the same members.
- assert.notSameOrderedMembers(set1, set2, message?) - Asserts set1 and set2 do not have same members in same order.
- assert.notTypeOf(value, type, message?) - Asserts typeof value !== type.
- assert.oneOf(value, list, message?) - Asserts value is one of list.
- assert.operator(val1, op, val2, message?) - Asserts val1 op val2 is truthy.
- assert.ownInclude(value, needle, message?) - Asserts value has own property needle.
- assert.property(object, prop, message?) - Asserts object has property prop.
- assert.propertyVal(object, prop, value, message?) - Asserts object[prop] == value.
- assert.sameDeepMembers(set1, set2, message?) - Asserts set1 and set2 have the same deep members.
- assert.sameDeepOrderedMembers(set1, set2, message?) - Asserts set1 and set2 have same deep members in same order.
- assert.sameMembers(set1, set2, message?) - Asserts set1 and set2 have the same members.
- assert.sameOrderedMembers(set1, set2, message?) - Asserts set1 and set2 have same members in same order.
- assert.strictEqual(actual, expected, message?) - Asserts strict equality (===).
- assert.throws(fn, error?, message?) - Asserts fn throws error.
- assert.typeOf(value, type, message?) - Asserts typeof value === type.

### Type Testing
- assertType(value) - Asserts a value's type; fails with a type error if incorrect.
- expectTypeOf(value) - Asserts the type of a value at compile time.

#### **Type Matchers (for expectTypeOf & assertType)**
- .asserts<T>() - Checks if a function is an assertion function.
- .constructorParameters - Accesses constructor parameters type as a tuple.
- .exclude<T>() - Excludes a type from a union.
- .extract<T>() - Extracts a type from a union.
- .guards<T>() - Checks if a function is a type guard.
- .instance - Accesses the instance type of a class.
- .items - Accesses the type of array items.
- .not - Inverts the meaning of the next type matcher.
- .parameter(index) - Accesses the type of a function parameter at a specific index.
- .parameters - Accesses the parameters type of a function as a tuple.
- .resolves - Accesses the resolved type of a promise.
- .returns - Accesses the return type of a function type.
- .toBeAny() - Checks if the type is any.
- .toBeArray() - Checks if the type is an array.
- .toBeBoolean() - Checks if the type is a boolean.
- .toBeCallableWith(...args) - Checks if a function is callable with given arguments.
- .toBeConstructibleWith(...args) - Checks if a class is constructible with given arguments.
- .toBeFunction() - Checks if the type is a function.
- .toBeNever() - Checks if the type is never.
- .toBeNull() - Checks if the type is null.
- .toBeNullable() - Checks if the type is nullable (or null or undefined).
- .toBeObject() - Checks if the type is an object.
- .toBeString() - Checks if the type is a string.
- .toBeSymbol() - Checks if the type is symbol.
- .toBeUndefined() - Checks if the type is undefined.
- .toBeUnknown() - Checks if the type is unknown.
- .toBeVoid() - Checks if the type is void.
- .toEqualTypeOf<T>() - Checks if types are exactly equal.
- .toExtend<T>() - Checks if the type extends T.
- .toHaveProperty(key, expectedType?) - Checks if an object type has a specific property.
- .toMatchObjectType<T>() - Checks if the type matches an object subset.
- .toMatchTypeOf<T>() - Checks if the type matches a subset of T.


## Contributing

Feel free to contribute new snippets or improvements by submitting a pull request to the repository.

## License

MIT License
