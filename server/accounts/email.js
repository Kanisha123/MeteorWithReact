import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = 'ACE Project';
Accounts.emailTemplates.from = 'Project <AceProject@aceproject.space>';

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return 'ACE Project Space -  Verify Your Email Address';
  },
  text(user, url) {
    const emailAddress = user.emails[0].address;
    let urlWithoutHash = url.replace('#/', '');
    const emailBody = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n`;
    return emailBody;
  },
};
Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'ACE Project Space - password reset';
  },
  text(user, url) {
    let urlWithoutHash = url.replace('#/', '');
    const emailBody = `To reset your password visit the following link:\n\n${urlWithoutHash}\n\n`;
    return emailBody;
  },
};
Accounts.emailTemplates.enrollAccount = {
  subject() {
    return 'ACE Project Space - enroll account';
  },
  text(user, url) {
    let urlWithoutHash = url.replace('#/', '');
    const emailBody = `Welcome to the team! To activate your account visit the following link:\n\n${urlWithoutHash}\n\n`;
    return emailBody;
  },
};