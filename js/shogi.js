$(function(){

////////////////////////////////////////////////////////////////////
//全体設定//////////////////////////////////////////////////////////
IsDebugMode = true;

debug("デバッグ開始");

////////////////////////////////////////////////////////////////////
//メインスクリプト/////////////////////////////////////////////////

// json読み込み

$.ajax({
	url: './json/init.json',
	dataType: 'json',
	success: function(data){
		debug("jsonを取得しました");
		// 手番の取得
		isBlackTurn = data.isBlackTurn;

		// data.boardから駒データ一覧を読み込み
		for(objName in data.board)
		{
			// 駒データの取得
			obj = data.board[objName];
			posID = obj.pos;
			imgID = obj.img;
			isBlack = obj.IsBlack;

			// 駒を配置
			debug("駒を配置します(posID = " + posID + ")");
			setPiece(posID,imgID,isBlack);
		}
	}
});


function setPiece(posID,imgID,isBlack){
	$(selectAreaID(posID)).children(".piece").append(createImg(imgID));
}

function createImg(imgID){
	imgTag = "<img src=\"./images/koma/"
	    	+ imgID +".png\" />";
	return imgTag;
}

function selectAreaID(posID){
	return "#pos_" + posID;
}

function getSelectedPos()
{

}

function debug(message)
{
	if(IsDebugMode){
		$("#debug").append(message + "<br>");
	}

}

});