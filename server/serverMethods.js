import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  sendVerificationLink() { // eslint-disable-line
    const userId = Meteor.userId();
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  }, // ---------------------------------------------------------------------
  async checkCredentials(/* orgIdArg, projectIdArg */) {
    //  check(orgIdArg, String);
    //  check(projectIdArg, String);

    // get user related info
    const user = await Meteor.user();
    const emailVerified = user.emails[0].verified;

    // example code to call methods to check if the user belongs to an org or project 
    // ( or whatever makes sense for your use case )
    // const userId = user._id;
    // check if user exists in org and project
    // const memberCount = await methodtoretrieveifbelongstoorg({ arg: value, arg: userId });
    // const memberCountP = await methodtoretrieveifbelongstoproject({ arg: value, arg: userId });

    const credentials = {
      emailVerified,
      // memberInOrg: memberCount,
      // memberInProject: memberCountP,
    };

    return credentials;
  }, // ---------------------------------------------------------------------
  userRoleStuff() {
    // this is a somewhat impractical example -  you will want to be an admin for an org
    // to alter the permissions of users in the org (tenant)
    // ensure the user is an admin in the org - if they are not - throw a Meteor error
    // in this case we are allowing the user to toggle their own role from noob to admin
    // *Note* - when dealing with altering the roles of another user NEVER pass their userId
    // ** Just pass their email and use the Accounts.findUserByEmail(email) method to get a user object
    const rolesInOrg = Roles.getRolesForUser(Meteor.userId(), 'myWonderfulTenant');
    // if no roles set yet - create the user as a noob
    if (rolesInOrg.length === 0) {
      // add user to noob role
      Roles.setUserRoles(Meteor.userId(), 'noob', 'myWonderfulTenant');
    } else {
      const rolesInTenant = Roles.getRolesForUser(Meteor.userId(), 'myWonderfulTenant');
      const userIsNoob = Roles.userIsInRole(Meteor.userId(), ['noob'], 'myWonderfulTenant');
      //remove user from all roles in tenant for the user
      Roles.removeUsersFromRoles(Meteor.userId(), rolesInTenant, 'myWonderfulTenant');
      // check if user is a noob - if so upgrade to admin
      if ( userIsNoob ) {
        Roles.setUserRoles(Meteor.userId(), 'admin', 'myWonderfulTenant');
      } else {
        // otherwise they are an admin - switch to noob
        Roles.setUserRoles(Meteor.userId(), 'noob', 'myWonderfulTenant');
      } 
    }
  },
});
