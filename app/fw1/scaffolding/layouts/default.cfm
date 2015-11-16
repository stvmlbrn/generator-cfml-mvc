<cfoutput>
  <!DOCTYPE html> <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
  <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
  <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
  <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <cfif application.config.environment eq "prod">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    </cfif>
    <title><%= appname %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/assets/components/html5-boilerplate/dist/css/normalize.css">
    <link rel="stylesheet" href="/assets/components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/assets/components/font-awesome/css/font-awesome.min.css">

    <script type="text/javascript" src="/assets/components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/components/bootstrap/dist/js/bootstrap.min.js"></script>
  </head>

  <body>
    <div class="container">
      <!--[if lt IE 9]>
          <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      #body#
    </div>
  </body>
  </html>
</cfoutput>
