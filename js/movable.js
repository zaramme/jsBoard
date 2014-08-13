$(function(){

// 駒の移動可能な座標を計算してビットボードを返すメソッド群




// 初期盤面トライボードを返す
function makeInitialTriboard(){
	bitBoard = makeInitialBitBoard();

	bitBoard[91] = WHITE;	bitBoard[81] = WHITE;	bitBoard[71] = WHITE;
	bitBoard[61] = WHITE;	bitBoard[51] = WHITE;	bitBoard[41] = WHITE;
	bitBoard[31] = WHITE;	bitBoard[21] = WHITE;

	bitBoard[82] = WHITE;	bitBoard[22] = WHITE;

	bitBoard[93] = WHITE;	bitBoard[83] = WHITE;	bitBoard[73] = WHITE;
	bitBoard[63] = WHITE;	bitBoard[53] = WHITE;	bitBoard[43] = WHITE;
	bitBoard[33] = WHITE;	bitBoard[23] = WHITE;	bitBoard[13] = WHITE;

	bitBoard[99] = WHITE;	bitBoard[89] = WHITE;	bitBoard[79] = WHITE;
	bitBoard[69] = WHITE;	bitBoard[59] = WHITE;	bitBoard[49] = WHITE;
	bitBoard[39] = WHITE;	bitBoard[29] = WHITE;	bitBoard[19] = WHITE;

	bitBoard[88] = WHITE;	bitBoard[28] = WHITE;

	bitBoard[97] = WHITE;	bitBoard[87] = WHITE;	bitBoard[77] = WHITE;
	bitBoard[67] = WHITE;	bitBoard[57] = WHITE;	bitBoard[47] = WHITE;
	bitBoard[37] = WHITE;	bitBoard[27] = WHITE;	bitBoard[17] = WHITE;
}

// 駒が一枚も配置されていないビットボードを返す
function makeVoidTriboard()
{
	var bitBoard = array();
	for(i=11; i<100, i++)
	{
		$bitBoard[i] = NONE;
	}

	return $bitBoard;
}

function makeVoidBitboard()
{
	var bitBoard = array();
	for(i=11; i<100, i++)
	{
		$bitBoard[i] = false;
	}

	return $bitBoard;
}

