export type Expect<T extends true[]> = T

export type MutuallyAssignable<A, B> = [A, B] extends [B, A] ? true : false
