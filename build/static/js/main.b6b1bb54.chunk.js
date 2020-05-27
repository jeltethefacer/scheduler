(this.webpackJsonpscheduler_front_end=this.webpackJsonpscheduler_front_end||[]).push([[0],{62:function(e,t,a){e.exports=a(92)},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(21),o=a.n(c),u=a(2),s=a(5),l=a.n(s),i=a(12),p=a(13),m=a.n(p),b="".concat("","/api/user/login"),d=a(23),E=a(8),f=a(10),O=a(122),v=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";if(e&&""!==e)return r.a.createElement(O.a,{severity:"error"},t(e,a))};var g=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.login.errorCode})),a=Object(E.g)(),c=Object(n.useState)(""),o=Object(f.a)(c,2),s=o[0],p=o[1],d=Object(n.useState)(""),O=Object(f.a)(d,2),g=O[0],R=O[1];return r.a.createElement("div",null,v(t,(function(e){switch(e){case"INVALID_EMAIL_OR_PASS":return"The email or password appear to be incorrect.";default:return""}})),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e(function(e,t){return function(){var a=Object(i.a)(l.a.mark((function a(n){var r,c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,m.a.post(b,{email:e,password:t});case 3:r=a.sent,c=r.data,localStorage.setItem("token",c.token),n({type:"LOGIN",data:{email:c.email,token:c.token}}),a.next=18;break;case 9:a.prev=9,a.t0=a.catch(0),a.t1=a.t0.response.status,a.next=401===a.t1?14:16;break;case 14:return n({type:"LOGIN_ERROR",data:{errorCode:a.t0.response.data.errorCode}}),a.abrupt("break",18);case 16:return n({type:"SERVER_ERROR"}),a.abrupt("break",18);case 18:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()}(s,g)),a.push("/"),R(""),p("")}},"email: ",r.a.createElement("input",{type:"email",value:s,onChange:function(e){p(e.target.value)}})," ",r.a.createElement("br",null),"password: ",r.a.createElement("input",{type:"password",value:g,onChange:function(e){R(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit"})))},R="".concat("","/api/user"),h=function(e){return function(){var t=Object(i.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get(R,{headers:{authorization:"bearer ".concat(e)}});case 3:n=t.sent,r=n.data,a({type:"USER_INFORMATION",data:{user:r}}),t.next=18;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0.response.status),t.t1=t.t0.response.status,t.next=401===t.t1?14:16;break;case 14:return a({type:"INVALID_TOKEN"}),t.abrupt("break",18);case 16:return a({type:"SERVER_ERROR"}),t.abrupt("break",18);case 18:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()};var T=function(){var e=Object(u.c)((function(e){return e.user.user})),t=Object(u.c)((function(e){return e.user.roles})),a=Object(u.c)((function(e){return e.login.token})),c=Object(u.b)();return Object(n.useEffect)((function(){c(h(a))}),[c,a]),e?r.a.createElement("div",null,"Email: ",e.email,r.a.createElement("hr",null),"Hallo ",e.frontName," ",e.lastName,",",r.a.createElement("br",null),"je rollen zijn",t?function(e){var t=e.map((function(e){return r.a.createElement("li",{key:e.id},e.abreviation," (",e.description,")")}));return r.a.createElement("ul",null,t)}(t):" loading"):r.a.createElement("div",null,"Loading....")},y="".concat("","/api/moderator"),I="".concat("","/api/role"),k=function(){return function(){var e=Object(i.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.a.get("".concat(I));case 3:a=e.sent,n=a.data,t({type:"ROLE_LIST",data:{roles:n}}),e.next=18;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.response.status),e.t1=e.t0.response.status,e.next=401===e.t1?14:16;break;case 14:return t({type:"INVALID_TOKEN"}),e.abrupt("break",18);case 16:return t({type:"SERVER_ERROR"}),e.abrupt("break",18);case 18:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()};a(90);var _=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.login.token})),a=Object(n.useState)(""),c=Object(f.a)(a,2),o=c[0],s=c[1],p=Object(n.useState)(""),b=Object(f.a)(p,2),d=b[0],E=b[1],O=Object(n.useState)(""),v=Object(f.a)(O,2),g=v[0],R=v[1];return r.a.createElement("form",{onSubmit:function(a){a.preventDefault(),e(function(e,t,a,n){return function(){var r=Object(i.a)(l.a.mark((function r(c){var o,u;return l.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,m.a.post("".concat(y,"/addUser"),{email:t,frontName:a,lastName:n},{headers:{authorization:"bearer ".concat(e)}});case 3:o=r.sent,u=o.data,c({type:"ADD_USER",data:{user:u}}),r.next=20;break;case 8:r.prev=8,r.t0=r.catch(0),console.log(r.t0.response.data),r.t1=r.t0.response.status,r.next=400===r.t1?14:401===r.t1?16:18;break;case 14:return c({type:"VALIDATION_ERROR_ADD_USER",data:r.t0.response.data}),r.abrupt("break",20);case 16:return c({type:"INVALID_TOKEN"}),r.abrupt("break",20);case 18:return c({type:"SERVER_ERROR"}),r.abrupt("break",20);case 20:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}()}(t,o,d,g)),E(""),R(""),s("")}},"email: ",r.a.createElement("input",{type:"email",value:o,onChange:function(e){s(e.target.value)}})," ",r.a.createElement("br",null),"front name: ",r.a.createElement("input",{type:"text",value:d,onChange:function(e){E(e.target.value)}}),r.a.createElement("br",null),"last name  ",r.a.createElement("input",{type:"text",value:g,onChange:function(e){R(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit"}))};var j=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.login.token})),a=Object(n.useState)(""),c=Object(f.a)(a,2),o=c[0],s=c[1],p=Object(n.useState)(""),b=Object(f.a)(p,2),d=b[0],E=b[1];return r.a.createElement("form",{onSubmit:function(a){a.preventDefault(),e(function(e,t,a){return function(){var n=Object(i.a)(l.a.mark((function n(r){var c,o;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m.a.post("".concat(y,"/addRole"),{abreviation:t,description:a},{headers:{authorization:"bearer ".concat(e)}});case 3:c=n.sent,o=c.data,console.log("addRole",o),r({type:"ADD_ROLE",data:{role:o}}),n.next=20;break;case 9:n.prev=9,n.t0=n.catch(0),n.t1=n.t0.response.status,n.next=400===n.t1?14:401===n.t1?16:18;break;case 14:return r({type:"VALIDATION_ERROR_ADD_ROLE",data:n.t0.response.data}),n.abrupt("break",20);case 16:return r({type:"INVALID_TOKEN"}),n.abrupt("break",20);case 18:return r({type:"SERVER_ERROR"}),n.abrupt("break",20);case 20:case"end":return n.stop()}}),n,null,[[0,9]])})));return function(e){return n.apply(this,arguments)}}()}(t,o,d)),s(""),E("")}},"abreviation: ",r.a.createElement("input",{type:"text",value:o,onChange:function(e){s(e.target.value)}})," ",r.a.createElement("br",null),"description: ",r.a.createElement("input",{type:"text",value:d,onChange:function(e){E(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit"}))};var S=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.moderator})),a=Object(u.c)((function(e){return e.login.token})),c=Object(u.c)((function(e){return e.roles}));return Object(n.useEffect)((function(){a&&(e(function(e){return function(){var t=Object(i.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("".concat(y,"/users"),{headers:{authorization:"bearer ".concat(e)}});case 3:n=t.sent,r=n.data,a({type:"USERS_LIST",data:{userList:r}}),t.next=18;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0.response.status),t.t1=t.t0.response.status,t.next=401===t.t1?14:16;break;case 14:return a({type:"INVALID_TOKEN"}),t.abrupt("break",18);case 16:return a({type:"SERVER_ERROR"}),t.abrupt("break",18);case 18:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}(a)),e(k()))}),[e,a]),t&&c?r.a.createElement("div",null,r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"front name"),r.a.createElement("th",null,"Last name"),r.a.createElement("th",null,"Email"),r.a.createElement("th",null,"ID"),r.a.createElement("th",null,"roles"))),r.a.createElement("tbody",null,t.map((function(t){return r.a.createElement("tr",{key:t.id},r.a.createElement("td",null,t.frontName),r.a.createElement("td",null,t.lastName),r.a.createElement("td",null,t.email),r.a.createElement("td",null,t.id),r.a.createElement("td",null,t.roles.map((function(e){return r.a.createElement("div",{key:e},(t=c,a=e,t.filter((function(e){return e.id===a}))[0]).abreviation);var t,a}))),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return e(function(e,t){return function(){var a=Object(i.a)(l.a.mark((function a(n){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,m.a.post("".concat(y,"/deleteUser"),{userId:t},{headers:{authorization:"bearer ".concat(e)}});case 3:n({type:"DELETE_USER_SUCCES"}),a.next=18;break;case 6:a.prev=6,a.t0=a.catch(0),console.log(a.t0.response.data),a.t1=a.t0.response.status,a.next=400===a.t1?12:401===a.t1?14:16;break;case 12:return n({type:"VALIDATION_ERROR_ADD_USER",data:a.t0.response.data}),a.abrupt("break",18);case 14:return n({type:"INVALID_TOKEN"}),a.abrupt("break",18);case 16:return n({type:"SERVER_ERROR"}),a.abrupt("break",18);case 18:case"end":return a.stop()}}),a,null,[[0,6]])})));return function(e){return a.apply(this,arguments)}}()}(a,t.id))}},"Delete User")),r.a.createElement("td",null,r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropbtn"},"Dropdown"),r.a.createElement("div",{className:"dropdown-content"},c.map((function(n){return r.a.createElement("button",{key:n.id,onClick:function(){return e(function(e,t,a){return function(){var n=Object(i.a)(l.a.mark((function n(r){var c,o,u;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("lamo"),n.prev=1,n.next=4,m.a.post("".concat(y,"/toggleRole"),{roleId:t,userId:a},{headers:{authorization:"bearer ".concat(e)}});case 4:c=n.sent,o=c.data.role,u=c.data.user,console.log("addRole",c.data),r({type:"TOGGLE_ROLE",data:{user:u,role:o}}),n.next=26;break;case 11:if(n.prev=11,n.t0=n.catch(1),console.log(n.t0),n.t0.response){n.next=17;break}return r({type:"WEIRD_ERROR"}),n.abrupt("return");case 17:n.t1=n.t0.response.status,n.next=400===n.t1?20:401===n.t1?22:24;break;case 20:return r({type:"VALIDATION_ERROR_ADD_ROLE",data:n.t0.response.data}),n.abrupt("break",26);case 22:return r({type:"INVALID_TOKEN"}),n.abrupt("break",26);case 24:return r({type:"SERVER_ERROR"}),n.abrupt("break",26);case 26:case"end":return n.stop()}}),n,null,[[1,11]])})));return function(e){return n.apply(this,arguments)}}()}(a,n.id,t.id))}},n.abreviation)}))))))})))),r.a.createElement(_,null),r.a.createElement(j,null)):r.a.createElement("div",null)},L="".concat("","/api/timeslotCategorie"),C=function(e){return function(){var t=Object(i.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("".concat(L),{headers:{authorization:"bearer ".concat(e)}});case 3:n=t.sent,r=n.data,a({type:"TIMESLOT_CATEGORIE_LIST",data:{timeslotCategories:r}}),t.next=20;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0.response.data),t.t1=t.t0.response.status,t.next=400===t.t1?14:401===t.t1?16:18;break;case 14:return a({type:"TIMESLOT_CATEGORIE_ERROR",errorCode:t.t0.response.data.errorCode}),t.abrupt("break",20);case 16:return a({type:"TIMESLOT_CATEGORIE_VALIDATION_ERROR"}),t.abrupt("break",20);case 18:return a({type:"SERVER_ERROR"}),t.abrupt("break",20);case 20:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()};var D=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.timeslotCategorie})),a=Object(u.c)((function(e){return e.login.token})),c=Object(n.useState)(""),o=Object(f.a)(c,2),s=o[0],p=o[1],b=Object(n.useState)(24),d=Object(f.a)(b,2),E=d[0],O=d[1];return r.a.createElement("div",null,v(t.errorCode,(function(e){switch(e){case"TITLE_LENGTH_ERROR":return"The title appears to be of incorrect length";default:return""}})),r.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e(function(e,t,a){return function(){var n=Object(i.a)(l.a.mark((function n(r){var c,o;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m.a.post("".concat(L),{title:t,cancelLength:a},{headers:{authorization:"bearer ".concat(e)}});case 3:c=n.sent,o=c.data,r({type:"ADD_TIMESLOT_CATEGORIE",data:{timeslotCategorie:o}}),n.next=20;break;case 8:n.prev=8,n.t0=n.catch(0),console.log(n.t0.response.data),n.t1=n.t0.response.status,n.next=400===n.t1?14:401===n.t1?16:18;break;case 14:return r({type:"TIMESLOT_CATEGORIE_ERROR",errorCode:n.t0.response.data.errorCode}),n.abrupt("break",20);case 16:return r({type:"TIMESLOT_CATEGORIE_VALIDATION_ERROR"}),n.abrupt("break",20);case 18:return r({type:"SERVER_ERROR"}),n.abrupt("break",20);case 20:case"end":return n.stop()}}),n,null,[[0,8]])})));return function(e){return n.apply(this,arguments)}}()}(a,s,E)),p(""),O(24)}},"title: ",r.a.createElement("input",{type:"text",value:s,onChange:function(e){p(e.target.value)}})," ",r.a.createElement("br",null),"cancle length (hours): ",r.a.createElement("input",{type:"number",min:0,value:E,onChange:function(e){O(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("input",{type:"submit"})))};var x=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.login.token}));return Object(n.useEffect)((function(){e(h(t))}),[e,t]),r.a.createElement("div",null,r.a.createElement(T,null),r.a.createElement(S,null),r.a.createElement(D,null))};var N=function(){var e=Object(u.b)(),t=Object(E.g)();return Object(n.useEffect)((function(){e((localStorage.clear(),{type:"LOGOUT"})),t.push("/")}),[e,t]),r.a.createElement("div",null,"logout")},w="".concat("","/api/timeslot"),A=function(e,t,a,n,r,c,o){return function(){var u=Object(i.a)(l.a.mark((function u(s){var i,p;return l.a.wrap((function(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,m.a.post("".concat(w),{description:t,startTime:a,endTime:n,maxPeople:r,roles:c,timeslotCategorie:o},{headers:{authorization:"bearer ".concat(e)}});case 3:i=u.sent,p=i.data,setTimeout((function(){s({type:"RESET_SUCCES_TIMESLOT"})}),5e3),s({type:"ADD_TIMESLOT",data:{timeslot:p}}),u.next=21;break;case 9:u.prev=9,u.t0=u.catch(0),console.log(u.t0),u.t1=u.t0.response.status,u.next=400===u.t1?15:401===u.t1?17:19;break;case 15:return s({type:"TIMESLOT_ERROR",data:{errorCode:u.t0.response.data.errorCode,errorInfo:u.t0.response.data.errorInfo}}),u.abrupt("break",21);case 17:return s({type:"TIMESLOT_ERROR",data:{errorCode:u.t0.response.data.errorCode}}),u.abrupt("break",21);case 19:return s({type:"SERVER_ERROR"}),u.abrupt("break",21);case 21:case"end":return u.stop()}}),u,null,[[0,9]])})));return function(e){return u.apply(this,arguments)}}()};function M(e){return e<10?"0"+e:e}var V=function(e,t){var a=["January","February","March","April","May","June","July","August","September","October","November","December"];return U(e)===U(t)?"".concat(M(e.getHours()),":").concat(M(e.getMinutes()),"-").concat(M(t.getHours()),":").concat(M(t.getMinutes())," ").concat(a[e.getMonth()],", ").concat(e.getDate()," ").concat(e.getFullYear()):e.getFullYear()===t.getFullYear()?"".concat(a[e.getMonth()],", ").concat(e.getDate()," ").concat(M(e.getHours()),":").concat(M(e.getMinutes()),"-").concat(a[t.getMonth()],", ").concat(t.getDate()," ").concat(M(t.getHours()),":").concat(M(t.getMinutes())):"".concat(a[e.getMonth()],", ").concat(e.getDate()," ").concat(e.getFullYear(),", ").concat(M(e.getHours()),":").concat(M(e.getMinutes()),"-").concat(a[t.getMonth()],", ").concat(t.getDate()," ").concat(t.getFullYear(),", ").concat(M(t.getHours()),":").concat(M(t.getMinutes()))},U=function(e){return"".concat(e.getFullYear(),"-").concat(M(e.getMonth()+1),"-").concat(M(e.getDate()))},G=function(e){return"".concat(M(e.getHours()),":").concat(M(e.getMinutes()))};var z=function(){var e=Object(u.c)((function(e){return e.login.token})),t=Object(u.c)((function(e){return e.roles})),a=Object(u.c)((function(e){return e.timeslotCategorie.timeslotCategories})),c=Object(u.c)((function(e){return e.timeslot.errorCode})),o=Object(u.c)((function(e){return e.timeslot.succes})),s=Object(n.useState)(""),l=Object(f.a)(s,2),i=l[0],p=l[1],m=Object(n.useState)(new Date),b=Object(f.a)(m,2),d=b[0],E=b[1],g=Object(n.useState)(new Date),R=Object(f.a)(g,2),h=R[0],T=R[1],y=Object(n.useState)(1),I=Object(f.a)(y,2),_=I[0],j=I[1],S=Object(n.useState)([]),L=Object(f.a)(S,2),D=L[0],x=L[1],N=Object(n.useState)(""),w=Object(f.a)(N,2),M=w[0],V=w[1],z=Object(u.b)();Object(n.useEffect)((function(){z(k()),z(C(e))}),[z,e]);var K=U(d),F=G(d),H=U(h),Y=G(h);return console.log(M,c),0!==t.length&&0!==a?r.a.createElement("div",null,v(c,(function(e){switch(e){case"NOT_AUTHORIZED":return"You are not not authorized to create timeslot";default:return""}})),function(e){if(e)return r.a.createElement(O.a,{severity:"success"},"This is a success alert \u2014 check it out!")}(o),r.a.createElement("form",{onSubmit:function(t){console.log(d),z(A(e,i,d,h,_,D,""!==M||M?M:a[0].id)),t.preventDefault()}},"description: ",r.a.createElement("input",{type:"text",value:i,onChange:function(e){p(e.target.value)}})," ",r.a.createElement("br",null),"startTime date: ",r.a.createElement("input",{type:"date",value:K,onChange:function(e){var t=e.target.value.split("-"),a=new Date(d.getTime());""!==e.target.value&&(a.setFullYear(t[0]),a.setMonth(t[1]-1),a.setDate(t[2]),console.log(a),E(a))}}),"startTime time: ",r.a.createElement("input",{type:"time",value:F,onChange:function(e){var t=e.target.value.split(":"),a=new Date(d.getTime());""!==e.target.value&&(console.log(t,e.target.value,"testing"),a.setHours(t[0]),a.setMinutes(t[1]),E(a))}}),r.a.createElement("br",null),"endTime date: ",r.a.createElement("input",{type:"date",value:H,onChange:function(e){var t=e.target.value.split("-"),a=new Date(h.getTime());""!==e.target.value&&(a.setFullYear(t[0]),a.setMonth(t[1]-1),a.setDate(t[2]),T(a))}}),"endTime time: ",r.a.createElement("input",{type:"time",value:Y,onChange:function(e){var t=e.target.value.split(":"),a=new Date(h.getTime());""!==e.target.value&&(a.setHours(t[0]),a.setMinutes(t[1]),T(a))}}),r.a.createElement("br",null),"maxPeople: ",r.a.createElement("input",{type:"number",value:_,onChange:function(e){j(e.target.value)}}),r.a.createElement("br",null),r.a.createElement("select",{value:D,onChange:function(e){var t=e.target.value;D.includes(t)?(console.log("lmao"),x(D.filter((function(e){return e!==t})))):x(D.concat(e.target.value))},multiple:!0},t.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.abreviation,": ",e.description)}))),r.a.createElement("select",{value:M,onChange:function(e){V(e.target.value)}},a.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.title," minimum cancel times (hours): ",e.cancelLength)}))),r.a.createElement("input",{type:"submit"}))):r.a.createElement("div",null,"loading roles")},K=a(114),F=a(115),H=a(116),Y=a(117),B=a(25),J=a(118),P=a(123),q=a(119),W=a(120),Z=a(121),Q=a(94),X=a(113),$=function(e,t){for(var a in e)if(e[a].abreviation===t)return!0;return!1},ee=function(e,t){for(var a in e)if(e[a].id===t)return e[a];return null};var te=function(e){var t=e.timeslots,a=e.userRoles,n=e.categories,c=e.userId,o=e.roleList,s=e.sortingOption,p=e.token,b=Object(u.b)(),d=Object(X.a)((function(e){return{root:{width:400,height:200}}}))(),E=function(e,t){switch(t){case"startTime":return e.sort((function(e,t){return new Date(e.startTime)-new Date(t.startTime)}));case"endTime":return e.sort((function(e,t){return new Date(e.endTime)-new Date(t.endTime)}));case"usersRising":return e.sort((function(e,t){return e.subscribed.length-t.subscribed.length}));case"usersDecreasing":return e.sort((function(e,t){return t.subscribed.length-e.subscribed.length}));default:return e.sort((function(e,t){return new Date(e.startTime)-new Date(t.startTime)}))}}(t,s);return r.a.createElement(K.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"center"},E.map((function(e){var t=new Date(e.startTime),u=new Date(e.endTime);return r.a.createElement(F.a,{key:e.id},r.a.createElement(H.a,{title:V(t,u),subheader:ee(n,e.timeslotCategorie).title,className:d.root}),r.a.createElement(Y.a,null,r.a.createElement(K.a,{container:!0,spacing:2},r.a.createElement(K.a,{item:!0,xs:12,md:6},r.a.createElement(B.a,{variant:"h6",className:d.title},"Roles"),r.a.createElement(J.a,{dense:!0},e.roles.map((function(e){var t=function(e,t){return e.filter((function(e){return e.id===t}))[0]}(o,e);return r.a.createElement(P.a,{key:e},r.a.createElement(q.a,{primary:t.abreviation}))})))),r.a.createElement(K.a,{item:!0,xs:12,md:6},r.a.createElement(B.a,{variant:"h6",className:d.title},"Users"),r.a.createElement(J.a,{dense:!0},e.subscribed.map((function(e){return r.a.createElement(P.a,{key:e},r.a.createElement(q.a,{primary:e}))}))))),r.a.createElement(B.a,{variant:"body2",color:"textSecondary",component:"p"},"".concat(e.subscribed.length,"/").concat(e.maxPeople),r.a.createElement("br",null))),r.a.createElement(W.a,null,r.a.createElement(Z.a,null,e.subscribed.includes(c)?r.a.createElement(Q.a,{onDoubleClick:function(){return b(function(e,t){return function(){var a=Object(i.a)(l.a.mark((function a(n){var r,c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,m.a.post("".concat(w,"/unsubscribe"),{timeslotId:t},{headers:{authorization:"bearer ".concat(e)}});case 3:r=a.sent,c=r.data,n({type:"SUBSCRIBED_TIMESLOT",data:{timeslot:c}}),a.next=20;break;case 8:a.prev=8,a.t0=a.catch(0),console.log(a.t0),a.t1=a.t0.response.status,a.next=400===a.t1?14:401===a.t1?16:18;break;case 14:return n({type:"TIMESLOT_ERROR",data:a.t0.response.data}),a.abrupt("break",20);case 16:return n({type:"INVALID_TOKEN"}),a.abrupt("break",20);case 18:return n({type:"SERVER_ERROR"}),a.abrupt("break",20);case 20:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}()}(p,e.id))},color:"secondary"},"unSubscribe"):r.a.createElement(Q.a,{onDoubleClick:function(){return b(function(e,t){return function(){var a=Object(i.a)(l.a.mark((function a(n){var r,c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,m.a.post("".concat(w,"/subscribe"),{timeslotId:t},{headers:{authorization:"bearer ".concat(e)}});case 3:r=a.sent,c=r.data,n({type:"SUBSCRIBED_TIMESLOT",data:{timeslot:c}}),a.next=20;break;case 8:a.prev=8,a.t0=a.catch(0),console.log(a.t0.response.data),a.t1=a.t0.response.status,a.next=400===a.t1?14:401===a.t1?16:18;break;case 14:return n({type:"TIMESLOT_ERROR",data:a.t0.response.data}),a.abrupt("break",20);case 16:return n({type:"INVALID_TOKEN"}),a.abrupt("break",20);case 18:return n({type:"SERVER_ERROR"}),a.abrupt("break",20);case 20:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}()}(p,e.id))},color:"primary"},"Meld mij aan"),$(a,"createTimeslots")?r.a.createElement(Q.a,{onDoubleClick:function(){return b(function(e,t){return function(){var a=Object(i.a)(l.a.mark((function a(n){return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,m.a.post("".concat(w,"/delete"),{timeslotId:t},{headers:{authorization:"bearer ".concat(e)}});case 3:n({type:"DELETE_TIMESLOT",data:{timeslotId:t}}),a.next=18;break;case 6:a.prev=6,a.t0=a.catch(0),console.log(a.t0),a.t1=a.t0.response.status,a.next=400===a.t1?12:401===a.t1?14:16;break;case 12:return n({type:"TIMESLOT_ERROR",data:a.t0.response.data}),a.abrupt("break",18);case 14:return n({type:"INVALID_TOKEN"}),a.abrupt("break",18);case 16:return n({type:"SERVER_ERROR"}),a.abrupt("break",18);case 18:case"end":return a.stop()}}),a,null,[[0,6]])})));return function(e){return a.apply(this,arguments)}}()}(p,e.id))},color:"secondary"},"delete"):"")))})))};var ae=function(){var e=Object(u.b)(),t=Object(u.c)((function(e){return e.timeslot.timeslots})),a=Object(u.c)((function(e){return e.roles})),c=Object(u.c)((function(e){return e.user})),o=Object(u.c)((function(e){return e.timeslotCategorie.timeslotCategories})),s=Object(u.c)((function(e){return e.timeslot})),p=Object(u.c)((function(e){return e.login.token}));Object(n.useEffect)((function(){p&&(e(function(e){return function(){var t=Object(i.a)(l.a.mark((function t(a){var n,r;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m.a.get("".concat(w),{headers:{authorization:"bearer ".concat(e)}});case 3:n=t.sent,r=n.data,a({type:"TIMESLOT_LIST",data:{timeslots:r}}),t.next=20;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0.response.data),t.t1=t.t0.response.status,t.next=400===t.t1?14:401===t.t1?16:18;break;case 14:return a({type:"VALIDATION_ERROR_TIMESLOT",data:t.t0.response.data}),t.abrupt("break",20);case 16:return a({type:"INVALID_TOKEN"}),t.abrupt("break",20);case 18:return a({type:"SERVER_ERROR"}),t.abrupt("break",20);case 20:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}(p)),e(k()),e(h(p)),e(C(p)))}),[e,p]);var b=[{value:"startTime",name:"start tijd"},{value:"endTime",name:"eind tijd"},{value:"usersRising",name:"hoeveelheid aangemeld stijdend"},{value:"usersDecreasing",name:"hoeveelheid aangemeld dalend"}],d=Object(n.useState)(b[0].value),E=Object(f.a)(d,2),O=E[0],g=E[1],R=function(e,t){return e.reduce((function(e,a){return(e[a[t]]=e[a[t]]||[]).push(a),e}),{})};if(t&&0!==a.length&&0!==o.length&&c.user){var T=R(t,"timeslotCategorie");return r.a.createElement("div",null,r.a.createElement("select",{onChange:function(e){g(e.target.value)},value:O},b.map((function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.name)}))),v(s.errorCode,(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";switch(e){case"TIMESLOT_FULL":return"time slot full please fuck off";case"NO_VALID_ROLE":return"you do not have the required role to subscribe to this timeslot please contact the moderator if you think this is an error.";case"TIME_ERROR":return"The time to cancel your appointment has sadly passed contact the COMBAR in case you really can't tap you need to cancel atleast ".concat(t," hours in advance");default:return r.a.createElement("div",null)}}),s.errorInfo),Object.keys(R(t,"timeslotCategorie")).map((function(e){return r.a.createElement("div",{key:e},r.a.createElement("h2",null,ee(o,e).title),r.a.createElement(te,{timeslots:T[e],userRoles:c.roles,categories:o,userId:c.id,roleList:a,sortingOption:O,token:p}))})))}return r.a.createElement("div",null)};a(91);var ne=function(){var e=Object(u.c)((function(e){return e.login})),t=Object(u.c)((function(e){return e.user.roles})),a=Object(u.c)((function(e){return e.login.token})),c=Object(u.b)();return Object(n.useEffect)((function(){a&&c(h(a))}),[c,a]),r.a.createElement("ul",{className:"navbar_list"},r.a.createElement("li",{className:"navbar_list_element"},r.a.createElement(d.b,{to:"/",className:"navbar_link"},"home ")),r.a.createElement("li",{className:"navbar_log_element"}," ",e.loggedIn?r.a.createElement(d.b,{to:"/logout",className:"navbar_link"},"logout"):r.a.createElement(d.b,{to:"/login",className:"navbar_link"},"login")," "),e.loggedIn?function(e){if($(e,"userModerator"))return r.a.createElement("li",{className:"navbar_list_element"},r.a.createElement(d.b,{to:"/moderator",className:"navbar_link"},"moderator"))}(t):"",e.loggedIn?function(e){if($(e,"createTimeslots"))return r.a.createElement("li",{className:"navbar_list_element"},r.a.createElement(d.b,{to:"/timeslot/create",className:"navbar_link"},"create Timeslot"))}(t):"",e.loggedIn?r.a.createElement("li",{className:"navbar_list_element"},r.a.createElement(d.b,{to:"/timeslot",className:"navbar_link"},"timeslots")):"")};var re=function(){var e=Object(u.b)();Object(n.useEffect)((function(){var t=localStorage.getItem("token");e(t?function(e){return{type:"LOGIN",data:{token:e}}}(t):(console.log("no storage"),{type:"NO_TOKEN"}))}),[e]);var t=Object(u.c)((function(e){return e.login}));return t.pending?"pending....":(console.log("Production is ","production"),r.a.createElement(d.a,null,r.a.createElement(ne,null),r.a.createElement(E.d,null,r.a.createElement(E.b,{path:"/login",render:function(){return t.loggedIn?r.a.createElement(E.a,{to:"/"}):r.a.createElement(g,null)}}),r.a.createElement(E.b,{path:"/timeslot/create",render:function(){return t.loggedIn?r.a.createElement(z,null):r.a.createElement(E.a,{to:"/login"})}}),r.a.createElement(E.b,{path:"/timeslot",render:function(){return t.loggedIn?r.a.createElement(ae,null):r.a.createElement(E.a,{to:"/login"})}}),r.a.createElement(E.b,{path:"/moderator",render:function(){return t.loggedIn?r.a.createElement(x,null):r.a.createElement(E.a,{to:"/login"})}}),r.a.createElement(E.b,{path:"/logout"},r.a.createElement(N,null)),r.a.createElement(E.b,{path:"/",render:function(){return t.loggedIn?r.a.createElement(T,null):r.a.createElement(E.a,{to:"/login"})}}))))},ce=a(55),oe={loggedIn:!1,pending:!0},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return{token:t.data.token,loggedIn:!0,pending:!1};case"NO_TOKEN":return{loggedIn:!1,pending:!1};case"LOGOUT":return{loggedIn:!1,error:!1,pending:!1};case"LOGIN_ERROR":return console.log(t.data),{loggedIn:!1,error:!0,errorCode:t.data.errorCode,pending:!1};case"SERVER_ERROR":return{loggedIn:!1,error:!0,errorMessage:"The server may be down, try again later or try to contract the moderator.",pending:!1};default:return e}},se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_ROLE":return e.concat(t.data.role);case"ROLE_LIST":return t.data.roles;default:return e}},le={user:null,role:[]},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_INFORMATION":var a=t.data.user;return{user:{email:a.email,frontName:a.frontName,lastName:a.lastName,id:a.id},roles:a.roles};case"LOGOUT":return{user:null,role:[]};default:return e}},pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS_LIST":return t.data.userList;case"ADD_USER":return e.concat(t.data.user);case"TOGGLE_ROLE":var a=e.map((function(e){return console.log(e.id,t.data.user.id),e.id===t.data.user.id?t.data.user:e}));return console.log(a),a;default:return e}},me=a(28),be=a(11),de={timeslots:[],errorCode:"",succes:!1,errorInfo:""},Ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TIMESLOT":return Object(be.a)(Object(be.a)({},e),{},{timeslots:e.timeslots.concat(t.data.timeslot),succes:!0});case"TIMESLOT_LIST":return Object(be.a)(Object(be.a)({},e),{},{timeslots:t.data.timeslots});case"SUBSCRIBED_TIMESLOT":var a=e.timeslots.map((function(e){return e.id===t.data.timeslot.id?t.data.timeslot:e}));return Object(be.a)(Object(be.a)({},e),{},{timeslots:a,errorCode:""});case"DELETE_TIMESLOT":var n=e.timeslots.filter((function(e){return e.id!==t.data.timeslotId}));return Object(be.a)(Object(be.a)({},e),{},{timeslots:n,errorCode:""});case"TIMESLOT_ERROR":return Object(be.a)(Object(be.a)({},e),{},{errorCode:t.data.errorCode,errorInfo:t.data.errorInfo});case"RESET_SUCCES_TIMESLOT":return Object(be.a)(Object(be.a)({},e),{},{succes:!1});default:return e}},fe={timeslotCategories:[],errorCode:"",succes:!1},Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:fe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_TIMESLOT_CATEGORIE":return Object(be.a)(Object(be.a)({},e),{},{timeslotCategories:e.timeslotCategories.concat(t.data.timeslotCategorie),succes:!0});case"TIMESLOT_CATEGORIE_LIST":return Object(be.a)(Object(be.a)({},e),{},{timeslotCategories:t.data.timeslotCategories});case"TIMESLOT_CATEGORIE_ERROR":return Object(be.a)(Object(be.a)({},e),{},{errorCode:t.data.errorCode});case"RESET_SUCCES_TIMESLOT_CATEGORIE":return Object(be.a)(Object(be.a)({},e),{},{succes:!0});default:return e}},ve=Object(me.d)(Object(me.c)({login:ue,roles:se,user:ie,moderator:pe,timeslot:Ee,timeslotCategorie:Oe}),Object(me.a)(ce.a));o.a.render(r.a.createElement(u.a,{store:ve},r.a.createElement(re,null)),document.getElementById("root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.b6b1bb54.chunk.js.map