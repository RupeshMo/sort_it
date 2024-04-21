import { gameSequenceSize}  from 'plugin/enginefunctions';
import { LinkedList } from 'plugin/linkedlist';

let a = new LinkedList;
a.addElement(1);
a.addElement(2);
a.addElement(3);

// a.addElement(4);
// a.addElementStart(5);
a.addElementStart(4);
a.addElementLHold(6);
// console.log(a.leftMost == undefined);

// a.rightMost = a.rightMost.previous;

console.log(a);
a.printListValues();

