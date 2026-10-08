//declaration
function params(a, b) {
  if (a === b) {
        return 4 * a;
  } else {
        return a * b;
  }
}
//expression
const params = function(a, b) {
  if (a === b) {
    return 4 * a;
  } else {
    return a * b;
  }
};
//стрелка
const params = (a, b) => {
  if (a === b) {
    return 4 * a;
  } else {
    return a * b;
  }
};