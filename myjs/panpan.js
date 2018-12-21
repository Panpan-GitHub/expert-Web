var id = 1;
/*
判断登录用户
*/
if (id != 1) {
    let alist = document.getElementsByClassName("display");
    for (let idx = 0; idx < alist.length; idx++) {
        var mya = alist[idx];
        mya.style.display = "none";
    }
    var n = $('.dad-draggable').dad();
    n.deactivate();
}









/*
添加模块
*/

// 图片管理模块
// 打开模态框按钮
$("#piclist").click(function () {
    imgmanage.getAll()
    // $("select.image-picker").imagepicker({
    //     hide_select: false
    // });
});
// 上传图片按钮
$("#upbtn").click(function () {
    imgmanage.upimg();
    imgmanage.getAll();
});

const imgmanage = {
    "getAll": function () {
        $("#mypic").html("");

        $.ajax({
            url: 'http://192.168.1.104:8080/photo/getAll',
            type: 'POST',
            data: {
                userId: id
            },
            dataType: "JSON",
            success: function (data) {
                $.each(eval(data).obj, function (i, item) {
                    $("#mypic").append(
                        `<option class="maxwidth-80" data-img-src="` + item.photoPath + `"value='` + item.id + `'>` + item.photoPath + `</option>`);
                    // $("ul.image_picker_selector").append(
                    //     `  <li><div class="thumbnail"><img class="image_picker_image" src="` + item.photoPath + `"></div></li>`
                    // )
                })
                $("select.image-picker").imagepicker({
                    hide_select: false
                });
            },
            error: function (e) {
                console.log(e)

            }
        });

    },

    "upimg": function () {
        let formdata = new FormData($("#form-upimg")[0]);
        // photo.append("userId", 1);
        // photo.append("photoPath", 1);
        $.ajax({
            url: 'http://192.168.1.104:8080/photo/add',
            type: 'POST',
            data: formdata,
            processData: false,
            contentType: false,
            success: function () {},
            error: function () {}
        })
    },

}

// 列表多图

$("#useimg").click(function () {
    imgList.getId();
    imgList.add();
    imgList.addTxt();
});

const imgList = {
    "modId": 0,
    "title": 0,
    "txt": "<!-- imglist -->",
    "txt-one": ` <div class="col-md-12">
        <div class="col-md-6 col-md-offset-3">
            <div class="title-section">
                <h2 class="title"><span class="typo">&amp;</span>` + this.title + `</h2>
            </div>
        </div>
        <div class="col-md-12">
        <div class="blog-carousel-slider post-wrap">
        `,
    "txt-two": `</div>
        </div>
    </div>`,
    //获取id
    "getId": function () {
        this.title = $("#imglist-name").val();
        console.log(this.title)
        $.ajax({
            url: 'http://192.168.1.104:8080/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: this.title,
                type: "列表多图"
            },
            success: function (data) {
                this.modId = eval(data).obj.id;
            }
        })
    },
    "add": function () {
        let arr = new Array();
        let img = new Array();
        let txt3 = "";

        $("#mypic").find("option:selected").each(function () {
            img.push($(this).text());
        })
        console.log(img)
        for(let i=0;i<img.length;i++){
            arr.push(
               {
                  "moduleId":this.modId,
                  "photoPath":img[i],
                  "description":"Default introduction",
                  "linkPath":"#"
                }
            )
        }
        console.log(arr)
        $.ajax({
            type: 'POST',
            async: false,
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://192.168.1.104:8080/multiPhoto/save?moduleId=6',
            data: JSON.stringify(arr),
            dataType: 'json',
            success: function (data) {
                $.each(img, function (i, item) {
                    let text = `   
                        <article class="entry object">
                            <div class="feature-post ">
                                <a class="img-post" href="blog-single.html">
                                    <img src="` + item + `" alt="image">
                                </a>
                            </div><!-- /.feature-post -->
                            <div class="main-post">
                                <h3 class="entry-title"><a href="blog-single.html">Fresh and Cool This
                                        Summer</a></h3>
                            </div><!-- /.main-post -->
                        </article><!-- /.entry -->
        `;
        txt3 = txt3.concat(text);
        this.txt = txt3;
        console.log(this.txt)
                });
            },
            error: function (e) {

            }
        });
    },
    // 组合内容
    "addTxt": function () {

        $("#bg-contant").append(this["txt-one"] + this.txt + this["txt-two"]);
    },
};

//添加文章列表
const addText = {
    "getId": function () {
        $.ajax({
            url: 'http://192.168.1.104:8080/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: this.title,
                type: "multiPhoto"
            },
            success: function (data) {
                this.modId = eval(data).obj.id;
            }
        })
    },
}




/*
获得模块
*/