import React, { Component } from 'react';

export default class Modal extends Component {

  startSelected = (e) => {
    let start = Number(e.target.value)
    let end = Number(document.getElementById("end").value)
    let newEnd = String(start + 1)
    if (end <= start) {
      document.getElementById("end").value = newEnd
    }
  }
  endSelected = (e) => {
    let end = Number(e.target.value)
    let start = Number(document.getElementById("start").value)
    let newStart = String(end - 1)
    if (start >= end) {
      document.getElementById("start").value = newStart
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    let date = this.props.date
    let role = document.getElementById("role").value
    let start = document.getElementById("start").value
    let end = document.getElementById("end").value
    let startTime = document.getElementById("start").options[document.getElementById("start").selectedIndex].text
    let endTime = document.getElementById("end").options[document.getElementById("end").selectedIndex].text
    this.props.addAvailability({ date, role, start, end, startTime, endTime })
    this.props.onClose()
  }
  
  render() {
    if (!this.props.open) {
      return null;
    }
    return <div>
      <div className="modal" id="modal">
        <button className="closeButton" onClick={this.props.onClose}>X</button>
        <h2 className="modalHeader">Add Availability</h2>
        <div className="modalContent">
          <form onSubmit={this.onSubmit}>
            <div>
              <label htmlFor="role">Role:</label>
              <select id="role">
                <option value="Doctor">Doctor</option>
                <option value="Assistant">Assistant</option>
                <option value="Hygienist">Hygienist</option>
              </select>
            </div>
            <div>
              <label htmlFor="start">Start Time:</label>
              <select onChange={this.startSelected} id="start">
                <option value="2">9:00</option>
                <option value="3">9:30</option>
                <option value="4">10:00</option>
                <option value="5">10:30</option>
                <option value="6">11:00</option>
                <option value="7">11:30</option>
                <option value="8">12:00</option>
                <option value="9">12:30</option>
                <option value="10">1:00</option>
                <option value="11">1:30</option>
                <option value="12">2:00</option>
                <option value="13">2:30</option>
                <option value="14">3:00</option>
                <option value="15">3:30</option>
                <option value="16">4:00</option>
                <option value="17">4:30</option>
              </select>
            </div>
            <div>
              <label htmlFor="end">End Time:</label>
              <select onChange={this.endSelected} id="end">
                <option value="3">9:30</option>
                <option value="4">10:00</option>
                <option value="5">10:30</option>
                <option value="6">11:00</option>
                <option value="7">11:30</option>
                <option value="8">12:00</option>
                <option value="9">12:30</option>
                <option value="10">1:00</option>
                <option value="11">1:30</option>
                <option value="12">2:00</option>
                <option value="13">2:30</option>
                <option value="14">3:00</option>
                <option value="15">3:30</option>
                <option value="16">4:00</option>
                <option value="17">4:30</option>
                <option value="18">5:00</option>
              </select>
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
      <div className="modal-overlay" id="modal-overlay" onClick={this.props.onClose}></div>
    </div>
  }
}