
IsDebugMode = true;

IsBoardInit = false;

// メインスクリプト /////////////////////////////////////////////

$(function(){
debug("controller.jsを読み込みました");

// 初期盤面の読み込み
apiStub();

setClickablePiece();


// クリック時の操作
// ドラッグ時の操作
$(".piece_area").droppable({
	drop: function(){
			}
	});

});

// 選択可能な駒のセット
function setClickablePiece(){
	debug("移動可能な駒をセットしています");
	for(var i = 11; i<100; i++){
		var CurrentPiece = getPieceObject();
		debug("確認中…");

		CurrentPiece.draggable({
			stack:".piece",
			start: function(){ $(".piece_area").addClass("selected"); }
		});
		}
	}

// 駒をクリックしたときの処理
function clickPiece(clickedPiece)
{
	// if (/*選択可能な駒かどうか*/){

	// 	/* 駒座標の取得 */
	// 	bitBoardMovable = ;　(movavle)移動可能場所の取得()

	// 	changeMovable(bitBoardMovable);

	// 	changeSelectable();

	// }
}

// 駒をドロップした時の処理
function dropPiece(draggingPiece, droppedArea)
{
	// if(/*ドロップ地点がMovableかどうか*/){
	// 	xyPosFrom = getxyPosSelected();
	// 	movePiece()


	// 	/* ajax通信*/

	// }
}

