// We have to seperate the file which loads modules from other micro front ends and import it here iwth this
// import syntax.

// This tells webpack a chance to go and resolve all the cross service import statements BEFORE we try to
// execute the bootstrap.js file.
import('./bootstrap')
