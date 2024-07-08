/**
 * The EnhancedSwitch evaluates an expression, matching the expression's value against a series of `case` clauses, and executes the statements after the first `case` clause with a matching value. The `default` clause of an EnhancedSwitch will be jumped to if no case matches the expression's value.
 *
 * @template T Switch expression type
 * @template U Switch return type
 */
export default class EnhancedSwitch<T, U> {
    /** @internal */
    #result?: U;

    /** @internal */
    #hasBroken = false;

    /**
     * Create a new EnhancedSwitch
     *
     * @param expression - An expression whose result is matched against each `case` clause.
     * @param allowFallthrough - Whether to allow fallthrough. If true, the switch will continue to execute `case` clauses after the first match until a `break` is encountered. Defaults to false.
     */
    constructor(public readonly expression: T, public readonly allowFallthrough = false) {}

    /**
     * The result of the switch statement.
     *
     * @throws {TypeError} If the switch statement has no result, e.g. there is no `default` clause and no `case` clause matches the expression or returns a value.
     */
    public get value(): U {
        if (this.#result === undefined) throw new TypeError("Switch has no result.");
        return this.#result;
    }

    /**
     * Whether the switch statement has concluded (no further `case` or `default` will be executed). A switch can be concluded by calling {@link #break} or constructing with `allowFallthrough` set to false.
     */
    public get hasConcluded(): boolean {
        return this.#hasBroken;
    }

    /**
     * A `case` clause used to match against `expression`. If the `expression` matches the specified `valueN` (which can be any expression), this case clause is executed.
     *
     * @param valueN - The `case` clause is executed if the expression matches this value, or at least one value if this is an array.
     * @param code - The value to return if the case matches.
     */
    public case(valueN: T | T[], code: U): this;

    /**
     * A `case` clause used to match against `expression`. If the `expression` matches the specified `valueN` (which can be any expression), this case clause is executed.
     *
     * @param valueN - The `case` clause is executed if the expression matches this value, or at least one value if this is an array.
     * @param code - The function to run if the case matches.
     */
    public case(valueN: T | T[], code: (s: EnhancedSwitch<T, U>) => U | void): this;

    /** @internal */
    public case(a: T | [], b: U | ((s: EnhancedSwitch<T, U>) => U | void)): this {
        if (!this.hasConcluded) {
            const valueN = Array.isArray(a) ? a : [a];
            if (valueN.includes(this.expression)) {
                this.#result = (typeof b === "function" ? (b as (s: EnhancedSwitch<T, U>) => U | void)(this) ?? this.#result : b);
                if (!this.allowFallthrough) this.break();
            }
        }
        return this;
    }

    /**
     * A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.
     *
     * @param code - The value to return if no case matches.
     */
    public default(code: U): this;

    /**
     * A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.
     *
     * @param code - The function to run if no case matches.
     */
    public default(code: (s: EnhancedSwitch<T, U>) => U | void): this;

    /**
     * A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.
     *
     * @param code - The value to return or function to run if the case matches.
     * @param returnValue - If true, the provided value is returned instead of the switch instance.
     */
    public default(code: U, returnValue: true): U;

    /**
     * A `default` clause; if provided, this clause is executed if the value of `expression` does not match any of the `case` clauses. An EnhancedSwitch can only have one `default` clause.
     *
     * @param code - The function to run if no case matches.
     * @param returnValue - If true, the provided value is returned instead of the switch instance.
     */
    public default(code: (s: EnhancedSwitch<T, U>) => U | void, returnValue: true): U;

    /** @internal */
    public default(a: U | ((s: EnhancedSwitch<T, U>) => U | void), b?: true): this | U {
        if (!this.hasConcluded) {
            this.break();
            this.#result = (typeof a === "function" ? (a as (s: EnhancedSwitch<T, U>) => U | void)(this) : a) ?? this.#result;
        }
        return b ? this.#result as U : this;
    }

    /**
     * Prevent further execution of any subsequent `case` or `default` clauses.
     */
    public break(): this {
        this.#hasBroken = true;
        return this;
    }
}
