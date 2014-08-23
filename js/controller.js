
// メインスクリプト /////////////////////////////////////////////

$(function(){

apiInitBoard(setClickablePieces);

$("#button1").click(function(){moveAllPieceInDock()});

$("#button2").click(function(){apiInitBoard(setClickablePieces)});

$("#button3").click(function(){
	var targetBoard = new bitBoard();
	var targetBoard = computeEnemyPower();
	targetBoard.output();
	targetBoard.eachdo(function(pos,value){
		var CurrentArea = getAreaObject(pos);
		if(value === 1)
			CurrentArea.addClass("movable");
		});
})
});

// 選択可能な駒のセット

function moveTest(){
	var from = getPieceObject(91);
	var to = getAreaObject(55);
	from.prependTo(to);
}

function setClickablePieces(){
	$(".draggable").draggable('destroy');
	$(".draggable").removeClass("draggable");

	if(isReserving)
		return;

	if(isOhte){
		target = isBlackTurn ? $(".OH.black") : $(".OH.white");
		pos = getPosFromPiece(target);
		addDraggable(target,pos)
		return;
	}

	// 盤上の手番の駒すべてにDraggableを適用
	var all = new bitBoard();
	all.eachdo(function(pos,value)
		{
			var CurrentPiece = getPieceObject(pos);
			if(CurrentPiece.length != 0 && CurrentPiece.hasClass(isBlackTurn?"black":"white")){
				addDraggable(CurrentPiece,pos);
			}
		}
	);
	// 駒台の手番の駒すべてにDraggableを適用
	CapturedPieces = getCapturedPieces(isBlackTurn);
	CapturedPieces.each(function(){
		addDraggable($(this), 0);
	});
}

function addDraggable(obj, pos){
	if(pos=="captured"){
		debug("持ち駒のDraggableを設定しています");
	}
	obj.addClass("draggable");
	obj.draggable({
				stack:".piece",
				revert: true,
				containment: "document",
				start: function(){clickPiece(pos,obj);},
				stop: function(){endClickPiece(pos);}
				});
}

// 駒をクリックしたときの処理
function clickPiece(pos, obj)
{
	if(isReserving)
		return;

	var clickedArea =  getAreaObject(pos);

	// 駒の移動可能位置を取得
	var target = new bitBoard();
	target = computeMovable(pos,obj);

	// 移動可能位置に対してMovableを適用
	target.eachdoSelected(function(pos,value){
		addMovable(pos);
	});
}

function addMovable(toPos)
{
	var CurrentArea = getAreaObject(toPos);
	CurrentArea.addClass("movable");

	// droppableを適用
	CurrentArea.droppable({
		accept: ".piece",
		over: function(){ CurrentArea.addClass("dropin");},
		out:  function(){ CurrentArea.removeClass("dropin");},
		drop: function(e,ui){
			// ドロップ時の処理
			pieceToMove = ui.draggable;
			fromPos = getPosFromPiece(pieceToMove);
			res = wheatherPromotable(fromPos,toPos,pieceToMove);
			debug("res = " +res);
			switch(res)
			{
				case true:
					movePiece(toPos, pieceToMove, true);
					FinishMove();
					break;
				case "select":
					ShowReservedView(fromPos, toPos, pieceToMove);
					break;
				case false:
					movePiece(toPos, pieceToMove, false);
					FinishMove();
					break;
				case "error":
					debug("エラーが発生しました");
					break;
			}
		}
	});
}

function ShowReservedView(fromPos, toPos, pieceToMove)
{
	targetPos = getAreaObject(toPos);
	selectboxPositionTop = parseInt(targetPos.css("top")) -20;
	selectboxPositionLeft = parseInt(targetPos.css("left")) -10;

	$("#selectbox").css("top", selectboxPositionTop);
	$("#selectbox").css("left", selectboxPositionLeft);
	isReserving = true;
	setClickablePieces();
	movePiece("reserved", pieceToMove, false);
	$("#selectbox").css("visibility", "visible");

	$("#selectbox").children("#promotion").bind('click',function(){
		movePiece(toPos, pieceToMove, true);
		$("#selectbox").children(".button").unbind('click'); //Clickイベントを削除
		FinishMove();
	});
	$("#selectbox").children("#unpromotion").bind("click",function(){
		movePiece(toPos, pieceToMove, false);
		$("#selectbox").children(".button").unbind('click'); //Clickイベントを削除
		FinishMove();
		})

	// Reservedウィンドウを表示
}

function FinishMove()
{
	isReserving = false;
	isBlackTurn = !isBlackTurn;

//	isOhte = computeIsOhte();

	$("#selectbox").css("visibility", "hidden");
	setClickablePieces();

	if(isBlackTurn)
		debug("先手の手番です");
	else
		debug("後手の手番です");
	if(isOhte)
		debug("王手がかかっています");
}

function selectPromote(pos,e,ui){


}

function endClickPiece(pos){
	// selectecをクリア
	clickedArea =  getAreaObject(pos);
	clickedArea.removeClass("selected");
	$(".dropin").removeClass("dropin");
	$(".movable").droppable("destroy");
	$(".movable").removeClass("movable");
}
