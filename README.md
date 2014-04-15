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


### Javasript-API

##### var updateFN = VLEX(element, &lt;options&gt;)
the main function of VLEX. Call it to init VLEX.

| Parameter   | Type        | Description  |
:-- | :-- | :--
| element     | DOM-Node, ID-String or null | Pass a DOM-Node or its ID-String to start VLEX. Pass *null* to stop VLEX |
| options     | Object      |  pass a options object to change VLEXs behaviour |

| Option   | Type        | Default  | Description  |
:-- | :-- | :-- | :--
| onresize		| Boolean	| true		|  auto-update on resize-event |
| onmousemove	| Boolean	| false		|  auto-update on mousemove-event  |
| $				| Object	| undefined	|  properties of *$* are available in vlexpressions via dollar-sign|


##### updateFN(&lt;force&gt;)
the return value of VLEXs main function is a update-function. Call it to trigger an update.

| Parameter   | Type        | Description  |
:-- | :-- | :--
| force     | Boolean | the vlexpressions are cached. So you have to pass *true* if you want to have them reevaluated (e.g. after changing a expresssion or after adding an new node with a vlexpressions)|

### DOM-API (Vlexpressions)

##### vlex="&lt;prop1:&lt;string&gt;&lt;{flexpression1}&gt;&lt;string&gt;...;&gt;&lt;prop2:...;"

SVG-Nodes with a '__velx__' attribute are getting handeld on a VLEX update.

The value of the '__vlex__' attribute is called '__vlexpression__' and consists of one or more '__property-descriptions__' seperated by a __semicolon__ '__;__'. '__Key__' and  '__value__' of a property description have to be seperated by a colon '__:__'. The key of a property description maps its evaluated value to the native SVG-attribute with the same name.

The value of a property description can consist of one or more __strings__ and/or __eval-statements__ (inside curly braces '__{}__'). eval-statements get evaluated on update. All eval-statements and strings of a property description get concatenated to a single string that is passed to the native SVG attribute.

The __dollar sign__ '__$__' gives access to predefined values. Userdefined values and functions can be assigned to '$' before or during an update. The property-accessor point '__$.prop__' gets added on the compilation of a vlexpression.

All properties and functions of Javascripts '__Math__' are available just by calling theír name (e.g. 'min()','max()','PI',...)

| Parameter   | Type        | Description  |
:-- | :-- | :--
| force     | Boolean | the vlexpressions are cached. So you have to pass *true* if you want to have them recompiled (e.g. after changing a vlexpressions or after adding an new node with a vlexpressions)|

##### $

| $param   | Default  | Description  |
:-- | :-- | :--
| $x,$y    | element.clientWidth, element.clientHeight | normaly the with/height of the outermost svg |
| $cX,$cY      | $x/2, $y/2 | the horizontal/vertical center |
| $mX, $mY     | -99999 | the mouseposition; gets updated if onmouse is set *true* in options |


##### Compilation Examples

```javascript
// for element.clientWidth == 400 and element.clientheight == 300

vlex="r:100"
>>>
r		<-- eval("100")

vlex="r:{100}"
>>>
r		<-- eval(""+(100)+"" )

vlex="r:{100*2}"
>>>
r		<-- eval(""+(100*2)+"" )

vlex="r:{100*PI}"
>>>
r		<-- eval(""+(100*Math.PI)+"" )

vlex="r:{min(100,90)}"
>>>
r		<-- eval(""+(Math.min(100,90))+"") // 90

vlex="r:{$x/2}"
>>>
r		<-- eval(""+($.x/2)+"") // 200

vlex="r:200;cx:{$cX};cy:{floor(2.3)*100}"
>>>
r		<-- eval("200") // 200
cx		<-- eval(""+($.cX)+"") // 200
cy		<-- eval(""+(Math.floor(2.3)*100)+"") // 200 

vlex="r:{$custom = $x/4};cx:{$cX};cy:{$custom}"
>>>
r		<-- eval(""+($.custom = $.x/4)+"") // 100
cx		<-- eval(""+($.cX)+"") // 200
cy		<-- eval(""+($.custom)+"") // 100 

vlex="points:0,100,{$cX},{$cY+100}"
>>>
points	<-- eval("0,100,"+($.cX)+","+($.cY+100)+"") // 0,100,200,250   

vlex="points:{0},{100},{$cX},{$cY+100}"
>>>
points	<-- eval("0,100,"+($.cX)+","+($.cY+100)+"") // 0,100,200,250

vlex="points:{[0,100,$cX,$cY+100].join(',')}"
>>>
points	<-- eval(""+([0,100,$.cX,$.cY+100].join(','))+"") // 0,100,200,250  // 0,100,200,250

vlex="d:M100,{$cY} Q{max(100,$cX-200)},200 {$cX},{$cY}"
>>>
d		<-- eval("M100,"+($.cY)+" Q"+(Math.max(100,$.cX-200))+",200 "+($.cX)+","+($.cY)+"") // M100,150 Q100,200 200,150 

```



