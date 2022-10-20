function word0 (strings) {
    let result = {};
    for (const string of strings) {
        result[string] = 0;
    }
    return result;
}


function doubling (nums) {
    let result = [];
    nums.forEach(function(item) {
        result.push(item);
    });
    return result;
}

function square (nums) {
    let result = [];
    nums.forEach(function(item) {
        result.push(item * item);
    });
    return result;
}

function addStar (strings) {
    let result = [];
    strings.forEach(function(item) {
        result.push(item + "*");
    });
    return result;
}

function copies3 (strings) {
    let result = [];
    strings.forEach(function(item) {
        result.push(item + item + item);
    });
    return result;
}

function wordLen(strings) {
    let result = {};
    strings.forEach(function(item) {
        result[item] = item.length;
    });
    return result;
}

function pairs(strings) {
    let result = {};
    strings.forEach(function(item) {
        result[item.substring(0, 1)] = item.substring(item.length - 1, item.length);
    });
    return result;
}

function moreY(strings) {
    let result = [];
    strings.forEach(function(item) {
        result.push(`y${item}y`);
    });
    return result;
}

function math1(nums) {
    let result = [];
    nums.forEach(function(item) {
        result.push((item + 1) * 10);
    });
    return result;
}

function wordCount(strings) {
    let result = {};
    strings.forEach(function(item) {
        result[item] == undefined ? result[item] = 1 : result[item]++;
    });
    return result;
}

function rightDigit(nums) {
    let result = [];
    nums.forEach(function(item) {
        result.push(item % 10);
    });
    return result;
}

// console.log(doubling([1,2,3]));
// console.log(word0(["a", "b", "a", "b"]));
// console.log(square([1,2,3]));
// console.log(copies3(["a","bb","ccc"]));
// console.log(wordLen(["a","bb","a","bb"]));
// console.log(pairs(["code","bug"]));
// console.log(moreY(["a","b","c"]));
// console.log(math1([1,2,3]));
// console.log(wordCount(["a", "b", "a", "c", "b"]));
// console.log(rightDigit([16, 8, 886, 8, 1]));