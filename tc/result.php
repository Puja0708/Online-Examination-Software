
<?php


/*
****************************************************
*** Online Examination System                    ***
*** Title: Results Management                    ***
****************************************************
*/

/* Procedure
*********************************************

 * ----------- *
 * PHP Section *
 * ----------- *

Step 1: Perform Session Validation.

Step 2: Event to Process...
        Case 1 : Logout - perform session cleanup.
        Case 2 : Dashboard - redirect to Dashboard
        Case 3 : Back - Return back to Result Management.


 * ------------ *
 * HTML Section *
 * ------------ *

Step 3: Display the HTML Components for...
        Case 1: Display the test results in detail.
        Case 2: Default Mode.. in which test results are summarised.

*********************************************
*/

error_reporting(0);
session_start();
include_once '../oesdb.php';
/************************** Step 1 *************************/
if(!isset($_SESSION['tcname'])) {
    $_GLOBALS['message']="Session Timeout.Click here to <a href=\"index.php\">Re-LogIn</a>";
}
else if(isset($_REQUEST['logout'])) {
    /************************** Step 2 - Case 1 *************************/
    //Log out and redirect login page
        unset($_SESSION['tcname']);
        header('Location: index.php');

    }
    else if(isset($_REQUEST['dashboard'])) {
    /************************** Step 2 - Case 2 *************************/
        //redirect to dashboard
            header('Location: testwelcome.php');

        }
        else if(isset($_REQUEST['back'])) {
    /************************** Step 2 - Case 3 *************************/
            //redirect to Result Management Section
                header('Location: result.php');

            }

