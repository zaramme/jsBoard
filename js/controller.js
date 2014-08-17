
// メインスクリプト /////////////////////////////////////////////

$(function(){

apiInitBoard(setClickablePieces);

});

// 選択可能な駒のセット


function setClickablePieces(){
	debug("移動可能な駒をセットしています");
	var all = new bitBoard();
	$(".draggable").draggable('destroy');
	$(".draggable").removeClass("draggable");
	all.eachdo(function(pos,value)
		{
			var CurrentPiece = getPieceObject(pos);
			if(CurrentPiece.length != 0 && CurrentPiece.hasClass(isBlackTurn?"black":"white")){
				addDraggable(CurrentPiece,pos);
			}
		}
	);
	// 駒台
	CapturedPieces = getCapturedPieces(isBlackTurn);
	addDraggable(CapturedPieces);


}

function addDraggable(obj, pos){
	obj.addClass("draggable");
	obj.draggable({
				stack:".piece",
				revert: true,
				containment: "document",
				start: function(){clickPiece(pos);},
				stop: function(){endClickPiece(pos);}
				});
}

// 駒をクリックしたときの処理
function clickPiece(pos)
{
	var clickedArea =  getAreaObject(pos);
//	clickedArea.addClass("selected");

	var clickedPiece = getPieceObject(pos);

	var target = new bitBoard();
	target = computeMovable(pos);

	target.eachdo(function(pos,value){
		var CurrentArea = getAreaObject(pos);
		if(value === 1){
			CurrentArea.addClass("movable");
			CurrentArea.droppable({
				accept: ".piece",
				over: function(){ CurrentArea.addClass("dropin");},
				out:  function(){ CurrentArea.removeClass("dropin");},
				drop: function(e,ui){
						movePiece(pos, e, ui);
						setClickablePieces();

					}
			});
		}
	});
}

function endClickPiece(pos){
	// selectecをクリア
	clickedArea =  getAreaObject(pos);
	clickedArea.removeClass("selected");
	$(".dropin").removeClass("dropin");
	$(".movable").droppable("destroy");
	$(".movable").removeClass("movable");
}

function getDroppableArea(){

}

	// 	/* 駒座標の取得 */
	// 	bitBoardMovable = ;　(movavle)移動可能場所の取得()

	// 	changeMovable(bitBoardMovable);

	// 	changeSelectable();

	// }


// 駒をドロップした時の処理
function dropPiece(draggingPiece, droppedArea)
{
	// if(/*ドロップ地点がMovableかどうか*/){
	// 	xyPosFrom = getxyPosSelected();
	// 	movePiece()


	// 	/* ajax通信*/

	// }
}

