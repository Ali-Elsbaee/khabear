/**
 * Created by Ali.Elsbaee on 4/15/2018.
 */


$(document).ready(function () {

    YUI().use(
        'aui-scheduler',
        function(Y) {
            var events = [
                {
                    content
                        :
                        "e.g., Dinner at Brian's",
                    date
                        :
                        "Mon, April 30",
                    endDate
                        :
                        1525125599000,
                    startDate
                        :
                        1525039200000
                },
                {
                    color: "#8d8",
                    content: 'Earth Day Lunch',
                    date: "Thu, April 05"
                },
                {
                    content: "Weeklong",
                    endDate: new Date(2013, 3, 27),
                    startDate: new Date(2013, 3, 21)
                }
            ];

            var agendaView = new Y.SchedulerAgendaView();
            var dayView = new Y.SchedulerDayView();
            var weekView = new Y.SchedulerWeekView();
            var monthView = new Y.SchedulerMonthView();

            var eventRecorder = new Y.SchedulerEventRecorder({

            });

            new Y.Scheduler(
                {
                    activeView: agendaView,
                    boundingBox: '#myScheduler',
                    eventRecorder: eventRecorder,
                    items: events,
                    render: true,
                    views: [agendaView]
                }
            );
        }
    );

});