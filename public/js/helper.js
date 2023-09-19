const getMostRecentDocuments = (array, count) => {
  // Sort the array in descending order based on the saleDate field
  array.sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));
    return array.slice(0, count);
  };
   export default  { getMostRecentDocuments };