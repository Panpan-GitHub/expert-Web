var id = 1;
var ip = "http://172.17.164.24:8080";
/*
判断登录用户
*/

// 控制工具按钮的显示
var alist = document.getElementsByClassName("display");
for (let idx = 0; idx < alist.length; idx++) {
    var mya = alist[idx];
    mya.style.display = "none";
}
if (id != 1) {
    var alist = document.getElementsByClassName("display2");
    for (let idx = 0; idx < alist.length; idx++) {
        var mya = alist[idx];
        mya.style.display = "none";
    }

}

// 控制拖动模块开启
var d = $('.dad-draggable').dad({
    draggable: '.draggable'
});

$(".dropzone").css('display', 'none')
var dz = true;
$("#dragzone").click(function () {
    if (dz == true) {
        $(".dropzone").css('display', 'block');
        $("#dragzone").text("关闭纸篓");
        dz = false;
    } else {
        $(".dropzone").css('display', 'none')
        $("#dragzone").text("开启纸篓");
        dz = true;
    }
})

d.addDropzone('.dropzone', function (e) {
    e.remove();
});
boolean = true
$("#drag").click(function () {;
    if (boolean == true) {
        d.deactivate();
        $("#drag").text("开启拖动")
        boolean = false;
    } else {
        $("#drag").text("关闭拖动")
        d.activate();
        boolean = true;
    }
})

//生成访客页面
$("#crtIndex").click(function () {
    let crt = $("#customer").html();

    $.ajax({
        url: ip + '/user/saveBody',
        type: 'POST',
        data:{
            body:crt
        },
        success: function (data) {
            $('.bs-success-modal-sm').modal('show')
        },
        error: function (e) {
           $(".bs-error-modal-sm").modal('show')
        }
    })
})




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
            url: ip + '/photo/getAll',
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
            url: ip + '/photo/add',
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
});

