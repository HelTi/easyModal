/**
 * Created by Administrator on 2016/11/6 0006.
 */

+(function ($, window) {
    'use strict';
    var modal = function (ele, opt) {
        this.defaults = {
            closeele: '',  //关闭模态框按钮
            content: '', //自定义模态框内容
            animatecss: '', //css3动画
            width: $(window).width() > 800 ? 800 : $(window).width(), //模态框的宽度
            height: $(window).height() > 600 ? 600 : $(window).height()//模态框的高度
        };
        this.top = ($(window).height() - (this.defaults.height)) / 2 < 0 ? 0 : ($(window).height() - (this.defaults.height)) / 2;
        this.left = ($(window).width() - (this.defaults.width)) / 2 < 0 ? 0 : ($(window).width() - (this.defaults.width)) / 2;
        this.options = $.extend({}, this.defaults, opt);
        this.$modal = null;
        this.$super = null;
        this.$body = $(document.body);
        this.$element = $(ele);
    };
    modal.prototype = {
        init: function () {
            var that = this;
            $(that.options.content).css("display", "none");
            that.$modal = $(document.createElement('div'));
            that.$modal.addClass("modal");
            that.$modal.css({
                "top":-(that.top +that.options.height + 20)
            });
            that.$body.append(that.$modal);
            that.$super = $('<div id="super"></div>');
            //点击执行，打开模态框
            this.$element.on("click", function () {
                that.$body.append(that.$super);
                that.openModal();
            });
            //关闭按钮
            if (that.options.closeele) {
                $(document).on("click", that.options.closeele, function () {
                    that.closeModal();
                });
            }
            //点击背景框 关闭模态框
            $(document).on("click", "#super", function () {
                $(".modal").hide();
                $(this).remove();
            })
        },
        //打开事件
        openModal: function () {
            var _this = this;
            var that = this;
            $(that.options.content).css("display", "none");
            that.$modal = $(document.createElement('div'));
            that.$modal.addClass("modal");
            that.$modal.css({
                "top":-(that.top +that.options.height)
            });
            that.$body.append(that.$modal);
            that.$super = $('<div id="super"></div>');
            _this.$modal.append($(_this.options.content));
            $(_this.options.content).css("display", "block");

            //设置一个定时器，否则没有动画效果
            setTimeout(function(){
                _this.$modal.css({
                    width: _this.options.width,
                    height: _this.options.height,
                    top: _this.top,
                    left: _this.left,
                    position: "relative",
                    "z-index": 999,
                    "border": "1px solid #ddd"
                }).addClass("moanimate");

            },100)

        },
        //关闭事件
        closeModal: function () {
            $("#super").remove();
            this.$modal.css("display","none");
        }
    };
    $.fn.modal = function (opt) {
        var md = new modal(this, opt);
        md.init();
        return this;
    }

})(jQuery, window);