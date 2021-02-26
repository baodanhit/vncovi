$(document).ready(function () {
    // data table
    $("#sailorTableArea").DataTable({
        searching: false,
        ordering: false,
        responsive: true,
        "language": {
            "lengthMenu": "Hiển thị  _MENU_  bản ghi trên trang",
            "zeroRecords": "Không có dữ liệu",
            "info": "Trang _PAGE_ / _PAGES_ ",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "paginate": {
                "first": "T.Đầu",
                "last": "T.Cuối",
                "previous": "<",
                "next": ">"
            },
        }
    });

});