let specialState = [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,true,true,true,false,false,true,true,false,false,false,true,true,true,false,false,true,true,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,true,false,false,true,false,true,false,false,false,false,true,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,true,false,false,true,false,false,true,true,false,false,true,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,true,true,true,true,false,false,false,false,true,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,true,true,true,false,true,false,false,true,false,true,true,true,false,false,true,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,true,true,true,false,false,true,true,false,false,true,false,false,false,true,false,true,true,true,false,false,true,true,false,false,false,true,true,false,false,false],[false,true,false,false,false,false,true,false,false,true,false,true,true,false,true,true,false,false,true,false,false,true,false,false,false,false,true,false,false,true,false,false],[false,true,false,false,false,false,true,false,false,true,false,true,false,true,false,true,false,false,true,false,false,true,false,true,true,false,true,false,false,true,false,false],[false,true,false,false,false,false,true,false,false,true,false,true,false,false,false,true,false,false,true,false,false,true,false,false,true,false,true,false,false,true,false,false],[false,false,true,true,true,false,false,true,true,false,false,true,false,false,false,true,false,true,true,true,false,false,true,true,false,false,false,true,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,false,true,true,false,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,true,true,true,true,true,true,true,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,true,false,false,false,false,false,true,true,false,true,true,false,false,false,false,false],[false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,true,false,false,false,false,false,true,true,true,true,true,true,true,false,false,false,false],[false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]];

specialState = (specialState.map(element => {
  const el = element.map(bool => ({selected: bool}));
  return el;
}));

function checkSpecialState(singlePlayer, namePlayer1, namePlayer2) {
  const player1Names = ['albert', 'albertinin'];
  const player2Names = ['lais', 'laisinha', 'laís', 'grugui'];

  return (!singlePlayer &&
    ((player1Names.includes(namePlayer1.toLowerCase()) && player2Names.includes(namePlayer2.toLowerCase())) ||
    (player1Names.includes(namePlayer2.toLowerCase()) && player2Names.includes(namePlayer1.toLowerCase())))
  );
}


module.exports = {
  specialState,
  checkSpecialState,
}