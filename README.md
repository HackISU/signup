# signup
A heroku app that posts signup data (and some user metadata) to a mailchimp list

To use your mailchimp list for this, just change out the link in index.js line 29: https://github.com/HackISU/signup/blob/master/index.js#L29

To run:
  * npm install
  * npm run
  * curl -X POST "http://<heroku-name>.herokuapp.com/signup" -H "Content-Type: application/json" -d "{token:<mymlh_access_token>,resume:<resume_url>}"
