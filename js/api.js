/////////////////////////////////////////
// API通信を制御するメソッド群
/////////////////////////////////////////
$(function(){
	debug("api.jsを読み込みました");
	});

function apiLoadBoard(callback,filename){
	var methods = new apiMethods();
	moveAllPieceInDock();
	debug("盤面の初期化が完了しました")

	var fileurl = './json/' + filename;

	$.ajax({
		url: fileurl,
		dataType: 'json',
		success: function(data){
					debug("jsonを取得しました");
					methods.constructBoardFrom(data);
		},
		error: function(){debug("jsonファイルの読み込みに失敗しました filename = ." + fileurl);}

	}).then(function(){ callback("loaded");});
}

function apiInitBoard(callback){
	var methods = new apiMethods();

	moveAllPieceInDock();
	$.ajax({
		url: './json/init.json',
		dataType: 'json',
		success: function(data){
			debug("jsonを取得しました");
			methods.constructBoardFrom(data);
			IsBoardInit =true;
		}
	}).then(function(){ callback("loaded");});
}

var apiMethods = function(){}

apiMethods.prototype.callApi = function(url){

}

apiMethods.prototype.constructBoardFrom = function(data){
		// 手番の取得
		isBlackTurn = data.isBlackTurn;
		debug("現在の手番" + isBlackTurn);
		// data.boardから駒データ一覧を読み込み
		for(objName in data.board)
		{
			// 駒データの取得
			var obj = data.board[objName];
			var posID = obj[0];
			var kindOfPiece = obj[1];
			var isBlack = obj[2];
			var isPromoted = obj[3];

			// 駒を配置
			movePieceFromDock(posID,kindOfPiece,isBlack,isPromoted);
		}

		sortCapturedArea();
		debug("盤面読み込みが終了しました")
		IsBoardInit =true;
}

