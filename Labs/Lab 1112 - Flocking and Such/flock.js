//flock class: makes different flocks

//++++++++++++++++++++++++++++++++ constructor ++++++++++++++++++++++++++++++++++++
function FlockClass(size){
  this.flock = [];
  for(let i = 0; i < size; i++){
    this.flock[i] = new BirdClass()
  }
}

//++++++++++++++++++++++++++++++++ animation functions ++++++++++++++++++++++++++++
