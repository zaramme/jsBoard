/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////


$(function(){

	IsBoardInit = false;

	debug("api.jsを読み込みました");

	});

function apiStub(){$(function(){
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
				setPiece(posID,imgID,isBlack);
			}

			debug("盤面読み込みが終了しました")
			IsBoardInit =true;
		}
	}
		)
});}








