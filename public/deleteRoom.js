function deleteRoom(id){
    $.ajax({
        url: '/rooms/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};