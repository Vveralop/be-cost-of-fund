export const uniqueKeyValues = (objectsArray, key) => {
  // Use a Set to store unique values
  const uniqueValuesSet = new Set();

  // Iterate over the array of objects
  objectsArray.forEach((obj) => {
    // Check if the key exists in the current object
    if (obj.hasOwnProperty(key)) {
      // Add the value to the Set to ensure uniqueness
      uniqueValuesSet.add(obj[key]);
    }
  });

  // Convert the Set back to an array and return it
  return Array.from(uniqueValuesSet);
};
