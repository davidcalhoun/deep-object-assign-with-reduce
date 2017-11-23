const deepAssign = require('./dist/deep-object-assign-with-reduce-min');
const assert = require('assert');

describe('deepAssign', () => {
	describe('mutates receiver object (like Object.assign)', () => {
		it('1', () => {
			let receiver = {};
			deepAssign(receiver, { foo: 1 });

			assert.deepEqual(receiver.foo, 1);
		});

		it('2', () => {
			let receiver = { a: { b: 1 } };
			const result = deepAssign(receiver, { a: { b: 2 } }, { a: { b: 3 } });
			assert.deepEqual(result.a.b, 3);
			assert.deepEqual(receiver.a.b, 3);
		});
	});

	describe('does not mutate source objects', () => {
		it('1', () => {
			let receiver = { foo: 1 };
			let source1 = { foo: 2 };
			let source2 = { foo: 3 };
			deepAssign(receiver, source1, source2);

			assert.deepEqual(source1.foo, 2);
			assert.deepEqual(source2.foo, 3);
		});
	});

	describe('arrays', () => {
		it('merges arrays', () => {
			const result = deepAssign({}, { foo: [1,2,3] }, { foo: [4,5,6] });
			const expectedResult = { foo: [1,2,3,4,5,6] };

			assert.deepEqual(result, expectedResult);
		});
	});

	describe('functions', () => {
		it('fn1 overrides fn2', () => {
			const fn1 = () => 1;
			const fn2 = () => 2;
			const result = deepAssign({}, { foo: fn1 }, { foo: fn2 });
			const expectedResult = { foo: fn2 };

			assert.deepEqual(result, expectedResult);
		});
	});

	describe('basic', () => {
		it('merges simple objects 1', () => {
			const result = deepAssign({}, { a: 3 }, { a: 1, b: 2 });
			const expectedResult = { a: 1, b: 2};

			assert.deepEqual(result, expectedResult);
		});

		it('merges simple objects 2', () => {
			const result = deepAssign({}, { foo: 0 }, { bar: 1 });
			const expectedResult = { foo: 0, bar: 1 };

			assert.deepEqual(result, expectedResult);
		});

		it('handles null and undefined inputs 1', () => {
			const result = deepAssign({}, null, undefined, { foo: 'bar' });
			const expectedResult = { foo: 'bar' };

			assert.deepEqual(result, expectedResult);
		});

		it('handles null and undefined inputs 2', () => {
			const result = deepAssign({}, { foo: 0 }, null, undefined, { bar: 1 }, null);
			const expectedResult = { foo: 0, bar: 1 };

			assert.deepEqual(result, expectedResult);
		});

		it('handles null and undefined inputs 2', () => {
			const result = deepAssign({}, { foo: 0 }, null, undefined, { bar: 1 }, null);
			const expectedResult = { foo: 0, bar: 1 };

			assert.deepEqual(result, expectedResult);
		});

		it('assigns to null targets', () => {
			const result = deepAssign({}, { foo: null }, { foo: {  } });
			const expectedResult = { foo: {  } };

			assert.deepEqual(result, expectedResult);
		});

		it('merges values even if undefined', () => {
			const result = deepAssign({}, { foo: 'f' }, { foo: undefined });
			const expectedResult = { foo: undefined };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides number', () => {
			const result = deepAssign({}, { answer: 42 }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('number overrides object', () => {
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: 42 });
			const expectedResult = { answer: 42 };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides boolean', () => {
			const result = deepAssign({}, { answer: true }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('boolean overrides object', () => {
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: true });
			const expectedResult = { answer: true };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides string', () => {
			const result = deepAssign({}, { answer: 'fff' }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('string overrides object', () => {
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: 'fff' });
			const expectedResult = { answer: 'fff' };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides date', () => {
			const date = new Date(1511410546435);
			const result = deepAssign({}, { answer: date }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('date overrides object', () => {
			const date = new Date(1511410546435);
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: date });
			const expectedResult = { answer: date };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides array', () => {
			const result = deepAssign({}, { answer: [1, 2, 3] }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('array overrides object', () => {
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: [1, 2, 3] });
			const expectedResult = { answer: [1, 2, 3] };

			assert.deepEqual(result, expectedResult);
		});

		it('function overrides object', () => {
			const fn = () => 1;
			const result = deepAssign({}, { answer: { rainbows: 'many' } }, { answer: fn });
			const expectedResult = { answer: fn };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides function', () => {
			const fn = () => 1;
			const result = deepAssign({}, { answer: fn }, { answer: { rainbows: 'many' } });
			const expectedResult = { answer: { rainbows: 'many' } };

			assert.deepEqual(result, expectedResult);
		});

		it('symbol overrides object', () => {
			const symbol = Symbol();
			const result = deepAssign({}, { foo: {} }, { foo: symbol });
			const expectedResult = { foo: symbol };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides symbol', () => {
			const symbol = Symbol();
			const result = deepAssign({}, { foo: symbol }, { foo: {} });
			const expectedResult = { foo: {} };

			assert.deepEqual(result, expectedResult);
		});

		it('regexp overrides object', () => {
			const regexp = new RegExp();
			const result = deepAssign({}, { foo: {} }, { foo: regexp });
			const expectedResult = { foo: regexp };

			assert.deepEqual(result, expectedResult);
		});

		it('object overrides regexp', () => {
			const regexp = new RegExp();
			const result = deepAssign({}, { foo: regexp }, { foo: {} });
			const expectedResult = { foo: regexp };

			assert.deepEqual(result, expectedResult);
		});

		it('multiple objects', () => {
			const result = deepAssign({foo: 0}, {bar: 1}, {bar: 2}, {foo: 3});
			const expectedResult = { bar: 2, foo: 3 };

			assert.deepEqual(result, expectedResult);
		});

		it('doesnt iterate prototype props', () => {
			const Unicorn = function() {};
			Unicorn.prototype.bar = 1;
			const unicorn = new Unicorn();
			assert.deepEqual(unicorn.bar, 1);

			const result = deepAssign(unicorn, {foo: 2});
			const expectedResult = { foo: 2 };

			assert.deepEqual(result, expectedResult);
		});

		it('deep', () => {
			const result = deepAssign({
				foo: {
					foo: {
						foo: true,
						a: 1,
						b: 2
					},
					bar: {
						bar: false
					}
				}
			},
			{
				foo: {
					foo: {
						foo: false,
						bar: true
					}
				},
				bar: true
			});
			const expectedResult = {
				foo: {
					foo: {
						foo: false,
						bar: true,
						a: 1,
						b: 2
					},
					bar: {
						bar: false
					}
				},
				bar: true
			};

			assert.deepEqual(result, expectedResult);
		});


	});
});