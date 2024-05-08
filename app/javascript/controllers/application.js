import { Application } from "@hotwired/stimulus"
console.log('Application: loaded');
const application = Application.start()


// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
