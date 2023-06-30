import { curry } from 'lodash-es'

type Cut<T extends any[], U extends any[], Acc extends any[] = []> = U extends [infer _UH, ...infer UR]
  ? T extends [infer _TH, ...infer TR]
  ? Cut<TR, UR, Acc>
  : never
  : T extends [infer TH, ...infer TR]
  ? Cut<TR, [], [...Acc, TH]>
  : Acc

type Curry<T extends any[], R> = T extends [infer Head, ...infer Rest]
  ? <S extends Partial<Rest>>(head: Head, ...args: S) => Curry<Cut<Rest, S>, R>
  : R

// 柯里化，类型准确
export function useCurry<T extends any[], R>(fn: (...args: T) => R): Curry<T, R>
export function useCurry<T extends any[], R>(fn: (...args: T) => R) {
  return curry(fn)
}
