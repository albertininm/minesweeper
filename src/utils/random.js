function getRandomCoordinates(maxXAxis, maxYAxis) {
  const x = Math.floor(Math.random() * maxXAxis);
  const y = Math.floor(Math.random() * maxYAxis);
  return [x, y];
}

module.exports ={
  getRandomCoordinates,
}