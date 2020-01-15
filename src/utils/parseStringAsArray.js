module.exports = function parseStringAsArray(arrayAsString) {
  if (typeof arrayAsString != "string") {
    throw new Error("arrayAsString deve ser uma string");
  }
  return arrayAsString.split(',').map(el => el.trim());
}