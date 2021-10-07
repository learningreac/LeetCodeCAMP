## Linked List
### 35.Copy List with Random Pointer 
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
### 41. Find Median from Data Stream
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

