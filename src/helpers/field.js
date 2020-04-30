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
  return matrix[x-1][y] && !matrix[x-1][y].isBomb && !matrix[x-1][y].selected && (!matrix[x-1][y].value || !matrix[x][y].value);
}

function canMoveBottom(matrix, x, y) {
  const maxRowsPosi = matrix.length - 1;
  if (x+1 > maxRowsPosi) {
    return false;
  }

  return matrix[x+1][y] && !matrix[x+1][y].isBomb && !matrix[x+1][y].selected && (!matrix[x+1][y].value || !matrix[x][y].value);
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
  let counter = 0;

  if (canMoveRight(matrix, x, y) && !matrix[x][y].value) {
    matrix[x][y+1].selected = true;
    const tmp = (matrix[x][y+1].value || 1) + expandBoundaries(matrix, x, y+1);
    counter += tmp;
  }

  if (canMoveLeft(matrix, x, y) && !matrix[x][y].value) {
    matrix[x][y-1].selected = true;
    const tmp = (matrix[x][y-1].value || 1) + expandBoundaries(matrix, x, y-1);
    counter += tmp;
  }

  if (canMoveTop(matrix, x, y) && !matrix[x][y].value) {
    matrix[x-1][y].selected = true;
    const tmp = (matrix[x-1][y].value || 1) + expandBoundaries(matrix, x-1, y);
    counter += tmp;
  }

  if (canMoveBottom(matrix, x, y) && !matrix[x][y].value) {
    matrix[x+1][y].selected = true;
    const tmp = (matrix[x+1][y].value || 1) + expandBoundaries(matrix, x+1, y);
    counter += tmp;
  }

  if (canMoveBottomLeft(matrix, x, y) && !matrix[x][y].value) {
    matrix[x+1][y-1].selected = true;
    const tmp = (matrix[x+1][y-1].value || 1) + expandBoundaries(matrix, x+1, y-1);
    counter += tmp;
  }

  if (canMoveBottomRight(matrix, x, y) && !matrix[x][y].value) {
    matrix[x+1][y+1].selected = true;
    const tmp = (matrix[x+1][y+1].value || 1) + expandBoundaries(matrix, x+1, y+1);
    counter += tmp;
  }

  if (canMoveTopRight(matrix, x, y) && !matrix[x][y].value) {
    matrix[x-1][y+1].selected = true;
    const tmp = (matrix[x-1][y+1].value || 1) + expandBoundaries(matrix, x-1, y+1);
    counter += tmp;
  }

  if (canMoveTopLeft(matrix, x, y) && !matrix[x][y].value) {
    matrix[x-1][y-1].selected = true;
    const tmp = (matrix[x-1][y-1].value || 1) + expandBoundaries(matrix, x-1, y-1);
    counter += tmp;
  }

  return counter;
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