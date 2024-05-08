import { Controller } from "@hotwired/stimulus"
console.log('hellow: loaded');
export default class extends Controller {
  connect() {
    this.element.textContent = "Hello World!"
  }
}
