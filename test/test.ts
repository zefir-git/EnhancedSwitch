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
import EnhancedSwitch from "../src/EnhancedSwitch.js";
import assert from "node:assert";

describe("EnhancedSwitch", () => {
    it("should correctly execute a case clause", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(2)
                .case(1, "One")
                .case(2, "Two")
                .value,
            "Two"
        );
    });

    it("should correctly handle case clause with function returning undefined", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(2)
                .case(1, "One")
                .case(2, () => undefined)
                .default("Default")
                .value,
            "Default"
        );
    });

    it("should correctly handle case clause with an array of values", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(2)
                .case([1, 2], "One or two")
                .case(3, "Three")
                .value,
            "One or two"
        );
    });

    it("should correctly execute a case clause with a function", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(3)
                .case(1, "One")
                .case(2, "Two")
                .case(3, (s) => `Three from function with ${s.expression}`)
                .value,
            "Three from function with 3"
        );
    });

    it("should correctly execute a default clause", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(5)
                .case(1, "One")
                .case(2, "Two")
                .default("Default")
                .value,
            "Default"
        );
    });

    it("should correctly execute a default clause with a function", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(6)
                .case(1, "One")
                .case(2, "Two")
                .default((s) => `Default from function with ${s.expression}`)
                .value,
            "Default from function with 6"
        );
    });

    it("should return switch instance when returnValue parameter is not provided", () => {
        const switchInstance = new EnhancedSwitch<number, string>(7);

        assert.strictEqual(
            switchInstance
                .case(1, "One")
                .case(2, "Two")
                .default("Default"),
            switchInstance
        );
    });

    it("should return the value when returnValue parameter is true", () => {
        assert.strictEqual(
            new EnhancedSwitch<number, string>(8)
                .case(1, "One")
                .case(2, "Two")
                .default("Default", true),
            "Default"
        );
    });

    it("should correctly handle default clause with function returning undefined", () => {
        assert.throws(() => {
            new EnhancedSwitch<number, string>(13)
                .case(1, "One")
                .case(2, "Two")
                .default(() => undefined)
                .value;
        }, TypeError, "Switch has no result.");
    });

    it("should throw an error when no case matches and no default clause is provided", () => {
        assert.throws(() => {
            new EnhancedSwitch<number, string>(9).value;
        }, TypeError, "Switch has no result.");
    });
});
