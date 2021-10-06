## Linked List
### 35.Copy List with Random Pointer 
*(138, easy)* 
```js
// Hash table
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