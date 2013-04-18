g_arrayOfUsedJsDatePickCalsGlobalNumbers=new Array();g_currentDateObject=new Object();g_currentDateObject.dateObject=new Date();g_currentDateObject.day=g_currentDateObject.dateObject.getDate();g_currentDateObject.month=g_currentDateObject.dateObject.getMonth()+1;g_currentDateObject.year=g_currentDateObject.dateObject.getFullYear();$=function(id){
    return document.getElementById(id)
    };String.prototype.trim=function(){
    return this.replace(/^\s+|\s+$/g,"")
    };String.prototype.ltrim=function(){
    return this.replace(/^\s+/,"")
    };String.prototype.rtrim=function(){
    return this.replace(/\s+$/,"")
    };JsDatePick=function(configurationObject){
    this.oConfiguration=new Object();this.oCurrentDay=g_currentDateObject;this.monthsTextualRepresentation=new Array("Janaury","February","March","April","May","June","July","August","September","October","November","December");this.lastPostedDay=null;this.initialZIndex=2;this.globalNumber=this.getUnUsedGlobalNumber();eval("gRef_"+this.globalNumber+"=this;");this.setConfiguration(configurationObject);this.makeCalendar()
    };JsDatePick.prototype.getUnUsedGlobalNumber=function(){
    var aNum=Math.floor(Math.random()*1000);while(!this.isUnique_GlobalNumber(aNum)){
        aNum=Math.floor(Math.random()*1000)
        }return aNum
    };JsDatePick.prototype.isUnique_GlobalNumber=function(aNum){
    var i;for(i=0;i<g_arrayOfUsedJsDatePickCalsGlobalNumbers.length;i++){
        if(g_arrayOfUsedJsDatePickCalsGlobalNumbers[i]==aNum){
            return false
            }
        }return true
    };JsDatePick.prototype.addOnSelectedDelegate=function(aDelegatedFunction){
    if(typeof(aDelegatedFunction)=="function"){
        this.addonSelectedDelegate=aDelegatedFunction
        }return false
    };JsDatePick.prototype.setOnSelectedDelegate=function(aDelegatedFunction){
    if(typeof(aDelegatedFunction)=="function"){
        this.onSelectedDelegate=aDelegatedFunction;return true
        }return false
    };JsDatePick.prototype.executeOnSelectedDelegateIfExists=function(){
    if(typeof(this.onSelectedDelegate)=="function"){
        this.onSelectedDelegate()
        }if(typeof(this.addonSelectedDelegate)=="function"){
        this.addonSelectedDelegate()
        }
    };JsDatePick.prototype.setRepopulationDelegate=function(aDelegatedFunction){
    if(typeof(aDelegatedFunction)=="function"){
        this.repopulationDelegate=aDelegatedFunction;return true
        }return false
    };JsDatePick.prototype.setConfiguration=function(aConf){
    this.oConfiguration.isStripped=(aConf.isStripped!=null)?aConf.isStripped:false;this.oConfiguration.useMode=(aConf.useMode!=null)?aConf.useMode:1;this.oConfiguration.selectedDate=(aConf.selectedDate!=null)?aConf.selectedDate:null;this.oConfiguration.target=(aConf.target!=null)?aConf.target:null;this.oConfiguration.yearsRange=(aConf.yearsRange!=null)?aConf.yearsRange:new Array(1971,2100);this.oConfiguration.limitToToday=(aConf.limitToToday!=null)?aConf.limitToToday:false;this.oConfiguration.field=(aConf.field!=null)?aConf.field:false;this.oConfiguration.cellColorScheme=(aConf.cellColorScheme!=null)?aConf.cellColorScheme:"ocean_blue";this.selectedDayObject=new Object();this.flag_DayMarkedBeforeRepopulation=false;this.flag_aDayWasSelected=false;this.lastMarkedDayObject=null;if(this.oConfiguration.selectedDate!=null){
        if(typeof(this.oConfiguration.selectedDate)=="object"){
            if(!isNaN(this.oConfiguration.selectedDate.day)&&!isNaN(this.oConfiguration.selectedDate.month)&&!isNaN(this.oConfiguration.selectedDate.year)){
                this.currentDay=this.oCurrentDay.day;this.selectedDayObject.day=this.oConfiguration.selectedDate.day;this.currentMonth=this.selectedDayObject.month=this.oConfiguration.selectedDate.month;this.currentYear=this.selectedDayObject.year=this.oConfiguration.selectedDate.year;this.flag_aDayWasSelected=true
                }else{
                alert("The initial selected date object is not complete or invalid!")
                }
            }else{
            alert("the initial selected date is wrong! you need to supply an object containing 3 properties (day,month,year)")
            }
        }else{
        this.currentYear=this.oCurrentDay.year;this.currentMonth=this.oCurrentDay.month;this.currentDay=this.oCurrentDay.day
        }
    };JsDatePick.prototype.resizeCalendar=function(){
    this.leftWallStrechedElement.style.height="0px";this.rightWallStrechedElement.style.height="0px";var totalHeight=this.JsDatePickBox.offsetHeight;var newStrechedHeight=totalHeight-16;if(newStrechedHeight<0){
        return
    }this.leftWallStrechedElement.style.height=newStrechedHeight+"px";this.rightWallStrechedElement.style.height=newStrechedHeight+"px";return true
    };JsDatePick.prototype.closeCalendar=function(){
    this.JsDatePickBox.style.display="none"
    };JsDatePick.prototype.populateFieldWithSelectedDate=function(){
    $(this.oConfiguration.target).value=this.getSelectedDayFormatted();this.closeCalendar()
    };JsDatePick.prototype.makeCalendar=function(){
    var d=document;var JsDatePickBox=d.createElement("div");var clearfix=d.createElement("div");var closeButton=d.createElement("div");JsDatePickBox.setAttribute("class","JsDatePickBox");clearfix.setAttribute("class","clearfix");closeButton.setAttribute("class","jsDatePickCloseButton");closeButton.setAttribute("globalNumber",this.globalNumber);closeButton.onmouseover=function(){
        this.setAttribute("class","jsDatePickCloseButtonOver");var globalRef="gRef_"+this.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Close the calendar");')
        };closeButton.onmouseout=function(){
        this.setAttribute("class","jsDatePickCloseButton");var globalRef="gRef_"+this.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("");')
        };closeButton.onmousedown=function(){
        this.setAttribute("class","jsDatePickCloseButtonDown");var globalRef="gRef_"+this.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Close the calendar");')
        };closeButton.onmouseup=function(){
        this.setAttribute("class","jsDatePickCloseButton");var globalRef="gRef_"+this.getAttribute("globalNumber");eval("gRef_"+this.getAttribute("globalNumber")+".closeCalendar();");eval(globalRef+'.setTooltipText("");')
        };this.JsDatePickBox=JsDatePickBox;var leftWall=d.createElement("div");var rightWall=d.createElement("div");var topWall=d.createElement("div");var bottomWall=d.createElement("div");topWall.setAttribute("class","topWall");bottomWall.setAttribute("class","bottomWall");var topCorner=d.createElement("div");var bottomCorner=d.createElement("div");var wall=d.createElement("div");topCorner.setAttribute("class","leftTopCorner");bottomCorner.setAttribute("class","leftBottomCorner");wall.setAttribute("class","leftWall");this.leftWallStrechedElement=wall;this.leftWall=leftWall;this.rightWall=rightWall;leftWall.appendChild(topCorner);leftWall.appendChild(wall);leftWall.appendChild(bottomCorner);topCorner=d.createElement("div");bottomCorner=d.createElement("div");wall=d.createElement("div");topCorner.setAttribute("class","rightTopCorner");bottomCorner.setAttribute("class","rightBottomCorner");wall.setAttribute("class","rightWall");this.rightWallStrechedElement=wall;rightWall.appendChild(topCorner);rightWall.appendChild(wall);rightWall.appendChild(bottomCorner);if(this.oConfiguration.isStripped){
        leftWall.setAttribute("class","hiddenBoxLeftWall");rightWall.setAttribute("class","hiddenBoxRightWall")
        }else{
        leftWall.setAttribute("class","boxLeftWall");rightWall.setAttribute("class","boxRightWall")
        }JsDatePickBox.appendChild(leftWall);JsDatePickBox.appendChild(this.getDOMCalendarStripped());JsDatePickBox.appendChild(rightWall);JsDatePickBox.appendChild(clearfix);if(!this.oConfiguration.isStripped){
        JsDatePickBox.appendChild(closeButton);JsDatePickBox.appendChild(topWall);JsDatePickBox.appendChild(bottomWall)
        }if(this.oConfiguration.useMode==2){
        if(this.oConfiguration.target!=false){
            if(typeof($(this.oConfiguration.target))!=null){
                var inputElement=$(this.oConfiguration.target);var aSpan=document.createElement("span");inputElement.parentNode.replaceChild(aSpan,inputElement);aSpan.appendChild(inputElement);inputElement.setAttribute("globalNumber",this.globalNumber);inputElement.onclick=function(){
                    eval("gRef_"+this.getAttribute("globalNumber")+".showCalendar();")
                    };aSpan.style.position="relative";this.initialZIndex++;JsDatePickBox.style.zIndex=this.initialZIndex.toString();JsDatePickBox.style.position="absolute";JsDatePickBox.style.top="18px";JsDatePickBox.style.left="0px";JsDatePickBox.style.display="none";aSpan.appendChild(JsDatePickBox);var aFunc=new Function("gRef_"+this.globalNumber+".populateFieldWithSelectedDate();");this.setOnSelectedDelegate(aFunc)
                }else{
                alert("There is no element with such an ID!")
                }
            }
        }else{
        if(this.oConfiguration.target!=null){
            $(this.oConfiguration.target).appendChild(JsDatePickBox);$(this.oConfiguration.target).style.position="relative";JsDatePickBox.style.position="absolute";JsDatePickBox.style.top="0px";JsDatePickBox.style.left="0px";this.resizeCalendar();this.executePopulationDelegateIfExists()
            }else{
            alert("No element ID to put this calendar on! check JsDatePick configuration")
            }
        }
    };JsDatePick.prototype.determineFieldDate=function(){
    var aField=$(this.oConfiguration.target);if(aField.value.trim().length==0){
        this.unsetSelection();return
    }else{
        if(aField.value.trim().length>7){
            var array=aField.value.trim().split("-");this.setSelectedDay({
                year:parseInt(array[0]),
                month:parseInt(array[1],10),
                day:parseInt(array[2],10)
                });return
        }else{
            this.unsetSelection();return
        }
        }
    };JsDatePick.prototype.showCalendar=function(){
    if(this.JsDatePickBox.style.display=="none"){
        this.determineFieldDate();this.JsDatePickBox.style.display="block";this.resizeCalendar();this.executePopulationDelegateIfExists()
        }else{
        return
    }
    };JsDatePick.prototype.isAvailable=function(y,m,d){
    if(y>this.oCurrentDay.year){
        return false
        }if(m>this.oCurrentDay.month&&y==this.oCurrentDay.year){
        return false
        }if(d>this.oCurrentDay.day&&m==this.oCurrentDay.month&&y==this.oCurrentDay.year){
        return false
        }return true
    };JsDatePick.prototype.getDOMCalendarStripped=function(){
    var d=document;var boxMain=d.createElement("div");if(this.oConfiguration.isStripped){
        boxMain.setAttribute("class","boxMainStripped")
        }else{
        boxMain.setAttribute("class","boxMain")
        }this.boxMain=boxMain;var boxMainInner=d.createElement("div");var clearfix=d.createElement("div");var boxMainCellsContainer=d.createElement("div");var tooltip=d.createElement("div");var weekDaysRow=d.createElement("div");var clearfix2=d.createElement("div");clearfix.setAttribute("class","clearfix");clearfix2.setAttribute("class","clearfix");boxMainInner.setAttribute("class","boxMainInner");boxMainCellsContainer.setAttribute("class","boxMainCellsContainer");tooltip.setAttribute("class","tooltip");weekDaysRow.setAttribute("class","weekDaysRow");this.tooltip=tooltip;boxMain.appendChild(boxMainInner);this.controlsBar=this.getDOMControlBar();this.makeDOMWeekDays(weekDaysRow);boxMainInner.appendChild(this.controlsBar);boxMainInner.appendChild(clearfix);boxMainInner.appendChild(tooltip);boxMainInner.appendChild(weekDaysRow);boxMainInner.appendChild(boxMainCellsContainer);boxMainInner.appendChild(clearfix2);this.boxMainCellsContainer=boxMainCellsContainer;this.populateMainBox(boxMainCellsContainer);return boxMain
    };JsDatePick.prototype.makeDOMWeekDays=function(aWeekDaysRow){
    var i=0;var d=document;var weekDaysArray=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");var textNode;var weekDay;for(i=0;i<7;i++){
        weekDay=d.createElement("div");textNode=d.createTextNode(weekDaysArray[i]);weekDay.setAttribute("class","weekDay");if(weekDaysArray[i]=="Sat"){
            weekDay.style.marginRight="0px"
            }weekDay.appendChild(textNode);aWeekDaysRow.appendChild(weekDay)
        }
    };JsDatePick.prototype.repopulateMainBox=function(){
    while(this.boxMainCellsContainer.firstChild){
        this.boxMainCellsContainer.removeChild(this.boxMainCellsContainer.firstChild)
        }this.populateMainBox(this.boxMainCellsContainer);this.resizeCalendar();this.executePopulationDelegateIfExists()
    };JsDatePick.prototype.executePopulationDelegateIfExists=function(){
    if(typeof(this.repopulationDelegate)=="function"){
        this.repopulationDelegate()
        }
    };JsDatePick.prototype.populateMainBox=function(aMainBox){
    var d=document;var aDayDiv;var aTextNode;var columnNumber=1;var disabledDayFlag=false;var cmpMonth=this.currentMonth-1;var oDay=new Date(this.currentYear,cmpMonth,1,1,0,0);var iStamp=oDay.getTime();this.flag_DayMarkedBeforeRepopulation=false;this.setControlBarText(this.monthsTextualRepresentation[cmpMonth]+", "+this.currentYear);var skipDays=parseInt(oDay.getDay());var i=0;for(i=0;i<skipDays;i++){
        aDayDiv=d.createElement("div");aDayDiv.setAttribute("class","skipDay");aMainBox.appendChild(aDayDiv);if(columnNumber==7){
            columnNumber=1
            }else{
            columnNumber++
        }
        }while(oDay.getMonth()==cmpMonth){
        disabledDayFlag=false;aDayDiv=d.createElement("div");if(this.lastPostedDay){
            if(this.lastPostedDay==oDay.getDate()){
                aTextNode=parseInt(this.lastPostedDay,10)+1
                }else{
                aTextNode=d.createTextNode(oDay.getDate())
                }
            }else{
            aTextNode=d.createTextNode(oDay.getDate())
            }aDayDiv.appendChild(aTextNode);aMainBox.appendChild(aDayDiv);aDayDiv.setAttribute("globalNumber",this.globalNumber);if(columnNumber==7){
            aDayDiv.style.marginRight="0px"
            }if(this.isToday(oDay)){
            aDayDiv.setAttribute("isToday",1)
            }if(this.oConfiguration.limitToToday){
            if(!this.isAvailable(this.currentYear,this.currentMonth,parseInt(oDay.getDate()))){
                disabledDayFlag=true;aDayDiv.setAttribute("isJsDatePickDisabled",1)
                }
            }aDayDiv.onmouseover=function(){
            var globalRef="gRef_"+this.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(parseInt(this.getAttribute("isSelected"))==1){
                return
            }if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
                return
            }if(parseInt(this.getAttribute("isToday"))==1){
                this.setAttribute("class","dayOverToday");this.style.background="url(img/"+currentColorScheme+"_dayOver.gif) left top no-repeat"
                }else{
                this.setAttribute("class","dayOver");this.style.background="url(img/"+currentColorScheme+"_dayOver.gif) left top no-repeat"
                }
            };aDayDiv.onmouseout=function(){
            var globalRef="gRef_"+this.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(parseInt(this.getAttribute("isSelected"))==1){
                return
            }if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
                return
            }if(parseInt(this.getAttribute("isToday"))==1){
                this.setAttribute("class","dayNormalToday");this.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
                }else{
                this.setAttribute("class","dayNormal");this.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
                }
            };aDayDiv.onmousedown=function(){
            var globalRef="gRef_"+this.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(parseInt(this.getAttribute("isSelected"))==1){
                return
            }if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
                return
            }if(parseInt(this.getAttribute("isToday"))==1){
                this.setAttribute("class","dayDownToday");this.style.background="url(img/"+currentColorScheme+"_dayDown.gif) left top no-repeat"
                }else{
                this.setAttribute("class","dayDown");this.style.background="url(img/"+currentColorScheme+"_dayDown.gif) left top no-repeat"
                }
            };aDayDiv.onmouseup=function(){
            var globalRef="gRef_"+this.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
                return
            }if(parseInt(this.getAttribute("isToday"))==1){
                this.setAttribute("class","dayNormalToday");this.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
                }else{
                this.setAttribute("class","dayNormal");this.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
                }eval(globalRef+".setDaySelection(this);");eval(globalRef+".executeOnSelectedDelegateIfExists();")
            };if(this.isSelectedDay(oDay.getDate())){
            aDayDiv.setAttribute("isSelected",1);this.flag_DayMarkedBeforeRepopulation=true;this.lastMarkedDayObject=aDayDiv;if(parseInt(aDayDiv.getAttribute("isToday"))==1){
                aDayDiv.setAttribute("class","dayDownToday");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayDown.gif) left top no-repeat"
                }else{
                aDayDiv.setAttribute("class","dayDown");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayDown.gif) left top no-repeat"
                }
            }else{
            var globalRef="gRef_"+aDayDiv.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(parseInt(aDayDiv.getAttribute("isToday"))==1){
                if(disabledDayFlag){
                    aDayDiv.setAttribute("class","dayDisabled");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
                    }else{
                    aDayDiv.setAttribute("class","dayNormalToday");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
                    }
                }else{
                if(disabledDayFlag){
                    aDayDiv.setAttribute("class","dayDisabled");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
                    }else{
                    aDayDiv.setAttribute("class","dayNormal");aDayDiv.style.background="url(img/"+this.oConfiguration.cellColorScheme+"_dayNormal.gif) left top no-repeat"
                    }
                }
            }if(columnNumber==7){
            columnNumber=1
            }else{
            columnNumber++
        }iStamp+=86400000;oDay.setTime(iStamp)
        }this.lastPostedDay=null;return aMainBox
    };JsDatePick.prototype.unsetSelection=function(){
    this.flag_aDayWasSelected=false;this.selectedDayObject=new Object();this.repopulateMainBox()
    };JsDatePick.prototype.setSelectedDay=function(dateObject){
    this.flag_aDayWasSelected=true;this.selectedDayObject.day=parseInt(dateObject.day,10);this.selectedDayObject.month=parseInt(dateObject.month,10);this.selectedDayObject.year=parseInt(dateObject.year);this.currentMonth=dateObject.month;this.currentYear=dateObject.year;this.repopulateMainBox()
    };JsDatePick.prototype.isSelectedDay=function(aDate){
    if(this.flag_aDayWasSelected){
        if(parseInt(aDate)==this.selectedDayObject.day&&this.currentMonth==this.selectedDayObject.month&&this.currentYear==this.selectedDayObject.year){
            return true
            }else{
            return false
            }
        }return false
    };JsDatePick.prototype.getSelectedDay=function(){
    if(this.flag_aDayWasSelected){
        return this.selectedDayObject
        }else{
        return false
        }
    };JsDatePick.prototype.getSelectedDayFormatted=function(){
    if(this.flag_aDayWasSelected){
        var returnVal=this.selectedDayObject.year+"-";if(this.selectedDayObject.month>=1&&this.selectedDayObject.month<=9){
            returnVal+="0"+this.selectedDayObject.month+"-"
            }else{
            returnVal+=this.selectedDayObject.month+"-"
            }if(this.selectedDayObject.day>=1&&this.selectedDayObject.day<=9){
            returnVal+="0"+this.selectedDayObject.day
            }else{
            returnVal+=this.selectedDayObject.day
            }return returnVal
        }else{
        return false
        }
    };JsDatePick.prototype.setDaySelection=function(anElement){
    var globalRef="gRef_"+anElement.getAttribute("globalNumber");var currentColorScheme=eval(globalRef+".getCurrentColorScheme()");if(this.flag_DayMarkedBeforeRepopulation){
        this.lastMarkedDayObject.setAttribute("isSelected",0);if(parseInt(this.lastMarkedDayObject.getAttribute("isToday"))==1){
            this.lastMarkedDayObject.setAttribute("class","dayNormalToday");this.lastMarkedDayObject.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
            }else{
            this.lastMarkedDayObject.setAttribute("class","dayNormal");this.lastMarkedDayObject.style.background="url(img/"+currentColorScheme+"_dayNormal.gif) left top no-repeat"
            }
        }this.flag_aDayWasSelected=true;this.selectedDayObject.year=this.currentYear;this.selectedDayObject.month=this.currentMonth;this.selectedDayObject.day=parseInt(anElement.innerHTML);this.flag_DayMarkedBeforeRepopulation=true;this.lastMarkedDayObject=anElement;anElement.setAttribute("isSelected",1);if(parseInt(anElement.getAttribute("isToday"))==1){
        anElement.setAttribute("class","dayDownToday");anElement.style.background="url(img/"+currentColorScheme+"_dayDown.gif) left top no-repeat"
        }else{
        anElement.setAttribute("class","dayDown");anElement.style.background="url(img/"+currentColorScheme+"_dayDown.gif) left top no-repeat"
        }
    };JsDatePick.prototype.isToday=function(aDateObject){
    var cmpMonth=this.oCurrentDay.month-1;if(aDateObject.getDate()==this.oCurrentDay.day&&aDateObject.getMonth()==cmpMonth&&aDateObject.getFullYear()==this.oCurrentDay.year){
        return true
        }return false
    };JsDatePick.prototype.setControlBarText=function(aText){
    var aTextNode=document.createTextNode(aText);while(this.controlsBarTextCell.firstChild){
        this.controlsBarTextCell.removeChild(this.controlsBarTextCell.firstChild)
        }this.controlsBarTextCell.appendChild(aTextNode)
    };JsDatePick.prototype.setTooltipText=function(aText){
    while(this.tooltip.firstChild){
        this.tooltip.removeChild(this.tooltip.firstChild)
        }var aTextNode=document.createTextNode(aText);this.tooltip.appendChild(aTextNode)
    };JsDatePick.prototype.moveForwardOneYear=function(){
    var desiredYear=this.currentYear+1;if(desiredYear<parseInt(this.oConfiguration.yearsRange[1])){
        this.currentYear++;this.repopulateMainBox()
        }else{
        return
    }
    };JsDatePick.prototype.moveBackOneYear=function(){
    var desiredYear=this.currentYear-1;if(desiredYear>parseInt(this.oConfiguration.yearsRange[0])){
        this.currentYear--;this.repopulateMainBox()
        }else{
        return
    }
    };JsDatePick.prototype.moveForwardOneMonth=function(){
    if(this.currentMonth<12){
        this.currentMonth++
    }else{
        this.currentYear++;this.currentMonth=1
        }this.repopulateMainBox()
    };JsDatePick.prototype.moveBackOneMonth=function(){
    if(this.currentMonth>1){
        this.currentMonth--
    }else{
        this.currentYear--;this.currentMonth=12
        }this.repopulateMainBox()
    };JsDatePick.prototype.getCurrentColorScheme=function(){
    return this.oConfiguration.cellColorScheme
    };JsDatePick.prototype.getDOMControlBar=function(){
    var d=document;var controlsBar=d.createElement("div");var monthForwardButton=d.createElement("div");var monthBackwardButton=d.createElement("div");var yearForwardButton=d.createElement("div");var yearBackwardButton=d.createElement("div");var controlsBarText=d.createElement("div");controlsBar.setAttribute("class","controlsBar");monthForwardButton.setAttribute("class","monthForwardButton");monthBackwardButton.setAttribute("class","monthBackwardButton");yearForwardButton.setAttribute("class","yearForwardButton");yearBackwardButton.setAttribute("class","yearBackwardButton");controlsBarText.setAttribute("class","controlsBarText");controlsBar.setAttribute("globalNumber",this.globalNumber);this.controlsBarTextCell=controlsBarText;controlsBar.appendChild(monthForwardButton);controlsBar.appendChild(monthBackwardButton);controlsBar.appendChild(yearForwardButton);controlsBar.appendChild(yearBackwardButton);controlsBar.appendChild(controlsBarText);monthForwardButton.onmouseover=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthForwardButtonOver");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month forward");')
        };monthForwardButton.onmouseout=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthForwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("");')
        };monthForwardButton.onmousedown=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthForwardButtonDown");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month forward");')
        };monthForwardButton.onmouseup=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthForwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month forward");');eval(globalRef+".moveForwardOneMonth();")
        };monthBackwardButton.onmouseover=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthBackwardButtonOver");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month backward");')
        };monthBackwardButton.onmouseout=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthBackwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("");')
        };monthBackwardButton.onmousedown=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthBackwardButtonDown");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month backward");')
        };monthBackwardButton.onmouseup=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","monthBackwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a month backward");');eval(globalRef+".moveBackOneMonth();")
        };yearForwardButton.onmouseover=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearForwardButtonOver");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year forward");')
        };yearForwardButton.onmouseout=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearForwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("");')
        };yearForwardButton.onmousedown=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearForwardButtonDown");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year forward");')
        };yearForwardButton.onmouseup=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearForwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year forward");');eval(globalRef+".moveForwardOneYear();")
        };yearBackwardButton.onmouseover=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearBackwardButtonOver");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year backward");')
        };yearBackwardButton.onmouseout=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearBackwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("");')
        };yearBackwardButton.onmousedown=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearBackwardButtonDown");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year backward");')
        };yearBackwardButton.onmouseup=function(){
        if(parseInt(this.getAttribute("isJsDatePickDisabled"))==1){
            return
        }this.setAttribute("class","yearBackwardButton");var parentElement=this.parentNode;while(parentElement.className!="controlsBar"){
            parentElement=parentElement.parentNode
            }var globalRef="gRef_"+parentElement.getAttribute("globalNumber");eval(globalRef+'.setTooltipText("Move a year backward");');eval(globalRef+".moveBackOneYear();")
        };return controlsBar
    };