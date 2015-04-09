function createOrRefreshChart(obj){
	if(obj == null) return;
	var ctx = document.getElementById(obj.id).getContext("2d");
	var pre= 'line'+obj.id;
	if(window[pre] == null || typeof(window[pre]) == undefined){
		window[pre] = new Chart(ctx).Line(lineChartData, {
			responsive: true,
			animationSteps : 80,
		});
	}else {
		window[pre].render();
	}
}

var homeURL='http://219.141.189.113:8080/dengta/home.html';
var card = {
	_events : {},
	_windowHeight : function() {
		return $(window).height()
	},
	_windowWidth : function() {
		return $(window).width()
	},
	_elementStyle : document.createElement("div").style,
	_page : $(".page"),
	_pageNum : $(".page").size(),
	_loading : $("#j_loading"),
	_percent : $("#j_percent"),
	_preLoadNum : preLoadNum,
	_touchEndCallback : "",
	_preLoadPics : [],
	_pageNow : 0,
	_pageNext : null,
	_touchStartValY : 0,
	_touchDeltaY : 0,
	_moveStart : true,
	_movePosition : null,
	_movePosition_c : null,
	_mouseDown : false,
	_moveFirst : true,
	_moveInit : false,
	_firstChange : false,
	_vendor : function() {
		var g = [ "t", "webkitT", "MozT", "msT", "OT" ], e, h = 0, f = g.length;
		for (; h < f; h++) {
			e = g[h] + "ransform";
			if (e in this._elementStyle) {
				return g[h].substr(0, g[h].length - 1)
			}
		}
		return false
	},
	_prefixStyle : function(b) {
		if (this._vendor() === false) {
			return false
		}
		if (this._vendor() === "") {
			return b
		}
		return this._vendor() + b.charAt(0).toUpperCase() + b.substr(1)
	},
	_hasPerspective : function() {
		var b = this._prefixStyle("perspective") in this._elementStyle;
		if (b && "webkitPerspective" in this._elementStyle) {
			this._injectStyles(
							"@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
							function(a, d) {
								b = a.offsetLeft === 9 && a.offsetHeight === 3
							})
		}
		return !!b
	},
	_translateZ : function() {
		if (card._hasPerspective) {
			return " translateZ(0)"
		} else {
			return ""
		}
	},
	_injectStyles : function(o, m, v, n) {
		var w, q, t, s, x = document.createElement("div"), r = document.body, u = r
				|| document.createElement("body"), p = "modernizr";
		if (parseInt(v, 10)) {
			while (v--) {
				t = document.createElement("div");
				t.id = n ? n[v] : p + (v + 1);
				x.appendChild(t)
			}
		}
		w = [ "&#173;", '<style id="s', p, '">', o, "</style>" ].join("");
		x.id = p;
		(r ? x : u).innerHTML += w;
		u.appendChild(x);
		if (!r) {
			u.style.background = "";
			u.style.overflow = "hidden";
			s = docElement.style.overflow;
			docElement.style.overflow = "hidden";
			docElement.appendChild(u)
		}
		q = m(x, o);
		if (!r) {
			u.parentNode.removeChild(u);
			docElement.style.overflow = s
		} else {
			x.parentNode.removeChild(x)
		}
		return !!q
	},
	_handleEvent : function(f) {
		if (!this._events[f]) {
			return
		}
		var d = 0, e = this._events[f].length;
		if (!e) {
			return
		}
		for (; d < e; d++) {
			this._events[f][d].apply(this, [].slice.call(arguments, 1))
		}
	},
	_on : function(c, d) {
		if (!this._events[c]) {
			this._events[c] = []
		}
		this._events[c].push(d)
	},
	_scrollStop : function() {
		$(window).on("touchmove.scroll", this._scrollControl);
		$(window).on("scroll.scroll", this._scrollControl)
	},
	_scrollStart : function() {
		$(window).off("touchmove.scroll");
		$(window).off("scroll.scroll")
	},
	_scrollControl : function(b) {
		b.preventDefault()
	},
	page_start : function() {
		card._page.on("touchstart mousedown", card.page_touch_start);
		card._page.on("touchmove mousemove", card.page_touch_move);
		card._page.on("touchend mouseup", card.page_touch_end)
	},
	page_stop : function() {
		card._page.off("touchstart mousedown");
		card._page.off("touchmove mousemove");
		card._page.off("touchend mouseup")
	},
	page_touch_start : function(b) {
		if (!card._moveStart) {
			return
		}
		if (!window.webLimit || !webLimit) {
			return false
		}
		if (b.type == "touchstart") {
			card._touchStartValY = window.event.touches[0].pageY
		} else {
			card._touchStartValY = b.pageY || b.y;
			card._mouseDown = true
		}
		card._moveInit = true;
		card._handleEvent("start")
	},
	page_touch_move : function(h) {
		h.preventDefault();
		if (!card._moveStart) {
			return
		}
		if (!card._moveInit) {
			return
		}
		if (!window.webLimit || !webLimit) {
			return false
		}
		var g = card._page.eq(card._pageNow), f, e = null;
		if (h.type == "touchmove") {
			f = window.event.touches[0].pageY
		} else {
			if (card._mouseDown) {
				f = h.pageY || h.y
			} else {
				return
			}
		}
		e = card.page_position(h, f, g);
		card.page_translate(e);
		card._handleEvent("move")
	},
	page_position : function(j, e, i) {
		var h, l;
		if (e != "undefined") {
			card._touchDeltaY = e - card._touchStartValY
		}
		card._movePosition = card._touchDeltaY > 0 ? "down" : "up";
		if (card._movePosition != card._movePosition_c) {
			card._moveFirst = true;
			card._movePosition_c = card._movePosition
		} else {
			card._moveFirst = false
		}
		if (card._touchDeltaY <= 0) {
			if (i.next(".page").length == 0) {
				card._pageNext = 0
			} else {
				card._pageNext = card._pageNow + 1
			}
			l = card._page.eq(card._pageNext)[0]
		} else {
			if (i.prev(".page").length == 0) {
				if (card._firstChange) {
					card._pageNext = card._pageNum - 1
				} else {
					return
				}
			} else {
				card._pageNext = card._pageNow - 1
			}
			l = card._page.eq(card._pageNext)[0]
		}
		h = card._page.eq(card._pageNow)[0];
		node = [ l, h ];
		if (card._moveFirst) {
			k(node)
		}
		function k(a) {
			card._page.removeClass("action");
			$(a[1]).addClass("action").removeClass("hide");
			card._page.not(".action").addClass("hide");
			card.height_auto(card._page.eq(card._pageNext));
			$(a[0]).removeClass("hide").addClass("active");
			var c = Math.max($(window).height(), $(a[0]).height()), b = card
					._translateZ();
			if (card._movePosition == "up") {
				a[0].style[card._prefixStyle("transform")] = "translate(0," + c
						+ "px)" + b;
				$(a[0]).attr("data-translate", c);
				$(a[1]).attr("data-translate", 0)
			} else {
				a[0].style[card._prefixStyle("transform")] = "translate(0,-"
						+ c + "px)" + b;
				$(a[0]).attr("data-translate", -c);
				$(a[1]).attr("data-translate", 0)
			}
		}
		return node
	},
	page_translate : function(k) {
		if (!k) {
			return
		}
		var g = card._translateZ(), i = card._touchDeltaY, l, h, j;
		if ($(k[0]).attr("data-translate")) {
			l = i + parseInt($(k[0]).attr("data-translate"))
		}
		k[0].style[card._prefixStyle("transform")] = "translate(0," + l + "px)"
				+ g;
		if ($(k[1]).attr("data-translate")) {
			h = i + parseInt($(k[1]).attr("data-translate"))
		}
		j = 1 - Math.abs(i * 0.2 / $(window).height());
		h = h * 0.2;
		k[1].style[card._prefixStyle("transform")] = "translate(0," + h + "px)"
				+ g + " scale(" + j + ")"
	},
	page_touch_end : function(b) {
		card._moveInit = false;
		card._mouseDown = false;
		if (!card._moveStart) {
			return
		}
		if (!card._pageNext && card._pageNext != 0) {
			return
		}
		card._moveStart = false;
		if (Math.abs(card._touchDeltaY) > 10) {
			card._page.eq(card._pageNext)[0].style[card
					._prefixStyle("transition")] = "all .3s";
			card._page.eq(card._pageNow)[0].style[card
					._prefixStyle("transition")] = "all .3s"
		}
		if (Math.abs(card._touchDeltaY) >= 100) {
			card.page_success()
		} else {
			card.page_fial()
		}
		card._handleEvent("end");
		card._movePosition = null;
		card._movePosition_c = null;
		card._touchStartValY = 0
	},
	page_success : function() {
		var e = card._translateZ();
		card._page.eq(card._pageNext)[0].style[card._prefixStyle("transform")] = "translate(0,0)"
				+ e;
		var f = card._touchDeltaY > 0 ? $(window).height() * 0.2 : -$(window)
				.height() * 0.2;
		var d = 1 - 0.2;
		card._page.eq(card._pageNow)[0].style[card._prefixStyle("transform")] = "translate(0,"
				+ f + "px)" + e + " scale(" + d + ")";
		if (card._pageNext == card._page.length - 1) {
			$(card._page[card._page.length - 1]).on('click',function(){window.location.href=homeURL;});
			if ($(".back_tips").length > 0) {
				if (window.history.length > 1) {
					$(".back_tips").show();
				}
			}
		} else {
			if ($(".back_tips").length > 0) {
				$(".back_tips").hide();
			}
		}
		card._handleEvent("success");
		createOrRefreshChart(card._page.eq(card._pageNext).find('canvas')[0]);
	},
	page_fial : function() {
		var b = card._translateZ();
		if (!card._pageNext && card._pageNext != 0) {
			card._moveStart = true;
			card._moveFirst = true;
			return
		}
		if (card._movePosition == "up") {
			card._page.eq(card._pageNext)[0].style[card
					._prefixStyle("transform")] = "translate(0,"
					+ $(window).height() + "px)" + b
		} else {
			card._page.eq(card._pageNext)[0].style[card
					._prefixStyle("transform")] = "translate(0,-"
					+ $(window).height() + "px)" + b
		}
		card._page.eq(card._pageNow)[0].style[card._prefixStyle("transform")] = "translate(0,0)"
				+ b + " scale(1)";
		card._handleEvent("fial")
	},
	haddle_envent_fn : function() {
		card._on("start", card.lazy_third_pic);
		card._on("move", function() {
		});
		card._on("end", function() {
		});
		card._on("fial", function() {
			setTimeout(function() {
				card._page.eq(card._pageNow).attr("data-translate", "");
				card._page.eq(card._pageNow)[0].style[card
						._prefixStyle("transform")] = "";
				card._page.eq(card._pageNow)[0].style[card
						._prefixStyle("transition")] = "";
				card._page.eq(card._pageNext)[0].style[card
						._prefixStyle("transform")] = "";
				card._page.eq(card._pageNext)[0].style[card
						._prefixStyle("transition")] = "";
				card._page.eq(card._pageNext).removeClass("active").addClass(
						"hide");
				card._moveStart = true;
				card._moveFirst = true;
				card._pageNext = null;
				card._touchDeltaY = 0;
				card._page.eq(card._pageNow).attr("style", "")
			}, 300)
		});
		card._on("success", function() {
			if (card._pageNext == 0 && card._pageNow == card._pageNum - 1) {
				card._firstChange = true
			}
			setTimeout(function() {
				if (card._pageNext == card._pageNum - 1) {
					$(".u-arrow").addClass("hide")
				} else {
					$(".u-arrow").removeClass("hide")
				}
				card._page.eq(card._pageNow).addClass("hide");
				card._page.eq(card._pageNow).attr("data-translate", "");
				card._page.eq(card._pageNow)[0].style[card
						._prefixStyle("transform")] = "";
				card._page.eq(card._pageNow)[0].style[card
						._prefixStyle("transition")] = "";
				card._page.eq(card._pageNext)[0].style[card
						._prefixStyle("transform")] = "";
				card._page.eq(card._pageNext)[0].style[card
						._prefixStyle("transition")] = "";
				card._page.eq(card._pageNext).removeClass("active");
				card._pageLast = card._pageNow;
				card._pageNow = card._pageNext;
				card._moveStart = true;
				card._moveFirst = true;
				card._pageNext = null;
				card._page.eq(card._pageNow).attr("style", "");
				card._page.eq(card._pageNow).attr("data-translate", "");
				card._touchDeltaY = 0;
				card._touchEndCallback
						&& card
								._touchEndCallback(card._pageNow,
										card._pageLast);
				setTimeout(function() {
					var f = card._page.eq(card._pageNow).find(".j_moniter");
					if (f.length > 0) {
						f.each(function() {
							if ($(this).data("src")) {
								var g = new Image();
								g.src = $(this).data("src")
							}
						})
					}
					if (window.SUDA) {
						SUDA.log && SUDA.log("", "", "page:" + card._pageNow)
					}
				}, 20)
			}, 300);
			if (card._pageNow + card._preLoadNum <= card._page.length) {
				var e = card._page.eq(card._pageNow + card._preLoadNum), b = e
						.find(".j_preLoad"), a = b.length;
				for ( var c = 0; c < a; c++) {
					if (b.eq(c).data("bg")) {
						var d = new Image();
						d.src = b.eq(c).data("bg")
					}
					b.eq(c).removeClass("j_preLoad")
				}
			}
		})
	},
	lazy_start : function() {
		setTimeout(function() {
			for ( var d = 0; d < 3; d++) {
				var c = $(".m-page").eq(d);
				if (c.length == 0) {
					break
				}
				if (c.find(".lazy-img").length != 0) {
					card.lazy_images(c)
				} else {
					continue
				}
			}
		}, 200)
	},
	lazy_third_pic : function() {
		var d = 3;
		var c = $(".m-page").eq(card._pageNow + d);
		if (c.length == 0) {
			return false
		}
		if (c.find(".lazy-img").length != 0) {
			card.lazy_images(c)
		}
	},
	lazy_images : function(d, f) {
		var e = d.find(".lazy-img");
		e.each(function() {
			var c = $(this), a = c.attr("data-src"), h = c
					.attr("data-position"), b = c.attr("data-size");
			$("<img />").on("load", function() {
				if (c.is("img")) {
					c.attr("src", a)
				} else {
					c.css({
						"background-image" : "url(" + a + ")",
						"background-position" : h,
						"background-size" : b
					})
				}
			}).attr("src", a);
			c.removeClass("lazy-img").addClass("lazy-finish")
		})
	},
	height_auto : function(b) {
		b.css({
			height : card._windowHeight(),
			width : card._windowWidth()
		})
	},
	styleInit : function() {
		document.body.style.userSelect = "none";
		document.body.style.mozUserSelect = "none";
		document.body.style.webkitUserSelect = "none";
		$(".j_next").on("touchmove", function(b) {
			b.preventDefault()
		})
	},
	preLoad : function() {
		var e = Math.min(card._preLoadNum, card._pageNum), h = 0, d = 0;
		for ( var f = 0; f < e; f++) {
			var b = card._page.eq(f).find(".j_preLoad"), a = b.length;
			card._preLoadPics[f] = [];
			for ( var c = 0; c < a; c++) {
				if (b.eq(c).data("bg")) {
					card._preLoadPics[f].push(b.eq(c).data("bg"));
					h++
				}
				b.eq(c).removeClass("j_preLoad")
			}
		}
		for ( var f = 0; f < e; f++) {
			for ( var c = 0; c < card._preLoadPics[f].length; c++) {
				var g = new Image();
				g.src = card._preLoadPics[f][c];
				g.onload = function() {
					d++;
					if (d == h) {
						card._percent.html(100);
						card._page.eq(0).removeClass("hide");
						card._loading.children().addClass("open");
						setTimeout(function() {
							card._loading.addClass("hide");
							createOrRefreshChart(card._page.find('canvas')[0]);
							setTimeout(function() {
								card.styleInit();
								card.haddle_envent_fn();
								card.page_start();
								card.lazy_start();
							}, 200)
						}, 1000)
					} else {
						card._percent.html(Math.floor(d / h * 100))
					}
				}
			}
		}
	},
	init : function() {
		card._touchEndCallback = function(d, c) {
			card._page.eq(c).find("video").forEach(function(a) {
				a.pause()
			})
		};
		card.preLoad()
	}
};
$(function() {
	function h() {
		if ($(".j_audio").length == 0) {
			return
		}
		var d = $(".j_audio"), c = d.data("audiourl"), f = d.find(".j_open"), p = d
				.find(".j_close"), a = document.createElement("audio");
		a.src = c;
		a.addEventListener("ended", function() {
			a.play()
		}, false);
		var e = navigator.userAgent.toLowerCase();
		if (/ipad|iphone|mac/i.test(e) && e.indexOf("micromessenger") == -1) {
			p.show();
			f.hide();
			a.isplay = false
		} else {
			a.play();
			f.show();
			p.hide();
			a.isplay = true
		}
		f.on("click", function() {
			a.pause();
			f.hide();
			p.show();
			a.isplay = false
		});
		p.on("click", function() {
			a.play();
			f.show();
			p.hide();
			a.isplay = true
		})
	}

	webLimit = (function() {
		var e = location.host, a = "ina.", c = "cn", d = a + c;
		if (e.indexOf(d) != -1) {
			return true
		} else {
			return true
		}
	})();
	var m = null, k = "onorientationchange" in window ? "orientationchange"
			: "resize";
	window.addEventListener(k, function() {
		if (m) {
			clearTimeout(m);
			m = null
		}
		m = setTimeout(function() {
			window.scrollTo(0, 0);
		}, 600)
	}, false);
	function i() {
		function a() {
			var c = navigator.userAgent.toLowerCase();
			if (c.match(/MicroMessenger/i) == "micromessenger") {
				return true
			} else {
				return false
			}
		}
		if (!a()) {
			$(".j_share_wx").hide()
		}
		$(".j_share_wx").click(function(c) {
			$(".j_share_bg").show();
			c.preventDefault()
		});
		$(".j_share_bg").click(function() {
			$(this).hide()
		});
	}
	setTimeout(function() {
		window.scrollTo(0, 1);
		card.init();
		i();
		h();
	}, 500);
	function l(a) {
		if (undefined == a || "" == a) {
			return ""
		}
		return b(document.cookie, a, ";", "")
	}
	function b(q, c, f, d) {
		if (q == "") {
			return ""
		}
		d = (d == "") ? "=" : d;
		c += d;
		var p = q.indexOf(c);
		if (p < 0) {
			return ""
		}
		p += c.length;
		var a = q.indexOf(f, p);
		if (a < p) {
			a = q.length
		}
		return q.substring(p, a)
	}
});