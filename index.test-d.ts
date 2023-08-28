import {expectType} from 'tsd';
import defaults from './index.js';

// Test passing in compatible types
{
	const options = {timeout: 1000};
	const defaultOptions = {timeout: 100};
	const result = defaults(options, defaultOptions);

	// Expect result to be { timeout: number }
	type Result = typeof result;
	type Expected = {timeout: number};
	const _result: Expected = result;
}

// Test using merged object in safe way
{
	const options = {timeout: 1000};
	const defaultOptions = {timeout: 100};
	const result = defaults(options, defaultOptions);

	// Safe to use timeout property without error
	const {timeout} = result;
	console.log(timeout); // Expect output to be 1000
}

// Test deep merging with compatible types
{
	const options = {a: {b: 1}};
	const defaultOptions = {a: {c: 2}};
	const result = defaults(options, defaultOptions);

	// Expect result to be `{a: {b: number, c: number}}``
	expectType<typeof result>({a: {c: 2, b: 1}});
}

// Test using deeply merged object in safe way
{
	const options = {a: {b: 1}};
	const defaultOptions = {a: {c: 2}};
	const result = defaults(options, defaultOptions);

	// Safe to use nested properties without error
	const {a} = result;
	console.log(a.b); // Expect output to be 1
	console.log(a.c); // Expect output to be 2
}

// Test that types get overriden by default when undefined
{
	type T = Partial<{
		timeout: number;
	}>;

	const options: T = {};
	const defaultOptions: Required<T> = {timeout: 100};
	const result = defaults(options, defaultOptions);

	// Expect result to be Required<T>
	type Result = typeof result;
	type Expected = Required<T>;
	const _result: Expected = result;

	// Safe to use now
	console.log(result.timeout > 0);
}
