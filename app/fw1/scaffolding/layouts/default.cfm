<cfoutput>
  <!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <cfif application.config.environment eq "prod">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    </cfif>
    <title><%= appname %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="/assets/components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/assets/components/font-awesome/css/font-awesome.min.css">

    <script type="text/javascript" src="/assets/components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/components/bootstrap/dist/js/bootstrap.min.js"></script>
  </head>

  <body>
    <div class="container">
      #body#
    </div>
  </body>
  </html>
</cfoutput>
