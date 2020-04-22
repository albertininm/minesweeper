function isBombLeft(matrix, x, y) {
  if (y-1 < 0) {
    return false;
  }
  return matrix[x][y-1].isBomb;
}

function isBombRight(matrix, x, y) {
  const maxColumnPosi = matrix[0].length - 1;
  if(y+1 > maxColumnPosi){
    return false;
  }

  return matrix[x][y+1].isBomb;
}

function isBombTop(matrix, x, y) {
  if(x-1 < 0) {
    return false;
  }
  return matrix[x-1][y].isBomb;
}

function isBombBottom(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  if(x+1 > maxRowsPosi) {
    return false;
  }

  return matrix[x+1][y].isBomb;
}

function isBombTopRight(matrix, x, y) {
  const maxColumnPosi = matrix[0].length - 1;
  if((x-1 < 0) || (y+1 > maxColumnPosi)) {
    return false;
  }

  return matrix[x-1][y+1].isBomb;
}

function isBombTopLeft(matrix, x, y) {
  if((x-1 < 0) || (y-1 < 0)) {
    return false;
  }

  return matrix[x-1][y-1].isBomb;
}

function isBombBottomLeft(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  if((y-1 < 0) || (x+1 > maxRowsPosi)) {
    return false;
  }

  return matrix[x+1][y-1].isBomb;
}

function isBombBottomRight(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  const maxColumnPosi = matrix[0].length - 1;
  if((y+1 > maxColumnPosi) || (x+1 > maxRowsPosi)) {
    return false;
  }

  return matrix[x+1][y+1].isBomb;
}


function countNearBombs(matrix, x, y) {
  const items = [
    isBombLeft,
    isBombBottom,
    isBombRight,
    isBombTop,
    isBombBottomLeft,
    isBombBottomRight,
    isBombTopLeft,
    isBombTopRight
  ].map(f => !!f(matrix, x, y)).filter(item => item);
  return items && items.length;
}

module.exports = {
  countNearBombs,
  isBombLeft,
  isBombBottom,
  isBombRight,
  isBombTop,
  isBombBottomLeft,
  isBombBottomRight,
  isBombTopLeft,
  isBombTopRight,
};