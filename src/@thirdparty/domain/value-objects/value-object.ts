export abstract class ValueObject<T = any> {
    protected _value: T;

    constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    toString = (): string => {
        if (this._value === null || this._value === undefined || Number.isNaN(this._value)) {
            return String(this._value);
        }
        if (typeof this._value === 'object') {
            return JSON.stringify(this._value);
        }
        return String(this._value);
    }
}