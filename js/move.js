// 駒の移動を管理するメソッド群

$(function(){
	debug("move.jsを読み込みました");
});

//////////////////////////////////////////////////////
// publicメソッド(prefix:"move")

// ゲーム上の「着手」として駒の移動処理を行う
function doMovePiece(pos,PieceToMove,isPromoted)
{
	var methods = new moveMethods();
	var fromPos = getPosFromPiece(PieceToMove);	// 移動前の座標を保持しておく
	var kindToMove = getPieceName(PieceToMove);
	var PieceToCapture = getPieceObject(pos);

	// 駒を移動する
	movePiece(pos, PieceToMove, isBlackTurn, isPromoted)

	if(PieceToCapture.length != 0)
	{
		pcToCapture = new pieceConductor(PieceToCapture);

		// 駒を取れる場合の処理
		CaptureTo = isBlackTurn? "bc":"wc";
		movePiece(CaptureTo,PieceToCapture, isBlackTurn, false);
	}

	// 着手後王手になっていないか(王手を外していないor敵ゴマの利きを通す)
	var isOhteNow = computeIsOhte();
	if(isOhteNow)
	{
		// 王手が継続している場合は着手を無効とする
		debug("王手がかかっています！");
		movePiece(fromPos,PieceToMove, isBlackTurn, isPromoted);// 移動前の座標に戻す
		if(PieceToCapture.length != 0)
			movePiece(pcToCapture.pos,PieceToCapture,pcToCapture.isBlackTurn,pcToCapture.isPromoted);
		return false; //着手失敗
	}

	// 駒を取る判定および処理

	if(isCaptured("fromPos"))
	{
		sortCapturedArea("fromPos");
	}
	debug("(doMovePiece)isPromoted = " + isPromoted);
	methods.FinishMove(fromPos,pos,kindToMove,isPromoted);
	return true; // 着手完了
}

// プログラム上の処理として駒を移動させる
function movePiece(toPos,PieceToMove,isBlack, isPromoted){
	var methods = new moveMethods();

	// 必要なオブジェクトを取得
	var fromPos = getPosFromPiece(PieceToMove);
	var MoveToArea = getAreaObject(toPos);
	var CapturePiece = MoveToArea.children(".piece");

	// 共通処理
	PieceToMove.prependTo(MoveToArea).css({top:'0',left:'0'});
	methods.appendPieceClasses(PieceToMove,isBlack, isPromoted);

	// 駒台を並べ替える
	if(isCaptured(toPos))
		methods.sortCapturedArea(toPos);
	if(isCaptured(fromPos))
		methods.sortCapturedArea(fromPos);
}

// 移動後成れるかどうかの判定
function wheatherPromotable(fromPos, toPos, pieceToMove){
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

	if(pcPiece.isPromoted)
		return true;

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
	var nakedPiece = $("#pos_dock>.piece:first");
	nakedPiece.addClass(kindOfPiece);

	movePiece(posID, nakedPiece, isBlack, isPromoted);

}

// 全ての駒をドックに戻す
function moveAllPieceInDock()
{
	methods = new moveMethods();

	var dock = getAreaObject("dock");
	var currentPieces = new bitBoard();
	currentPieces.getCurrentPieces();

	// debug("クリアピース対象")
	// currentPieces.output();

	currentPieces.eachdoSelected(function(pos,value){
		var currentPiece = getPieceObject(pos);
		var target = getPieceObject(pos);
		movePiece("dock", target, false);
		methods.initPiece(target);
	})

 	$(".lastmoved").removeClass("lastmoved");

 	var capturedPieces = getCapturedPieces();
 	if(capturedPieces.length != 0)
 	{
		capturedPieces.each(function(){
			movePiece("dock", $(this), false);
			methods.initPiece($(this));
		});
	}
}

//////////////////////////////////////////////////////
// privateメソッド(moveMethodsクラスのクラス内メソッドとして実装)

function moveMethods(){}

