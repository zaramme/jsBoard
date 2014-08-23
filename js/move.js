// 駒の移動を管理するメソッド群

$(function(){
	debug("move.jsを読み込みました");
});

//////////////////////////////////////////////////////
// publicメソッド(prefix:"move")

// 移動、持ち駒処理なども含めて駒を移動する(複合処理)
function movePiece(pos,PieceToMove,isPromoted){
	var methods = new moveMethods();

	// 必要なオブジェクトを取得
	var DraggingPiece = PieceToMove;
	var MoveToArea = getAreaObject(pos);
	var CapturePiece = MoveToArea.children(".piece");

	// 駒を取る場合の処理
	if(CapturePiece.length != 0)
	{
		CapturePiece.prependTo(isBlackTurn ? $("#pos_bc") : $("#pos_wc"));
		methods.appendPieceClasses(CapturePiece, isBlackTurn, false);
	}

	// 駒を成る場合の処理
	if(isPromoted){
		methods.appendPieceClasses(DraggingPiece,isBlackTurn, true);
	}

	// 共通処理
	DraggingPiece.prependTo(MoveToArea).css({top:'0',left:'0'});
	$(".lastmoved").removeClass("lastmoved");
	DraggingPiece.addClass("lastmoved");

	// 先後を入れ替える
}

function wheatherPromotable(fromPos, toPos, pieceToMove){
	debug("fromPos = " + fromPos);
	toPosY = toPos % 10
	fromPosY = fromPos % 10;
	pcPiece = new pieceConductor(pieceToMove);

	// 成れる位置かどうか
	isPromotableArea = isBlackTurn ? toPosY <= 3 : 7 <= toPosY;
	isFromPromotableArea = isBlackTurn ? fromPosY <= 3 : 7 <= fromPosY;

	// 持ち駒から打ったかどうか
	isFromCaptured = fromPos == "bc" || fromPos == "wc";

	// 一段目、二段目の位置かどうか
	isEdgeArea = isBlackTurn? toPosY == 1 : toPosY == 9;
	isSemiEdgeArea = isBlackTurn? toPosY <= 2 : 8 <= toPosY;

	if(isFromCaptured)
		return false;

	if(isPromotableArea)
	{
		// 成れる駒かどうか
		switch(pcPiece.kindOfPiece)
		{
			// 王と金は成れない
			case "OH": return false; break;
			case "KIN": return false; break;
			// 歩、桂、香は場所によって成り確定
			case "KEI":
				return isSemiEdgeArea ? true : "select"; break;
			case "KYO":
				return isEdgeArea ? true : "select"; break;
			case "FU":
				return isEdgeArea ? true : "select"; break;
			default:
				return "select"; break;
		}
	}
	else if(isFromPromotableArea)
		switch(pcPiece.kindOfPiece)
		{
			// 王と金は成れない
			case "OH": return false; break;
			case "KIN": return false; break;
			default:
				return "select";
	}
	return false;
}

// ドックから駒を配置する
function movePieceFromDock(posID, kindOfPiece, isBlack, isPromoted)
{
	var methods = new moveMethods();

	var targetArea = getAreaObject(posID);
	var nakedPiece = $("#pos_0>.piece:first");

	nakedPiece.prependTo(targetArea);
	methods.insertImage(posID, kindOfPiece,isBlack,isPromoted);

	nakedPiece.addClass(isBlack ? "black" : "white");
	nakedPiece.addClass(kindOfPiece);
	if(isPromoted)
		nakedPiece.addClass("promoted");
}

// 全ての駒をドックに戻す
function moveAllPieceInDock()
{
	var dock = getAreaObject(0);
	var currentPieces = new bitBoard();
	currentPieces.getCurrentPieces();

 	$(".lastmoved").removeClass("lastmoved");

	currentPieces.eachdo(function(pos,value){
		var currentPiece = getPieceObject(pos);
		currentPiece.prependTo(dock);
		currentPiece.empty();
		currentPiece.removeClass("white");
		currentPiece.removeClass("black");
		currentPiece.removeClass("promoted");
		currentPiece.removeClass("OH");
		currentPiece.removeClass("KIN");
		currentPiece.removeClass("GIN");
		currentPiece.removeClass("KEI");
		currentPiece.removeClass("KYO");
		currentPiece.removeClass("KAKU");
		currentPiece.removeClass("HISHA");
		currentPiece.removeClass("FU");
	})

	getCapturedPieces().each(function(){
		$(this).prependTo(dock);
		$(this).empty();
		$(this).removeClass("white");
		$(this).removeClass("black");
		$(this).removeClass("promoted");
		$(this).removeClass("OH");
		$(this).removeClass("KIN");
		$(this).removeClass("GIN");
		$(this).removeClass("KEI");
		$(this).removeClass("KYO");
		$(this).removeClass("KAKU");
		$(this).removeClass("HISHA");
		$(this).removeClass("FU");
	});
}

//////////////////////////////////////////////////////
// privateメソッド(moveMethodsクラスのクラス内メソッドとして実装)

function moveMethods(){}

// 状態クラスをすべて消去する
moveMethods.prototype.clearPieceClasses = function(pieceObj){
	if(pieceObj.hasClass("promoted"))
		pieceObj.removeClass("promoted");
	if(pieceObj.hasClass("white"))
		pieceObj.removeClass("white");
	if(pieceObj.hasClass("black"))
		pieceObj.removeClass("black");
}

// 駒の状態を変化させる
moveMethods.prototype.appendPieceClasses = function(pieceObj, isBlack, isPromoted){
	this.clearPieceClasses(pieceObj);
	if(isPromoted)
		pieceObj.addClass("promoted");

	if(isBlack)
		pieceObj.addClass("black");
	else
		pieceObj.addClass("white");

	this.appendImage(pieceObj, isBlack, isPromoted);
}
// 画像を挿入する
moveMethods.prototype.insertImage = function(posID, kindOfPiece, isReversed, isPromoted){
	PieceToPut = getPieceObject(posID);

	imgID = this.createImageID(kindOfPiece, isReversed, isPromoted);
	imgTag = "<img src=\"./images/koma/"
			+ imgID +".png\" />";
	PieceToPut.append(imgTag);
}

// 画像を変更する
moveMethods.prototype.appendImage = function(pieceObj, isBlack, isPromoted){
	kindOfPiece = getPieceName(pieceObj);
	imgID = this.createImageID(kindOfPiece,isBlack, isPromoted);
	pieceObj.children("img").attr("src","./images/koma/"+imgID+".png");
}

// 画像IDを生成する
moveMethods.prototype.createImageID = function (kindOfPiece,isReversed, isPromoted){
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
