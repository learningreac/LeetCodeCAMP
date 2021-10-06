// 30: min stack
// helper stack,push min(currentmin, x); pop everytime.

const MinStack = function () { // can't be defind with arrow function 
    this.stack = [];
    this.stackB = [];
    this.tmp = [];
};

MinStack.prototype.push = x => {
    this.stack.push(x);
    if (x <= this.stackB[this.stackB.length - 1] || this.stackB.length === 0) {
        this.stackB.push(x);
    } else {
        while (this.stackB.length >= 0) {
            this.tmp.push(this.stackB.pop());
        };
        this.stackB.push(x);
        while (this.tmp.length >= 0) {
            this.stackB.push(this.tmp.pop())
        }
    }
};

MinStack.prototype.pop = () => {
    let item = this.stackA[this.stack.length - 1];
    if (item === this.stackB[this.stackB[this.stackB.length - 1]]) {
        this.stackB.pop()
    };
    return this.stack.pop();

};

MinStack.prototype.top = () => {
    return this.stack[this.stack.length - 1];
}

MinStack.prototype.min = () => {
    return this.stackB[this.stackB.length - 1];

};

//从尾到头打印链表 -- 回溯递归
//内存消耗：40.4 MB , 在所有 JavaScript 提交中击败了10.58%的用户 ----栈桢空间
const reversePrint = function (head) {
    let res = [];
    const backpath = node => {
        if (!node) return;
        backpath(node.next);
        res.push(node.val)
    };
    backpath(head);
    return res;
};

//反转链表   ---递归
const reverseList = function (head) {

    const recur = (cur, pre) => {
        if (cur === null) return pre;
        res = recur(cur.next, cur);
        cur.next = pre;
        return res;
    }

    return recur(head, null)
}

    // coppy random list 

    * // Definition for a Node.
    function Node(val, next, random) {
        this.val = val;
        this.next = next;
        this.random = random;
    };
// the random node may not be created 

const copyRandomList = function (head) {
    if (!head) return null;
    let node = head;
    let map = new Map();

    while (node) {  // copy no
        map.set(node, new Node(node.val));
        node = node.next;
    };

    // reset node
    node = head;
    while (node) {  // reset node.next and node.random
        map.get(node).next = map.get(node.next)===undefined? null:map.get(node.next);
        map.get(node).random = map.get(node.random);
        node = node.next;
    };

    return map.get(head);

}