// 状態クラスをすべて消去する
moveMethods.prototype.clearPieceClasses = function(pieceObj){

	var funcRemove = function(strClass){
		if(pieceObj.hasClass(strClass))
			pieceObj.removeClass(strClass);
	}
	funcRemove("white");
	funcRemove("black");
	funcRemove("promoted");
}

moveMethods.prototype.initPiece = function(pieceObj){
	this.clearPieceClasses(pieceObj);
	eachKindOfPieceDo(true, function(strClass){
		if(pieceObj.hasClass(strClass))
			pieceObj.removeClass(strClass);
	});
}
// 駒の状態を変化させる
moveMethods.prototype.appendPieceClasses = function(pieceObj, isBlack, isPromoted){
	kindOfPiece = getPieceName(pieceObj);

	this.clearPieceClasses(pieceObj);
	if(isPromoted)
		pieceObj.addClass("promoted");
	if(isBlack)
		pieceObj.addClass("black");
	else
		pieceObj.addClass("white");
	this.appendImage(pieceObj, kindOfPiece, isBlack, isPromoted);
}

// 画像を変更する
moveMethods.prototype.appendImage = function(pieceObj, kindOfPiece, isBlack, isPromoted){
	imgID = this.createImageID(kindOfPiece,isBlack, isPromoted);
	pieceObj.children("img").attr("src","./images/koma/"+imgID+".png");
}

// 駒台のソード、複数枚数処理
moveMethods.prototype.sortCapturedArea = function(pos)
{
	debug("ソートします");
	capturedArea = $("#pos_" + pos);

	capturedArea.children('.piece').removeClass('forefront');
	capturedArea.children('.piece').removeClass('omitted');
	$(".test").remove();

	eachKindOfPieceDo(pos=="bc", function(kindOfPiece){
		var pieces = capturedArea.children("."+kindOfPiece);
		var isForefront = true;
		pieces.each(function()
		{
			if(isForefront)
			{
				debug("最初の駒です");
				$(this).addClass('forefront');
				isForefront = false;
				return;
			}
			debug("二番目以降の駒です");
			$(this).addClass("omitted");
		});
	});

	// 駒の並べ替え
	eachKindOfPieceDo(!(pos=="bc"), function(kindOfPiece){
		capturedArea.children("."+kindOfPiece+".forefront").prependTo(capturedArea);
	})

	// 駒数表示の追加
	eachKindOfPieceDo(true, function(kindOfPiece){
		pieces = capturedArea.children("."+kindOfPiece);
		forefront = capturedArea.children("."+kindOfPiece+".forefront");
		if(pieces.length > 1)
			forefront.after("<div class=\"test\"><b>×" +pieces.length +"</b></div>");
		else
			forefront.after("<div class=\"test\"></div>");			
	})
}

moveMethods.prototype.showTheNextStatusOfCapturedArea = function(whetherBlackOrWhite)
{

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

// 着手完了手続き
moveMethods.prototype.FinishMove = function(fromPos,toPos,kindOfPiece,isPromoted)
{
	isBlackTurn = !isBlackTurn;
	isOhte = computeIsOhte();

	$(".lastmoved").removeClass("lastmoved");
	var target = getAreaObject(toPos)
	target.addClass("lastmoved");

	$("#selectbox").css("visibility", "hidden");
	debug("isReserving = " + isReserving);

	moveCode = this.getMovecode(fromPos,toPos,kindOfPiece,isPromoted);

	debug("着手を完了しました。移動コード…"+moveCode);

	if(isBlackTurn)
		debug("先手の手番です");
	else
		debug("後手の手番です");
	if(isOhte)
		debug("王手がかかっています");
}

moveMethods.prototype.getMovecode = function(fromPos,toPos,kindOfPiece,isPromoted)
{
	debug("isPromoted= " + isPromoted);
	var movecode;
	movecode = toPos;
	movecode = movecode + kindOfPiece;
	if(isPromoted)
		movecode = movecode + "+";
	if(fromPos=="bc" || fromPos == "wc")
		fromPos = 0;
	movecode = movecode + "("+fromPos+")";
	return movecode;
}
