$(function(){

// 盤面のブラウザ上での操作を扱うクラス

$(".piece_area").droppable({
	drop: function(){
			dropPiece(null,null)
			}
	});
$(".piece").draggable();


// 駒をクリックしたときの処理
function clickPiece(clickedPiece)
{

}

// 駒をドロップした時の処理
function dropPiece(draggingPiece, droppedArea)
{
	debug("ドロップされました");
}

});