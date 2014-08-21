// 駒の移動可能な座標を計算してビットボードを返すメソッド群
$(function(){
debug("bitBoard.jsを読み込みました");

});

function computeMovable(pos,obj){
	var methods = new movableMethods();

	var clickedPiece = obj;
	var isBlack = isPieceBlack(pos);
	var kindOfPiece = getPieceName(clickedPiece);

	var isPromoted = clickedPiece.hasClass("promoted");
	var isBlack = clickedPiece.hasClass("black");
	var movableBoard = new bitBoard();
	movableBoard.setPointer(pos);

	var triCurrentPieces = new triBoard();
	triCurrentPieces.getCurrentPieces(isBlack);

	if(pos == 0){
		movableBoard.allArea();
		CurrentBoard = new bitBoard();
		CurrentBoard.getCurrentPieces()
		movableBoard.minus(CurrentBoard); // 駒の無い場所を取得

		switch(kindOfPiece){
			case "FU":
				methods.computeFuDroppable(movableBoard,isBlack); break;
			case "KYO":
				methods.computeKyoDroppable(movableBoard,isBlack); break;
			case "KEI":
				methods.computeKeiDroppable(movableBoard,isBlack); break;
		}
	}
	else if(!isPromoted){
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
	// 移動先ビットボードから自分の駒がいる座標を消去(駒の利き計算時はキャンセル)
	if(!isComputing)
	{
	movableBoard.eachdo(function(pos,value){
		if(triCurrentPieces.board[pos] === 1)
			movableBoard.board[pos] = 0;
	});	
	}
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

	// 相手の駒の利きには動けない
	// この処理はループ時にキャンセルする
	if(isComputing)
		return;
	var enemyPowerBoard = new bitBoard();
	enemyPowerBoard = computeEnemyPower();
	targetBoard.minus(enemyPowerBoard);

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

movableMethods.prototype.computeFuDroppable = function(targetBoard,isBlack){

	columnsBoard = new bitBoard();

	// 二歩の処理
	for(var i = 11; i < 100; i++)
	{
		var current = getPieceObject(i);
		if(current.length == 0)
			continue;

		// 自駒の歩を探索
		if(getPieceName(current) == "FU" && isBlackTurn == isPieceBlack(i))
		{
			// 自駒の歩のある列を追加
			columnsBoard.addColumnArea(Math.floor(i/10));
		}
	}

	// 先手の場合は一段目、

	rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9)

	//ビッドボードの差を取る
	targetBoard.minus(columnsBoard);
	targetBoard.minus(rowsBoard);
}

movableMethods.prototype.computeKeiDroppable = function(targetBoard,isBlack){
	rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9);
	rowsBoard.addRowArea(isBlackTurn ? 2 : 8)
	targetBoard.minus(rowsBoard);
}

movableMethods.prototype.computeKyoDroppable = function(targetBoard,isBlack){
	rowsBoard = new bitBoard();
	rowsBoard.addRowArea(isBlackTurn ? 1 : 9);
	targetBoard.minus(rowsBoard);
}


// 敵駒の利きを計算する
function computeEnemyPower(){
	isComputing = true; // 実行中フラグをたてる
	var targetBoard = new bitBoard();
	targetBoard.getEnemyPieces();

	debug("enemy board is ...");
	targetBoard.output();

	var resultBoard = new bitBoard();
	 targetBoard.eachdo(function(pos,value){
	 	if(value == 1){
	 		var CurrentBoard = new computeMovable(pos, getPieceObject(pos));
	 		resultBoard = resultBoard.marge(CurrentBoard);
	 	}
	 });

	isComputing = false;
	return resultBoard;
}
