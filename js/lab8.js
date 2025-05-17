$(function() {
    var calendar = new DayPilot.Calendar("calendar");
    calendar.viewType = "Week"; // або "Month"
    calendar.onTimeRangeSelected = function(args) {
        // сюди перенесемо створення броні в ЛР 3
        this.clearSelection();
    };

    calendar.init();

    // Завантажити кімнати (resources)
    $.getJSON("ajax/getRooms.php", function(data) {
        calendar.resources = data;
        calendar.update();
    });

    // Завантажити існуючі бронювання (events)
    $.getJSON("ajax/getReservations.php", function(data) {
        calendar.events.list = data;
        calendar.update();
    });

    calendar.onTimeRangeSelected = function(args) {
        var name = prompt("ПІБ гостя:");
        if (!name) return;
        $.post("ajax/createReservation.php", {
            name: name,
            start: args.start.toString(),
            end: args.end.toString(),
            room_id: args.resource
        }, function(response) {
            calendar.events.add({
                id: response.id,
                text: name,
                start: args.start,
                end: args.end,
                resource: args.resource
            });
        }, "json");
        this.clearSelection();
    };

    calendar.onEventMoved = function(args) {
        $.post("ajax/updateReservation.php", {
            id: args.e.id(),
            start: args.newStart.toString(),
            end: args.newEnd.toString(),
            room_id: args.newResource
        });
    };

    calendar.onEventClick = function(args) {
        if (confirm("Видалити бронювання?")) {
            $.post("ajax/deleteReservation.php", {id: args.e.id()}, function() {
                calendar.events.remove(args.e);
            });
        }
    };
});