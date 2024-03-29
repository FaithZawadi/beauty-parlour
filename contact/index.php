
<?php
require "../server/configure.php";

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beauty Pala</title>
    <link rel="stylesheet" href="../static/css/index.css">
</head>
<body>
    <div class="scroll-top">
        <p class="scroll-top-btn">
            <span>&#10096;</span>
        </p>
    </div>
    <?php require"../nav.php";?>
    <div class="container top-110">
        <div class="container-1">
            <div class="image-fluid">
                <h1>Get In Touch</h1>
            </div>
        </div>
    </div>
    <div class="more-info">
        <div class="info-wrapper">
            <div class="my-info display-flex-ordinary">
                <div class="col-4 col-s-6">
                    <div class="info-container">
                        <div class="image-holder ">
                            <img src="../assets/google-map-pin.png" alt="">
                        </div>
                        <div class="details">
                            <p>PO BOX 17239 VICTORIA STREET.</p>
                            <p> WESTLANDS  8077 KENYA.</p>
                        </div>
                    </div>
                </div>
                <div class="col-4 col-s-6">
                    <div class="info-container">
                        <div class="image-holder ">
                            <img src="../assets/inner-4-icon-2.png" alt="">
                        </div>
                        <div class="details">
                            <p> <a href="mailto:services@beautypala.com
                                ">services@beautypala.com
                            </a></p>
                        </div>
                    </div>
                </div>
                <div class="col-4 col-s-6">
                    <div class="info-container">
                        <div class="image-holder ">
                            <img src="../assets/inner-4-icon-3.png" alt="">
                        </div>
                        <div class="details">
                            <p><a href="tel:+2547123456789">+(254)0 7 12 3456 789</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="page-1 booking">
        <div class="booking-wrapper">
            <div class="booking-inner-wrapper display-flex">
                <div class="col-6 col-s-6 col-m-6">
                    <div class="booking-desc">
                        <div class="booking-title">
                            <p class="banner">Nail. Hand. Care</p>
                            <h1>Get In Touch</h1>
                        </div>
                       
                        <form action="" id="form" method="post">
                            <div class="form-group">
                                <input type="text" name="name" placeholder=" Name">
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" placeholder=" Email">
                            </div>
                            <div class="form-group">
                                <input type="text" name="message" placeholder=" Message">
                            </div>
                            <div class="trans-btn">
                                <button type="submit">Send </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-6 col-s-6 col-m-6">
                    <div class="booking-img-1 adjust">
                        <img src="../assets/h1-img-6.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php require"../footer.php";?>
    <script src="../static/script/index.js"></script>
</body>
</html>