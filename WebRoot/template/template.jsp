<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String cssPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/template/demo/css";
	String jsPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/template/demo/js";
	String imgPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/template/demo/imgs";
%>
<!DOCTYPE html>
<html>
<head>
<!--STATUS OK-->
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no,minimal-ui">
<meta name="format-detection" content="telephone=no"/>
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="stylesheet" type="text/css" href="<%=cssPath%>/style.css" />
<title>中国电信北京研究院灯塔大数据</title>
<meta name="keywords" content="中国电信北京研究院灯塔大数据" />
<meta name="description" content="中国电信北京研究院灯塔大数据" />

</head>
<body>
	<div id='__liveLayoutContainer'>
		<div class="-live-layout-container row-fuild"
			data-layout-seq="__component_1" data-layout-type="layoutContainer">
			<div class="-live-layout-row" data-layout-seq="__component_2"
				data-layout-type="layoutRow">
				<div class="row-fluid">
					<div class="-live-layout-column span12"
						data-layout-seq="__component_3" data-layout-type="layoutColumn">
						<div class="-live-page-widget">
							<div class="loading" id="j_loading">
								<div class="hide">
									<img
										src="<%=imgPath%>/loadingbgrd.png">
								</div>
								<div class="half_t">
									<h3>
										<span>中国电信北京研究院灯塔大数据</span>
									</h3>								
									<div class="percent">
										<span id="j_percent">0</span>
									</div>
								</div>
								<div class="half_b">
									<div class="logo"></div>
								</div>
							</div>
							<!-- 翻页button -->
							<div class="j_prev">
								<span class="arr_up_icon">向下滑动</span>
							</div>
							<div class="j_next">
								<span class="arr_down_icon ">向上滑动</span>
							</div>
							<div class="back_tips">
								<span>&nbsp;</span>
							</div>
							<aside class="media-wrap">
								<span id="musicBtnTxt" style="display: none;">关闭</span>
								<i id="musicBtn" class="music-btn on"></i>
							</aside>
							<audio src="<%=imgPath%>/YouGotMe.mp3" autoplay="autoplay" loop="loop" id="autoplay"></audio>
							<div id="j_slider" class="main">
								<c:forEach var="sec" items="${sections}" varStatus="status">
									<section class="page hide">
										<div class="bg_layer j_preLoad" 
											style="background-image:url(<c:out value="${sec.picName}"></c:out>);" 
											data-bg="<c:out value="${sec.picName}"></c:out>">
											<c:if test="${!status.last && !status.first}">
												<div class="<c:out value="${sec.animation}"></c:out>">
													<h2><c:out value="${sec.titleName}"></c:out></h2>
													<p>
														<span><c:out value="${sec.subTName}"></c:out></span>
													</p>
												</div>
											</c:if>
										</div>
										<c:if test="${status.first}">
											<div class="p_u_1"></div>
											<div class="p_u_1_cont">
												<div class="p_u_1_txt">
													<h1>海量数据，开放共赢，共同打造大数据生态圈</h1>
													<p>CTBRI DENGTA BIGDATA</p>
												</div>
											</div>
										</c:if>
									</section>
								</c:forEach>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

	<script type="text/javascript">
		var preLoadNum =10;
		
		var audio = document.getElementById('autoplay');
		var controller = document.getElementById('musicBtn');
		var controllerHint = document.getElementById('musicBtnTxt');

		document.getElementById('musicBtn').addEventListener('click', function() {

			controllerHint.style.display = '';
			if (audio.paused) {
				audio.play();
				controller.className = 'music-btn on';
				controllerHint.innerHTML = '开始';
			} else {
				audio.pause();
				controller.className = 'music-btn';
				controllerHint.innerHTML = '关闭';
			}

			setTimeout(function() {
				controllerHint.style.display = 'none';
			}, 1000);

		}, false);
	</script>
	<script src="<%=jsPath%>/zepto.js"></script>
	<script src="<%=jsPath%>/slider.js"></script>
	<script src="<%=jsPath%>/common.js"></script>
	<script src="<%=jsPath%>/chart.min.js"></script>

</body>
</html>