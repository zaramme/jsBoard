// 全般で使用するユーティリティクラス

$(function(){

	debug("utility.jsを読み込みました");

	});

function debug(message)
{
	if(IsDebugMode){
		$("#debug").append(message + "<br>");
	}
}

function selectAreaID(posID){
	return "#pos_" + posID;
}

function getPieceObject(posID){
	return $(selectAreaID(posID)).children(".piece");
}