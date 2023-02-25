function deletePatron(id){
    $.ajax({
        url: '/patrons/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};