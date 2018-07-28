BloodType = {

  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {

  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   *
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   *
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   *
   */

  receive_patient : function (blood_inventory, patient) {

    // give a random blood type to anyone
    // very bad idea!
    // console.log('inventory: ', blood_inventory);
    // console.log('patient: ', patient);
    let options;
    let giveBlood;

    switch(patient.blood_type) {
      case('O_POS'):
        options = ['O_POS', 'O_NEG'];
        giveBlood = bestMatch(options);
        break;
      case('A_NEG'):
        options = ['A_NEG', 'O_NEG']
        giveBlood = bestMatch(options);
        break;
      case('B_NEG'):
        options = ['B_NEG', 'O_NEG'];
        giveBlood = bestMatch(options);
        break;
      case('A_POS'):
        options = ['A_POS', 'A_NEG', 'O_POS', 'O_NEG'];
        giveBlood = bestMatch(options);
        break;
      case('B_POS'):
        options = ['B_POS', 'B_NEG', 'O_POS', 'O_NEG' ];
        giveBlood = bestMatch(options);
        break;
      case('AB_NEG'):
        options = ['AB_NEG', 'A_NEG', 'B_NEG', 'O_NEG'];
        giveBlood = bestMatch(options);
        break;
      case('AB_POS'):
        options = ['AB_POS', 'AB_NEG', 'A_POS', 'B_POS', 'A_NEG', 'B_NEG', 'O_POS', 'O_NEG'];
        giveBlood = bestMatch(options);
        break;
      default:
        giveBlood = 'O_NEG';
    }

    function bestMatch(options) {
      let matchFound = false;
      for (let i = 0; i < options.length; i++) {
        if(blood_inventory[options[i]] > 0) {
          matchFound = true;
          return options[i];
        }        
      }

      if(!matchFound) {
        return false;
      }
    }

    // console.log('Give Blood: ', giveBlood);
    return giveBlood;
    /*
    return [
      BloodType.AB_POS,
      BloodType.AB_NEG,
      BloodType.A_POS,
      BloodType.A_NEG
    ][Math.floor(Math.random()*4)];
    */

  }

};
