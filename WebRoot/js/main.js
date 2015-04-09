var $input = null;
var $innerJslider = null;
var imageHolder = null;
var $iframeDoc =null;
var dateHolder = new Date().getTime();
// custom footer template for the scenario
// the custom tags are in braces
var footerTemplate = '<div class="file-thumbnail-footer">\n' +
'   <div style="margin:5px 0">\n' +
'       <input class="kv-input kv-init form-control input-sm" value="{caption}" readonly="readonly" name="picName-{caption}">\n' +
'       <input class="kv-input kv-init form-control input-sm list-group-item-success" placeHolder="{TAG_VALUE_TITLE}" name="titleName-{caption}">\n' +
'       <input class="kv-input kv-init form-control input-sm list-group-item-info" placeHolder="{TAG_VALUE_SUBT}" name="subTName-{caption}">\n' +
'		<select class="kv-input kv-init form-control input-sm list-group-item-warning" name="animation-{caption}">{TAG_VALUE_ANIMATE}</select>\n' +
'   </div>\n' +
'   {actions}\n' +
'</div>';
$(function(){
	$innerJslider = $("#inner").contents().find("#j_slider");
	$input = $("#inputItems");
	$iframeDoc = $("#inner").contents();
	$input.fileinput({
		uploadUrl: "http://localhost:8080/BeaconMobile/ProductServlet", // server upload action
		uploadAsync: false,
		overwriteInitial: false,
		minFileCount: 2,
		maxFileCount: 5,
		layoutTemplates: {
			footer: footerTemplate,
			actions: '<div class="file-actions">\n' +
			'    <div class="file-footer-buttons">\n' +
			'       {delete}'+
			'    </div>\n' +
			'    <div class="file-upload-indicator" tabindex="-1" title="{indicatorTitle}">{indicator}</div>\n' +
			'    <div class="clearfix"></div>\n' +
			'</div>'
		},
		previewThumbTags: {
			'{TAG_VALUE_TITLE}': '主标题名称',        // no value
			'{TAG_VALUE_SUBT}': '副标题名称',        // no value
			'{TAG_VALUE_ANIMATE}':'<option value="l_r_t">右侧飞入</option><option value="l_r_b">左侧飞入</option><option value="l_r_b">下方飞入</option><option value="l_r_b">上方飞入</option>'
		},
		initialPreview: [],
		initialPreviewConfig: [],
		initialPreviewThumbTags: [],
		uploadExtraData: function() {  // callback example
			var out = {}, key, i = 0;
	    	  $('.kv-input:visible').each(function() {
	    		  $el = $(this);
	    		  key = $el.attr('name');
	    		  out[key] = $el.val();
	    		  i++;
	    	  });
	    	  out["timeId"]=dateHolder;
	    	  return out;
	      }
	});
	
	$input.on('filebatchselected', function(event, files) {
		imageHolder = files;
	});
	$input.on('filecleared', function(event) {
		imageHolder = null;
	});
});
function preViewer(){
	if(imageHolder == null) return;
	$("#inner").attr("src","customs/"+dateHolder+"/template.html");
	
}
/*<div id="divPreview">
     <img id="imgHeadPhoto" src="Images/Headphoto/noperson.jpg" style="width: 160px; height: 170px;border: solid 1px #d2e2e2;" alt="" />
</div>
<asp:FileUpload ID="fuHeadPhoto" runat="server" onchange="PreviewImage(this,'imgHeadPhoto','divPreview')" size="20" />*/
//js本地图片预览，兼容ie[6-11]、火狐、Chrome17+、Opera11+、Maxthon3+、360浏览器、百度浏览器
function PreviewImage(fileObj, imgPreviewId, divPreviewId) {
    var allowExtention = document.getElementById("hfAllowPicSuffix").value; //.jpg,.bmp,.gif,.png,允许上传文件的后缀名
    var extention = fileObj.value.substring(fileObj.value.lastIndexOf(".") + 1).toLowerCase(); //获取当前上传文件的扩展名
    var browserVersion = window.navigator.userAgent.toUpperCase();
    if (allowExtention.indexOf(extention) > -1) {
        if (fileObj.files) {//兼容chrome、火狐7+、360浏览器5.5+等，应该也兼容ie10，HTML5实现预览
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(imgPreviewId).setAttribute("src", e.target.result);
                };
                reader.readAsDataURL(fileObj.files[0]);
            } else if (browserVersion.indexOf("SAFARI") > -1) {
                alert("不支持Safari浏览器6.0以下版本的图片预览!");
            } else {
                alert("不支持您当前使用的浏览器的图片预览!");
            }
        } else if (browserVersion.indexOf("MSIE") > -1) {//ie、360低版本预览
            if (browserVersion.indexOf("MSIE 6") > -1) {//ie6
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.value);
            } else {//ie[7-9]
                fileObj.select();
                if (browserVersion.indexOf("MSIE 9") > -1) {
                    //fileObj.blur(); //不加上document.selection.createRange().text在ie9会拒绝访问
                    document.getElementById(divPreviewId).focus(); //参考http://gallop-liu.iteye.com/blog/1344778
                }
                var newPreview = document.getElementById(divPreviewId + "New");
                if (newPreview == null) {
                    newPreview = document.createElement("div");
                    newPreview.setAttribute("id", divPreviewId + "New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width + "px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height + "px";
                    newPreview.style.border = "solid 1px #d2e2e2";
                }
                newPreview.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                var tempDivPreview = document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview, tempDivPreview);
                tempDivPreview.style.display = "none";
            }
        } else if (browserVersion.indexOf("FIREFOX") > -1) {//firefox
            var firefoxVersion = parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if (firefoxVersion < 7) {//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src", fileObj.files[0].getAsDataURL());
            } else {//firefox7.0+                    
                document.getElementById(imgPreviewId).setAttribute("src", window.URL.createObjectURL(fileObj.files[0]));
            }
        } else {
            alert("不支持您当前使用的浏览器的图片预览!");
        }
    } else {
        alert("仅支持" + allowExtention + "为后缀名的文件!");
        fileObj.value = ""; //清空选中文件
        if (browserVersion.indexOf("MSIE") > -1) {
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML = fileObj.outerHTML;
    }
}