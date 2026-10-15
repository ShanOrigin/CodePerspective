function n(e,o){if(o>e.length){console.log("Invalid position");return}for(let l=o-1;l<e.length-1;l++)e[l]=e[l+1];e.pop()}let t=[1,2,4,5,8,9],i=3;n(t,i);console.log("Updated array:",t);
