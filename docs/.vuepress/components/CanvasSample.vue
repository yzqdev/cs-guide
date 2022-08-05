<template>
  <div ref="sample"></div>
  
</template>
<script setup>
import { onMounted, ref } from "vue";
let sample = ref();
onMounted(() => {
  const kBoardWidth = 9;
  const kBoardHeight = 9;
  const kPieceWidth = 50;
  const kPieceHeight = 50;
  const kPixelWidth = 1 + kBoardWidth * kPieceWidth;
  const kPixelHeight = 1 + kBoardHeight * kPieceHeight;

  let gCanvasElement;
  let gDrawingContext;
  let gPattern;

  let gPieces;
  let gNumPieces;
  let gSelectedPieceIndex;
  let gSelectedPieceHasMoved;
  let gMoveCount;
  let gMoveCountElem;
  let gGameInProgress;

  const saveGameState = function () {
    return false;
  };

  const resumeGame = function () {
    return false;
  };

  function Cell(row, column) {
    this.row = row;
    this.column = column;
  }

  const getCursorPosition = (e) => {
    /* returns Cell with .row and .column properties */
    let x;
    let y;
    if (e.pageX != undefined && e.pageY != undefined) {
      x = e.pageX;
      y = e.pageY;
    } else {
      x =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      y =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    let cell = new Cell(
      Math.floor(y / kPieceHeight),
      Math.floor(x / kPieceWidth)
    );
    return cell;
  };

  const halmaOnClick = (e) => {
    let cell = getCursorPosition(e);
    for (let i = 0; i < gNumPieces; i++) {
      if (gPieces[i].row == cell.row && gPieces[i].column == cell.column) {
        clickOnPiece(i);
        return;
      }
    }
    clickOnEmptyCell(cell);
  };

  const clickOnEmptyCell = (cell) => {
    if (gSelectedPieceIndex == -1) {
      return;
    }
    let rowDiff = Math.abs(cell.row - gPieces[gSelectedPieceIndex].row);
    let columnDiff = Math.abs(
      cell.column - gPieces[gSelectedPieceIndex].column
    );
    if (rowDiff <= 1 && columnDiff <= 1) {
      /* we already know that this click was on an empty square,
           so that must mean this was a valid single-square move */
      gPieces[gSelectedPieceIndex].row = cell.row;
      gPieces[gSelectedPieceIndex].column = cell.column;
      gMoveCount += 1;
      gSelectedPieceIndex = -1;
      gSelectedPieceHasMoved = false;
      drawBoard();
      return;
    }
    if (
      ((rowDiff == 2 && columnDiff == 0) ||
        (rowDiff == 0 && columnDiff == 2) ||
        (rowDiff == 2 && columnDiff == 2)) &&
      isThereAPieceBetween(gPieces[gSelectedPieceIndex], cell)
    ) {
      /* this was a valid jump */
      if (!gSelectedPieceHasMoved) {
        gMoveCount += 1;
      }
      gSelectedPieceHasMoved = true;
      gPieces[gSelectedPieceIndex].row = cell.row;
      gPieces[gSelectedPieceIndex].column = cell.column;
      drawBoard();
      return;
    }
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    drawBoard();
  };

  const clickOnPiece = (pieceIndex) => {
    if (gSelectedPieceIndex == pieceIndex) {
      return;
    }
    gSelectedPieceIndex = pieceIndex;
    gSelectedPieceHasMoved = false;
    drawBoard();
  };

  const isThereAPieceBetween = (cell1, cell2) => {
    /* note: assumes cell1 and cell2 are 2 squares away
       either vertically, horizontally, or diagonally */
    let rowBetween = (cell1.row + cell2.row) / 2;
    let columnBetween = (cell1.column + cell2.column) / 2;
    for (let i = 0; i < gNumPieces; i++) {
      if (gPieces[i].row == rowBetween && gPieces[i].column == columnBetween) {
        return true;
      }
    }
    return false;
  };

  const isTheGameOver = () => {
    for (let i = 0; i < gNumPieces; i++) {
      if (gPieces[i].row > 2) {
        return false;
      }
      if (gPieces[i].column < kBoardWidth - 3) {
        return false;
      }
    }
    return true;
  };

  const drawBoard = () => {
    if (gGameInProgress && isTheGameOver()) {
      endGame();
    }

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);

    gDrawingContext.beginPath();

    /* vertical lines */
    for (let x = 0; x <= kPixelWidth; x += kPieceWidth) {
      gDrawingContext.moveTo(0.5 + x, 0);
      gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }

    /* horizontal lines */
    for (let y = 0; y <= kPixelHeight; y += kPieceHeight) {
      gDrawingContext.moveTo(0, 0.5 + y);
      gDrawingContext.lineTo(kPixelWidth, 0.5 + y);
    }

    /* draw it! */
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();

    for (let i = 0; i < 9; i++) {
      drawPiece(gPieces[i], i == gSelectedPieceIndex);
    }

    gMoveCountElem.innerHTML = gMoveCount;

    saveGameState();
  };

  const drawPiece = (p, selected) => {
    let column = p.column;
    let row = p.row;
    let x = column * kPieceWidth + kPieceWidth / 2;
    let y = row * kPieceHeight + kPieceHeight / 2;
    let radius = kPieceWidth / 2 - kPieceWidth / 10;
    gDrawingContext.beginPath();
    gDrawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
    gDrawingContext.closePath();
    gDrawingContext.strokeStyle = "#000";
    gDrawingContext.stroke();
    if (selected) {
      gDrawingContext.fillStyle = "#000";
      gDrawingContext.fill();
    }
  };

  const newGame = () => {
    gPieces = [
      new Cell(kBoardHeight - 3, 0),
      new Cell(kBoardHeight - 2, 0),
      new Cell(kBoardHeight - 1, 0),
      new Cell(kBoardHeight - 3, 1),
      new Cell(kBoardHeight - 2, 1),
      new Cell(kBoardHeight - 1, 1),
      new Cell(kBoardHeight - 3, 2),
      new Cell(kBoardHeight - 2, 2),
      new Cell(kBoardHeight - 1, 2),
    ];
    gNumPieces = gPieces.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
    drawBoard();
  };

  const endGame = () => {
    gSelectedPieceIndex = -1;
    gGameInProgress = false;
  };

  const initGame = (canvasElement, moveCountElement) => {
    if (!canvasElement) {
      canvasElement = document.createElement("canvas");
      canvasElement.id = "halma_canvas";
      sample.value.appendChild(canvasElement);
    }
    if (!moveCountElement) {
      moveCountElement = document.createElement("p");
      document.body.appendChild(moveCountElement);
    }
    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gCanvasElement.addEventListener("click", halmaOnClick, false);
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d");
    if (!resumeGame()) {
      newGame();
    }
  };

  initGame(undefined, undefined);
});
</script>