?>
<html>
    <head>
        <title>OES-Manage Results</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="stylesheet" type="text/css" href="../oes.css"/>

    </head>
    <body>
        <?php

        if($_GLOBALS['message']) {
            echo "<div class=\"message\">".$_GLOBALS['message']."</div>";
        }
        ?>
        <div id="container">
            <div class="header"><h3 class="headtext"> &nbsp;Online Examination System </h3><h4 style="color:#ffffff;text-align:center;margin:0 0 5px 5px;">
            </div>
            <form name="rsltmng" action="result.php" method="post">
                <div class="menubar">


                    <ul id="menu">
                        <?php if(isset($_SESSION['tcname'])) {
                        // Navigations

                            ?>
                        <li><input type="submit" value="LogOut" name="logout" class="subbtn" title="Log Out"/></li>
                            <?php  if(isset($_REQUEST['testid'])) { ?>
                        <li><input type="submit" value="Back" name="back" class="subbtn" title="Manage Results"/></li>
                            <?php }else { ?>
                        <li><input type="submit" value="DashBoard" name="dashboard" class="subbtn" title="Dash Board"/></li>
                            <?php } ?>
                    </ul>
                </div>
                <div class="page">
                        <?php
                        if(isset($_REQUEST['testid'])) {
                    /************************** Step 3 - Case 2 *************************/
                        // Displays the Existing Test Results in detail, If any.
                            $result=executeQuery("select t.testname,DATE_FORMAT(t.testfrom,'%d %M %Y') as fromdate,DATE_FORMAT(t.testto,'%d %M %Y %H:%i:%S') as todate,sub.subname,IFNULL((select sum(marks) from question where testid=".$_REQUEST['testid']."),0) as maxmarks from test as t, subject as sub where sub.subid=t.subid and t.testid=".$_REQUEST['testid'].";") ;
                            if(mysql_num_rows($result)!=0) {

                                $r=mysql_fetch_array($result);
                                ?>
                    <table cellpadding="20" cellspacing="30" border="0" style="background:#ffffff url(../images/page.gif);text-align:left;line-height:20px;">
                        <tr>
                            <td colspan="2"><h3 style="color:#0000cc;text-align:center;">Test Summary</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2" ><hr style="color:#ff0000;border-width:4px;"/></td>
                        </tr>
                        <tr>
                            <td>Test Name</td>
                            <td><?php echo htmlspecialchars_decode($r['testname'],ENT_QUOTES); ?></td>
                        </tr>
                        <tr>
                            <td>Subject Name</td>
                            <td><?php echo htmlspecialchars_decode($r['subname'],ENT_QUOTES); ?></td>
                        </tr>
                        <tr>
                            <td>Validity</td>
                            <td><?php echo $r['fromdate']." To ".$r['todate']; ?></td>
                        </tr>
                        <tr>
                            <td>Max. Marks</td>
                            <td><?php echo $r['maxmarks']; ?></td>
                        </tr>
                        <tr><td colspan="2"><hr style="color:#ff0000;border-width:2px;"/></td></tr>
                        <tr>
                            <td colspan="2"><h3 style="color:#0000cc;text-align:center;">Attempted Students</h3></td>
                        </tr>
                        <tr>
                            <td colspan="2" ><hr style="color:#ff0000;border-width:4px;"/></td>
                        </tr>

                    </table>
                                <?php

                                $result1=executeQuery("select s.stdname,s.emailid,IFNULL((select sum(q.marks) from studentquestion as sq,question as q where q.qnid=sq.qnid and sq.testid=".$_REQUEST['testid']." and sq.stdid=st.stdid and sq.stdanswer=q.correctanswer),0) as om from studenttest as st, student as s where s.stdid=st.stdid and st.testid=".$_REQUEST['testid'].";" );

                                if(mysql_num_rows($result1)==0) {
                                    echo"<h3 style=\"color:#0000cc;text-align:center;\">No Students Yet Attempted this Test!</h3>";
                                }
                                else {
                                    ?>
                    <table cellpadding="30" cellspacing="10" class="datatable">
                        <tr>
                            <th>Student Name</th>
                            <th>Email-ID</th>
                            <th>Obtained Marks</th>
                            <th>Result(%)</th>

                        </tr>
                                        <?php
                                        while($r1=mysql_fetch_array($result1)) {

                                            ?>
                        <tr>
                            <td><?php echo htmlspecialchars_decode($r1['stdname'],ENT_QUOTES); ?></td>
                            <td><?php echo htmlspecialchars_decode($r1['emailid'],ENT_QUOTES); ?></td>
                            <td><?php echo $r1['om']; ?></td>
                            <td><?php echo ($r1['om']/$r['maxmarks']*100)." %"; ?></td>


                        </tr>
                                        <?php
                                        
                                        }

                                    }
                                }
                                else {
                                    echo"<h3 style=\"color:#0000cc;text-align:center;\">Something went wrong. Please logout and Try again.</h3>";
                                }
                                ?>
                    </table>


                        <?php

                        }
                        else {

                        /************************** Step 3 - Case 2 *************************/
                        // Defualt Mode: Displays the Existing Test Results, If any.
                            $result=executeQuery("select t.testid,t.testname,DATE_FORMAT(t.testfrom,'%d %M %Y') as fromdate,DATE_FORMAT(t.testto,'%d %M %Y %H:%i:%S') as todate,sub.subname,(select count(stdid) from studenttest where testid=t.testid) as attemptedstudents from test as t, subject as sub where sub.subid=t.subid and t.tcid=".$_SESSION['tcid'].";");
                            if(mysql_num_rows($result)==0) {
                                echo "<h3 style=\"color:#0000cc;text-align:center;\">No Tests Yet...!</h3>";
                            }
                            else {
                                $i=0;

                                ?>
                    <table cellpadding="30" cellspacing="10" class="datatable">
                        <tr>
                            <th>Test Name</th>
                            <th>Validity</th>
                            <th>Subject Name</th>
                            <th>Attempted Students</th>
                            <th>Details</th>
                        </tr>
            <?php
                                    while($r=mysql_fetch_array($result)) {
                                        $i=$i+1;
                                        if($i%2==0) {
                                            echo "<tr class=\"alt\">";
                                        }
                                        else { echo "<tr>";}
                                        echo "<td>".htmlspecialchars_decode($r['testname'],ENT_QUOTES)."</td><td>".$r['fromdate']." To ".$r['todate']." PM </td>"
                                            ."<td>".htmlspecialchars_decode($r['subname'],ENT_QUOTES)."</td><td>".$r['attemptedstudents']."</td>"
                                            ."<td class=\"tddata\"><a title=\"Details\" href=\"rsltmng.php?testid=".$r['testid']."\"><img src=\"../images/detail.png\" height=\"30\" width=\"40\" alt=\"Details\" /></a></td></tr>";
                                    }
                                    ?>
                    </table>
        <?php
                            }
                        }
                        closedb();
                    }

                    ?>

                </div>
            </form>
      </div>
  </body>
</html>
