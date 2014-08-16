
// メインスクリプト /////////////////////////////////////////////

$(function(){
debug("controller.jsを読み込みました");


apiInitBoard(setClickablePieces);

});

// 選択可能な駒のセット


function setClickablePieces(){
	debug("移動可能な駒をセットしています");
	var all = new bitBoard();
	all.eachdo(function(pos,value)
		{
			var CurrentPiece = getPieceObject(pos);
			if(CurrentPiece.hasClass("black")){
			CurrentPiece.draggable({
				stack:".piece",
				start: function(){ clickPiece(pos);}
				});
			}
		}
	);
}

// 駒をクリックしたときの処理
function clickPiece(pos)
{
	clickedArea =  getAreaObject(pos);
	clickedArea.addClass("selected");

	clickedPiece = getPieceObject(pos);
	var target = new bitBoard();
	// ここにbitboard設定 //
	target.getCurrentPieces();
	target.eachdo(function(pos,value){
		var CurrentArea = getAreaObject(pos);
		if(value === 0){
			CurrentArea.addClass("movable");
		}
	});

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

