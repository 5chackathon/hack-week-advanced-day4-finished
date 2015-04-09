var db = new Firebase('https://hack-vote-test.firebaseio.com/');

$(document).ready(function() {
        db.on('child_added', function(snapshot) {
                var vote = $('<div>');
                var votes = $('#votes');
                vote.append(snapshot.name() + ":" + snapshot.val());
                votes.append(vote);
        });
        db.on('child_changed', function(snapshot) {
                var vote = $('<div>');
                var votes = $('#votes');
                vote.append(snapshot.name() + ":" + snapshot.val());
                votes.append(vote);
        });
});
