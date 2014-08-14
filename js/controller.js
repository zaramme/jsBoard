$(function(){

// 盤面のブラウザ上での操作を扱うクラス

// 駒の属性の宣言
$(".piece").draggable({
	click: function(){
			pos = ; /* クリック地点の座標を取得 */
			pos = ; /* クリックされた駒を取得*/
			clickPiece();
			}

$(".piece_area").droppable({
	drop: function(){
			dropPiece(null,null)
			}
	});


// 駒をクリックしたときの処理
function clickPiece(clickedPiece)
{
	if (/*選択可能な駒かどうか*/){
		
		/* 駒座標の取得 */
		bitBoardMovable = ;　/*(movavle)移動可能場所の取得() */

		changeMovable(bitBoardMovable);
		
		changeSelectable();

	}
}

// 駒をドロップした時の処理
function dropPiece(draggingPiece, droppedArea)
{
	if(/*ドロップ地点がMovableかどうか*/){
		xyPosFrom = getxyPosSelected();
		movePiece()


		/* ajax通信*/

	}
}

});