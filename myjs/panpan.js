var id = 1;
var ip = "http://192.168.1.112:8080/";
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
            url: 'http://192.168.1.112:8080/photo/getAll',
            type: 'POST',
            data: {
                userId: id
            },
            dataType: "JSON",
            success: function (data) {
                $.each(eval(data).obj, function (i, item) {
                    $("#mypic").append(
                        `<option class="maxwidth-80" data-img-src="` + ip + `` + item.photoPath + `"value='` + item.id + `'>` + item.photoPath + `</option>`);
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
            url: 'http://192.168.1.112:8080/photo/add',
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

    //获取id
    "getId": function () {
        this.title = $("#imglist-name").val();
        console.log(this.title)
        $.ajax({
            url: 'http://192.168.1.112:8080/module/add',
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
        let txt;
        let txtOne = ` <div class="col-md-12">
        <div class="col-md-6 col-md-offset-3">
            <div class="title-section">
                <h2 class="title"><span class="typo">&amp;</span>` + this.title + `</h2>
            </div>
        </div>
        <div class="col-md-12">
        <div class="blog-carousel-slider post-wrap">
        `;
        let txtTow = `</div>
        </div>
    </div>`;
        let txt3 = "";
        let arr = new Array();
        let img = new Array();

        $("#mypic").find("option:selected").each(function () {
            img.push($(this).text());
        })
        // console.log(img)
        for (let i = 0; i < img.length; i++) {
            arr.push({
                "moduleId": this.modId,
                "photoPath": img[i],
                "description": "Default introduction",
                "linkPath": "#"
            })
        }
        // console.log(arr)
        $.ajax({
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://192.168.1.112:8080/multiPhoto/save?moduleId=6',
            data: JSON.stringify(arr),
            dataType: 'json',
            success: function (data) {
                $.each(img, function (i, item) {
                    let text = `   
                        <article class="entry object" style="height:15rem;width:30%">
                            <div class="feature-post ">
                                <a class="img-post" href="blog-single.html">
                                    <img src=` + ip + `"` + item + `" alt="image">
                                </a>
                            </div><!-- /.feature-post -->
                            <div class="main-post">
                                <h3 class="entry-title"><a href="blog-single.html">Fresh and Cool This
                                        Summer</a></h3>
                            </div><!-- /.main-post -->
                        </article><!-- /.entry -->
        `;

                    txt3 = txt3.concat(text);

                });
                //组合
                txt = `                       <div class="col-md-12">
                <span class="edit glyphicon glyphicon-pencil display">编辑</span>
                <div class="col-md-6 col-md-offset-3">
                    <div class="title-section">
                        <h2 class="title"><span class="typo">&amp;</span>` + imgList.title + `</h2>
                    </div>
                </div><!-- /.col-md-6 -->

                <div class="col-md-12">
                    <div class="blog-carousel-slider post-wrap">
                        ` + txt3 + `
                    </div><!-- /.blog-carousel-slider -->
                </div>
            </div><!-- /.col-md-12 -->`;
                $("#bg-contant").append(txt);
            },
            error: function (e) {

            }
        });
    },
};

$("#txtListAdd").click(function () {
    addText.add();
})
//添加文章列表
const addText = {
    "title": 0,
    "modId": 0,

    //添加
    "add": function () {
        addText.title = $("#txtListName").val();
        $.ajax({
            url: 'http://192.168.1.112:8080/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: addText.title,
                type: "文章列表"
            },
            success: function (data) {
                // addText.modId = eval(data).obj.id;
                $("#bg-contant").append(
                    `  <div class="col-md-6">
                  <span class="edit glyphicon glyphicon-pencil display">编辑</span>
                  <div class="col-md-12">
                      <div class="col-md-5">
                          <h4 class="widget-title" style="margin-top:0">` + addText.title + ` </h4>
                          <div class="images-single-flexslider">
                              <ul class="slides">
                                  <li>
                                      <a class="img-post popup-gallery" href="#"><img src="images/images-single/1.jpg"
                                              alt="image"></a>
                                  </li>
                              </ul>
                          </div><!-- /.images-single-flexslider -->
                      </div><!-- /.col-md-4 -->

                      <div class="col-md-7">
                          <h4 class="widget-title float-right" style="font-size:10px;margin:0;"><a href="#">more</a></h4>
                          <div class="flat-about-us">
                              <h4>这是预设的内容</h4>
                              <p>这是预设的文章
                              </p>
                              <p class="margin-top-25">小刘<span class="float-right">12-15</span></p>
                          </div><!-- /.flat-about-us -->
                      </div><!-- /.col-md-4 -->
                  </div>
                  <div class="col-md-12 margin-top-39">
                      <div class="sidebar">
                          <div class="widget widget-recentpost">
                              <ul class="recentpost">
                                  <li class="maxwidth">

                                      <div class="text">
                                          <h6>
                                              <a href="#">C语言设计</a>
                                          </h6>
                                          <p class="mylist">《C语言设计》是谭浩强教授编写，清华大学出版社出版的C语言程序教程。第一版于1991年出版，第二版于1999年出版。</p>
                                      </div>
                                      <div class="maxwidth">
                                          <span class="float-right">2018-12-5</span>
                                          <span class="float-right margin-right-40">小王</span>
                                      </div>
                                  </li>
                                  <li class="maxwidth">

                                      <div class="text">
                                          <h6>
                                              <a href="#">java编程</a>
                                          </h6>
                                          <p class="mylist">一个Java程序可以认为是一系列对象的集合，而这些对象通过调用彼此的方法来协同工作。下面简要介绍下类、对象、方法和实例变量的概念。</p>
                                      </div>
                                      <div class="maxwidth">
                                          <span class="float-right">2018-12-2</span>
                                          <span class="float-right margin-right-40">小潘</span>
                                      </div>
                                  </li>
                                  <li class="maxwidth">

                                      <div class="text">
                                          <h6>
                                              <a href="#">pytho</a>
                                          </h6>
                                          <p class="mylist">Python是一种计算机程序设计语言。是一种动态的、面向对象的脚本语言，最初被设计用于编写自动化脚本(shell)，随着版本的不断更新和语言新功能的添加</p>
                                      </div>
                                      <div class="maxwidth">
                                          <span class="float-right">2018-12-3</span>
                                          <span class="float-right margin-right-40">小方</span>
                                      </div>
                                  </li>
                              </ul><!-- /.recentpost -->
                          </div><!-- /.widget-recentpost -->
                      </div>
                  </div>
              </div>`
                )
            }
        })
    },


}

//文件下载列表
$("#addDownload").click(function () {
    addDownload.add();
})
const addDownload = {
    "title": 0,
    "modId": 0,

    //添加
    "add": function () {
        addDownload.title = $("#downloadName").val()
        $.ajax({
            url: 'http://192.168.1.112:8080/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: addDownload.title,
                type: "文章列表"
            },
            success: function (data) {
                // addText.modId = eval(data).obj.id;
                $("#bg-contant").append(
                    `            <div class="col-md-6">
                  <span class="edit glyphicon glyphicon-pencil display">编辑</span>
                  <div class="col-md-12">
                      <div class="col-md-5">
                          <h4 class="widget-title" style="margin-top:0">` + addDownload.title + `</h4>
                          <div class="images-single-flexslider">
                              <ul class="slides">
                                  <li>
                                      <a class="img-post popup-gallery" href="#"><img src="images/images-single/1.jpg"
                                              alt="image"></a>
                                  </li>
                              </ul>
                          </div><!-- /.images-single-flexslider -->
                      </div><!-- /.col-md-4 -->

                      <div class="col-md-7">
                          <h4 class="widget-title float-right" style="font-size:10px;margin:0;"><a href="#">more</a></h4>
                          <div class="flat-about-us">
                              <h4>预设内容</h4>
                              <p>We understand that our customers demand the highest quality repair with an
                                  efficient
                              </p>
                              <p class="margin-top-25">小王
                                  <a href="#" class="float-right"><span class="glyphicon glyphicon-download-alt"></span></a>
                                  <span class="float-right margin-right-40">12-15</span>
                              </p>
                          </div><!-- /.flat-about-us -->
                      </div><!-- /.col-md-4 -->
                  </div>
                  <div class="col-md-12 margin-top-39">
                      <div class="sidebar">
                          <div class="widget widget-recentpost">
                              <ul class="recentpost">
                                  <li class="maxwidth">
                                      <div class="text">
                                          <h6>
                                              <a href="#">C语言教程</a>
                                          </h6>
                                          <p class="mylist">这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容内容这里是内容内容这里是内容内容这里是内容</p>
                                      </div>
                                      <div class="maxwidth">
                                          <a href="#" class="float-right"><span class="glyphicon glyphicon-download-alt"></span></a>
                                          <span class="float-right margin-right-40">12-15</span>
                                          <span class="float-right margin-right-40">王晨韬</span>
                                      </div>
                                  </li>
                                  <li class="maxwidth">
                                      <div class="text">
                                          <h6>
                                              <a href="#">java教程</a>
                                          </h6>
                                          <p class="mylist">这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容内容这里是内容内容这里是内容内容这里是内容</p>
                                      </div>
                                      <div class="maxwidth">
                                          <a href="#" class="float-right"><span class="glyphicon glyphicon-download-alt"></span></a>
                                          <span class="float-right margin-right-40">12-15</span>
                                          <span class="float-right margin-right-40">王晨韬</span>
                                      </div>
                                  </li>
                                  <li class="maxwidth">
                                      <div class="text">
                                          <h6>
                                              <a href="#">python教程</a>
                                          </h6>
                                          <p class="mylist">这里是内容这里是内容这里是内容这里是内容这里是内容这里是内容内容这里是内容内容这里是内容内容这里是内容</p>
                                      </div>
                                      <div class="maxwidth">
                                          <a href="#" class="float-right"><span class="glyphicon glyphicon-download-alt"></span></a>
                                          <span class="float-right margin-right-40">12-15</span>
                                          <span class="float-right margin-right-40">王晨韬</span>
                                      </div>
                                  </li>
                              </ul><!-- /.recentpost -->
                          </div><!-- /.widget-recentpost -->
                      </div>
                  </div>
              </div>`
                )
            }
        })
    },

}

//单篇文章
$("#addSingleTxt").click(function () {
    singleTxt.getId();
    singleTxt.add();
})
const singleTxt = {
    "modId": 0,
    "modName": 0,
    "title": 0,
    "content": 0,
    "userName": 0,
    "time": 0,
    "getId": function () {
        singleTxt.modName = $("#singleName").val();
        singleTxt.title = $("#singleTitle").val();
        console.log(singleTxt.modName)

        $.ajax({
            url: 'http://192.168.1.112:8080/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: singleTxt.modName,
                type: "单篇文章"
            },
            success: function (data) {
                $.ajax({
                    async: false,
                    success: function() {                 
                singleTxt.userName = eval(data).obj.userName;
                singleTxt.modId = eval(data).obj.id;
                console.log(singleTxt.modId)
                    }
                })

            },
            error: function (e) {}

        })

    },

    "add": function () {
        singleTxt.content = editor.txt.html();
        let time = function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        };
        let formData = new FormData();
        formData.append('title', $("#singleName").val());
        formData.append('description', $("#singleTitle").val())
        formData.append('moduleId', singleTxt.modId); //
        formData.append('content', singleTxt.content);

        console.log(singleTxt.modId)
        $.ajax({
            url: 'http://192.168.1.112:8080/singlepassage/update',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $("#bg-contant").append(
                    `<div class="col-md-6">
                    <span class="edit glyphicon glyphicon-pencil display">编辑</span>
                    <div class="flat-text-content object text-center">
                        <h3 class="title">WHY WE DO IT BETTER</h3>
                        <div> <span style="margin-right:150px;">发布人：` + singleTxt.userName + `</span> <span>日期：` + singleTxt.time + `</span></div>
                        <div class="content">
                        ` + singleTxt.content + `
                        </div>
                    </div><!-- /.text-content -->
                </div>`
                )
            }
        })
    }
}

/*
获得模块
*/
$(function () {
    getRotation.get();
})
//获得轮播图
const getRotation = {
    "get": function () {
        let path = "http://192.168.1.112:8080";
        $.ajax({
            url: 'http://192.168.1.112:8080/multiPhoto/get',
            type: 'POST',
            data: {
                userId: id,
                moduleId: 7
            },
            dataType: "JSON",
            success: function (data) {
                $.each(eval(data).obj, function (i, item) {
                    path = path.concat(item.photoPath);
                    $("#img" + i).attr('src', path);
                    $("#des" + i).text(item.description);
                    path = "http://192.168.1.112:8080";
                })
            },
            error: function (e) {
                console.log(e)

            }
        });
    }
}