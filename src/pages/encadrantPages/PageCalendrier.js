/* import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction'; */


import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { INITIAL_EVENTS, createEventId } from './event-utils'

import frLocale from '@fullcalendar/core/locales/fr';
import Swal from 'sweetalert2';
import axios from 'axios';

//export default class PageCalendrier extends React.Component {
export default class PageCalendrier extends React.Component {
  Swal = require('sweetalert2');
  constructor(props) {
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      loading: false,
      events: []
    }
  }


  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.get(`/api/events`)
      .then(res => {
        this.setState({ events: res.data.all.original })
      }).catch(err => {
        console.log(err)
      })
    this.setState({
      loading: false
    })
  }

  render() {
    var events = []

    document.addEventListener('DOMContentLoaded', async function () {

      await axios.get(`/api/events`)
      .then(res => {
        events = res.data.all.original
      }).catch(err => {
        console.log(err)
      })
      
      var calendarEl = document.getElementById('calendar');
      
      var calendar = new Calendar(calendarEl, {
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        selectable: true,
        selectMirror: true,
        initialDate: '2022-05-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        eventClick: function (clickInfo) {

          /* if ( Swal.fire(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
          }  */
          //***
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })

          swalWithBootstrapButtons.fire({
            title: 'Veuillez choisir ?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Voir',
            cancelButtonText: 'Supprimer!',
            reverseButtons: false
          }).then((result) => {
            if (result.isConfirmed) {
              axios.get(`api/event/${clickInfo.event.title}`).then(res => {
                if (res.data.status === 200) {

                  const formattDate_start_date = clickInfo.event.start.getFullYear() + '-' + (clickInfo.event.start.getMonth()) + '-' + clickInfo.event.start.getDate() + " " + clickInfo.event.start.getHours() + ':' + clickInfo.event.start.getMinutes() + ':' + clickInfo.event.start.getSeconds();
                  const formattDate_end_date = clickInfo.event.end.getFullYear() + '-' + (clickInfo.event.end.getMonth()) + '-' + clickInfo.event.end.getDate() + " " + clickInfo.event.end.getHours() + ':' + clickInfo.event.end.getMinutes() + ':' + clickInfo.event.end.getSeconds();
                  const list = document.createElement('ul');
                  const listItem1 = document.createElement('li');
                  listItem1.innerHTML = `Titre Action:${clickInfo.event.title}`;
                  const listItem2 = document.createElement('li');
                  listItem2.innerHTML = `Date Début:${formattDate_start_date}`;
                  const listItem3 = document.createElement('li');
                  listItem3.innerHTML = `Date Fin:${formattDate_end_date}`;
                  list.appendChild(listItem1);
                  list.appendChild(listItem2);
                  list.appendChild(listItem3);

                  Swal.fire("Succès", list, "success");


                }
              })

              /*  swalWithBootstrapButtons.fire(
                'Deleted!',
                 'Your file has been deleted.',
                 'success' 
               ) */
            } else {
              axios.delete(`api/event/${clickInfo.event.id}`).then(res => {
                if (res.data.status === 200) {
                  Swal.fire("Succès", res.data.message, "success");
                  clickInfo.event.remove()
                }

              })
              /*   swalWithBootstrapButtons.fire(
                'Action est supprimé',
                'error' ,
                ) */
            }
          })

          //*** 
        },
        select: function (selectInfo) {
          let title = prompt("Veuillez entrer le titre de l'évenement")
          let calendarApi = selectInfo.view.calendar
          let formattDate_start_date = selectInfo.start.getFullYear() + '-' + (selectInfo.start.getMonth() + 1) + '-' + selectInfo.start.getDate() + " " + selectInfo.start.getHours() + ':' + selectInfo.start.getMinutes() + ':' + selectInfo.start.getSeconds();
          let formattDate_end_date = selectInfo.end.getFullYear() + '-' + (selectInfo.end.getMonth() + 1) + '-' + selectInfo.end.getDate() + " " + selectInfo.end.getHours() + ':' + selectInfo.end.getMinutes() + ':' + selectInfo.end.getSeconds();
          // alert(formattDate_start_date)

          calendarApi.unselect() // clear date selection

          if (title) {
            calendarApi.addEvent({
              id: createEventId(),
              title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              allDay: selectInfo.allDay
            })

            const data = {
              title: title,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
            }
            axios.post('api/event', data).then(res => {
              if (res.data.status === 200) {
                Swal.fire("Succès", res.data.message, "success");
                window.location.href="/encadrant/calendrier"
              }
            });

          }

        },
        // eventsSet: function (events) {
        //   alert('HI TEST')
        //   this.setState({
        //     currentEvents: events
        //   })
        // },
        eventChange: function (info) {
          const formattDate_start_date = info.event.start.getFullYear() + '-' + (info.event.start.getMonth()) + '-' + info.event.start.getDate() + " " + info.event.start.getHours() + ':' + info.event.start.getMinutes() + ':' + info.event.start.getSeconds();
          const formattDate_end_date = info.event.end.getFullYear() + '-' + (info.event.end.getMonth() - 1) + '-' + info.event.end.getDate() + " " + info.event.end.getHours() + ':' + info.event.end.getMinutes() + ':' + info.event.end.getSeconds();
          const data = {
            title: info.event.title,
            start: formattDate_start_date,
            end: formattDate_end_date,
          }
          //alert(info.event.title + " end is now " + info.event.end.toISOString());
          axios.put(`api/event/${info.event.title}`, data).then(res => {
            if (res.data.status === 200) {
              Swal.fire("Succès", res.data.message, "success");
            }

          })
        },
        events: events,
      });

      calendar.render();
    });

    return (

      <div className="container">
        <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main' id='calendar'>
          </div>
        </div>

      </div>
    )
  }

  renderSidebar() {


    return (
      <div className='demo-app-sidebar'>
        {/* <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div> */}
        <div className='demo-app-sidebar-section'>
          {/* <h2>Les Actions({this.state.currentEvents.length})</h2> */}


          {this.state.currentEvents.map(renderSidebarEvent)}

          {/* {this.state.events.map(event => {
            return(
              <h1>{event.title}</h1>
            )
          })} */}


        </div>
      </div>


    )
  }


  afficherTous = () => {

    axios.get('api/events').then(res => {

      if (res.data.status === 200) {
        //    this.state.currentEvents = res.data.all.original;
        //  Swal.fire ("Succès" , res.data.message,"success"); 


      }

    })
  }

  eventUpdt = (info) => {

    const formattDate_start_date = info.event.start.getFullYear() + '-' + (info.event.start.getMonth()) + '-' + info.event.start.getDate() + " " + info.event.start.getHours() + ':' + info.event.start.getMinutes() + ':' + info.event.start.getSeconds();
    const formattDate_end_date = info.event.end.getFullYear() + '-' + (info.event.end.getMonth() - 1) + '-' + info.event.end.getDate() + " " + info.event.end.getHours() + ':' + info.event.end.getMinutes() + ':' + info.event.end.getSeconds();
    const data = {
      title: info.event.title,
      start: formattDate_start_date,
      end: formattDate_end_date,
    }
    //alert(info.event.title + " end is now " + info.event.end.toISOString());
    axios.put(`api/event/${info.event.title}`, data).then(res => {
      if (res.data.status === 200) {
        Swal.fire("Succès", res.data.message, "success");
      }

    })
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  //modifier

  //ajouter
  handleDateSelect = (selectInfo) => {
    alert('HI TEST')
    let title = prompt("Veuillez entrer le titre de l'évenement")
    let calendarApi = selectInfo.view.calendar
    let formattDate_start_date = selectInfo.start.getFullYear() + '-' + (selectInfo.start.getMonth() + 1) + '-' + selectInfo.start.getDate() + " " + selectInfo.start.getHours() + ':' + selectInfo.start.getMinutes() + ':' + selectInfo.start.getSeconds();
    let formattDate_end_date = selectInfo.end.getFullYear() + '-' + (selectInfo.end.getMonth() + 1) + '-' + selectInfo.end.getDate() + " " + selectInfo.end.getHours() + ':' + selectInfo.end.getMinutes() + ':' + selectInfo.end.getSeconds();
    // alert(formattDate_start_date)

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })

      const data = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      }
      axios.post('api/event', data).then(res => {
        if (res.data.status === 200) {
          Swal.fire("Succès", res.data.message, "success");

        }
      });

    }

  }

  //afficher ou supprimer
  handleEventClick = (clickInfo) => {
    /* if ( Swal.fire(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }  */
    //***

    alert('HI TEST')
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Veuillez choisir ?',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Voir',
      cancelButtonText: 'Supprimer!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`api/event/${clickInfo.event.title}`).then(res => {
          if (res.data.status === 200) {

            const formattDate_start_date = clickInfo.event.start.getFullYear() + '-' + (clickInfo.event.start.getMonth()) + '-' + clickInfo.event.start.getDate() + " " + clickInfo.event.start.getHours() + ':' + clickInfo.event.start.getMinutes() + ':' + clickInfo.event.start.getSeconds();
            const formattDate_end_date = clickInfo.event.end.getFullYear() + '-' + (clickInfo.event.end.getMonth() - 1) + '-' + clickInfo.event.end.getDate() + " " + clickInfo.event.end.getHours() + ':' + clickInfo.event.end.getMinutes() + ':' + clickInfo.event.end.getSeconds();
            const list = document.createElement('ul');
            const listItem1 = document.createElement('li');
            listItem1.innerHTML = `Titre Action:${clickInfo.event.title}`;
            const listItem2 = document.createElement('li');
            listItem2.innerHTML = `Date Début:${formattDate_start_date}`;
            const listItem3 = document.createElement('li');
            listItem3.innerHTML = `Date Fin:${formattDate_end_date}`;
            list.appendChild(listItem1);
            list.appendChild(listItem2);
            list.appendChild(listItem3);

            Swal.fire("Succès", list, "success");


          }
        })

        /*  swalWithBootstrapButtons.fire(
          'Deleted!',
           'Your file has been deleted.',
           'success' 
         ) */
      } else {
        axios.delete(`api/event/${clickInfo.event.title}`).then(res => {
          if (res.data.status === 200) {
            Swal.fire("Succès", res.data.message, "success");
            clickInfo.event.remove()
          }

        })
        /*   swalWithBootstrapButtons.fire(
          'Action est supprimé',
          'error' ,
          ) */
      }
    })

    //*** 
  }


  //Afficher Actions
  handleEvents = (events) => {
    alert('HI TEST')
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>

      <b className="color-primary " >{eventInfo.timeText}</b>
      <i className="color-primary " >{eventInfo.event.title}</i>

    </>
  )
}

