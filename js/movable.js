// 駒の移動可能な座標を計算してビットボードを返すメソッド群
$(function(){
debug("bitBoard.jsを読み込みました");

});

function computeMovable(pos){
	var clickedPiece = getPieceObject(pos);
	var kindOfPiece = getPieceName(clickedPiece);
	var isPromoted = clickedPiece.hasClass("promoted");
	var isBlack = clickedPiece.hasClass("black");
	var movableBoard = new bitBoard();
	movableBoard.setPointer(pos);

	var triCurrentPieces = new triBoard();
	triCurrentPieces.getCurrentPieces(isBlackTurn);

	switch(kindOfPiece){
		case "FU":
			computeFuMovable(movableBoard,isBlack);
			break;
		case "OH":
			computeOhMovable(movableBoard,isBlack);
			break;
		case "KIN":
			computeKinMovable(movableBoard,isBlack);
			break;
		case "GIN":
			computeGinMovable(movableBoard,isBlack);
			break;
		case "KEI":
			computeKeiMovable(movableBoard,isBlack);
			break;
		case "KYO":
			computeKyoMovable(movableBoard,isBlack);
			break;
		case "KAKU":
			computeKakuMovable(movableBoard,isBlack);
			break;
		case "HISHA":
			computeHishaMovable(movableBoard,isBlack);
			break;
		default:
			debug("この駒はまだ設定されていません");
			movableBoard.eachdo(function(pos,value){
			movableBoard.board[pos] = triCurrentPieces.board[pos] === 1 ? 0 : 1;
			});
			break;
	}

	// 移動先ビットボードから自分の駒がいる座標を消去
	movableBoard.eachdo(function(pos,value){
		if(triCurrentPieces.board[pos] === 1)
			movableBoard.board[pos] = 0;
	});
	movableBoard.output();
	return movableBoard;
}
function computeOhMovable(bitBoard,isBlack){
	bitBoard.addArea(-1,1,isBlack);
	bitBoard.addArea(0,1,isBlack);
	bitBoard.addArea(1,1,isBlack);
	bitBoard.addArea(-1,0,isBlack);
	bitBoard.addArea(1,0,isBlack);
	bitBoard.addArea(-1,-1,isBlack);
	bitBoard.addArea(0,-1,isBlack);
	bitBoard.addArea(1,-1,isBlack);
}

function computeKinMovable(bitBoard,isBlack){
	bitBoard.addArea(-1,1,isBlack);
	bitBoard.addArea(0,1,isBlack);
	bitBoard.addArea(1,1,isBlack);
	bitBoard.addArea(-1,0,isBlack);
	bitBoard.addArea(1,0,isBlack);
	bitBoard.addArea(0,-1,isBlack);
}

function computeGinMovable(bitBoard,isBlack){
	bitBoard.addArea(-1,1,isBlack);
	bitBoard.addArea(0,1,isBlack);
	bitBoard.addArea(1,1,isBlack);
	bitBoard.addArea(-1,-1,isBlack);
	bitBoard.addArea(1,-1,isBlack);
}
function computeKeiMovable(bitBoard,isBlack){
	bitBoard.addArea(-1,2,isBlack);
	bitBoard.addArea(1,2,isBlack);
}
function computeKyoMovable(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
}
function computeKakuMovable(targetBoard,isBlack){
	targetBoard.addStraightArea(1,1,isBlack);
	targetBoard.addStraightArea(-1,1,isBlack);
	targetBoard.addStraightArea(-1,-1,isBlack);
	targetBoard.addStraightArea(1,-1,isBlack);
}
function computeHishaMovable(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
	targetBoard.addStraightArea(1,0,isBlack);
	targetBoard.addStraightArea(0,-1,isBlack);
	targetBoard.addStraightArea(-1,0,isBlack);
}
function computeFuMovable(bitBoard,isBlack)
{
	bitBoard.addArea(0,1,isBlack);
}