// 駒の移動を管理するメソッド群


$(function(){

	debug("move.jsを読み込みました");

	});

function setPiece(posID,imgID,isBlack){
	PieceToPut = getPieceObject(posID);
	PieceToPut.append(createImg(imgID));
	PieceToPut.addClass(isBlack ? "black":"white");
}

function createImg(imgID){
	imgTag = "<img src=\"./images/koma/"
	    	+ imgID +".png\" />";
	return imgTag;
}

// 移動、持ち駒処理なども含めて駒を移動する(複合処理)
function movePiece(pos,e,ui){
	var MoveToArea = getAreaObject(pos);
	var CapturePiece = MoveToArea.children();
	var parentId = ui.draggable.parent(".piece_area").attr("id");

	if(CapturePiece.length != 0)
	{
		// 駒を取る場合の処理
		CapturePiece.prependTo(isBlackTurn ? $("#pos_bc") : $("#pos_wc"));
		CapturePiece.removeClass(isBlackTurn ? "white" : "black");
		CapturePiece.addClass(isBlackTurn ? "brack" : "white");
	}
	ui.draggable.prependTo(MoveToArea).css({top:'0',left:'0'});
	isBlackTurn = !isBlackTurn;

	// from地点から駒を消去
	// if(posIsOnPositon(xyPosFrom)){
	// 	removePiecePositon(xyPosFrom);

	// }
	// else{
	// 	removePieceCaptured(xyPosFrom,kindOfPiece);

	// }

	// // to地点に駒を配置
	// if(posIsOnPositon(xyPosTo)){
	// 	putPiecePosition(xyPosTo, kindOfPiece)
	// }
	// else{
	// 	putPieceCaptured(xyPosTo, kindOfPiece)
	// }
}


// 座標からそこに配置されたdiv.pieceを取得
function fetchPieceFromPositon(xyPos, kindOfPiece){

}


// 盤面に駒を配置する
function putPiecePosition(kindOfPiece, xyPos, isPromoted){

}

// 駒台に駒を配置する
function putPieceCaptured(toWhose){

}

// 盤面から駒を消去する
function removePiecePositon(xyPos){

}

// 駒台から駒を消去する
function removePieceCaptured(Whose,kindOfPiece){

}
