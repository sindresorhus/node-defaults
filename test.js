import test from 'ava';
import defaults from './index.js';

test('options is an object', t => {
	const options = defaults(false, {a: true});
	t.true(options.a);
});

test('ensure defaults override non-existent keys', t => {
	const result = defaults({}, {a: false, b: true});
	t.true(result.b, 'b merges over undefined');
	t.false(result.a, 'a merges over undefined');
});

test('undefined options', t => {
	t.deepEqual(defaults(undefined, {a: false}), {a: false});
});

test('undefined default options', t => {
	t.deepEqual(defaults({a: false}, undefined), {a: false});
});

test('undefined options and default options', t => {
	t.deepEqual(defaults(), {});
});

test('ensure defined keys are not overwritten', t => {
	const result = defaults({b: false}, {a: false, b: true});
	t.false(result.b, 'b not merged');
	t.false(result.a, 'a merges over undefined');
});

test('ensure deep merging of plain objects', t => {
	const options = {a: {b: 1}};
	const defaultOptions = {a: {c: 2}};
	const result = defaults(options, defaultOptions);
	t.deepEqual(result, {a: {b: 1, c: 2}});
});

test('ensure arrays are not merged', t => {
	const options = {a: [1, 2, 3]};
	const defaultOptions = {a: [4, 5]};
	const result = defaults(options, defaultOptions);
	t.deepEqual(result, {a: [1, 2, 3]});
});

test('ensure correct handling of null and undefined values', t => {
	const options = {a: null, b: undefined};
	const defaultOptions = {a: {c: 1}, b: {d: 2}};
	const result = defaults(options, defaultOptions);
	t.deepEqual(result, {a: null, b: {d: 2}});
});
