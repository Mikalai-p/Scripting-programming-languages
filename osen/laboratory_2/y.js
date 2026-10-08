let str="Hello";
let strng="";
for (let i=str.length; i>0  ; i--)
{
    if (str[i] >="a" && str[i] <= "z"){
        strng+=str[i];
    }
}
console.log(strng);