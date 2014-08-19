// 全般で使用するユーティリティクラス

IsDebugMode = true;


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

function getCapturedPieces(IsBlack){
	return $(IsBlack ? "#pos_bc" : "#pos_wc").children(".piece");
}

function getAreaObject(posID){
	return $(selectAreaID(posID))
}

function getPieceName(PieceObj){
	if(PieceObj.hasClass("OH"))
		return "OH";
	else if(PieceObj.hasClass("KIN"))
		return "KIN";
	else if(PieceObj.hasClass("GIN"))
		return "GIN";
	else if(PieceObj.hasClass("KEI"))
		return "KEI";
	else if(PieceObj.hasClass("KYO"))
		return "KYO";
	else if(PieceObj.hasClass("KAKU"))
		return "KAKU";
	else if(PieceObj.hasClass("HISHA"))
		return "HISHA";
	else if(PieceObj.hasClass("FU"))
		return "FU";
	else
		return false;
}

function isPieceBlack(pos){
	CurrentPiece = getPieceObject(pos);
	if(CurrentPiece.hasClass("black"))
	{
		return true;
	}
	else if(CurrentPiece.hasClass("white"))
	{
		return false;
	}

	return null;
}