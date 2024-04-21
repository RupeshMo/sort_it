class Node {
  constructor(data, next = null, previous = null) {
    this.data = data;
    this.next = next;
    this.previous = previous;
  }
}

export class LinkedList {
  leftMost = new Node();
  rightMost = new Node();

  addElement(value) {
    let current = new Node(value, null, this.rightMost);
    if (this.leftMost.next == null) {
      this.leftMost = current;
      this.rightMost = current;
    }
    this.rightMost.next = current;
    this.rightMost = current;
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
  PrintPrevious() {
    let temp = this.rightMost;
    while (temp.previous != null) {
      console.log(temp, ",", temp.data);
      temp = temp.previous;
    }
  }

  printListValues() {
    let temp = this.leftMost.next;
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
