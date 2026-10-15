function s(l){let t=l.length;for(let e=0;e<Math.floor(t/2);e++){let n=l[e];l[e]=l[t-e-1],l[t-e-1]=n}}let o=[1,2,3,4,5];s(o);console.log("Reversed array:",o);
