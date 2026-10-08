    // Task 1 
    let arr=[1,[1,2,[3,4]],[2,4]]
    function flattenArray(InputArray){
    return InputArray.reduce((Acc,Curr)=>{
    if(Array.isArray(Curr)){
      return Acc.concat(flattenArray(Curr));
    }
    else{
      return Acc.concat([Curr]);
    }
    },[]);
    }
  const result41 = flattenArray(arr);
  console.log(result41);
    // Task 2
    let arr1 = [[1,2], [3,4]];
    let arr2 = [[5,6], [7,8]];
    var result1 = arr1.flat(Infinity).reduce(function(sum, current) {
        return sum + current;
      }, 0);
    var result2 = arr2.flat(Infinity).reduce(function(sum, current) {
        return sum + current;
    }, 0);
    let arr3=[1,2,3,4];
    var res33 =arr3.reduce(function(sum,curr){
        return sum + curr;
    },0);
    console.log(res33)
    console.log(result1+result2)
    // Task 3
    function filterStudents(students) {
    const result = {};
    
    for (let student of students) {
        if (student.age > 17) {
            const groupId = student.groupId;
            if (!result[groupId]) {
                result[groupId] = [];
            }
            result[groupId].push(student);
        }
    }
    
    return result;
}
    const students = [
    { name: 'Ivan', age: 18, groupId: 1 },
    { name: 'Peter', age: 17, groupId: 1 },
    { name: 'Masha', age: 19, groupId: 2 },
    { name: 'Anna', age: 20, groupId: 1 }
];

console.log(filterStudents(students));

    // Task 4 
    function calculateDifference(str) {
    let total1 = '';
    let total2 = '';
    
    for (let char of str) {
        const code = char.charCodeAt(0);
        total1 += code;
        total2 += String(code).replace(/7/g, '1');
    }
    
    return Number(total1) - Number(total2);
}
    let str = 'ABC';
        let result = calculateDifference(str);
        console.log(result);
    // Task 5
    function extend(...objs) {
    return Object.assign({}, ...objs);
    }
        let obj1 = {a: 1,c:3}; 
        let obj2 = {b: 2};
        let extended = extend(obj1, obj2);
        console.log(extended);
    // Task 6 
    function buildTower(floors) {
    const tower = [];
    for (let i = 0; i < floors; i++) {
        const spaces = ' '.repeat(floors - i - 1);
        const stars = '*'.repeat(2 * i + 1);
        tower.push(spaces + stars + spaces);
    }
    return tower;
}
    let pyramid = buildTower(5);
        console.log(pyramid);