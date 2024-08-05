import{_ as c,r as t,c as l,b as e,w as h,a as n,e as s,o as d}from"./app-CbULZrmi.js";const u={},m=n("h1",{id:"canvas和svg对比",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#canvas和svg对比"},[n("span",null,"canvas和svg对比")])],-1),x=n("details",{class:"hint-container details"},[n("summary",null,"详情"),n("pre",null,[n("code",{class:"language-vue"},"File not found")])],-1),g=n("p",null,"下面是html中的svg代码",-1),p=n("pre",null,[n("code",{class:"language-html"},`<svg>
<path d="M 0 0 L 50 50" style="stroke:red"></path>
<circle cx="50" cy="50" r="30" style="stroke:blue;fill:none;"></circle>
<rect x="50" y="25" width="15" height="10" style="fill:cyan;"></rect>
<text x="0" y="90">svg</text>
</svg>
`)],-1),f=n("hr",null,null,-1),v=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,[s("下面个例子"),n("br"),s(" 想要学习更多,去看mdn的教程"),n("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial",target:"_blank",rel:"noopener noreferrer"},"https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial")])],-1),y=n("details",{class:"hint-container details"},[n("summary",null,"详情"),n("pre",null,[n("code",{class:"language-vue"},`<template>
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
<\/script>
`)])],-1),w=n("hr",null,null,-1),C=n("p",null,"五子棋游戏",-1),k=n("details",{class:"hint-container details"},[n("summary",null,"五子棋"),n("pre",null,[n("code",{class:"language-vue"},`<template>
  <h2 class="center">和伙伴玩</h2>
  <canvas id="cv" width="200px" height="200px"></canvas>
  <p class="result"></p>
  <button class="refresh-btn" onclick="loadPanel(400, 400,30,13)">刷新</button>
  <br />
  <br />
  <br />
  <h2 class="center">和计算机玩</h2>
  <div id="box"></div>
  <button class="refresh-btn" @click="clearAll">重新开始</button>
</template>
<script setup>
import { ref, onMounted } from "vue";
function p2p() {
  loadPanel(400, 400, 30, 13);

  /**
   * 1) 点击落子并切换执子者
   * 2）以当前落子位置为基准，以‘米'字型判定，是否能构成五连及以上
   * @param w 棋盘宽度
   * @param h 棋盘高度
   * @param cs 格子尺寸
   * @param ps 棋子半径
   */
  function loadPanel(w, h, cs, ps) {
    let i, j, k;
    let chks = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ]; //水平，纵向，斜下，斜上 四个方向
    let successNum = 5; //赢棋标准
    let resultEl = document.querySelector(".result");

    //1)绘制棋盘,边缘应隔开棋子半径的距离
    cs = cs || 16; //默认格子宽高
    ps = ps || 4; //棋子半径
    h = h || w; //高度默认等于宽度

    let el = document.getElementById("cv");
    el.setAttribute("width", w + "px");
    el.setAttribute("height", h + "px");
    let context = el.getContext("2d");
    //计算棋盘分割，向下取整
    let splitX = ~~((w - 2 * ps) / cs),
      splitY = ~~((h - 2 * ps) / cs);

    //初始化落子位置使用字典存储，相较于数组简单且减少内存占用
    let pieces = {};
    //循环划线
    context.translate(ps, ps);
    context.beginPath();
    context.strokeStyle = "#000";
    //垂直线
    for (i = 0; i < splitX + 1; i++) {
      context.moveTo(cs * i, 0);
      context.lineTo(cs * i, splitY * cs);
      context.stroke();
    }
    //水平线
    for (j = 0; j < splitY + 1; j++) {
      context.moveTo(0, cs * j);
      context.lineTo(splitX * cs, cs * j);
      context.stroke();
    }
    context.closePath();

    let user = 0,
      colors = ["#000", "#fefefe"];
    el.addEventListener("click", function (e) {
      let x = e.offsetX,
        y = e.offsetY,
        //计算落子范围
        rx = ~~((x - ps) / cs) + ((x - ps) % cs <= cs / 2 ? 0 : 1),
        ry = ~~((y - ps) / cs) + ((y - ps) % cs <= cs / 2 ? 0 : 1);
      //绘制棋子
      context.beginPath();
      context.arc(cs * rx, cs * ry, ps, 2 * Math.PI, false);
      context.fillStyle = colors[user];
      context.strokeStyle = "#000";
      user ? (user = 0) : (user = 1); //切换执子者
      context.fill();
      context.stroke();
      context.closePath();

      //记录棋子位置
      let piece = (pieces[rx + "-" + ry] = user);

      //米字型计算结果，以当前落子位置计算是否存在某个方向上具有连续的五个相同棋子
      for (j = 0; j < chks.length; j++) {
        let num = 1,
          chk = chks[j];
        for (i = 1; i <= 4; i++) {
          if (pieces[rx + chk[0] * i + "-" + (ry + chk[1] * i)] == piece) {
            num++;
          } else {
            for (i = -1; i >= -4; i--) {
              if (pieces[rx + chk[0] * i + "-" + (ry + chk[1] * i)] == piece) {
                num++;
              }
            }
            break;
          }
        }
        if (num == successNum) {
          resultEl.innerHTML = ["白", "黑"][user] + "方赢";
          break;
        }
      }
    });
  }
}
class Gobang {
  constructor() {
    this.over = false; // 是否结束
    this.player = true; // true:我  false:电脑
    this.allChesses = []; // 所有棋子
    this.existChesses = []; // 已经落下的棋子
    this.winsCount = 0; // 赢法总数
    this.wins = []; // 所有赢法统计
    this.myWins = []; //我的赢法统计
    this.computerWins = []; //电脑赢法统计
  }
  ////初始化
  init(opts) {
    // 生成canvas棋盘
    this.createCanvas(opts);

    //棋盘初始化
    this.boardInit();

    // 鼠标移动聚焦功能实现
    this.mouseMove();

    //算法初始化
    this.algorithmInit();

    //落子功能实现
    this.dorpChess();
  }
  clear() {
    this.over = false; // 是否结束
    this.player = true; // true:我  false:电脑
    this.allChesses = []; // 所有棋子
    this.existChesses = []; // 已经落下的棋子
    this.winsCount = 0; // 赢法总数
    this.wins = []; // 所有赢法统计
    this.myWins = []; //我的赢法统计
    this.computerWins = []; //电脑赢法统计

    // 鼠标移动聚焦功能实现
    this.mouseMove();

    //算法初始化
    this.algorithmInit();

    //落子功能实现
    this.dorpChess();
    console.log(this);
  }
  //生成canvas
  createCanvas(opts) {
    var opts = opts || {};
    if (opts.width && opts.width % 30 !== 0)
      throw new RangeError(opts.width + "不是30的倍数");
    this.col = (opts.width && opts.width / 30) || 15; // 棋盘列

    var oCanvas = document.createElement("canvas");
    oCanvas.classList = "box1";
    oCanvas.width = oCanvas.height = opts.width || 450;
    this.canvas = oCanvas;
    console.log(this.canvas);
    console.log(opts.container);
    document.querySelector(opts.container || "body").appendChild(this.canvas);
    this.ctx = oCanvas.getContext("2d");
  }

  //棋盘初始化
  boardInit(opts) {
    this.drawBoard();
  }

  // 画棋盘
  drawBoard() {
    this.ctx.strokeStyle = "#bfbfbf";
    for (var i = 0; i < this.col; i++) {
      this.ctx.moveTo(15 + 30 * i, 15);
      this.ctx.lineTo(15 + 30 * i, this.col * 30 - 15);
      this.ctx.stroke();
      this.ctx.moveTo(15, 15 + 30 * i);
      this.ctx.lineTo(this.col * 30 - 15, 15 + 30 * i);
      this.ctx.stroke();
    }
  }

  // 画棋子
  drawChess(x, y, player) {
    var x = 15 + x * 30,
      y = 15 + y * 30;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 13, 0, Math.PI * 2);

    var grd = this.ctx.createRadialGradient(x + 2, y - 2, 13, x + 2, y - 2, 0);
    if (player) {
      //我 == 黑棋
      grd.addColorStop(0, "#0a0a0a");
      grd.addColorStop(1, "#636766");
    } else {
      //电脑 == 白棋
      grd.addColorStop(0, "#d1d1d1");
      grd.addColorStop(1, "#f9f9f9");
    }
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }

  // 鼠标移动时触发聚焦效果, 需要前面的聚焦效果消失, 所有需要重绘canvas
  mouseMove() {
    var that = this;
    this.canvas.addEventListener("mousemove", function (e) {
      that.ctx.clearRect(0, 0, that.col * 30, that.col * 30);
      var x = Math.floor(e.offsetX / 30),
        y = Math.floor(e.offsetY / 30);

      //重绘棋盘
      that.drawBoard();

      //移动聚焦效果
      that.focusChess(x, y);

      //重绘已经下好的棋子
      that.redrawedChess();
    });
  }

  //鼠标移动聚焦
  focusChess(x, y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#E74343";
    this.ctx.arc(15 + x * 30, 15 + y * 30, 6, 0, Math.PI * 2);
    this.ctx.fill();
  }

  //重绘当前下好的棋子
  redrawedChess(x, y) {
    for (var i = 0; i < this.existChesses.length; i++) {
      this.drawChess(
        this.existChesses[i].x,
        this.existChesses[i].y,
        this.existChesses[i].player
      );
    }
  }

  //算法初始化
  algorithmInit() {
    //初始化棋盘的每个位置和赢法
    for (var x = 0; x < this.col; x++) {
      this.allChesses[x] = [];
      this.wins[x] = [];
      for (var y = 0; y < this.col; y++) {
        this.allChesses[x][y] = false;
        this.wins[x][y] = [];
      }
    }

    //获取所有赢法
    this.computedWins();

    // 初始化电脑和我每个赢法当前拥有的棋子数
    for (var i = 0; i < this.winsCount; i++) {
      this.myWins[i] = 0;
      this.computerWins[i] = 0;
    }
  }

  //获取所有赢法
  computedWins() {
    /*
		直线赢法
		以15列为准
	*/
    for (var x = 0; x < this.col; x++) {
      //纵向所有赢法
      for (var y = 0; y < this.col - 4; y++) {
        this.winsCount++;

        /*
				如：
				1.组成的第一种赢法
					[0,0]
					[0,1]
					[0,2]
					[0,3]
					[0,4]

				2.组成的第二种赢法
					[0,1]
					[0,2]
					[0,3]
					[0,4]
					[0,5]
				以此类推一列最多也就11种赢法， 所有纵向x有15列  每列最多11种， 所有纵向总共15 * 11种
			*/
        //以下for循环给每种赢法的位置信息储存起来
        for (var k = 0; k < 5; k++) {
          this.wins[x][y + k][this.winsCount] = true;
          /*
					位置信息
					第一种赢法的时候：
						this.wins =	[
										[
											[1:true],
											[1:true],
											[1:true],
											[1:true],
											[1:true]
										],
										[
											......
										]
									]

						虽然这是一个三维数组, 我们把它拆分下就好理解了
						相当于  this.wins[0][0][1], this.wins[0][1][1], this.wins[0][2][1], this.wins[0][3][1], this.wins[0][4][1]

						因为对象可以这样取值：
							var obj = {
								a: 10,
								b: 'demo'
							}
							obj['a'] === obj.a

						所有也就相当于 this.wins[0][0].1, this.wins[0][1].1, this.wins[0][2].1, this.wins[0][3].1, this.wins[0][4].1

						虽然数组不能这么取值，可以这么理解

						所以  	this.wins[0][0].1  就可以理解为  在 x=0, y=0, 上有第一种赢法
								this.wins[0][1].1  就可以理解为  在 x=0, y=1, 上有第一种赢法
								......

						以上this.wins[0][0],this.wins[0][1]...可以看作是 this.wins[x][y]
						所以第一种赢法的坐标就是: [0,0] [0,1] [0,2] [0,3] [0,4]
				*/
        }
      }
    }

    for (var y = 0; y < this.col; y++) {
      //横向所有赢法, 同纵向赢法一样，也是15 * 11种
      for (var x = 0; x < this.col - 4; x++) {
        this.winsCount++;
        for (var k = 0; k < 5; k++) {
          this.wins[x + k][y][this.winsCount] = true;
        }
      }
    }

    /*
		交叉赢法
	*/
    for (var x = 0; x < this.col - 4; x++) {
      // 左 -> 右 开始的所有交叉赢法  总共11 * 11种
      for (var y = 0; y < this.col - 4; y++) {
        this.winsCount++;

        /*
			如:
			1.	[0,0]
				[1,1]
				[2,2]
				[3,3]
				[4,4]

			2.  [0,1]
				[1,2]
				[2,3]
				[3,4]
				[4,5]

			3.	[0,2]
				[1,3]
				[2,4]
				[3,5]
				[4,6]
			...

				[1,0]
				[2,1]
				[3,2]
				[4,3]
				[5,5]

			相当于从左至右  一列列计算过去

			*/

        for (var k = 0; k < 5; k++) {
          this.wins[x + k][y + k][this.winsCount] = true;
        }
      }
    }

    for (var x = this.col - 1; x >= 4; x--) {
      //右 -> 左 开始的所有交叉赢法  总共11 * 11种
      for (var y = 0; y < this.col - 4; y++) {
        this.winsCount++;
        for (var k = 0; k < 5; k++) {
          this.wins[x - k][y + k][this.winsCount] = true;
        }
      }
    }
  }

  //落子实现
  dorpChess() {
    var that = this;
    this.canvas.addEventListener("click", function (e) {
      // 判断是否结束
      if (that.over) return;

      var x = Math.floor(e.offsetX / 30),
        y = Math.floor(e.offsetY / 30);

      //判断该棋子是否已存在
      if (that.allChesses[x][y]) return;

      // 检查落子情况
      that.checkChess(x, y);

      if (!that.over) {
        that.player = false;
        setTimeout(() => {
          that.computerDropChess();
        }, 500);
      }
    });
  }

  // 计算机落子
  computerDropChess() {
    var myScore = [], //玩家比分
      computerScore = [], // 电脑比分
      maxScore = 0; //最大比分

    //比分初始化
    var scoreInit = function () {
      for (var x = 0; x < this.col; x++) {
        myScore[x] = [];
        computerScore[x] = [];
        for (var y = 0; y < this.col; y++) {
          myScore[x][y] = 0;
          computerScore[x][y] = 0;
        }
      }
    };
    scoreInit.call(this);

    //电脑待会落子的坐标
    var x = 0,
      y = 0;

    // 基于我和电脑的每种赢法拥有的棋子来返回对应的分数
    function formatScore(o, n) {
      if (o < 6 && o > 0) {
        var n = 10;
        for (var i = 0; i < o; i++) {
          n *= 3;
        }
        return n;
      }
      return 0;
    }

    // 获取没有落子的棋盘区域
    function existChess(arr) {
      var existArr = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
          if (!arr[i][j]) {
            existArr.push({ x: i, y: j });
          }
        }
      }
      return existArr;
    }

    var exceptArr = existChess(this.allChesses);

    // 循环未落子区域，找出分数最大的位置
    for (var i = 0; i < exceptArr.length; i++) {
      var o = exceptArr[i];

      // 循环所有赢的方法
      for (var k = 0; k < this.winsCount; k++) {
        //判断每个坐标对应的赢法是否存在
        if (this.wins[o.x][o.y][k]) {
          // 计算每种赢法，拥有多少棋子，获取对应分数
          // 电脑起始分数需要高一些，因为现在是电脑落子， 优先权大
          myScore[o.x][o.y] += formatScore(this.myWins[k - 1], 10);
          computerScore[o.x][o.y] += formatScore(this.computerWins[k - 1], 11);
        }
      }

      //我的分数判断
      if (myScore[o.x][o.y] > maxScore) {
        //当我的分数大于最大分数时， 证明这个位置的是对我最有利的
        maxScore = myScore[o.x][o.y];
        x = o.x;
        y = o.y;
      } else if (myScore[o.x][o.y] === maxScore) {
        //当我的分数与最大分数一样时， 证明我在这两个位置下的效果一样， 所以我们应该去判断在这两个位置时，电脑方对应的分数
        if (computerScore[o.x][o.y] > computerScore[x][y]) {
          x = o.x;
          y = o.y;
        }
      }

      // 电脑分数判断， 因为是电脑落子， 所以优先权大
      if (computerScore[o.x][o.y] > maxScore) {
        maxScore = computerScore[o.x][o.y];
        x = o.x;
        y = o.y;
      } else if (computerScore[o.x][o.y] === maxScore) {
        if (myScore[o.x][o.y] > myScore[x][y]) {
          x = o.x;
          y = o.y;
        }
      }
    }

    this.checkChess(x, y);

    if (!this.over) {
      this.player = true;
    }
  }

  //检查落子情况
  checkChess(x, y) {
    //画棋
    this.drawChess(x, y, this.player);
    //记录落下的棋子
    this.existChesses.push({
      x: x,
      y: y,
      player: this.player,
    });
    //该位置棋子置为true,证明已经存在
    this.allChesses[x][y] = true;

    this.currWinChesses(x, y, this.player);
  }

  //判断当前坐标赢的方法各自拥有几粒棋子
  currWinChesses(x, y, player) {
    var currObj = player ? this.myWins : this.computerWins;
    var enemyObj = player ? this.computerWins : this.myWins;
    var currText = player ? "我" : "电脑";
    for (var i = 1; i <= this.winsCount; i++) {
      if (this.wins[x][y][i]) {
        //因为赢法统计是从1开始的  所以对应我的赢法需要减1
        currObj[i - 1]++; // 每个经过这个点的赢法都增加一个棋子;

        enemyObj[i - 1] = 6; //这里我下好棋了,证明电脑不可能在这种赢法上取得胜利了， 置为6就永远不会到5

        if (currObj[i - 1] === 5) {
          //当达到 5 的时候,证明我胜利了
          this.over = true;
          alert(currText + "赢了");
          console.log(this);
        }
      }
    }
  }
} //---------------------
let gobang = new Gobang();
function clearAll() {
  gobang.clear();
}
onMounted(() => {
  p2p();

  gobang.init({
    container: "#box",
  });
});
<\/script>

