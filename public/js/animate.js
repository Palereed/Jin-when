particlesJS('AnimateContain',
  { 
    "particles": {
      "number": {
        "value": 20,
        "density": {     //密度
          "enable": false,
          "value_area": 300
        }
      },
      "color": {
        "value": "#d2d8da"  //球颜色。
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#aaa"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 1,
          "sync": false
        }
      },
      "size": {
        "value": 12,   //球大小
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "value_min": 10,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 500,
        "color": "#e0e5e7",  //线条颜色
        "opacity": 1,     //线条透明度
        "width": 1        //线条宽度
      },
      "move": {
        "enable": true,
        "speed": 2,      //移动速度
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,   //鼠标移动动画
          "mode": "grab"
        },
        "onclick": {
          "enable": false,  //鼠标点击动画
          "mode": "push"
        },
        "resize": true
      },
      //以下为各个动画效果参数
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 200,
          "size": 12,
          "duration": 1,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 100 
        },
        "push": {
          "particles_nb": 3
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);