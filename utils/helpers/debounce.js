/* ref
// https://medium.com/@kartikag01/debounce-api-request-in-react-functional-component-664b4971d9dd
// https://toughcompetent.com/blog/es5-es6-debounce-react-events-on-inputs/
*/
const debounce = (func, wait) => {
  let timeout;
  return args => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func(args);
    }, wait);
  };
}

export default debounce;