<style scoped>
.center {
  text-align: center;
}
#box {
  width: 450px;
  height: 450px;
  margin: 50px auto;
}
.box1 {
  display: block;
  box-shadow: 0px 0px 10px #ccc;
  background-size: cover;
}
canvas {
  display: block;
  margin: 0 auto;
  border: 0;
}

.result {
  text-align: center;
}
.refresh-btn {
  display: block;
  margin: 0 auto;
  padding: 4px 20px;
  border: 0;
  color: #fff;
  outline: none;
  border-radius: 3px;
  transition: all 0.3s;
  background: #43a6ff;
}
.refresh-btn:hover {
  font-weight: bold;
  cursor: pointer;
  background: #449ff0;
}
</style>
`)])],-1);function P(S,b){const i=t("CanvasVSSvg"),o=t("CodeDemo"),r=t("canvas-sample"),a=t("gobang");return d(),l("div",null,[m,e(i),x,g,e(o,{id:"code-demo-11",type:"normal",title:"svg%E4%BB%A3%E7%A0%81",code:"eJxt0EEOgjAQBdCrNL0AqGEhVE6gN+gGy0gbazFlVIjx7s7QYFwQWPxpf1/SvqXFm5elVMOzq3VQ9wataA9ankRO31EUOf1aigEnD7Q+YOyvUEZotaxVxn0+Z1w0HoQZqTL3zbSkSGG3Qpz9A6qL874MfYBq5hLDYASD4qcxti0ovFyLloYNDxZcZ5Gnf34mzdSERDLEIMKYwMXbU6jp2irjLa5k6RHk5wu66lgg"},{default:h(()=>[p]),_:1}),f,v,e(r),y,w,C,e(a),k])}const _=c(u,[["render",P],["__file","canvas-and-svg.html.vue"]]),M=JSON.parse('{"path":"/frontend/drawing/canvas-and-svg.html","title":"canvas和svg对比","lang":"zh-CN","frontmatter":{"description":"canvas和svg对比","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/frontend/drawing/canvas-and-svg.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"canvas和svg对比"}],["meta",{"property":"og:description","content":"canvas和svg对比"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-05-24T22:42:20.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-05-24T22:42:20.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"canvas和svg对比\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-05-24T22:42:20.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1649487947000,"updatedTime":1653432140000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":3}]},"readingTime":{"minutes":0.4,"words":121},"filePathRelative":"frontend/drawing/canvas-and-svg.md","localizedDate":"2022年4月9日","autoDesc":true}');export{_ as comp,M as data};
