import { deepAssign, deepAssignOptions } from "./index";

describe("deepAssign", () => {
	describe("readme examples", () => {
		test("1", () => {
			const result = deepAssign(
				{},
				{ dimensions: { width: 100, height: 100 } },
				{ dimensions: { width: 200 } }
			);
			const expectedResult = { dimensions: { width: 200, height: 100 } };

			expect(result).toEqual(expectedResult);
		});

		test("2", () => {
			const result = deepAssign(
				{},
				{ numbers: [1, 2, 3] },
				{ numbers: [4, 5, 6] }
			);
			const expectedResult = { numbers: [1, 2, 3, 4, 5, 6] };

			expect(result).toEqual(expectedResult);
		});

		test("3", () => {
			const result = deepAssign({}, { a: { b: 1 } }, { a: { c: 2 } });
			const expectedResult = { a: { b: 1, c: 2 } };

			expect(result).toEqual(expectedResult);
		});

		test("super deep", () => {
			const startTimeMS = Date.now();
			const obj1 = {
				a: {
					b: { c: { d: { e: { f: { g: { h: { i: { j: 1 } } } } } } } }
				}
			};
			const obj2 = {
				a: {
					b: {
						c: {
							d: { e: { f: { g: { h: { i: { foo: "bar" } } } } } }
						}
					}
				}
			};
			const result = deepAssign({}, obj1, obj2);
			const expectedResult = {
				a: {
					b: {
						c: {
							d: {
								e: {
									f: { g: { h: { i: { j: 1, foo: "bar" } } } }
								}
							}
						}
					}
				}
			};

			const timeMS = Date.now() - startTimeMS;

			expect(timeMS < 50).toBe(true);
			expect(result).toEqual(expectedResult);
		});
	});

	describe("mutates receiver object (like Object.assign)", () => {
		test("1", () => {
			let receiver = {};
			deepAssign(receiver, { foo: 1 });

			expect(receiver.foo).toEqual(1);
		});

		test("2", () => {
			let receiver = { a: { b: 1 } };
			const result = deepAssign(
				receiver,
				{ a: { b: 2 } },
				{ a: { b: 3 } }
			);
			expect(result.a.b).toEqual(3);
			expect(receiver.a.b).toEqual(3);
		});
	});

	describe("does not mutate source objects", () => {
		test("1", () => {
			let receiver = { foo: 1 };
			let source1 = { foo: 2 };
			let source2 = { foo: 3 };
			deepAssign(receiver, source1, source2);

			expect(source1.foo).toBe(2);
			expect(source2.foo).toBe(3);
		});
	});

	describe("arrays", () => {
		test("merges arrays", () => {
			const result = deepAssign(
				{},
				{ foo: [1, 2, 3] },
				{ foo: [4, 5, 6] }
			);
			const expectedResult = { foo: [1, 2, 3, 4, 5, 6] };

			expect(result).toEqual(expectedResult);
		});
	});

	describe("functions", () => {
		test("fn1 overrides fn2", () => {
			const fn1 = () => 1;
			const fn2 = () => 2;
			const result = deepAssign({}, { foo: fn1 }, { foo: fn2 });
			const expectedResult = { foo: fn2 };

			expect(result).toEqual(expectedResult);
		});
	});

	describe("symbols", () => {
		test("as keys", () => {
			const sym = Symbol();
			const result = deepAssign({}, { [sym]: 1 }, { [sym]: 2 });
			const expectedResult = { [sym]: 2 };

			expect(result).toEqual(expectedResult);
		});
	});

	describe("basic", () => {
		test("merges simple objects 1", () => {
			const result = deepAssign({}, { a: 3 }, { a: 1, b: 2 });
			const expectedResult = { a: 1, b: 2 };

			expect(result).toEqual(expectedResult);
		});

		test("merges simple objects 2", () => {
			const result = deepAssign({}, { foo: 0 }, { bar: 1 });
			const expectedResult = { foo: 0, bar: 1 };

			expect(result).toEqual(expectedResult);
		});

		test("handles null and undefined inputs 1", () => {
			const result = deepAssign({}, null, undefined, { foo: "bar" });
			const expectedResult = { foo: "bar" };

			expect(result).toEqual(expectedResult);
		});

		test("handles null and undefined inputs 2", () => {
			const result = deepAssign(
				{},
				{ foo: 0 },
				null,
				undefined,
				{ bar: 1 },
				null
			);
			const expectedResult = { foo: 0, bar: 1 };

			expect(result).toEqual(expectedResult);
		});

		test("handles null and undefined inputs 2", () => {
			const result = deepAssign(
				{},
				{ foo: 0 },
				null,
				undefined,
				{ bar: 1 },
				null
			);
			const expectedResult = { foo: 0, bar: 1 };

			expect(result).toEqual(expectedResult);
		});

		test("assigns to null targets", () => {
			const result = deepAssign({}, { foo: null }, { foo: {} });
			const expectedResult = { foo: {} };

			expect(result).toEqual(expectedResult);
		});

		test("merges values even if undefined", () => {
			const result = deepAssign({}, { foo: "f" }, { foo: undefined });
			const expectedResult = { foo: undefined };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides number", () => {
			const result = deepAssign(
				{},
				{ answer: 42 },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("number overrides object", () => {
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: 42 }
			);
			const expectedResult = { answer: 42 };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides boolean", () => {
			const result = deepAssign(
				{},
				{ answer: true },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("boolean overrides object", () => {
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: true }
			);
			const expectedResult = { answer: true };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides string", () => {
			const result = deepAssign(
				{},
				{ answer: "fff" },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("string overrides object", () => {
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: "fff" }
			);
			const expectedResult = { answer: "fff" };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides date", () => {
			const date = new Date(1511410546435);
			const result = deepAssign(
				{},
				{ answer: date },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("date overrides object", () => {
			const date = new Date(1511410546435);
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: date }
			);
			const expectedResult = { answer: date };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides array", () => {
			const result = deepAssign(
				{},
				{ answer: [1, 2, 3] },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("array overrides object", () => {
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: [1, 2, 3] }
			);
			const expectedResult = { answer: [1, 2, 3] };

			expect(result).toEqual(expectedResult);
		});

		test("function overrides object", () => {
			const fn = () => 1;
			const result = deepAssign(
				{},
				{ answer: { rainbows: "many" } },
				{ answer: fn }
			);
			const expectedResult = { answer: fn };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides function", () => {
			const fn = () => 1;
			const result = deepAssign(
				{},
				{ answer: fn },
				{ answer: { rainbows: "many" } }
			);
			const expectedResult = { answer: { rainbows: "many" } };

			expect(result).toEqual(expectedResult);
		});

		test("symbol overrides object", () => {
			const symbol = Symbol();
			const result = deepAssign({}, { foo: {} }, { foo: symbol });
			const expectedResult = { foo: symbol };

			expect(result).toEqual(expectedResult);
		});

		test("null handling", () => {
			const result = deepAssign({}, { foo: {} }, { foo: null });
			const expectedResult = { foo: null };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides symbol", () => {
			const symbol = Symbol();
			const result = deepAssign({}, { foo: symbol }, { foo: {} });
			const expectedResult = { foo: {} };

			expect(result).toEqual(expectedResult);
		});

		test("regexp overrides object", () => {
			const regexp = new RegExp();
			const result = deepAssign({}, { foo: {} }, { foo: regexp });
			const expectedResult = { foo: regexp };

			expect(result).toEqual(expectedResult);
		});

		test("object overrides regexp", () => {
			const regexp = new RegExp();
			const result = deepAssign({}, { foo: regexp }, { foo: {} });
			const expectedResult = { foo: {} };

			expect(result).toEqual(expectedResult);
		});

		test("multiple objects", () => {
			const result = deepAssign(
				{ foo: 0 },
				{ bar: 1 },
				{ bar: 2 },
				{ foo: 3 }
			);
			const expectedResult = { bar: 2, foo: 3 };

			expect(result).toEqual(expectedResult);
		});

		test("doesnt iterate prototype props", () => {
			const Unicorn = function() {};
			Unicorn.prototype.bar = 1;
			const unicorn = new Unicorn();
			expect(unicorn.bar).toBe(1);

			const result = deepAssign(unicorn, { foo: 2 });
			const expectedResult = { foo: 2 };

			expect(result).toEqual(expectedResult);
		});

		test("deep", () => {
			const startTimeMS = Date.now();
			const result = deepAssign(
				{
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
				}
			);
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

			const timeMS = Date.now() - startTimeMS;

			expect(timeMS < 5).toBe(true);
			expect(result).toEqual(expectedResult);
		});
	});
});

describe("deepAssignOptions", () => {
	test("array overwrite", () => {
		const result = deepAssignOptions(
			{ overwriteArrays: true },
			{},
			{ numbers: [1, 2, 3] },
			{ numbers: [4, 5, 6] }
		);
		const expectedResult = { numbers: [4, 5, 6] };

		expect(result).toEqual(expectedResult);
	});

	test("deep array overwrite", () => {
		const result = deepAssignOptions(
			{ overwriteArrays: true, overwriteObjects: false },
			{},
			{ a: { numbers: [1, 2, 3] } },
			{ a: { numbers: [4, 5, 6] } }
		);
		const expectedResult = { a: { numbers: [4, 5, 6] } };

		expect(result).toEqual(expectedResult);
	});

	test("object overwrite", () => {
		const result = deepAssignOptions(
			{ overwriteObjects: true },
			{},
			{ a: { b: 1 } },
			{ a: { c: 2 } }
		);
		const expectedResult = { a: { c: 2 } };

		expect(result).toEqual(expectedResult);
	});

	test("object overwrite and array overwrite", () => {
		const result = deepAssignOptions(
			{ overwriteArrays: true, overwriteObjects: true },
			{},
			{ a: { b: 1 }, arr: [1, 2, 3] },
			{ a: { c: 2 }, arr: [4, 5, 6] }
		);
		const expectedResult = { a: { c: 2 }, arr: [4, 5, 6] };

		expect(result).toEqual(expectedResult);
	});
});
