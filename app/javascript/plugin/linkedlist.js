class Node {
  constructor(data, next = null, previous = null) {
    this.data = data;
    this.next = next;
    this.previous = previous;
  }
}

export class LinkedList {
  // leftMost = new Node();
  leftMost = null;
  rightMost = null;
  // rightMost = new Node();

  addElement(value) {
    let current = new Node(value, null, this.rightMost);
    if (this.leftMost == null) {
      this.leftMost = current;
      this.rightMost = current;
      return;
    }
    if (this.rightMost.next == null){
    this.rightMost.next = current;
    this.rightMost = current;
    }
    else {
      current.next = this.rightMost.next;
      current.previous = this.rightMost;
      this.rightMost.next.previous = current;
      this.rightMost.next = current;
    }
  }

  addElementStart(value){
    let current = new Node(value, this.leftMost, this.leftMost.previous);
    this.leftMost.previous = current;
    this.leftMost = current;
  }

  addElementLHold(value){
    let current = new Node(value, this.rightMost, this.rightMost.previous); 
    this.rightMost.previous.next = current;
    this.rightMost.previous = current;

  }
  printPrevious() {
    let temp = this.rightMost;
    while (temp != null) {
      console.log(temp.data);
      temp = temp.previous;
    }
  }

  printListValues() {
    let temp = this.leftMost;
    while (temp != null) {
      console.log(temp.data);
      temp = temp.next;
    }
  }
}

// let a = new LinkedList;
// a.addElement(1);
// a.addElement(2);
// a.addElement(3);
// a.addElement(4);
// // console.log(a);
// a.printListValues();
