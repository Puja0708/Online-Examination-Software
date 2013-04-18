

<?php

/*
***************************************************
*** Online Examination System                   ***
***--------------------------------------------                     ***
*** Title: Student Welcome                     
***************************************************
*/

error_reporting(0);
session_start();
        if(!isset($_SESSION['stdname'])){
            $_GLOBALS['message']="Session Timeout.Click here to <a href=\"index.php\">Re-LogIn</a>";
        }
        else if(isset($_REQUEST['logou
<html>
    <head>
        <title>OES-DashBoard</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="stylesheet" type="text/css" href="oes.css"/>
    </head>
    <body>
        <?php
       
        if($_GLOBALS['message']) {
            echo "<div class=\"message\">".$_GLOBALS['message']."</div>";
        }
        ?>
        <div id="container">
           <div class="header">
             <h3 class="headtext"> &nbsp;  Online Examination System        </h3>
          </div>
            <div class="menubar">

              <form name="stdwelcome" action="studentwelcome.php" method="post">
                    <ul id="menu">
                        <?php if(isset($_SESSION['stdname'])){ ?>
                        <li><input type="submit" value="LogOut" name="logout" class="subbtn" title="Log Out"/></li>
                        <?php } ?>
                    </ul>
                </form>
            </div>
            <div class="stdpage">
                <?php if(isset($_SESSION['stdname'])){ ?>

        
                <img height="600" width="100%" alt="back" src="images/trans.png" class="btmimg" />
                <div class="topimg">
                    

                    <map name="oesnav">
                        <area shape="circle" coords="150,120,70" href="viewresult.php" alt="View Results" title="Click to View Results" />
                        <area shape="circle" coords="450,120,70" href="studenttest.php" alt="Take a New Test" title="Take a New Test" />
                        <area shape="circle" coords="300,250,60" href="editprofile.php?edit=edit" alt="Edit Your Profile" title="Click this to Edit Your Profile." />
                        <area shape="circle" coords="150,375,70" href="practicetest.php" alt="Practice Test" title="Click to take a Practice Test" />
                        <area shape="circle" coords="450,375,70" href="resumetest.php" alt="Resume Test" title="Click this to Resume Your Pending Tests." />
                    </map>
                </div>
                <?php }?>

            </div>

           <div id="footer">
          <p style="font-size:70%;color:#ffffff;"> Developed By-<b>Sneha Bhattacharya &amp; Puja Singh</b></p>
          </div>
      </div>
  </body>
</html>
