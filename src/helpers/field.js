function canMoveLeft(matrix, x, y) {
  if (y-1 < 0) {
    return false;
  }
  return matrix[x][y-1] && !matrix[x][y-1].isBomb && !matrix[x][y-1].selected && (!matrix[x][y-1].value || !matrix[x][y].value);
}

function canMoveRight(matrix, x, y) {
  const maxColumnPosi = matrix[0].length - 1;
  if (y+1 > maxColumnPosi){
    return false;
  }

  return matrix[x][y+1] && !matrix[x][y+1].isBomb && !matrix[x][y+1].selected && (!matrix[x][y+1].value || !matrix[x][y].value);
}

function canMoveTop(matrix, x, y) {
  if (x-1 < 0) {
    return false;
  }
  return matrix[x-1][y] && !matrix[x-1][y].isBomb && !matrix[x-1][y].selected && (!matrix[x-1][y].value || !matrix[x-1][y].value);
}

function canMoveBottom(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  if (x+1 > maxRowsPosi) {
    return false;
  }

  return matrix[x+1][y] && !matrix[x+1][y].isBomb && !matrix[x+1][y].selected && (!matrix[x+1][y].value || !matrix[x+1][y].value);
}

function canMoveTopRight(matrix, x, y) {
  const maxColumnPosi = matrix[0].length - 1;
  if ((x-1 < 0) || (y+1 > maxColumnPosi)) {
    return false;
  }

  return matrix[x-1][y+1] && !matrix[x-1][y+1].isBomb && !matrix[x-1][y+1].selected && (!matrix[x-1][y+1].value || !matrix[x][y].value);
}

function canMoveTopLeft(matrix, x, y) {
  if ((x-1 < 0) || (y-1 < 0)) {
    return false;
  }

  return matrix[x-1][y-1] && !matrix[x-1][y-1].isBomb && !matrix[x-1][y-1].selected && (!matrix[x-1][y-1].value || !matrix[x][y].value);
}

function canMoveBottomLeft(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  if ((y-1 < 0) || (x+1 > maxRowsPosi)) {
    return false;
  }

  return matrix[x+1][y-1] && !matrix[x+1][y-1].isBomb && !matrix[x+1][y-1].selected && (!matrix[x+1][y-1].value || !matrix[x][y].value);
}

function canMoveBottomRight(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  const maxColumnPosi = matrix[0].length - 1;
  if ((y+1 > maxColumnPosi) || (x+1 > maxRowsPosi)) {
    return false;
  }

  return matrix[x+1][y-1] && !matrix[x+1][y-1].isBomb && !matrix[x+1][y-1].selected && (!matrix[x+1][y-1].value || !matrix[x][y].value);
}


const expandBoundaries = (matrix, x, y) => {
  if (canMoveRight(matrix, x, y)) {
    matrix[x][y+1].selected = true;
    expandBoundaries(matrix, x, y+1);
  }

  if (canMoveLeft(matrix, x, y)) {
    matrix[x][y-1].selected = true;
    expandBoundaries(matrix, x, y-1);
  }

  if (canMoveTop(matrix, x, y)) {
    matrix[x-1][y].selected = true;
    expandBoundaries(matrix, x-1, y);
  }

  if (canMoveBottom(matrix, x, y)) {
    matrix[x+1][y].selected = true;
    expandBoundaries(matrix, x+1, y);
  }

  if (canMoveBottomLeft(matrix, x, y)) {
    matrix[x+1][y-1].selected = true;
    expandBoundaries(matrix, x+1, y-1);
  }

  if (canMoveBottomRight(matrix, x, y)) {
    matrix[x+1][y+1].selected = true;
    expandBoundaries(matrix, x+1, y+1);
  }

  if (canMoveTopRight(matrix, x, y)) {
    matrix[x-1][y+1].selected = true;
    expandBoundaries(matrix, x-1, y+1);
  }

  if (canMoveTopLeft(matrix, x, y)) {
    matrix[x-1][y-1].selected = true;
    expandBoundaries(matrix, x-1, y-1);
  }
}

module.exports = {
  expandBoundaries,
  canMoveLeft,
  canMoveBottom,
  canMoveRight,
  canMoveTop,
  canMoveBottomLeft,
  canMoveBottomRight,
  canMoveTopLeft,
  canMoveTopRight,
}