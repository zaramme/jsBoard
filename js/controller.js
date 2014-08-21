
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
	var clickedArea =  getAreaObject(pos);
//	clickedArea.addClass("selected");

	var clickedPiece = obj;

	var target = new bitBoard();
	target = computeMovable(pos,obj);

	target.eachdo(function(pos,value){
		var CurrentArea = getAreaObject(pos);
		if(value === 1){
			CurrentArea.addClass("movable");
			CurrentArea.droppable({
				accept: ".piece",
				over: function(){ CurrentArea.addClass("dropin");},
				out:  function(){ CurrentArea.removeClass("dropin");},
				drop: function(e,ui){
						moveDraggablePiece(pos, e, ui,true);
						setClickablePieces();
					}
			});
		}
	});
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
