$(document).ready(function () {

    //瀑布流布局
    var container = $("select.image-picker.masonry").next("ul.thumbnails");

    container.imagesLoaded(function () {
        container.masonry({
            itemSelector: "li"
        });
    });

    $("#firstpane .menu_body:eq(0)").show();
    $("#firstpane p.menu_head").click(function(){
        $(this).addClass("current").next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
        $(this).siblings().removeClass("current");
    });
    $("#secondpane .menu_body:eq(0)").show();
    $("#secondpane p.menu_head").mouseover(function(){
        $(this).addClass("current").next("div.menu_body").slideDown(500).siblings("div.menu_body").slideUp("slow");
        $(this).siblings().removeClass("current");
    });
});

$(function () {

    //dad simple demo
    $('.dad').dad();

    //dad dropzone


    //dad activate and deactivate
    $('.act').on('click', function () {
        $('.btndemo').not(this).removeClass('active');
        $(this).addClass('active');
        d.css('opacity', 1);
        d.activate();
    });

    // $('.deact').on('click', function () {
    //     $('.btndemo').not(this).removeClass('active');
    //     $(this).addClass('active');
    //     d.css('opacity', 0.5);
    //     d.deactivate();
    // });

 



    $("select.image-picker").imagepicker({
        hide_select: false
    });

    $("select.image-picker.show-labels").imagepicker({
        hide_select: false,
        show_label: true
    });

    $("select.image-picker.limit_callback").imagepicker({
        limit_reached: function () {
            alert('We are full!')
        },
        hide_select: false
    });

    //瀑布流布局
    var container = $("select.image-picker.masonry").next("ul.thumbnails");

    container.imagesLoaded(function () {
        container.masonry({
            itemSelector: "li"
        });
    });

});

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
})

$('#toTop').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);

});


$("#file-1").fileinput({
    uploadUrl: '#', // you must set a valid URL here else you will get an error
    allowedFileExtensions: ['txt', 'doc', 'docx'],
    overwriteInitial: false,
    maxFileSize: 1000,
    maxFilesNum: 10,
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});

$("#file-2").fileinput({
    uploadUrl: '#', // you must set a valid URL here else you will get an error
    overwriteInitial: false,
    maxFileSize: 1000,
    maxFilesNum: 10,
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});

var E = window.wangEditor
var editor = new E('#editor')
// 或者 var editor = new E( document.getElementById('editor') )
editor.create();

