![logo](https://raw.githubusercontent.com/indus/VLEX/master/footage/logo.png)

### Quickstart

The most simple way to use VLEX:
```html
<html>
<head>
    <script src="path/to/vlex.js"></script>
</head>
<body>
    <div id="firefoxFix" style="width:400px; height:300px; border:1px solid #000">
        <svg id="vlex" width="100%" height="100%" onload="VLEX(vlex)">	<!-- call VLEX inline -->
            <circle r="100" vlex="cx:{$cX};cy:{$cY}"></circle>			<!-- use vlex attribute -->
        </svg>
    </div>
</body>
</html>
```

(the surrounding div is necessary to fix firefox bug [#874811](https://bugzilla.mozilla.org/show_bug.cgi?id=874811))

### VLEXamples
#### 1. Basic
1. [circle centered](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/1_circle.html)
2. [circle centered with dynamic radius](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/2_circleDynamicRadius.html)
3. [circle centered with dynamic minmax radius](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/3_circleDynamicMinMaxRadius.html)
4. [partial stage](http://rawgit.com/indus/VLEX/master/vlexamples/4_circleDynamicMinMaxRadiusHalf.html)
5. [polygon](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/5_polygon.html)
6. [path](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/6_path.html)
7. [complex](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/7_complex.html)

#### 2. Advanced
1. [pure SVG](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/1_pureSVG.svg)
2. [custom variable](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/2_customVar.html)
3. [custom function](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/3_customFunc.html)
4. [custom trigger](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/4_customTrigger.html)

#### 3. Mouse
1. [circle under mouse](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/1_circle.html)
1. [path end under mouse](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/2_path.html)
1. [ellipse size](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/3_ellipse.html)
1. [circle stroke](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/4_circleStrokeDash.html)


### API

