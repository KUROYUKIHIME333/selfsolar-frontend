export const toCardinalDirections = (
  latOrLong: number,
  nature: "latitude" | "longitude"
) => {
  let result: string = ` ${latOrLong}°`;
  const unsigned: number = Math.abs(latOrLong);

  if (nature === "latitude") {
    if (latOrLong < 0) {
      result = ` ${unsigned}° SUD`;
    }
    if (latOrLong > 0) {
      result = ` ${unsigned}° NORD`;
    }
  }
  if (nature === "longitude") {
    if (latOrLong < 0) {
      result = ` ${unsigned}° OUEST`;
    }
    if (latOrLong > 0) {
      result = ` ${unsigned}° EST`;
    }
  }

  return result;
};
