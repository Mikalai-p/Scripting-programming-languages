function createMultipler(multiplier) {
    return function(z){
        return multiplier * z;
    };
}

const multi = createMultipler(10);
console.log(multi(10));
console.log(multi(100));
