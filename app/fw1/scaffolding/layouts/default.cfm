<cfoutput>
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= appname %></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <%if (!skipInstall) { %>
    <link rel="stylesheet" href="/assets/components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="/assets/components/font-awesome/css/font-awesome.min.css">
    <script type="text/javascript" src="/assets/components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/components/bootstrap/dist/js/bootstrap.min.js"></script>
    <% } %>
  </head>

  <body>
    <h2>Welcome to <%= appname %>!</h2>
    <p>
      The project was created with the <a href="https://www.npmjs.com/package/generator-cfml-mvc">CFML-MVC yeoman generator</a>.
    </p>
    #body#
  </body>
  </html>
</cfoutput>
