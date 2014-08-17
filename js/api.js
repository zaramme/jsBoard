/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////
$(function(){
	debug("api.jsを読み込みました");
	});

function apiInitBoard(callback){
	apiStub(callback);
}

function apiStub(callback){$(function(){
	$.ajax({
		url: './json/init.json',
		dataType: 'json',
		success: function(data){
			debug("jsonを取得しました");
			// 手番の取得
			isBlackTurn = data.isBlackTurn;
			debug("現在の手番"+ isBlackTurn? "先手":"後手");
			// data.boardから駒データ一覧を読み込み
			for(objName in data.board)
			{
				// 駒データの取得
				obj = data.board[objName];
				posID = obj[0];
				kindOfPiece = obj[1];
				isBlack = obj[2];
				isPromoted = obj[3];
				// 駒を配置
				setPiece(posID,kindOfPiece,isBlack,isPromoted);
			}

			debug("盤面読み込みが終了しました")
			IsBoardInit =true;
		}
	}).then(function(){ callback("loaded");});
});}








