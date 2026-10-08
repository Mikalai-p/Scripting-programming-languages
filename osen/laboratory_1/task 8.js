const result = [];

for (let i = 1; i <= 10; i++) {
  
  if (i % 2 === 0) {
    
    result.push(i + 2);
  } else {
    
    result.push(i + 'мм');
  }
}


console.log(result); 
