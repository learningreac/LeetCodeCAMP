# Binary Tree
## Inorder Traversal
### recursion DFS
```js
const inorderTraversal = function(root) {
			let res = [];

			const dfs = function(node){
				if(!node) return ;
				dfs(node.left);
				res.push(node.val);
				dfs(node.right);
			}

			dfs(root);
			return res;

		};
```

### BFS
```js
const inorderTraversal = function(root) {
    let res = [], stack = [], cur = root;
        while(stack.length >0 || cur) {
            while(cur) {
                stack.push(cur);
                cur = cur.left;
            }
            let node = stack.pop()
            res.push(node.val);
            cur = node.right;
        }
    return res;
}
```

## Preorder Traversal
### DFS
```js
const preorderTraversal = function(root) {
    let res = [];

    function dfs(root) {
        if(root === null) return;
        res.push(root.val);
        dfs(root.left);
        dfs(root.right);
    };

    dfs(root);

    return res;

};
```

### BFS
```js
const preorderTraversal = function(root) {
    let stack = [], res = [];
    if(root) stack.push(root);
    while(stack.length >0){
        let node = stack.pop();
        if(node) res.push(node.val);
        if(node.right) {
            stack.push(node.right);
        };
        if(node.left) {
            stack.push(node.left);
        };
    }
    return res;	
};
```
```js
const preorderTraversal = function(root) {
    let stack = [], res = [], cur = root;
    while(stack.length>0 || cur){
        while(cur){
            res.push(cur.val);
            stack.push(cur);
            cur = cur.left;
        }
        let tmp = stack.pop();
        cur = tmp.right;
    }
    return res;
}
```

## Postorder Traversal
### DFS
```js
const postorderTraversal = function(root) {
    let res = [];

    const dfs = function(node){
        if(node === null) return;

        dfs(node.left);
        dfs(node.right);
        res.push(node.val);
    }

    dfs(root);

    return res;
};
```
### BFS
```js
const postorderTraversal = function(root) {
    let res = [], stack = [], cur = root;

    while(stack.length >0 || cur) {
        while(cur){
            res = [cur.val, ...res];
            stack.push(cur);
            cur = cur.right;
        }
        
        let node = stack.pop()
        cur = node.left;
}
```
```js
const postorderTraversal = function(root) {
    let stack = [], res = [];
    if(root) stack.push(root);

    while(stack.length >0){
        let node = stack.pop();
        if(node) res.unshift(node.val);
        
        if(node.left) {
            stack.push(node.left);
        };
        if(node.right) {
            stack.push(node.right);
        };
    }

    return res;
}
```

# Linked List
## 35.Copy List with Random Pointer 
*(138, easy)* 
```js
// Hash table to store node
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

```

## heap
## 41. Find Median from Data Stream
1. Array.sort()

*push new items to the end of array, sort everytime when need caculate the median.*

```js
var MedianFinder = function() {
			this.heapA = []; // store the bigger part
            this.heapB = []; // for the small part
};

MedianFinder.prototype.addNum = function(num) {
    if(this.heapA.length !== this.heapB.length) {
        this.heapA.push(num);
        this.heapB.push(this.heapA.pop());
    } else {
        this.heapB.push(num);
        this.heapA.push(this.heapB.pop());
    }
};

MedianFinder.prototype.findMedian = function() {

}
```

