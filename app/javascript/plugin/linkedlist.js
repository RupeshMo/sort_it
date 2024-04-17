class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  head = new Node();
  hold = new Node();

  addElement(value){
    let current = new Node(value);
    // console.log(current, 'current');
    // console.log(this.hold , 'hold');
    if (this.head.next == null){
      this.head.next = current;
      this.hold.next = current;
    }
    this.hold.next = current;
    this.hold = current;
  }



  printListValues(){
    let temp = this.head.next;
    while(temp != null){
      console.log(temp.data);
      temp = temp.next;
    }
  }
}
  
let a = new LinkedList;
a.addElement(1);
a.addElement(2);
a.addElement(3);
a.addElement(4);
// console.log(a);
a.printListValues();