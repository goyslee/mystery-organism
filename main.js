// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}


const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum: number,
    dna: dnaArray,

    // 4. Add the .mutate() method:
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (newBase === this.dna[randIndex]) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },

    // 5. Add the .compareDNA() method:
    compareDNA(otherPAequor) {
      let commonCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          commonCount++;
        }
      }
      const percentage = (commonCount / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
      return percentage
    },

    // 6. Add the .willLikelySurvive() method:
    willLikelySurvive() {
      const cOrGCount = this.dna.filter(base => base === 'C' || base === 'G').length;
      return (cOrGCount / this.dna.length) * 100 >= 60;
    },
    complementStrand() {
      const complements = {
        'A': 'T',
        'T': 'A',
        'C': 'G',
        'G': 'C'
      };
      return this.dna.map(base => complements[base]);
}
  };
};

const survivingPAequor = [];
let id = 1;
while (survivingPAequor.length < 30) {
  let newPAequor = pAequorFactory(id, mockUpStrand());
  if (newPAequor.willLikelySurvive()) {
    survivingPAequor.push(newPAequor);
  }
  id++;
}



let maxSimilarity = 0;
let mostRelatedPair = [];
for (let i = 0; i < survivingPAequor.length - 1; i++) {
  for (let j = i + 1; j < survivingPAequor.length; j++) {
    let commonCount = 0;
    for (let k = 0; k < survivingPAequor[i].dna.length; k++) {
      if (survivingPAequor[i].dna[k] === survivingPAequor[j].dna[k]) {
        commonCount++;
      }
    }
    const percentage = (commonCount / survivingPAequor[i].dna.length) * 100;
    if (percentage > maxSimilarity) {
      maxSimilarity = percentage;
      mostRelatedPair = [survivingPAequor[i], survivingPAequor[j]];
    }
  }
}
console.log(`The most related pair is specimen #${mostRelatedPair[0].specimenNum} and specimen #${mostRelatedPair[1].specimenNum} with ${maxSimilarity.toFixed(2)}% DNA in common.`);






