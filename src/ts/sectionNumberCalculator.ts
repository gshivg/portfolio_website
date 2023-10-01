/**
 * @param {string} id - The id of the element to calculate the number of children
 */

const childrenNumberCalculator = (id: string) => {
  let childrenCount =
    document.getElementById(id)?.childElementCount;
  console.log(childrenCount);
  return childrenCount;
};

export default childrenNumberCalculator;