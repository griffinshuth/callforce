import React, { Component } from "react";
import Modal from './Modal'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
class Schedule extends Component {
    state = {
        date: new Date(),
        availabilities: [],
        open: false,
        selectedRole: "",
        selectedTimes: [],
      }
    
      componentDidMount() {
        window.addEventListener('mousedown', this.handleClickDown);
        window.addEventListener('mouseup', this.handleClickUp);
        window.addEventListener('mouseover', this.handleMouseOver);
      }
    
      handleClickUp = (e) => {
        if (e.target.classList[2] === "timeBlock" && this.state.down && e.target.classList[0] === this.state.selectedRole) {
          let times = ["", "", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "1:00", "1:30", "2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"]
          let date = this.state.date.toISOString().substring(0, 10)
          let role = e.target.classList[0]
          let start = String(Math.min(...this.state.selectedTimes))
          let end = String(Math.max(...this.state.selectedTimes) + 1)
          let startTime = times[Number(start)]
          let endTime = times[Number(end)]
          this.addAvailability({ date, role, start, end, startTime, endTime })
          this.setState({
            down: false,
            selectedTimes: [],
          })
        }
      }
      handleClickDown = (e) => {
        if (e.target.classList.contains("available")) {
        } else {
          if (e.target.classList[2] === "timeBlock") {
            this.setState({
              down: true,
              selectedRole: e.target.classList[0],
              selectedTimes: [...this.state.selectedTimes, Number(e.target.classList[1].substring(3))]
            })
          }
        }
      }
    
      handleMouseOver = (e) => {
        if (this.state.down && e.target.classList[0] === this.state.selectedRole) {
          e.target.classList.add("available")
          this.setState({
            selectedTimes: [...this.state.selectedTimes, Number(e.target.classList[1].substring(3))]
          })
        }
      }
    
      Tomorrow = () => {
        let date = this.state.date
        let newDate = new Date(date.setDate(date.getDate() + 1));
        this.setState({
          date: newDate,
        })
        let blocks = document.querySelectorAll(".available")
        for (var i = 0; i < blocks.length; i++) {
          blocks[i].classList.remove('available')
        }
      }
    
      Yesterday = () => {
        let date = this.state.date
        let newDate = new Date(date.setDate(date.getDate() - 1));
        this.setState({
          date: newDate,
        })
        let blocks = document.querySelectorAll(".available")
        for (var i = 0; i < blocks.length; i++) {
          blocks[i].classList.remove('available')
        }
        let titles = document.querySelectorAll(".title")
        for (var i2 = 0; i2 < titles.length; i2++) {
          titles[i2].remove()
        }
      }
    
      toggleModal = () => {
        this.setState({
          open: !this.state.open
        })
      }
    
      addAvailability = (e) => {
        this.setState({
          availabilities: [...this.state.availabilities, e]
        })
      }
    
      mapAvailability = () => {
        this.state.availabilities.map(item => {
          if (item.date === this.state.date.toISOString().substring(0, 10)) {
            let p = document.getElementById(item.role + item.start + "p")
            if (document.getElementById(item.role + item.start).contains(p)) { } else {
              let title = document.createElement("P")
              title.id = item.role + item.start + "p"
              title.className = "title"
              title.innerHTML = `Available ${item.startTime}-${item.endTime}`
              document.getElementById(item.role + item.start).appendChild(title);
            }
            if (Number(item.start === item.end)) { document.getElementById(item.role + item.start).classList.add("available") }
            for (var i = Number(item.start); i < Number(item.end); i++) {
              document.getElementById(item.role + i).classList.add("available")
            }
          } else { }
          return item
        })
      }
    
