// Define and Impose
n$('')// returns window (or given scope) as an n$
.n$('dango') // extends into the dango n$
.n$e({ // extends the dango namespace with members
    runme: function () {
        alert("Hello World!");
    }
})
.n$e({ // extends the dango namespace with a single member
    'runmeagain': function () {
        alert("Hello Again World!");
    }
})
.n$provide( // provides the namespace as a parameter to a function and executes it
    function (d) {
        with (d) {
            runme();
        }
        d.runmeagain();
    }
);

n$([ // creates namespaces test1 and test2 in dango
    "dango.test1",
    "dango.test2"
])
.n$e({ // extends the both namespaces with these members
    trey: function () {
        alert("Hello");
    }
});

n$([ // gets existing test1 and test2 namespaces in dango
    "dango.test1",
    "dango.test2"
])
.n$provide( // provides the namespaces as a parameter to a function and executes it
    function (test1, test2) {
        with (test1, test2) {
            trey();
        }
        test1.n$e({
            entrep: test1.trey
        })
    }
);

n$("dango.test1")
.n$impose( // provides the namespaces as a parameter to a function and executes it
    function () {
        this.entrep();
    }
);