const imgList = {
    "modId": 0,
    "title": 0,

    //获取id
    "getId": function () {
        this.title = $("#imglist-name").val();
        console.log(this.title);
        sessionStorage.mutititle = this.title;
        $.ajax({
            url: ip + '/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: this.title,
                type: "列表多图"
            },
            success: function (data) {
               sessionStorage.mutimodId = eval(data).obj.id;
               console.log(eval(data).obj.id)
            }
        })
    },
    "add": function () {
        let txt;
        let txtOne = ` <div class="col-md-12">
        <div class="col-md-6 col-md-offset-3">
            <div class="title-section">
                <h2 class="title"><span class="typo">&amp;</span>` + sessionStorage.mutititle + `</h2>
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
                "moduleId": sessionStorage.mutimodId,
                "photoPath": img[i],
                "description": "Default introduction",
                "linkPath": "#"
            })
        }
        console.log(arr)
        $.ajax({
            url: ip + '/multiPhoto/save?moduleId=' + sessionStorage.mutimodId,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(arr),
            dataType: 'json',
            success: function (data) {
                $.each(img, function (i, item) {
                    let text = `   
                        <article class="entry object" style="height:15rem;width:30%">
                            <div class="feature-post " style="height:221px;overflow:hidden">
                                <a class="img-post" href="blog-single.html">
                                    <img src="` + ip + item + `" alt="image">
                                </a>
                            </div><!-- /.feature-post -->
                            <div class="main-post text-center">
                                <h3 class="entry-title"><a href="blog-single.html">Fresh and Cool This
                                        Summer</a></h3>
                            </div><!-- /.main-post -->
                        </article><!-- /.entry -->
        `;

                    txt3 = txt3.concat(text);

                });
                //组合
                txt = `                       <div class="col-md-12">
                
                <div class="col-md-6 col-md-offset-3">
                    <div class="title-section draggable">
                        <h2 class="title"><span class="typo">&amp;</span>` + sessionStorage.mutititle + `</h2>
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
            url: ip + '/module/add',
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
                  
                  <div class="col-md-12">
                      <div class="col-md-5">
                          <h4 class="widget-title draggable" style="margin-top:0">` + addText.title + ` </h4>
                          <div class="images-single-flexslider">
                              <ul class="slides">
                                  <li>
                                      <a class="img-post popup-gallery" href="#"><img src="img/1.jpg"
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
            url: ip + '/module/add',
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
                  
                  <div class="col-md-12">
                      <div class="col-md-5">
                          <h4 class="widget-title draggable" style="margin-top:0">` + addDownload.title + `</h4>
                      </div><!-- /.col-md-4 -->
                  </div>
                  <div class="col-md-12">
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
       sessionStorage.singleTxttitle = $("#singleTitle").val();
        console.log(singleTxt.modName)

        $.ajax({
            url: ip + '/module/add',
            type: 'POST',
            data: {
                userId: id,
                name: singleTxt.modName,
                type: "单篇文章"
            },
            success: function (data) {
                sessionStorage.singleTxtUserName = eval(data).obj.username;
                // console.log(eval(data).obj)
                sessionStorage.singleTxtModId = eval(data).obj.id;

            },
            error: function (e) {}

        })

    },

    "add": function () {
        singleTxt.content = editor.txt.html();
        let formData = new FormData();
        formData.append('title', $("#singleName").val());
        formData.append('description', $("#singleTitle").val())
        formData.append('moduleId',sessionStorage.singleTxtModId); 
        formData.append('content', singleTxt.content);

        $.ajax({
            url: ip + '/singlepassage/update',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function () {
                $("#bg-contant").append(
                    `<div class="col-md-6">
                    
                    <div class="flat-text-content object text-center">
                        <h3 class="title draggable">`+ sessionStorage.singleTxttitle +`</h3>
                        <div> <span>发布人：` + sessionStorage.singleTxtUserName + `</span></div>
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


//创建公告栏
$("#addNotice").click(function () {
    addNotice.add()
})
const addNotice = {
    "add": function () {
        $("#bg-contant").append(`<div class="col-md-2">
        
        <div class="sidebar">
            <div class="widget widget-recentpost">
                <h4 class="widget-title draggable">公告 </h4>
                <div class="float-right"><a href="#">
                        <h4 class="widget-title" style="font-size:10px;">more</h4>
                    </a></div>
                <ul class="recentpost">
                    <li>
                        <div class="thumb entry">
                            <a href="#">
                                <img src="images/blog/11.1.jpg" alt="image">
                            </a>

                        </div>
                        <div class="text">
                            <h6>
                                <a href="#">消息1</a>
                            </h6>
                            <span class="entry-time">April 24, 2017</span>
                        </div>
                    </li>

                    <li>
                        <div class="thumb entry">
                            <a href="#">
                                <img src="images/blog/1.1.jpg" alt="image">
                            </a>

                        </div>
                        <div class="text">
                            <h6>
                                <a href="#">消息2</a>
                            </h6>
                            <span class="entry-time">April 24, 2017</span>
                        </div>
                    </li>

                    <li>
                        <div class="thumb entry">
                            <a href="#">
                                <img src="images/blog/3.1.jpg" alt="image">
                            </a>
                        </div>
                        <div class="text">
                            <h6>
                                <a href="#">消息3</a>
                            </h6>
                            <span class="entry-time">April 24, 2017</span>
                        </div>
                    </li>

                    <li>
                        <div class="thumb entry">
                            <a href="#">
                                <img src="images/blog/2.1.jpg" alt="image">
                            </a>
                        </div>
                        <div class="text">
                            <h6>
                                <a href="#">消息4</a>
                            </h6>
                            <span class="entry-time">April 24, 2017</span>
                        </div>
                    </li>
                </ul><!-- /.recentpost -->
            </div>
        </div>
    </div>`)
    }
}





/*
获得模块
*/
$(function () {
    getRotation.get();
    getImgList.get();
    getDownload.get();
    getSingleTxt.get();
    getTxtList.get();
})
//获得轮播图
const getRotation = {
    "get": function () {
        $.ajax({
            url: ip + '/module/get',
            type: 'POST',
            data: {
                userId: id,
            },
            dataType: "JSON",
            success: function (data) {
                // console.log(eval(data))
                // console.log(eval(data)[1].content)
                $.each(eval(data), function (k, num) {
                    if (num.type == "轮播多图") {
                        $.each(num.content, function (i, item) {
                            // console.log(item)
                            let n = 1;
                            $("#img" + n).attr('src', ip + item.photoPath);
                            $("#des" + n).text(item.description);
                            n++;
                        })
                        n = 0;
                    }
                })

            },
            error: function (e) {

            }
        });


    }
}

//获得列表多图

const getImgList = {
    "get": function () {
        let txt;
        $.ajax({
            type: 'POST',
            url: ip + '/module/get',
            data: {
                userId: id,
            },
            success: function (data) {
                $.each(eval(data), function (k, num) {
                    if (num.type == "列表多图") {
                        $.each(num.content, function (i, item) {
                            let text = `   
                            <article class="entry object" style="height:15rem;width:30%">
                                <div class="feature-post ">
                                    <a class="img-post" href="blog-single.html">
                                        <img src="` + ip + item.photoPath + `" alt="image">
                                    </a>
                                </div><!-- /.feature-post -->
                                <div class="main-post">
                                    <h3 class="entry-title"><a href="blog-single.html">` + item.description + `</a></h3>
                                </div><!-- /.main-post -->
                            </article><!-- /.entry -->
            `;
                            let mutitxt = "";
                            mutitxt = mutitxt.concat(text)
                            sessionStorage.mutitxt = mutitxt;
                            // console.log(item)
                        });

                        txt = `                       <div class="col-md-12">
                
                        <div class="col-md-6 col-md-offset-3 draggable">
                            <div class="title-section">
                                <h2 class="title"><span class="typo">&amp;</span>列表多图</h2>
                            </div>
                        </div><!-- /.col-md-6 -->
        
                        <div class="col-md-12">
                            <div class="blog-carousel-slider post-wrap">
                                ` + sessionStorage.mutitxt + `
                            </div><!-- /.blog-carousel-slider -->
                        </div>
                    </div><!-- /.col-md-12 -->`;

                        sessionStorage.muti = txt;
                    }
                    //组合
                    var txt2 = sessionStorage.muti;
                    $("#bg-contant").append(txt2);

                });

            },
            error: function (e) {
                console.log("error")
            }
        });
    }
}

//获得文章列表
const getTxtList = {
    "get": function () {
        let txt, txt2, txt3;


        txt3 = `                    </ul><!-- /.recentpost -->
             </div><!-- /.widget-recentpost -->
         </div>
     </div>
 </div>`
        $.ajax({
            url: ip + '/module/get',
            data: {
                userId: id,
            },
            type: 'POST',
            success: function (data) {
                $.each(eval(data), function (k, num) {
                    if (num.type == "文章列表") {
                        var n = 0;
                        txt = `                      <div class="col-md-6">
        
                        <div class="col-md-12">
                            <div class="col-md-5">
                                <h4 class="widget-title draggable" style="margin-top:0">` + num.name + ` </h4>
                                <div class="images-single-flexslider">
                                    <ul class="slides">
                                        <li>
                                            <a class="img-post popup-gallery" href="#"><img src="` + ip + num.content[n].titlePhotoPath + `"
                                                    alt="image"></a>
                                        </li>
                                    </ul>
                                </div><!-- /.images-single-flexslider -->
                            </div><!-- /.col-md-4 -->
                
                            <div class="col-md-7">
                                <h4 class="widget-title float-right" style="font-size:10px;margin:0;"><a href="#">more</a></h4>
                                <div class="flat-about-us">
                                    <h4>` + num.content[n].title + `</h4>
                                    <p>从学习中获得快乐
                                    </p>
                                    <p class="margin-top-25">` + num.content[0].releaseTime + `<span class="float-right">小王</span></p>
                                </div><!-- /.flat-about-us -->
                            </div><!-- /.col-md-4 -->
                        </div>
                        <div class="col-md-12 margin-top-39">
                            <div class="sidebar">
                                <div class="widget widget-recentpost">
                                    <ul class="recentpost">`;
                        n++;

                        $.each(num.content, function (i, item) {
                            txt2 = `      <li class="maxwidth">
    
                            <div class="text">
                                <h6>
                                    <a href="#">` + item.title + `</a>
                                </h6>
                                <p class="mylist"> ` + item.content + `</p>
                            </div>
                            <div class="maxwidth">
                                <span class="float-right">` + item.releaseTime + `</span>
                                <span class="float-right margin-right-40">小王</span>
                            </div>
                        </li>`
                            txt = txt.concat(txt2);
                            sessionStorage.listtxt = txt;
                        })
                    }

                })
                var txt4 = sessionStorage.listtxt;
                // console.log(txt4)
                txt4 = txt4.concat(txt3);

                $("#bg-contant").append(txt4);
            },
            error: function () {}
        });

    }
}

//获取下载列表
const getDownload = {
    "get": function () {
        let txt, txt2, txt3;
        $.ajax({
            url: ip + '/module/get',
            data: {
                userId: id,
            },
            type: 'POST',
            success: function (data) {
                $.each(eval(data), function (k, num) {
                    if (num.type == "文件下载") {
                        let n = 0;
                        txt = `                       <div class="col-md-6">
                        <div class="col-md-12">
                            <div class="col-md-5">
                                <h4 class="widget-title draggable" style="margin-top:0">` + num.name + `</h4>
                            </div><!-- /.col-md-4 -->
                            <div class="col-md-7">
                                <h4 class="widget-title float-right" style="font-size:10px;margin:0;"><a href="#">more</a></h4>
                            </div><!-- /.col-md-4 -->
                        </div>
                        <div class="col-md-12">
                            <div class="sidebar">
                                <div class="widget widget-recentpost">
                                    <ul class="recentpost">              <div class="col-md-12">
                        <div class="sidebar">
                            <div class="widget widget-recentpost">
                                <ul class="recentpost">`;

                        $.each(num.content, function (i, item) {
                            txt2 = `                         <li class="maxwidth">
                            <div class="text">
                                <h6>
                                    <a href="#">` + item.fileName + `</a>
                                </h6>
                            </div>
                            <div class="maxwidth">
                                <a href="#" class="float-right"><span class="glyphicon glyphicon-download-alt"></span></a>
                                <span class="float-right margin-right-40">` + item.uploadTime + `</span>
                                <span class="float-right margin-right-40">小王</span>
                            </div>
                        </li>`
                            txt = txt.concat(txt2);
                            sessionStorage.listfile = txt;
                        })
                    }

                })
                var txt4 = `               </ul><!-- /.recentpost -->
                </div><!-- /.widget-recentpost -->
            </div>
        </div>
    </div>`;
                txt3 = sessionStorage.listfile
                txt3 = txt3.concat(txt4)
                // console.log(txt3)
                $("#bg-contant").append(txt3);
            },
            error: function () {}
        });

    }
}

// 获取单篇文章
const getSingleTxt = {
    "get": function () {
        $.ajax({
            url: ip + '/module/get',
            data: {
                userId: id,
            },
            type: 'POST',
            success: function (data) {
                $.each(eval(data), function (k, num) {
                    console.log(num)
                    if (num.type == "单篇文章") {
                        $.each(num.content, function (i, item) {
                            $("#bg-contant").append(
                                `<div class="col-md-6">
                            
                            <div class="flat-text-content object text-center">
                                <h3 class="title draggable">` + item.title + `</h3>
                                <div> <span">发布人：` + item.description + `</span> <span style="display:none">日期：` + num.releaseTime + `</span></div>
                                <div class="content text-indent" style="text-align: left">
                                ` + item.content + `
                                </div>
                            </div><!-- /.text-content -->
                        </div>`
                            )
                        })


                    }


                });


            }
        })
    }
}

// 获得公告
const getNotice = {
    "get": function () {
        $.ajax({
            url: ip + ``,
            type: 'POST',
            success: function (data) {
                let txt, txt2, txt3;
                txt = `<div class="col-md-2">
                
                <div class="sidebar">
                    <div class="widget widget-recentpost">
                        <h4 class="widget-title draggable">公告 </h4>
                        <div class="float-right"><a href="#">
                                <h4 class="widget-title" style="font-size:10px;">more</h4>
                            </a></div>
                        <ul class="recentpost">`;
                txt3 = `  </ul><!-- /.recentpost -->
                        </div>
                    </div>
                </div>`;
                each(eval(data).obj, function (i, item) {
                    txt2 = `           <li>
                    <div class="thumb entry" style="overflow:hidden;height:50px;width: 50px">
                        <a href="#">
                            <img src="` + ip + +`" alt="image">
                        </a>
                    </div>
                    <div class="text">
                        <h6>
                            <a href="#">`
                    `</a>
                        </h6>
                        <span class="entry-time"></span>
                    </div>
                </li>`
                })
            },
            error: function (e) {}
        })
    }
}