export function makeDefaultReject(name = 'unnamed') {
  return function(err: Error | any) {
    throw new Error(name + ': ' + String(err));
  };
}
