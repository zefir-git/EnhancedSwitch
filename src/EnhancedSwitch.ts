/**
 * This software is licensed under the GNU Lesser General Public License version 3.0 (LGPL-3.0).
 * You should have received a copy of the GNU Lesser General Public License along with this software.
 * If not, see <https://www.gnu.org/licenses/lgpl-3.0.html>.
 *
 * Copyright (c) 2023 Zefir Kirilov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/**
 * The EnhancedSwitch evaluates an expression, matching the expression's value against a series of `case` clauses, and executes the statements after the first `case` clause with a matching value. The `default` clause of an EnhancedSwitch will be jumped to if no case matches the expression's value.
 *
 * @template T Switch expression type
 * @template U Switch return type
 */
export default class EnhancedSwitch<T, U> {
    private result?: U;

    /**
     * Create a new EnhancedSwitch
     *
     * @param expression - An expression whose result is matched against each `case` clause.
     */
    constructor(public readonly expression: T) {}

    /**
     * The result of the switch statement.
     * @throws {TypeError} If the switch statement has no result, e.g. there is no `default` clause and no `case` clause matches the expression or returns a value.
     */
    public get value(): U {
        if (this.result === undefined) throw new TypeError("Switch has no result.");
        return this.result;
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
        const valueN = Array.isArray(a) ? a : [a];
        if (valueN.includes(this.expression) && this.result === undefined) this.result = (typeof b === "function" ? (b as (s: EnhancedSwitch<T, U>) => U | void)(this) ?? this.result : b);
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
        if (this.result === undefined) this.result = (typeof a === "function" ? (a as (s: EnhancedSwitch<T, U>) => U | void)(this) : a) ?? this.result;
        return b ? this.result as U : this;
    }
}
