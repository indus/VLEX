![logo](https://raw.githubusercontent.com/indus/VLEX/master/footage/logo.png)

### About
SVG is deemed to be the holy grail for graphics in resposive web design! But are they really?!

Yes and No. Beeing "scalable" let them appear perfectly sharp in any resolution. And the fact, that they are based on vector definitions, make them small when it comes to file-size.

But in situations, where you want layout inside a SVG, it is quite frustrating. Of course, there is this 'viewbox' thing, that can help sometimes, but most of the time drives you crazy. Some of the node attributes can be set with percentages, but others only in user-units (e.g. polygons, paths). It is a bit like having a "position:absolute"-style on every DOM-node and then try to make the layout flow.

VLEX is the attempt to overcome this SVG shortcomings. It is a damn small script (5.1KB with a lot of comments; 771 bytes (!) minified and gzipped) that allows, once added to the SVG, a declarative layout.

The basic idea is to introduce an attribute "vlex", that holds a description with all the micro logic inside to layout a node properly on a resize event. Have a look at the __Quickstart__ example, where a circle is centered on stage with small effort and than go on to the other vlexamples...

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

(a surrounding div is necessary to fix firefox bug [#874811](https://bugzilla.mozilla.org/show_bug.cgi?id=874811))

### VLEXamples
#### 1. Basic
1. [circle centered](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/1_circle.html)
2. [circle centered with dynamic radius](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/2_circleDynamicRadius.html)
3. [circle centered with dynamic minmax radius](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/3_circleDynamicMinMaxRadius.html)
4. [partial stage](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/4_circleDynamicMinMaxRadiusHalf.html)
5. [polygon](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/5_polygon.html)
6. [path](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/6_path.html)
7. [complex](http://rawgit.com/indus/VLEX/master/vlexamples/1_basic/7_complex.html)

#### 2. Advanced
1. [pure SVG](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/1_pureSVG.svg)
2. [external SVG via object](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/2_externalSVG.html)
3. [custom variable](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/3_customVar.html)
4. [custom function](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/4_customFunc.html)
5. [custom trigger](http://rawgit.com/indus/VLEX/master/vlexamples/2_advanced/5_customTrigger.html)

#### 3. Mouse
1. [circle under mouse](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/1_circle.html)
2. [path end under mouse](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/2_path.html)
3. [ellipse size](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/3_ellipse.html)
4. [circle stroke](http://rawgit.com/indus/VLEX/master/vlexamples/3_mouse/4_circleStrokeDash.html)

None of these examples is usefull per se. If you are interested to vlex something usefull, you should read the upcoming API or just the comented source code (almost equal size ;-).
If you are interested in some backgrounds, have a look down at the end of this page.

### Javasript-API

##### VLEX(element, &lt;options&gt;)
the main function of VLEX. Call it to init VLEX.

| Parameter   | Type        | Description  |
:-- | :-- | :--
| element     | DOM-Node, ID-String or null | Pass a DOM-Node or its ID-String to start VLEX. Pass *null* to stop VLEX |
| options     | Object      |  Pass a options object to change VLEXs behaviour |

| Option   | Type        | Default  | Description  |
:-- | :-- | :-- | :--
| onresize		| Boolean	| true		|  auto-update on resize-event |
| onmousemove	| Boolean	| false		|  auto-update on mousemove-event  |
| $				| Object	| undefined	|  properties of *$* are available in vlexpressions via dollar-sign|


##### updateFN(&lt;force&gt;)
the return value of VLEXs main function is a update-function. Call it to trigger an update.

| Parameter   | Type        | Description  |
:-- | :-- | :--
| force     | Boolean | the vlexpressions are cached. So you have to pass *true*, if you want to have them reevaluated (e.g. after changing a expresssion or after adding an new node with a vlexpression)|

### DOM-API (Vlexpressions)

##### vlex="&lt;prop1:&lt;string&gt;&lt;{flexpression1}&gt;&lt;string&gt;...;&gt;&lt;prop2:...;&gt;"

SVG-Nodes with a '__velx__' attribute are getting handeld on a VLEX update.

The value of the '__vlex__' attribute is called '__vlexpression__' and consists of one or more '__property-descriptions__' seperated by a __semicolon__ '__;__'. '__Key__' and  '__value__' of a property description have to be seperated by a colon '__:__'. The key of a property description maps its evaluated value to the native SVG-attribute with the same name.

The value of a property description can consist of one or more __strings__ and/or __eval-statements__ (inside __curly braces__ '__{}__'). Eval-statements get evaluated on update. All eval-statements and strings of a property description get concatenated to a single string, that is passed to the native SVG attribute finaly.

The __dollar sign__ '__$__' gives access to predefined values. Userdefined values and functions can be assigned to '$' before or during an update. The property-accessor point '__$.prop__' gets added on the compilation of a vlexpression.

All properties and functions of Javascripts '__Math__' are available just by calling their name (e.g. 'min()','max()','PI',...)

| Parameter   | Type        | Description  |
:-- | :-- | :--
| force     | Boolean | the vlexpressions are cached. So you have to pass *true* if you want to have them recompiled (e.g. after changing a vlexpression or after adding an new node with a vlexpression)|

##### DollarSign $

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
points	<-- eval(""+(0)+","+(100)+","+($.cX)+","+($.cY+100)+"") // 0,100,200,250

vlex="points:{[0,100,$cX,$cY+100].join(',')}"
>>>
points	<-- eval(""+([0,100,$.cX,$.cY+100].join(','))+"") // 0,100,200,250

vlex="d:M100,{$cY} Q{max(100,$cX-200)},200 {$cX},{$cY}"
>>>
d		<-- eval("M100,"+($.cY)+" Q"+(Math.max(100,$.cX-200))+",200 "+($.cX)+","+($.cY)+"") // M100,150 Q100,200 200,150 

```


### more About

You may ask, what usecase I had in mind for VLEX? For me it is to build cross-device UIs (especially for webmapping-apps). VLEX should make a single SVG UI overlay work on fullHD screens, tablets and smartphones. A task for example is to shrink buttons and to reduce space between them, but keep them at a minimum of 40px and avoid overlaps.

And I´m not the only one recognizing a need for these things (http://lists.w3.org/Archives/Public/www-svg/2013Oct/0003.html). After reading this discussion I realized, that probably not even the long-awaited [SVG2](http://www.w3.org/TR/2012/WD-SVG2-20120828/single-page.html) will have the layout possibilities I desire.



