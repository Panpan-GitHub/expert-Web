// 列表多图
// 获取所有图片
$("#imglist").click(function () {
    $.ajax({
        url:'',
        type:'',
        success:function (data) {
            $.each(data,function (i,item) {
                $("#mypic").append( 
               `<option class="maxwidth-80" data-img-src='`+ item.img +`' value='1'>`+ item.src +`</option>`)
            })
        },
        error:function (e) {

        }
});
});

$("#useimg").click(addImgList());
function addImgList() {
    const imgList = {
        "title": 0,
        "img": $("#mypic option:selected"),
        "data": 0,
        "content": 0,
        "txt":"<!-- imglist -->",
        "txt1": ` <div class="col-md-12">
        <div class="col-md-6 col-md-offset-3">
            <div class="title-section">
                <h2 class="title"><span class="typo">&amp;</span>`+title+`</h2>
            </div>
        </div>
        <div class="col-md-12">
        <div class="blog-carousel-slider post-wrap">
        ` ,

        "txt2": `</div>
        </div>
    </div>`
    ,
       
        "add": function () {
            $.ajax({
                url:'',
                type:'',
                success:function (data) {
                    $.each(data,function (i,item) {
                        this.txt+=`   
                        <article class="entry object">
                            <div class="feature-post ">
                                <a class="img-post" href="blog-single.html">
                                    <img src="images/blog/11.jpg" alt="image">
                                </a>
                            </div><!-- /.feature-post -->
                            <div class="main-post">
                                <h3 class="entry-title"><a href="blog-single.html">Fresh and Cool This
                                        Summer</a></h3>
                                <div class="entry-meta">
                                    <span class="entry-time">April 24, 2017</span>
                                </div>
                                <div class="entry-content">Did you know that manufacturers recommend
                                    checking
                                    your Climate Control Air Conditioning systems every two years to help
                                    keep
                                    your...
                                </div>
                            </div><!-- /.main-post -->
                        </article><!-- /.entry -->
        `
                    });
                },
                error:function (e) {

                }
            });
            // 遍历内容
            $("#imglist").append(

            )
        },
        // 组合内容
        "addTxt" : function () {
            $("#bg-contant").append(txt1+txt);
        },
    };
}