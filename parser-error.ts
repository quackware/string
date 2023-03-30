declare const _brand: unique symbol;
type Brand<Type, Name> = Type & { [_brand]: Name };

export type ParserError<T extends string> = Brand<T, "ParserError">;
