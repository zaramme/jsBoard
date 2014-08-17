// 駒の移動を管理するメソッド群

$(function(){

	debug("move.jsを読み込みました");

	});

function setPiece(posID,kindOfPiece,isBlack,isPromoted){
	PieceToPut = getPieceObject(posID);
	HasImgTug = PieceToPut.children("img").length;

	if(HasImgTug !== 0)
		PieceToPut.empty();
	insertImage(posID,kindOfPiece,isBlack,isPromoted);
	PieceToPut.addClass(isBlack ? "black" : "white");
	PieceToPut.addClass(kindOfPiece);
	if(isPromoted)
		PieceToPut.addClass("promoted");
}

function insertImage(posID, kindOfPiece, isReversed, isPromoted){
	PieceToPut = getPieceObject(posID);

	imgID = createImageID(kindOfPiece, isReversed, isPromoted);
	imgTag = "<img src=\"./images/koma/"
			+ imgID +".png\" />";
	PieceToPut.append(imgTag);
}

// 画像IDを生成する
function createImageID(kindOfPiece,isReversed, isPromoted){
	var imgID = new String();
	switch(kindOfPiece){
		case PieceImageCode.OH:
			imgID += PieceImageCode.OH; break;
		case PieceImageCode.KIN:
			imgID += PieceImageCode.KIN; break;
		case PieceImageCode.GIN:
			imgID += PieceImageCode.GIN; break;
		case PieceImageCode.KEI:
			imgID += PieceImageCode.KEI; break;
		case PieceImageCode.KYO:
			imgID += PieceImageCode.KYO; break;
		case PieceImageCode.KAKU:
			imgID += PieceImageCode.KAKU; break;
		case PieceImageCode.HISHA:
			imgID += PieceImageCode.HISHA; break;
		case PieceImageCode.FU:
			imgID += PieceImageCode.FU; break;
		}
	if(!isReversed){
		imgID += PieceImageCode.reverse;
	}
	if(isPromoted){
		imgID += PieceImageCode.promoted;
	}
	return imgID;
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
