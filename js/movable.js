// 駒の移動可能な座標を計算してビットボードを返すメソッド群
$(function(){
debug("bitBoard.jsを読み込みました");

});

function computeMovable(pos){
	var methods = new movableMethods();
	var clickedPiece = getPieceObject(pos);
	var kindOfPiece = getPieceName(clickedPiece);
	var isPromoted = clickedPiece.hasClass("promoted");
	var isBlack = clickedPiece.hasClass("black");
	var movableBoard = new bitBoard();
	movableBoard.setPointer(pos);

	var triCurrentPieces = new triBoard();
	triCurrentPieces.getCurrentPieces(isBlackTurn);

	if(!isPromoted){
		switch(kindOfPiece){
			case "FU":
				methods.computeFuMovable(movableBoard,isBlack); break;
			case "OH":
				methods.computeOhMovable(movableBoard,isBlack); break;
			case "KIN":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "GIN":
				methods.computeGinMovable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKeiMovable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKyoMovable(movableBoard,isBlack); break;
			case "KAKU":
				methods.computeKakuMovable(movableBoard,isBlack); break;
			case "HISHA":
				methods.computeHishaMovable(movableBoard,isBlack); break;
			default:
				debug("この駒はまだ設定されていません");
				movableBoard.eachdo(function(pos,value){
				movableBoard.board[pos] = triCurrentPieces.board[pos] === 1 ? 0 : 1;
				});
				break;
		}
	}
	else{
		switch(kindOfPiece){
			case "FU":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "GIN":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKinMovable(movableBoard,isBlack); break;
			case "KAKU":
				methods.computeRyumaMovable(movableBoard,isBlack); break;
			case "HISHA":
				methods.computeRyuohMovable(movableBoard,isBlack); break;
			default:
				debug("この駒はまだ設定されていません");
				movableBoard.eachdo(function(pos,value){
				movableBoard.board[pos] = triCurrentPieces.board[pos] === 1 ? 0 : 1;
				});
				break;
		}

	}
	// 移動先ビットボードから自分の駒がいる座標を消去
	movableBoard.eachdo(function(pos,value){
		if(triCurrentPieces.board[pos] === 1)
			movableBoard.board[pos] = 0;
	});
	movableBoard.output();
	return movableBoard;
}

function movableMethods(){}

movableMethods.prototype.computeOhMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(0,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);
}

movableMethods.prototype.computeKinMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(0,-1,isBlack);
}

movableMethods.prototype.computeGinMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);
}
movableMethods.prototype.computeKeiMovable = function(targetBoard,isBlack){
	targetBoard.addArea(-1,2,isBlack);
	targetBoard.addArea(1,2,isBlack);
}
movableMethods.prototype.computeKyoMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
}
movableMethods.prototype.computeKakuMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(1,1,isBlack);
	targetBoard.addStraightArea(-1,1,isBlack);
	targetBoard.addStraightArea(-1,-1,isBlack);
	targetBoard.addStraightArea(1,-1,isBlack);
}
movableMethods.prototype.computeHishaMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
	targetBoard.addStraightArea(1,0,isBlack);
	targetBoard.addStraightArea(0,-1,isBlack);
	targetBoard.addStraightArea(-1,0,isBlack);
}
movableMethods.prototype.computeFuMovable = function(targetBoard,isBlack)
{
	targetBoard.addArea(0,1,isBlack);
}

movableMethods.prototype.computeRyumaMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(1,1,isBlack);
	targetBoard.addStraightArea(-1,1,isBlack);
	targetBoard.addStraightArea(-1,-1,isBlack);
	targetBoard.addStraightArea(1,-1,isBlack);
	targetBoard.addArea(0,1,isBlack);
	targetBoard.addArea(-1,0,isBlack);
	targetBoard.addArea(1,0,isBlack);
	targetBoard.addArea(0,-1,isBlack);
}
movableMethods.prototype.computeRyuohMovable = function(targetBoard,isBlack){
	targetBoard.addStraightArea(0,1,isBlack);
	targetBoard.addStraightArea(1,0,isBlack);
	targetBoard.addStraightArea(0,-1,isBlack);
	targetBoard.addStraightArea(-1,0,isBlack);
	targetBoard.addArea(-1,1,isBlack);
	targetBoard.addArea(1,1,isBlack);
	targetBoard.addArea(-1,-1,isBlack);
	targetBoard.addArea(1,-1,isBlack);
}

// 敵駒の利きを計算する
function computeEnemyPower(){
	var targetBoard = new bitBoard();
	targetBoard.getEnemyPieces();

	var resultBoard = new bitBoard();
	targetBoard.eachdo(function(pos,value){
		if(value == 1){
			var CurrentBoard = new computeMovable(pos);
			resultBoard = resultBoard.marge(CurrentBoard);
		}
	});

	return resultBoard;
}
