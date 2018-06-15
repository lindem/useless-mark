type unaryFunc<T> = (t?: T) => any;

type rejectFunc = unaryFunc<Error | any>;

/*
 * TimedPromise first argument wrapper
 */
type TimeAnnotatedResult = {elapsed: number; result: any};

type TimedPromiseExecutor = (
  resolve: unaryFunc<TimeAnnotatedResult>,
  // the problem with this is that it is optional.
  reject: rejectFunc
) => void;

type PromiseExecutor = (resolve: unaryFunc<any>, reject: unaryFunc<any>) => any;
