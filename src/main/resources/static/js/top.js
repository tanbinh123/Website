 $(document).ready(function () {
 	//头部大标题部分
 	 var canvasPage3 = document.getElementById("myCanvas");
        canvasPage3.width =1800;
        canvasPage3.height = 142;
        var ctx = canvasPage3.getContext("2d");
        var zhongX=900;
        var zhongY = 70;
        function randomNum(x,y)
        {
            return Math.floor(Math.random() * (y - x + 1) + x);
        }

        function randomColor() {
            return "rgb(" + randomNum(0, 255) + "," + randomNum(0, 255) + "," + randomNum(0, 255) + ")";
        }

        function Ball() {
            this.r = randomNum(0.1, 3);
            this.color = "white";

            this.x = randomNum(this.r, canvasPage3.width - this.r);
            this.y = randomNum(this.r, canvasPage3.height - this.r);

            this.speedX = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
            this.speedY = randomNum(1, 3) * (randomNum(0, 1) ? 1 : -1);
        }

        Ball.prototype.move = function () {
            this.x += this.speedX*0.2;
            this.y += this.speedY*0.2;

            if(this.x<=this.r)
            {
                this.x = this.r;
                this.speedX *= -1;
            }
            if(this.x>=canvasPage3.width -this.r)
            {
                this.x = canvasPage3.width - this.r
                this.speedX *= -1;
            }
            //小球碰到上边界的处理 反弹
            if (this.y <= this.r) {
                this.y = this.r;
                //反弹
                this.speedY *= -1;
            }
            //小球碰到下边界的处理 反弹
            if (this.y >= canvasPage3.height - this.r) {
                this.y = canvasPage3.height - this.r;
                //反弹
                this.speedY *= -1;
            }
        }

        Ball.prototype.draw = function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        var balls = [];
        var arr = [];
        for (var i = 0; i < 0.0002 * canvasPage3.width * canvasPage3.height; i++) {
            var ball = new Ball();
            balls.push(ball);
        }

        setInterval(function () {
            arr = [];
            ctx.clearRect(0, 0, canvasPage3.width, canvasPage3.height);
            for (var i = 0; i < balls.length; i++) {
                balls[i].move();
                balls[i].draw();
                if (ballAndMouse(balls[i]) < 130) {
                    ctx.lineWidth = (130 - ballAndMouse(balls[i])) * 1.5 / 130;
                    ctx.beginPath();
                    ctx.moveTo(balls[i].x, balls[i].y);
                    ctx.lineTo(zhongX, zhongY);
                    ctx.strokeStyle = balls[i].color;
                    ctx.stroke();
                }
            }


            for (var i = 0; i < balls.length; i++) {
                for (var j = 0; j < balls.length; j++) {
                    if (ballAndBall(balls[i], balls[j]) < 80) {
                        ctx.lineWidth = (80 - ballAndBall(balls[i], balls[j])) * 0.6 / 80;
                        ctx.globalAlpha = (130 - ballAndBall(balls[i], balls[j])) * 1 / 80;
                        ctx.beginPath();
                        ctx.moveTo(balls[i].x, balls[i].y);
                        ctx.lineTo(balls[j].x, balls[j].y);
                        ctx.strokeStyle = balls[i].color;
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;

        }, 30);

        canvasPage3.onmousemove = function (event) {
            event = event || window.event;
            zhongX = event.offsetX;
            zhongY = event.offsetY;
        }

        function ballAndMouse(obj) {
            var disX = Math.abs(zhongX - obj.x);
            var disY = Math.abs(zhongY - obj.y);
            return Math.sqrt(disX * disX + disY * disY);
        }
        function ballAndBall(obj1, obj2) {
            var disX = Math.abs(obj1.x - obj2.x);
            var disY = Math.abs(obj1.y - obj2.y);
            return Math.sqrt(disX * disX + disY * disY);
        }
        
        
     //	导航
	var item_main = $(' .li1')
	
	var item_li2 = $('.li2');


	item_main.mouseenter(
     
		function() {
//    	alert(item_li2)
			$(this).children('ul').css('display', 'block');
			$(this).find('a span').css('transform','rotate(180deg)');
			$(this).find('a span').css('-ms-transform','rotate(180deg)');
			$(this).find('a span').css('-moz-transform','rotate(180deg)');
			$(this).find('a span').css('-webkit-transform-transform','rotate(180deg)');
			$(this).find('a span').css('-o-transform','rotate(180deg)');
			

                         if (window.ActiveXObject || "ActiveXObject" in window){
                            $(this).find('a span').css('top','20px');
                         }else{
                             //alert("not ie")
                             $(this).find('a span').css('top','32px');
                          }



		}
	)
	item_main.mouseleave(
		function() {
			$(this).children('ul').css('display', 'none');
			
			$(this).find('a span').css('transform','rotate(0deg)');
			$(this).find('a span').css('-ms-transform','rotate(0deg)');
			$(this).find('a span').css('-moz-transform','rotate(0deg)');
			$(this).find('a span').css('-webkit-transform-transform','rotate(0deg)');
			$(this).find('a span').css('-o-transform','rotate(0deg)');
			$(this).find('a span').css('top','28px');
		})
	$(".li2").click(function(){
		item_main.find('a:first').removeClass('active');
  		$(this).parent().parent().find('a:first').addClass('active');
  });
 })