function renderSidebarEvent(event) {

  return (
    <ul>
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
    </ul>
  )
}



//Tuto
//move action 
//--modifier
function eventDrop(changeInfo) {
  /* let formattDate_start_date =  info.start.getFullYear() + '-'+ (info.start.getMonth() +1 ) + '-' + info.start.getDate()+" "+ info.start.getHours()+':' + info.start.getMinutes()+':'+ info.start.getSeconds();
   let formattDate_end_date =  info.end.getFullYear() + '-'+ (info.end.getMonth() +1 ) + '-' + info.end.getDate()+" "+ info.end.getHours()+':' + info.end.getMinutes()+':'+ info.end.getSeconds();*/
  alert(changeInfo.event)
  //------------------
}
function eventResize(eventResizeInfo) {
  let formattDate_start_date = eventResizeInfo.start.getFullYear() + '-' + (eventResizeInfo.start.getMonth() + 1) + '-' + eventResizeInfo.start.getDate() + " " + eventResizeInfo.start.getHours() + ':' + eventResizeInfo.start.getMinutes() + ':' + eventResizeInfo.start.getSeconds();
  let formattDate_end_date = eventResizeInfo.end.getFullYear() + '-' + (eventResizeInfo.end.getMonth() + 1) + '-' + eventResizeInfo.end.getDate() + " " + eventResizeInfo.end.getHours() + ':' + eventResizeInfo.end.getMinutes() + ':' + eventResizeInfo.end.getSeconds();
  //-------------------
}
//--supprimer
function eventClick(info) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Veuillez choisir ?',
    // text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Voir',
    cancelButtonText: 'Supprimer!',
    reverseButtons: false
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        /*  'Deleted!',
         'Your file has been deleted.',
         'success' */

        /////
      )
    } else {
      swalWithBootstrapButtons.fire(
        /*   'Action est supprimé',
          'error' */

        /////
      )
    }
  })
}