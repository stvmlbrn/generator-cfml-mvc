component extends='framework.one' {
	this.sessionManagement = true;
  this.scriptprotect = 'all';
  this.sessionTimeout = createTimeSpan(0,1,0,0);
  this.applicationTimeout = createTimeSpan(0,7,0,0);
  this.setClientCookies = true;
  this.datasource = '<%= datasource %>';
  this.name = '<%= slug(appname) %>-#hash(getCurrentTemplatePath())#';
  // **********************************************************************************************
  variables.framework = {
    base = '/app',
    error = 'error_pages.error',
    diLocations = ['app/model']
  };
  // **********************************************************************************************
  variables.framework.environments = {
    dev = {
      reloadApplicationOnEveryRequest = true
    },
    prod = {
      password = '<%= reloadPassword %>'
    }
  };
  // **********************************************************************************************
  function getEnvironment() {
  	if (listFindNoCase(cgi.server_name, 'dev', '.')) {
  		return 'dev';
  	} else {
  		return 'prod';
  	}
  }
  // **********************************************************************************************
  function setupApplication() {
    var config = deserializeJSON(fileRead(expandPath('/config/config.json')));

    application.config = config[getEnvironment()];
  }
  // **********************************************************************************************
  function setupRequest() {

  }
  // **********************************************************************************************
  function setupSession() {

  }
  // **********************************************************************************************
  function onMissingView(rc) {
  	return view('home:error_pages/404');
  }
  // **********************************************************************************************
}