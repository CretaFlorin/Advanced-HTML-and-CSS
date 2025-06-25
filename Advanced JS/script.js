// let a = 4;

// function f() {
    
//     console.log(a);
    
//     let a = 5;
// }

// f()


// function foo() {
//     console.log(bar);

//     if (true) {
//         function bar() {}
//     }
// }

// foo();


// function counter() {
//     let cnt = 0;

//     function next() {
//         cnt++;
//         console.log(cnt)
//     }

//     return next;
// }

// const next = counter();

// next()
// next()
// next()

// console.log(c)




// var a = 10;

// (function() {
//     console.log(a);
//     var a = 20;
// })();

const obj = {
    a: "JS",

    regular: function() {
        console.log(this.a);
    },

    arrow: () => {
        console.log(this.a);
    }
};

obj.regular();
obj.arrow();
