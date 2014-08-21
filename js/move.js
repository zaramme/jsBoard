// 駒の移動を管理するメソッド群

$(function(){
	debug("move.jsを読み込みました");
});

//////////////////////////////////////////////////////
// publicメソッド(prefix:"move")

// 移動、持ち駒処理なども含めて駒を移動する(複合処理)
function moveDraggablePiece(pos,e,ui,isPromoted){
	var methods = new moveMethods();
	var MoveToArea = getAreaObject(pos);
	var CapturePiece = MoveToArea.children();
	var parentId = ui.draggable.parent(".piece_area").attr("id");

	if(CapturePiece.length != 0)
	{
		// 駒を取る場合の処理
		methods.appendImage(CapturePiece,isBlackTurn,false);
		CapturePiece.prependTo(isBlackTurn ? $("#pos_bc") : $("#pos_wc"));
		CapturePiece.removeClass(isBlackTurn ? "white" : "black");
		CapturePiece.addClass(isBlackTurn ? "brack" : "white");
	}
	ui.draggable.prependTo(MoveToArea).css({top:'0',left:'0'});

	if(isPromoted){
		var isBlack = ui.draggable.hasClass('black');
		ui.draggable.addClass('promoted')
		methods.appendImage(ui.draggable, isBlack, true);
	}
	$(".lastmoved").removeClass("lastmoved");
	ui.draggable.addClass("lastmoved");
	isBlackTurn = !isBlackTurn;
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

moveMethods.prototype.insertImage = function(posID, kindOfPiece, isReversed, isPromoted){
	PieceToPut = getPieceObject(posID);

	imgID = this.createImageID(kindOfPiece, isReversed, isPromoted);
	imgTag = "<img src=\"./images/koma/"
			+ imgID +".png\" />";
	PieceToPut.append(imgTag);
}

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