      render() {
        return (
          <div className="App">
                      <div className="addButton"><button onClick={this.toggleModal}>Add Availability</button></div>
            <Modal date={this.state.date.toISOString().substring(0, 10)} onClose={this.toggleModal} open={this.state.open} addAvailability={this.addAvailability} />
            <header>
              <div>
                <h2>Schedule</h2>
                <h3>{this.state.date.toISOString().substring(0, 10)}</h3>
              </div>
            </header>
            <div className="days">

              <NavigateBeforeIcon onClick={this.Yesterday}></NavigateBeforeIcon>
              <p>Today</p>
              <NavigateNextIcon onClick={this.Tomorrow}></NavigateNextIcon>
            </div>
            <div className="scheduleGrid">
              <div className="Doctor row1 columnHeader"><p>Doctor</p></div>
              <div className="Assistant row1 columnHeader"><p>Assistant</p></div>
              <div className="Hygienist row1 columnHeader"><p>Hygienist</p></div>
              <div className="column1 row1 time"></div>
              <div className="column1 row2 time"><p>9:00</p></div>
              <div className="column1 row3 time"><p>9:30</p></div>
              <div className="column1 row4 time"><p>10:00</p></div>
              <div className="column1 row5 time"><p>10:30</p></div>
              <div className="column1 row6 time"><p>11:00</p></div>
              <div className="column1 row7 time"><p>11:30</p></div>
              <div className="column1 row8 time"><p>12:00</p></div>
              <div className="column1 row9 time"><p>12:30</p></div>
              <div className="column1 row10 time"><p>1:00</p></div>
              <div className="column1 row11 time"><p>1:30</p></div>
              <div className="column1 row12 time"><p>2:00</p></div>
              <div className="column1 row13 time"><p>2:30</p></div>
              <div className="column1 row14 time"><p>3:00</p></div>
              <div className="column1 row15 time"><p>3:30</p></div>
              <div className="column1 row16 time"><p>4:00</p></div>
              <div className="column1 row17 time"><p>4:30</p></div>
              <div className="Doctor row2 timeBlock" id="Doctor2"></div>
              <div className="Doctor row3 timeBlock" id="Doctor3"></div>
              <div className="Doctor row4 timeBlock" id="Doctor4"></div>
              <div className="Doctor row5 timeBlock" id="Doctor5"></div>
              <div className="Doctor row6 timeBlock" id="Doctor6"></div>
              <div className="Doctor row7 timeBlock" id="Doctor7"></div>
              <div className="Doctor row8 timeBlock" id="Doctor8"></div>
              <div className="Doctor row9 timeBlock" id="Doctor9"></div>
              <div className="Doctor row10 timeBlock" id="Doctor10"></div>
              <div className="Doctor row11 timeBlock" id="Doctor11"></div>
              <div className="Doctor row12 timeBlock" id="Doctor12"></div>
              <div className="Doctor row13 timeBlock" id="Doctor13"></div>
              <div className="Doctor row14 timeBlock" id="Doctor14"></div>
              <div className="Doctor row15 timeBlock" id="Doctor15"></div>
              <div className="Doctor row16 timeBlock" id="Doctor16"></div>
              <div className="Doctor row17 timeBlock" id="Doctor17"></div>
              <div className="Assistant row2 timeBlock" id="Assistant2"></div>
              <div className="Assistant row3 timeBlock" id="Assistant3"></div>
              <div className="Assistant row4 timeBlock" id="Assistant4"></div>
              <div className="Assistant row5 timeBlock" id="Assistant5"></div>
              <div className="Assistant row6 timeBlock" id="Assistant6"></div>
              <div className="Assistant row7 timeBlock" id="Assistant7"></div>
              <div className="Assistant row8 timeBlock" id="Assistant8"></div>
              <div className="Assistant row9 timeBlock" id="Assistant9"></div>
              <div className="Assistant row10 timeBlock" id="Assistant10"></div>
              <div className="Assistant row11 timeBlock" id="Assistant11"></div>
              <div className="Assistant row12 timeBlock" id="Assistant12"></div>
              <div className="Assistant row13 timeBlock" id="Assistant13"></div>
              <div className="Assistant row14 timeBlock" id="Assistant14"></div>
              <div className="Assistant row15 timeBlock" id="Assistant15"></div>
              <div className="Assistant row16 timeBlock" id="Assistant16"></div>
              <div className="Assistant row17 timeBlock" id="Assistant17"></div>
              <div className="Hygienist row2 timeBlock" id="Hygienist2"></div>
              <div className="Hygienist row3 timeBlock" id="Hygienist3"></div>
              <div className="Hygienist row4 timeBlock" id="Hygienist4"></div>
              <div className="Hygienist row5 timeBlock" id="Hygienist5"></div>
              <div className="Hygienist row6 timeBlock" id="Hygienist6"></div>
              <div className="Hygienist row7 timeBlock" id="Hygienist7"></div>
              <div className="Hygienist row8 timeBlock" id="Hygienist8"></div>
              <div className="Hygienist row9 timeBlock" id="Hygienist9"></div>
              <div className="Hygienist row10 timeBlock" id="Hygienist10"></div>
              <div className="Hygienist row11 timeBlock" id="Hygienist11"></div>
              <div className="Hygienist row12 timeBlock" id="Hygienist12"></div>
              <div className="Hygienist row13 timeBlock" id="Hygienist13"></div>
              <div className="Hygienist row14 timeBlock" id="Hygienist14"></div>
              <div className="Hygienist row15 timeBlock" id="Hygienist15"></div>
              <div className="Hygienist row16 timeBlock" id="Hygienist16"></div>
              <div className="Hygienist row17 timeBlock" id="Hygienist17"></div>
              {this.mapAvailability()}
            </div>
          </div>
        );
      }
    }
export default Schedule;
