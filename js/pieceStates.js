// 駒の状態を一斉取得するクラス
$(function(){

debug("pieceStates.jsを読み込みました");

});


function pieceConductor(pos){
	// 駒の座標
	this.piece = this.getPieceObject(pos);

	this.area = this.getAreaObject(pos);

	// 駒の種類
	this.kindOfPiece = this.getPieceName(this.piece);
	// 先手の駒かどうか
	this.isBlack = this.piece.hasClass("black");
	// 成り駒かどうか
	this.isPromoted = this.piece.hasClass("promoted");
}

pieceConductor.prototype.getPieceObject = function(pos){
	return $(selectAreaID(posID)).children("piece");
}

pieceConductor.prototype.getAreaObject = function(pos){
	return $(selectAreaID(posID));	
}

pieceConductor.prototype.getPieceName = function(pieceObj){
	if(pieceObj.hasClass("OH"))
		return "OH";
	else if(pieceObj.hasClass("KIN"))
		return "KIN";
	else if(pieceObj.hasClass("GIN"))
		return "GIN";
	else if(pieceObj.hasClass("KEI"))
		return "KEI";
	else if(pieceObj.hasClass("KYO"))
		return "KYO";
	else if(pieceObj.hasClass("KAKU"))
		return "KAKU";
	else if(pieceObj.hasClass("HISHA"))
		return "HISHA";
	else if(pieceObj.hasClass("FU"))
		return "FU";
	else
		return false;

}