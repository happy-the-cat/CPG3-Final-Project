console.log("HELLO");

class userData{

  constructor(t){
    //I can't find a solution for overloading in js
    this.termCount = t;
    this.termSubjectCount = new Array();
    this.gpa = new Array();
    this.cgpa = new Array();
    this.scores = new Array();
    this.subjectsPerTerm = new Array();
  }


  getTermCount(){
    return this.termCount;
  }

  getTermSubjectCount(){
    return this.termCount;
  }

  getGpaArr(){
    return this.gpa;
  }

  getGpaArr(){
    return this.gpa;
  }
  //
  // //store subject count per term from cookiedata
  // storeTermSubjectCount(cookieData){
  //   //subject count cookie data is [#ofSubjT1,#ofSubjT2,#ofSubjT3, ...];
  //   cookieData = cookieData.trim();
  //
  //   cookieData = cookieData.substring(1, cookieData.length - 1).split(",");
  //
  //   for(let i = 0; i < this.termCount; i++){
  //     this.termSubjectCount[i] = parseFloat(cookieData[i].trim());
  //   }
  //
  //   return this.termCount;
  // }
  // //store scores from cookie data
  // storeScores(cookieData){
  //     //score cookie data is [[t1score1, t1score2, ..., #ofSubj1], [t2score1, t2score2, ..., #ofSubj2], etc]
  //     cookieData = cookieData.trim();
  //
  //     //score cookie data is now [t1score1, t1score2, ..., #ofSubj1], [t2score1, t2score2, ..., #ofSubj2], etc
  //     cookieData = cookieData.substring(1, cookieData.length - 1).split("],");
  //
  //     for(let i = 0; i < this.termCount; i++){
  //       //for the sake of readability
  //       cookieData[i] = cookieData[i].replace("[", "").replace("]", "");
  //       let cookieTermScore = cookieData[i].trim().split(",");
  //       this.scores[i] = cookieTermScore;
  //     }
  //     return this.scores;
  //   }
  //
  //
  // //store current number of terms
  // storeTermCount(count){
  //   this.termCount = count;
  //   return this.termCount;
  // }
  //
  //
  // //store gpa from cookiedata
  // storeGPA(cookieData){
  //   //gpa cookie data is [gpaT1, gpaT2, gpaT3, ...];
  //   cookieData = cookieData.trim();
  //   cookieData = cookieData.substring(1, cookieData.length - 1).split(",");
  //
  //   for(let i = 0; i < this.termCount; i++){
  //     this.gpa[i] = parseFloat(cookieData[i].trim());
  //   }
  //
  //   return this.gpa;
  // }
  //
  // //store cgpa from cookie data
  // storeCGPA(cookieData){
  //   //gpa cookie data is [cpga1, cgpa2, cgpa3, ...]
  //   cookieData = cookieData.trim();
  //   cookieData = cookieData.substring(1, cookieData.length - 1).split(",");
  //
  //   for(let i = 0; i < this.termCount; i++){
  //     this.cgpa[i] = parseFloat(cookieData[i].trim());
  //   }
  //
  //   return this.cgpa;
  // }
  //
  // //TODO: Test this function
  // //calculate cpga of based on term input
  // calculateCgpaFromGpa(termInput){
  //
  //   if(termInput > termCount){
  //     return NaN;
  //   }
  //
  //   let sum = 0;
  //
  //   for(let i = 0; i < termInput && termInput <= termCount; i++){
  //       sum += gpa/ termInput
  //   }
  //
  //   return sum;
  // }


}
